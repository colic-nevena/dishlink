import Ingredient from "../../domain/cookbook/Ingredient"
import Recipe from "../../domain/cookbook/Recipe"

export type IngredientDTO = {
    name: string
    amount: number
    unit: string
}

export type RecipeDTO = {
    id: string
    title: string
    createdBy: string
    cookbookId: string
    ingredients: IngredientDTO[]
    steps: string[]
    createdAt: string
    image?: string
    portions?: number
    preparationTime?: string
    specialNote?: string
}

export interface IRecipeDBDatasource {
    getRecipesCreatedBy(userId: string): Promise<RecipeDTO[]>
    getLatestRecipesCreatedBy(userId: string): Promise<RecipeDTO[]>
    getRecipesLikedBy(userId: string): Promise<RecipeDTO[]>
    getAllCookbookRecipes(cookbookId: string): Promise<RecipeDTO[]>
    getRecipeById(recipeId: string): Promise<RecipeDTO>
    getRecipesByName(recipeName: string): Promise<RecipeDTO[]>

    save(recipe: RecipeDTO): Promise<void>
    update(recipe: RecipeDTO): Promise<void>
    delete(recipeId: string): Promise<void>
}

export default class RecipeDBDatasource implements IRecipeDBDatasource {

    async update(recipe: RecipeDTO): Promise<void> {
        try {
            console.log('Updating recipe in DB table recipes...', recipe)
        } catch (error) {
            throw new Error('Error updating recipe')

        }
    }

    async delete(recipeId: string): Promise<void> {
        try {
            console.log('Deleting recipe from DB table recipes...', recipeId)
        } catch (error) {
            throw new Error('Error deleting recipe')

        }
    }

    async getRecipesByName(recipeName: string): Promise<RecipeDTO[]> {
        try {
            return [{
                id: '1',
                title: recipeName,
                createdBy: '1',
                cookbookId: '101',
                ingredients: [
                    { name: 'Spaghetti', amount: 200, unit: 'g' },
                    { name: 'Eggs', amount: 4, unit: '' },
                    { name: 'Pancetta', amount: 100, unit: 'g' },
                    { name: 'Parmesan cheese', amount: 50, unit: 'g' },
                    { name: 'Black pepper', amount: 1, unit: 'to taste' }
                ],
                steps: [
                    'Boil the spaghetti.',
                    'Fry the pancetta.',
                    'Mix eggs and cheese.',
                    'Combine all ingredients.'
                ],
                createdAt: new Date().toISOString(),
                image: 'carbonara.jpg',
                portions: 4,
                preparationTime: '30 minutes',
                specialNote: 'A classic Italian pasta dish.'
            }]
        } catch (error) {
            throw new Error('Error getting recipe by name')
        }
    }

    async getRecipeById(recipeId: string): Promise<RecipeDTO> {
        try {
            return {
                id: recipeId,
                title: 'Spaghetti Carbonara',
                createdBy: '1',
                cookbookId: '101',
                ingredients: [
                    { name: 'Spaghetti', amount: 200, unit: 'g' },
                    { name: 'Eggs', amount: 4, unit: '' },
                    { name: 'Pancetta', amount: 100, unit: 'g' },
                    { name: 'Parmesan cheese', amount: 50, unit: 'g' },
                    { name: 'Black pepper', amount: 1, unit: 'to taste' }
                ],
                steps: [
                    'Boil the spaghetti.',
                    'Fry the pancetta.',
                    'Mix eggs and cheese.',
                    'Combine all ingredients.'
                ],
                createdAt: new Date().toISOString(),
                image: 'carbonara.jpg',
                portions: 4,
                preparationTime: '30 minutes',
                specialNote: 'A classic Italian pasta dish.'
            }
        } catch (error) {
            throw new Error('Error getting recipe by id')
        }
    }

    async getAllCookbookRecipes(cookbookId: string): Promise<RecipeDTO[]> {
        try {
            return [
                {
                    id: '1',
                    title: 'Spaghetti Carbonara',
                    createdBy: '1',
                    cookbookId,
                    ingredients: [
                        { name: 'Spaghetti', amount: 200, unit: 'g' },
                        { name: 'Eggs', amount: 4, unit: '' },
                        { name: 'Pancetta', amount: 100, unit: 'g' },
                        { name: 'Parmesan cheese', amount: 50, unit: 'g' },
                        { name: 'Black pepper', amount: 1, unit: 'to taste' }
                    ],
                    steps: [
                        'Boil the spaghetti.',
                        'Fry the pancetta.',
                        'Mix eggs and cheese.',
                        'Combine all ingredients.'
                    ],
                    createdAt: new Date().toISOString(),
                    image: 'carbonara.jpg',
                    portions: 4,
                    preparationTime: '30 minutes',
                    specialNote: 'A classic Italian pasta dish.'
                },
                {
                    id: '2',
                    title: 'Chicken Curry',
                    createdBy: '1',
                    cookbookId,
                    ingredients: [
                        { name: 'Chicken', amount: 500, unit: 'g' },
                        { name: 'Curry powder', amount: 2, unit: 'tbsp' },
                        { name: 'Coconut milk', amount: 400, unit: 'ml' },
                        { name: 'Onions', amount: 2, unit: '' },
                        { name: 'Garlic', amount: 3, unit: 'cloves' }
                    ],
                    steps: [
                        'Cook the onions and garlic.',
                        'Add the chicken and curry powder.',
                        'Pour in the coconut milk.',
                        'Simmer until the chicken is cooked.'
                    ],
                    createdAt: new Date().toISOString(),
                    image: 'chicken_curry.jpg',
                    portions: 6,
                    preparationTime: '45 minutes',
                    specialNote: 'A spicy and flavorful dish.'
                }
            ]
        } catch (error) {
            throw new Error('Error getting all cookbook recipes')
        }
    }

