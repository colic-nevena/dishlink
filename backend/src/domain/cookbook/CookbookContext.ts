import { ICookbookRepository } from "../../fake-api/repositories/CookbookRepository"
import { IRecipeRepository } from "../../fake-api/repositories/RecipeRepository"
import Cookbook from "./Cookbook"
import Recipe from "./Recipe"

export default class CookbookContext {
    constructor(
        private readonly _cookbookRepository: ICookbookRepository,
        private readonly _recipeRepository: IRecipeRepository
    ) { }

    async createCookbook(cookbook: Cookbook) {
        return this._cookbookRepository.save(cookbook)
    }

    async changeCookbookName(cookbookId: string, newName: string) {
        const cookbook = await this._cookbookRepository.get(cookbookId)
        cookbook.changeName(newName)

        if (!cookbook.hasChanged.name) return
        return this._cookbookRepository.save(cookbook)
    }

    async deleteCookbook(cookbookId: string) {
        return this._cookbookRepository.delete(cookbookId)
    }

    async saveRecipe(recipe: Recipe) {
        await this._recipeRepository.save(recipe)
    }

    async removeRecipe(recipeId: string) {
        return this._recipeRepository.delete(recipeId)
    }
}