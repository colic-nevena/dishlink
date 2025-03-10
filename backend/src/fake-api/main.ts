import ContextContainer from "../domain/ContextContainer"
import Cookbook from "../domain/cookbook/Cookbook"
import Ingredient from "../domain/cookbook/Ingredient"
import Recipe from "../domain/cookbook/Recipe"
import CookbookRepository from "./repositories/CookbookRepository"
import RecipeRepository from "./repositories/RecipeRepository"
import UserRepository from "./repositories/UserRepository"
// import { randomUUID } from "crypto" ==> ovo je built in

// IMPORTANT: OVO JE queries and commands layer, znaci ove fje ce da budu u komandama i querijima

const recipeRepository = new RecipeRepository()
const cookbookRepository = new CookbookRepository()
const userRepository = new UserRepository()

const contextContainer = new ContextContainer(userRepository, cookbookRepository)

// ------------------------------------------------------------------
// ---------------------------USER-----------------------------------
// ------------------------------------------------------------------

// [GET] /api/users/:userId/feed => query!!!
type UserFeedRequest = {
    userId: string
}
async function getUserFeed(request: UserFeedRequest) {
    return await recipeRepository.getUserLatestRecipes(request.userId)
}

// ------------------------------------------------------------------

// [GET] /api/users/:userId/cookbooks => query!!!
type UserCookbooksRequest = {
    userId: string
}
async function getUserCookbooks(request: UserCookbooksRequest) {
    return await cookbookRepository.getUserCookbooks(request.userId)
}

// ------------------------------------------------------------------

// [GET] /api/users/:userId/cookbook/:cookbookId => query!!!
type UserCookbookDetailRequest = {
    userId: string
    cookbookId: string
}
async function getUserCookbook(request: UserCookbookDetailRequest) {
    return await cookbookRepository.getUserCookbookDetail(request.userId, request.cookbookId)
}

// ------------------------------------------------------------------

// [GET] /api/users/:name => query!!!
type UserByNameRequest = {
    name: string
}
async function getUserByName(request: UserByNameRequest) {
    return await userRepository.getUserByName(request.name)
}

// ------------------------------------------------------------------
// [POST] /api/users/:userId/cookbooks => command!!!
type CreateCookbookRequest = {
    userId: string
    cookbookName: string
}
async function createCookbook(request: CreateCookbookRequest) {
    // const cookbookId = randomUUID()
    const cookbookId = "randomUUID"
    const cookbook = new Cookbook(cookbookId, request.cookbookName, "userIdIzTokena")
    return await contextContainer.cookbookContext.createCookbook(cookbook)
}

// ------------------------------------------------------------------
// ------------------------------PROFILE-----------------------------
// ------------------------------------------------------------------

// [GET] /api/profile => query!!!
async function getProfile() {
    const userId = "izTokena"
    return await userRepository.getProfile(userId)
}

// ------------------------------------------------------------------

// [GET] /api/profile/liked-recipes => query!!!
async function getLikedRecipes() {
    const userId = "izTokena"
    return await recipeRepository.getRecipesLikedBy(userId)
}

// ------------------------------------------------------------------

// [GET] /api/profile/friends => query!!!
async function getFriends() {
    const userId = "izTokena"
    return await userRepository.getFriends(userId)
}

// ------------------------------------------------------------------
// [DELETE] /api/profile/friends/:friendId/unfriend => command!!!
type UnfriendRequest = {
    friendId: string
}
async function unfriend(request: UnfriendRequest) {
    const userId = "izTokena"
    return await contextContainer.userContext.unfriend(userId, request.friendId)
}

// ------------------------------------------------------------------
// [POST] /api/profile/friends/:friendId => command!!!
type FriendRequest = {
    friendId: string
}
async function friend(request: FriendRequest) {
    const userId = "izTokena"
    return await contextContainer.userContext.friend(userId, request.friendId)
}


// ------------------------------------------------------------------
// ------------------------------COOKBOOK-----------------------------
// ------------------------------------------------------------------
// [GET] /api/recipes/id/:recipeId => query!!!
type GetRecipeByIdRequest = {
    recipeId: string
}
async function getRecipeById(request: GetRecipeByIdRequest) {
    return await recipeRepository.getRecipeById(request.recipeId)
}

// ------------------------------------------------------------------
// [GET] /api/recipes/name/:recipeName => query!!!
type GetRecipeByNameRequest = {
    recipeName: string
}
async function getRecipeByName(request: GetRecipeByNameRequest) {
    return await recipeRepository.getRecipeByName(request.recipeName)
}

//  ------------------------------------------------------------------
//[PUT] /api/cookbook/:cookbookId/recipes => command!!!
type ChangeCookbookNameRequest = {
    userId: string
    cookbookId: string
    newName: string
}
async function changeCookbookName(request: ChangeCookbookNameRequest) {
    return await contextContainer.cookbookContext.changeCookbookName(request.userId, request.cookbookId, request.newName)
}

// ------------------------------------------------------------------
//[POST] /api/cookbook/:cookbookId/recipes => command!!!
type AddRecipeToCookbookRequest = {
    id: string
    title: string
    createdBy: string
    cookbookId: string
    image?: string
    portions?: number
    preparationTime?: string
    specialNote?: string
    ingredients: any
    steps: any
    createdAt: Date
}
async function addRecipeToCookbook(request: AddRecipeToCookbookRequest) {
    const recipe = new Recipe(
        request.id,
        request.title,
        request.createdBy,
        request.cookbookId,
        request.ingredients,
        request.steps,
        request.createdAt,
        request.image,
        request.portions,
        request.preparationTime,
        request.specialNote,
    )
    return await contextContainer.cookbookContext.addRecipeToCookbook(request.cookbookId, recipe)
}

// ------------------------------------------------------------------
//[DELETE] /api/cookbook/:cookbookId/recipes/:recipeId => command!!!
type RemoveRecipeFromCookbookRequest = {
    cookbookId: string
    recipeId: string
}
async function removeRecipeFromCookbook(request: RemoveRecipeFromCookbookRequest) {
    return await contextContainer.cookbookContext.removeRecipeFromCookbook(request.cookbookId, request.recipeId)
}

// ------------------------------------------------------------------
// [DELETE] /api/cookbook/:cookbookId => command!!!
type DeleteCookbookRequest = {
    cookbookId: string
}
async function deleteCookbook(request: DeleteCookbookRequest) {
    return await contextContainer.cookbookContext.deleteCookbook(request.cookbookId)
}

// ------------------------------------------------------------------
// [PUT] /api/cookbook/:cookbookId/recipes/:recipeId => command!!!
type UpdateRecipeInCookbookRequest = {
    cookbookId: string
    recipeId: string
    recipe: {
        id: string
        title: string
        createdBy: string
        cookbookId: string
        image?: string
        portions?: number
        preparationTime?: string
        specialNote?: string
        ingredients: Ingredient[]
        steps: string[]
        createdAt: Date
    }
}
async function updateRecipeInCookbook(request: UpdateRecipeInCookbookRequest) {
    const recipe = new Recipe(
        request.recipe.id,
        request.recipe.title,
        request.recipe.createdBy,
        request.recipe.cookbookId,
        request.recipe.ingredients,
        request.recipe.steps,
        request.recipe.createdAt,
        request.recipe.image,
        request.recipe.portions,
        request.recipe.preparationTime,
        request.recipe.specialNote,
    )
    return await contextContainer.cookbookContext.updateRecipeInCookbook(request.cookbookId, request.recipeId, recipe)
}