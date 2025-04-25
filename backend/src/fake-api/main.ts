import ContextContainer from "../domain/ContextContainer"
import Cookbook from "../domain/cookbook/Cookbook"
import Ingredient from "../domain/cookbook/Ingredient"
import Recipe from "../domain/cookbook/Recipe"
import CookbookDBDatasource from "./datasources/CookbookDBDatasource"
import RecipeDBDatasource from "./datasources/RecipeDBDatasource"
import UserDBDatasource from "./datasources/UserDBDatasource"
import CookbookRepository from "./repositories/CookbookRepository"
import RecipeRepository from "./repositories/RecipeRepository"
import UserRepository from "./repositories/UserRepository"

// IMPORTANT: This is queries and commands layer, these will all be called from controllers

// -------------------------------------------------------------------------------------------------------




const recipeRepository = new RecipeRepository(new RecipeDBDatasource())
const cookbookRepository = new CookbookRepository(new CookbookDBDatasource())
const userRepository = new UserRepository(new UserDBDatasource())

const contextContainer = new ContextContainer(userRepository, cookbookRepository, recipeRepository)

// USERS AND PROFILE

// [GET] /api/users/:userId/feed => query!!!
type UserFeedRequest = {
    userId: string
}
async function getUserFeed(request: UserFeedRequest) {
    const friends = await userRepository.getFriendsFor(request.userId)
    const friendsRecipes = await Promise.all(
        friends.map(friend => recipeRepository.getLatestRecipesCreatedBy(friend.id))
    )

    return friendsRecipes
}

// ------------------------------------------------------------------

// [GET] /api/users/:userId/cookbooks => query!!!
type UserCookbooksRequest = {
    userId: string
}
async function getCookbooksCreatedBy(request: UserCookbooksRequest) {
    return await cookbookRepository.getCookbooksCreatedBy(request.userId)
}

// ------------------------------------------------------------------

// [GET] /api/users/name/:name => query!!!
type UserByNameRequest = {
    name: string
}
async function getUserByName(request: UserByNameRequest) {
    return await userRepository.getUserByName(request.name)
}

// ------------------------------------------------------------------

// [GET] /api/profile => query!!!
async function getProfile() {
    const userId = "izTokena"
    return await userRepository.getUser(userId)
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
    return await userRepository.getFriendsFor(userId)
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
// [POST] /api/profile/friends/:friendId/friend => command!!!
type FriendRequest = {
    friendId: string
}
async function friend(request: FriendRequest) {
    const userId = "izTokena"
    return await contextContainer.userContext.friend(userId, request.friendId)
}

// ------------------------------------------------------------------




// COOKBOOKS



// ------------------------------------------------------------------
// [POST] /api/cookbooks => command!!!
type CreateCookbookRequest = {
    userId: string
    cookbookName: string
}
async function createCookbook(request: CreateCookbookRequest) {
    const cookbookId = "randomUUID"
    const cookbook = new Cookbook(cookbookId, request.cookbookName, "userIdIzTokena")
    return await contextContainer.cookbookContext.createCookbook(cookbook)
}

// ------------------------------------------------------------------

// [GET] /api/cookbooks/:cookbookId => query!!!
type CookbookDetailRequest = {
    cookbookId: string
}
async function getUserCookbook(request: CookbookDetailRequest) {
    return await cookbookRepository.getCookbookDetails(request.cookbookId)
}

//  ------------------------------------------------------------------
//[PUT] /api/cookbooks/:cookbookId => command!!!
type ChangeCookbookNameRequest = {
    cookbookId: string
    newName: string
}
async function changeCookbookName(request: ChangeCookbookNameRequest) {
    return await contextContainer.cookbookContext.changeCookbookName(request.cookbookId, request.newName)
}

// ------------------------------------------------------------------
// [DELETE] /api/cookbooks/:cookbookId => command!!!
type DeleteCookbookRequest = {
    cookbookId: string
}
async function deleteCookbook(request: DeleteCookbookRequest) {
    return await contextContainer.cookbookContext.deleteCookbook(request.cookbookId)
}

// ------------------------------------------------------------------
// [GET] /api/cookbooks/:cookbookId/recipes => query!!!
type GetCookbookRecipesRequest = {
    cookbookId: string
}
async function getCookbookRecipes(request: GetCookbookRecipesRequest) {
    return await recipeRepository.getAllCookbookRecipes(request.cookbookId)
}







// RECIPES



// ------------------------------------------------------------------
// [GET] /api/recipes/id/:recipeId => query!!!
type GetRecipeByIdRequest = {
    recipeId: string
}
async function getRecipeById(request: GetRecipeByIdRequest) {
    return await recipeRepository.getRecipe(request.recipeId)
}

// ------------------------------------------------------------------
// [GET] /api/recipes/name/:recipeName => query!!! za search recepata
type GetRecipeByNameRequest = {
    recipeName: string
}
async function getRecipesByName(request: GetRecipeByNameRequest) {
    return await recipeRepository.getRecipesByName(request.recipeName)
}

// ------------------------------------------------------------------
//[POST] /api/recipes => command!!!
type AddRecipeRequest = {
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
async function createRecipe(request: AddRecipeRequest) {
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
    return await contextContainer.cookbookContext.saveRecipe(recipe)
}

// ------------------------------------------------------------------
//[DELETE] /api/recipes/:recipeId => command!!!
type RemoveRecipeRequest = {
    recipeId: string
}
async function removeRecipeFromCookbook(request: RemoveRecipeRequest) {
    return await contextContainer.cookbookContext.removeRecipe(request.recipeId)
}

// ------------------------------------------------------------------
// [PUT] /api/recipes/:recipeId => command!!!
type UpdateRecipeRequest = {
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
async function updateRecipe(request: UpdateRecipeRequest) {
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
    return await contextContainer.cookbookContext.saveRecipe(recipe)
}