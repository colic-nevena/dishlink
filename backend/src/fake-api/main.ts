import ContextContainer from "../domain/ContextContainer"
import CookbookRepository from "./repositories/ICookbookRepository"
import RecipeRepository from "./repositories/IRecipeRepository"
import UserRepository from "./repositories/IUserRepository"

// queries and commands layer
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

// [GET] /api/users/:userId/cookbook => query!!!
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
    return await contextContainer.cookbookContext.createCookbook(request.userId, request.cookbookName)
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

type GetRecipeByIdRequest = {
    recipeId: string
}
async function getRecipeById(request: GetRecipeByIdRequest) {
    return await recipeRepository.getRecipeById(request.recipeId)
}

// ------------------------------------------------------------------

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
    return await contextContainer.cookbookContext.addRecipeToCookbook(request.cookbookId, { recipe })
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
    recipe: any // kao gore u dodavanju
}
async function updateRecipeInCookbook(request: UpdateRecipeInCookbookRequest) {
    return await contextContainer.cookbookContext.updateRecipeInCookbook(request.cookbookId, request.recipeId, { recipe })
}