    async getRecipesLikedBy(userId: string): Promise<RecipeDTO[]> {
        try {
            return [
                {
                    id: '1',
                    title: 'Spaghetti Carbonara',
                    createdBy: userId,
                    cookbookId: '101',
                    ingredients: [
                        { name: 'Spaghetti', amount: 200, unit: 'g' },
                        { name: 'Eggs', amount: 4, unit: '' },
                        { name: 'Pancetta', amount: 100, unit: 'g' },
                        { name: 'Parmesan cheese', amount: 50, unit: 'g' },
                        { name: 'Black pepper', amount: 1, unit: 'to taste' }
                    ],
                    steps: [
                        'Boil the spaghetti.',
                        'Fry the pancetta.',
                        'Mix eggs and cheese.',
                        'Combine all ingredients.'
                    ],
                    createdAt: new Date().toISOString(),
                    image: 'carbonara.jpg',
                    portions: 4,
                    preparationTime: '30 minutes',
                    specialNote: 'A classic Italian pasta dish.'
                },
                {
                    id: '2',
                    title: 'Chicken Curry',
                    createdBy: userId,
                    cookbookId: '102',
                    ingredients: [
                        { name: 'Chicken', amount: 500, unit: 'g' },
                        { name: 'Curry powder', amount: 2, unit: 'tbsp' },
                        { name: 'Coconut milk', amount: 400, unit: 'ml' },
                        { name: 'Onions', amount: 2, unit: '' },
                        { name: 'Garlic', amount: 3, unit: 'cloves' }
                    ],
                    steps: [
                        'Cook the onions and garlic.',
                        'Add the chicken and curry powder.',
                        'Pour in the coconut milk.',
                        'Simmer until the chicken is cooked.'
                    ],
                    createdAt: new Date().toISOString(),
                    image: 'chicken_curry.jpg',
                    portions: 6,
                    preparationTime: '45 minutes',
                    specialNote: 'A spicy and flavorful dish.'
                }
            ]
        } catch (error) {
            throw new Error('Error getting recipes liked by user')
        }
    }

    async getRecipesCreatedBy(userId: string): Promise<RecipeDTO[]> {
        try {
            return this.getRecipesLikedBy(userId) // can reuse same mock data
        } catch (error) {
            throw new Error('Error getting user latest recipes')
        }
    }

    async save(recipe: RecipeDTO): Promise<void> {
        try {
            console.log('Saving recipe to DB table recipes...', recipe)
        } catch (error) {
            throw new Error('Error saving recipe')
        }
    }

    async getLatestRecipesCreatedBy(userId: string): Promise<RecipeDTO[]> {
        try {
            // HERE query the DB and filter in sql query to get only recipes created in the last 3 days
            return [
                {
                    id: '3',
                    title: 'Vegetable Stir Fry',
                    createdBy: userId,
                    cookbookId: '103',
                    ingredients: [
                        { name: 'Broccoli', amount: 200, unit: 'g' },
                        { name: 'Carrots', amount: 150, unit: 'g' },
                        { name: 'Bell peppers', amount: 100, unit: 'g' },
                        { name: 'Soy sauce', amount: 2, unit: 'tbsp' },
                        { name: 'Garlic', amount: 2, unit: 'cloves' }
                    ],
                    steps: [
                        'Chop the vegetables.',
                        'Stir fry the garlic.',
                        'Add the vegetables and soy sauce.',
                        'Cook until tender.'
                    ],
                    createdAt: new Date().toISOString(),
                    image: 'vegetable_stir_fry.jpg',
                    portions: 2,
                    preparationTime: '20 minutes',
                    specialNote: 'A quick and healthy meal.'
                },
                {
                    id: '4',
                    title: 'Beef Stroganoff',
                    createdBy: userId,
                    cookbookId: '104',
                    ingredients: [
                        { name: 'Beef', amount: 500, unit: 'g' },
                        { name: 'Mushrooms', amount: 200, unit: 'g' },
                        { name: 'Onions', amount: 1, unit: '' },
                        { name: 'Sour cream', amount: 200, unit: 'ml' },
                        { name: 'Paprika', amount: 1, unit: 'tsp' }
                    ],
                    steps: [
                        'Cook the onions and mushrooms.',
                        'Add the beef and paprika.',
                        'Stir in the sour cream.',
                        'Simmer until the beef is tender.'
                    ],
                    createdAt: new Date().toISOString(),
                    image: 'beef_stroganoff.jpg',
                    portions: 4,
                    preparationTime: '40 minutes',
                    specialNote: 'A creamy and savory dish.'
                }
            ]
        } catch (error) {
            throw new Error('Error getting user latest recipes')
        }
    }
}