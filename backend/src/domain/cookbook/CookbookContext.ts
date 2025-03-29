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

    // TODO suri: da li je ovome (i naredne 2 fje) mesto ovde ili treba da ima svoj context ???
    // da li recept moze da postoji samostalno?
    // ako mi treba samo za search svih recepata i dodavanje u razne tudje cookbookove, da li to znaci da moze da postoji samostalno?
    // e sad u kom kontekstu mu je mesto?

    async saveRecipe(recipe: Recipe) {
        await this._recipeRepository.save(recipe)
    }

    async removeRecipe(recipeId: string) {
        return this._recipeRepository.delete(recipeId)
    }
}