import ICookbookRepository from "../../fake-api/repositories/CookbookRepository"
import Cookbook from "./Cookbook"
import Recipe from "./Recipe"

export default class CookbookContext {
    constructor(private readonly _cookbookRepository: ICookbookRepository) { }

    createCookbook(cookbook: Cookbook) {
        return this._cookbookRepository.createCookbook(cookbook)
    }

    changeCookbookName(userId: string, cookbookId: string, newName: string) {
        // return this._cookbookRepository.changeCookbookName(userId, cookbookId, newName)
    }

    addRecipeToCookbook(cookbookId: string, recipe: Recipe) {
        // return this._cookbookRepository.addRecipeToCookbook(cookbookId, recipe)
    }

    removeRecipeFromCookbook(cookbookId: string, recipeId: string) {
        // return this._cookbookRepository.removeRecipeFromCookbook(cookbookId, recipeId)
    }

    deleteCookbook(cookbookId: string) {
        // return this._cookbookRepository.deleteCookbook(cookbookId)
    }

    updateRecipeInCookbook(cookbookId: string, recipeId: string, recipe: Recipe) {
        // return this._cookbookRepository.updateRecipeInCookbook(cookbookId, recipeId, recipe)
    }
}