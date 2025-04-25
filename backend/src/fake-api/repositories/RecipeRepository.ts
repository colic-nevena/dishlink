import Ingredient from '../../domain/cookbook/Ingredient';
import Recipe from '../../domain/cookbook/Recipe';
import { IRecipeDBDatasource, RecipeDTO } from "../datasources/RecipeDBDatasource"

class RecipeRepositoryError extends Error {
    constructor(message: string) {
        super(`[RecipeRepository] Error: ${message}`)
    }
}

export interface IRecipeRepository {
    getRecipesCreatedBy(userId: string): Promise<Recipe[]>
    getLatestRecipesCreatedBy(userId: string): Promise<Recipe[]>
    getAllCookbookRecipes(cookbookId: string): Promise<Recipe[]>
    getRecipesLikedBy(userId: string): Promise<Recipe[]>
    getRecipe(recipeId: string): Promise<Recipe>
    getRecipesByName(recipeName: string): Promise<Recipe[]>

    save(recipe: Recipe): Promise<void>
    delete(recipeId: string): Promise<void>
}

export default class RecipeRepository implements IRecipeRepository {
    constructor(private readonly _recipeDBDatasource: IRecipeDBDatasource) { }

    async delete(recipeId: string): Promise<void> {
        try {
            const exists = await this._recipeDBDatasource.getRecipeById(recipeId)
            if (!exists) throw new Error('Recipe does not exist')

            return await this._recipeDBDatasource.delete(recipeId)
        } catch (error) {
            throw new RecipeRepositoryError(`[delete] - ${(error as Error).message}`)

        }
    }

    async save(recipe: Recipe): Promise<void> {
        try {
            const exists = await this._recipeDBDatasource.getRecipeById(recipe.id)

            if (!exists) {
                await this._recipeDBDatasource.save(this.mapToDTO(recipe))
            } else {
                await this._recipeDBDatasource.update(this.mapToDTO(recipe))
            }
        } catch (error) {
            throw new RecipeRepositoryError(`[save] - ${(error as Error).message}`)
        }
    }

    async getRecipesLikedBy(userId: string): Promise<Recipe[]> {
        try {
            const recipeDTOs = await this._recipeDBDatasource.getRecipesLikedBy(userId)
            return recipeDTOs.map(this.mapToRecipe)
        } catch (error) {
            throw new RecipeRepositoryError(`[getRecipesLikedBy] - ${(error as Error).message}`)
        }
    }

    async getRecipesCreatedBy(userId: string): Promise<Recipe[]> {
        try {
            const recipeDTOs = await this._recipeDBDatasource.getRecipesCreatedBy(userId)
            return recipeDTOs.map(this.mapToRecipe)
        } catch (error) {
            throw new RecipeRepositoryError(`[getRecipesCreatedBy] - ${(error as Error).message}`)
        }
    }

    async getLatestRecipesCreatedBy(userId: string): Promise<Recipe[]> {
        try {
            const recipeDTOs = await this._recipeDBDatasource.getLatestRecipesCreatedBy(userId)
            return recipeDTOs.map(this.mapToRecipe)
        } catch (error) {
            throw new RecipeRepositoryError(`[getLatestRecipesCreatedBy] - ${(error as Error).message}`)
        }
    }

    async getAllCookbookRecipes(cookbookId: string): Promise<Recipe[]> {
        try {
            const recipeDTOs = await this._recipeDBDatasource.getAllCookbookRecipes(cookbookId)
            return recipeDTOs.map(this.mapToRecipe)
        } catch (error) {
            throw new RecipeRepositoryError(`[getAllCookbookRecipes] - ${(error as Error).message}`)
        }
    }

    async getRecipe(recipeId: string): Promise<Recipe> {
        try {
            const dto = await this._recipeDBDatasource.getRecipeById(recipeId)
            return this.mapToRecipe(dto)
        } catch (error) {
            throw new RecipeRepositoryError(`[getRecipeById] - ${(error as Error).message}`)
        }
    }

    async getRecipesByName(recipeName: string): Promise<Recipe[]> {
        try {
            const dtos = await this._recipeDBDatasource.getRecipesByName(recipeName)
            return dtos.map(this.mapToRecipe)
        } catch (error) {
            throw new RecipeRepositoryError(`[getRecipeByName] - ${(error as Error).message}`)
        }
    }

    private mapToRecipe = (dto: RecipeDTO): Recipe => {
        const ingredients = dto.ingredients.map(
            i => new Ingredient(i.name, `${i.amount}${i.unit ? ' ' + i.unit : ''}`)
        )

        return new Recipe(
            dto.id,
            dto.title,
            dto.createdBy,
            dto.cookbookId,
            ingredients,
            dto.steps,
            new Date(dto.createdAt),
            dto.image,
            dto.portions,
            dto.preparationTime,
            dto.specialNote
        )
    }

    private mapToDTO(recipe: Recipe): RecipeDTO {
        return {
            id: recipe.id,
            title: recipe.title,
            createdBy: recipe.createdBy,
            cookbookId: recipe.cookbookId,
            ingredients: recipe.ingredients.map(i => {
                const match = i.quantity.match(/^(\d+\.?\d*)\s*(.*)$/)
                const amount = match ? parseFloat(match[1]) : 0
                const unit = match && match[2] ? match[2] : ''
                return { name: i.name, amount, unit }
            }),
            steps: recipe.steps,
            createdAt: recipe.createdAt.toISOString(),
            image: recipe.image,
            portions: recipe.portions,
            preparationTime: recipe.preparationTime,
            specialNote: recipe.specialNote
        }
    }
}
