export type Recipe = {
    id: string;
    title: string;
    createdBy: string;
    cookbookId?: string;
    image?: string;
    portions?: number;
    preparationTime?: string;
    specialNote?: string;
    ingredients: any;
    steps: any;
    createdAt: Date;
}

export interface IRecipeRepository {
    getUserLatestRecipes(userId: string): Promise<Recipe[]>;
    getAllCookbookRecipes(cookbookId: string): Promise<Recipe[]>;
    getRecipesLikedBy(userId: string): Promise<Recipe[]>;
    getRecipeById(recipeId: string): Promise<Recipe>;
    getRecipeByName(recipeName: string): Promise<Recipe>;
}

export default class RecipeRepository implements IRecipeRepository {
    async getRecipesLikedBy(userId: string): Promise<Recipe[]> {
        return [
            {
                id: '1',
                title: 'Spaghetti Carbonara',
                createdBy: userId,
                ingredients: [],
                steps: [],
                createdAt: new Date()
            },
            {
                id: '2',
                title: 'Chicken Curry',
                createdBy: userId,
                ingredients: [],
                steps: [],
                createdAt: new Date()
            }
        ]
    }

    async getUserLatestRecipes(userId: string): Promise<Recipe[]> {
        return [
            {
                id: '1',
                title: 'Spaghetti Carbonara',
                createdBy: userId,
                cookbookId: '101',
                image: 'carbonara.jpg',
                portions: 4,
                preparationTime: '30 minutes',
                specialNote: 'A classic Italian pasta dish.',
                ingredients: [
                    { ingredient: 'Spaghetti', quantity: '200g' },
                    { ingredient: 'Eggs', quantity: '4' },
                    { ingredient: 'Pancetta', quantity: '100g' },
                    { ingredient: 'Parmesan cheese', quantity: '50g' },
                    { ingredient: 'Black pepper', quantity: 'to taste' }
                ],
                steps: [
                    'Boil the spaghetti.',
                    'Fry the pancetta.',
                    'Mix eggs and cheese.',
                    'Combine all ingredients.'
                ],
                createdAt: new Date()
            },
            {
                id: '2',
                title: 'Chicken Curry',
                createdBy: userId,
                cookbookId: '102',
                image: 'chicken_curry.jpg',
                portions: 6,
                preparationTime: '45 minutes',
                specialNote: 'A spicy and flavorful dish.',
                ingredients: [
                    { ingredient: 'Chicken', quantity: '500g' },
                    { ingredient: 'Curry powder', quantity: '2 tbsp' },
                    { ingredient: 'Coconut milk', quantity: '400ml' },
                    { ingredient: 'Onions', quantity: '2' },
                    { ingredient: 'Garlic', quantity: '3 cloves' }
                ],
                steps: [
                    'Cook the onions and garlic.',
                    'Add the chicken and curry powder.',
                    'Pour in the coconut milk.',
                    'Simmer until the chicken is cooked.'
                ],
                createdAt: new Date()
            }
        ]
    }

    async getAllCookbookRecipes(cookbookId: string): Promise<Recipe[]> {
        return [
            {
                id: '1',
                title: 'Spaghetti Carbonara',
                createdBy: '1',
                cookbookId: cookbookId,
                image: 'carbonara.jpg',
                portions: 4,
                preparationTime: '30 minutes',
                specialNote: 'A classic Italian pasta dish.',
                ingredients: [
                    { ingredient: 'Spaghetti', quantity: '200g' },
                    { ingredient: 'Eggs', quantity: '4' },
                    { ingredient: 'Pancetta', quantity: '100g' },
                    { ingredient: 'Parmesan cheese', quantity: '50g' },
                    { ingredient: 'Black pepper', quantity: 'to taste' }
                ],
                steps: [
                    'Boil the spaghetti.',
                    'Fry the pancetta.',
                    'Mix eggs and cheese.',
                    'Combine all ingredients.'
                ],
                createdAt: new Date()
            },
            {
                id: '2',
                title: 'Chicken Curry',
                createdBy: '1',
                cookbookId: cookbookId,
                image: 'chicken_curry.jpg',
                portions: 6,
                preparationTime: '45 minutes',
                specialNote: 'A spicy and flavorful dish.',
                ingredients: [
                    { ingredient: 'Chicken', quantity: '500g' },
                    { ingredient: 'Curry powder', quantity: '2 tbsp' },
                    { ingredient: 'Coconut milk', quantity: '400ml' },
                    { ingredient: 'Onions', quantity: '2' },
                    { ingredient: 'Garlic', quantity: '3 cloves' }
                ],
                steps: [
                    'Cook the onions and garlic.',
                    'Add the chicken and curry powder.',
                    'Pour in the coconut milk.',
                    'Simmer until the chicken is cooked.'
                ],
                createdAt: new Date()
            }
        ]
    }

    async getRecipeById(recipeId: string): Promise<Recipe> {
        return {
            id: recipeId,
            title: 'Spaghetti Carbonara',
            createdBy: '1',
            cookbookId: '101',
            image: 'carbonara.jpg',
            portions: 4,
            preparationTime: '30 minutes',
            specialNote: 'A classic Italian pasta dish.',
            ingredients: [
                { ingredient: 'Spaghetti', quantity: '200g' },
                { ingredient: 'Eggs', quantity: '4' },
                { ingredient: 'Pancetta', quantity: '100g' },
                { ingredient: 'Parmesan cheese', quantity: '50g' },
                { ingredient: 'Black pepper', quantity: 'to taste' }
            ],
            steps: [
                'Boil the spaghetti.',
                'Fry the pancetta.',
                'Mix eggs and cheese.',
                'Combine all ingredients.'
            ],
            createdAt: new Date()
        };
    }

    async getRecipeByName(recipeName: string): Promise<Recipe> {
        return {
            id: '1',
            title: recipeName,
            createdBy: '1',
            cookbookId: '101',
            image: 'carbonara.jpg',
            portions: 4,
            preparationTime: '30 minutes',
            specialNote: 'A classic Italian pasta dish.',
            ingredients: [
                { ingredient: 'Spaghetti', quantity: '200g' },
                { ingredient: 'Eggs', quantity: '4' },
                { ingredient: 'Pancetta', quantity: '100g' },
                { ingredient: 'Parmesan cheese', quantity: '50g' },
                { ingredient: 'Black pepper', quantity: 'to taste' }
            ],
            steps: [
                'Boil the spaghetti.',
                'Fry the pancetta.',
                'Mix eggs and cheese.',
                'Combine all ingredients.'
            ],
            createdAt: new Date()
        };
    }
}