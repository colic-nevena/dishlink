import ICookbookRepository from "../../fake-api/repositories/ICookbookRepository";
import { Recipe } from "../../fake-api/repositories/IRecipeRepository";

export default class CookbookContext {
    constructor(private readonly _cookbookRepository: ICookbookRepository) { }

    createCookbook(userId: string, cookbookName: string) {
        // return this._cookbookRepository.createCookbook(userId, cookbookName);
    }

    changeCookbookName(userId: string, cookbookId: string, newName: string) {
        // return this._cookbookRepository.changeCookbookName(userId, cookbookId, newName);
    }

    addRecipeToCookbook(cookbookId: string, recipe: Recipe) {
        // return this._cookbookRepository.addRecipeToCookbook(cookbookId, recipe);
    }

    removeRecipeFromCookbook(cookbookId: string, recipeId: string) {
        // return this._cookbookRepository.removeRecipeFromCookbook(cookbookId, recipeId);
    }

    deleteCookbook(cookbookId: string) {
        // return this._cookbookRepository.deleteCookbook(cookbookId);
    }

    updateRecipeInCookbook(cookbookId: string, recipeId: string, recipe: Recipe) {
        // return this._cookbookRepository.updateRecipeInCookbook(cookbookId, recipeId, recipe);
    }
}