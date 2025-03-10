import Ingredient from "../../domain/cookbook/Ingredient"
import Recipe from "../../domain/cookbook/Recipe"

export interface IRecipeRepository {
    getUserLatestRecipes(userId: string): Promise<Recipe[]>
    getAllCookbookRecipes(cookbookId: string): Promise<Recipe[]>
    getRecipesLikedBy(userId: string): Promise<Recipe[]>
    getRecipeById(recipeId: string): Promise<Recipe>
    getRecipeByName(recipeName: string): Promise<Recipe>
}

export default class RecipeRepository implements IRecipeRepository {
    async getRecipesLikedBy(userId: string): Promise<Recipe[]> {
        return [
            new Recipe(
                '1',
                'Spaghetti Carbonara',
                userId,
                '101',
                [
                    new Ingredient('Spaghetti', '200g'),
                    new Ingredient('Eggs', '4'),
                    new Ingredient('Pancetta', '100g'),
                    new Ingredient('Parmesan cheese', '50g'),
                    new Ingredient('Black pepper', 'to taste')
                ],
                [
                    'Boil the spaghetti.',
                    'Fry the pancetta.',
                    'Mix eggs and cheese.',
                    'Combine all ingredients.'
                ]
            ),
            new Recipe(
                '2',
                'Chicken Curry',
                userId,
                '102',
                [
                    new Ingredient('Chicken', '500g'),
                    new Ingredient('Curry powder', '2 tbsp'),
                    new Ingredient('Coconut milk', '400ml'),
                    new Ingredient('Onions', '2'),
                    new Ingredient('Garlic', '3 cloves')
                ],
                [
                    'Cook the onions and garlic.',
                    'Add the chicken and curry powder.',
                    'Pour in the coconut milk.',
                    'Simmer until the chicken is cooked.'
                ]
            )
        ]
    }

    async getUserLatestRecipes(userId: string): Promise<Recipe[]> {
        return [
            new Recipe(
                '1',
                'Spaghetti Carbonara',
                userId,
                '101',
                [
                    new Ingredient('Spaghetti', '200g'),
                    new Ingredient('Eggs', '4'),
                    new Ingredient('Pancetta', '100g'),
                    new Ingredient('Parmesan cheese', '50g'),
                    new Ingredient('Black pepper', 'to taste')
                ],
                [
                    'Boil the spaghetti.',
                    'Fry the pancetta.',
                    'Mix eggs and cheese.',
                    'Combine all ingredients.'
                ],
                new Date(),
                'carbonara.jpg',
                4,
                '30 minutes',
                'A classic Italian pasta dish.'
            ),
            new Recipe(
                '2',
                'Chicken Curry',
                userId,
                '102',
                [
                    new Ingredient('Chicken', '500g'),
                    new Ingredient('Curry powder', '2 tbsp'),
                    new Ingredient('Coconut milk', '400ml'),
                    new Ingredient('Onions', '2'),
                    new Ingredient('Garlic', '3 cloves')
                ],
                [
                    'Cook the onions and garlic.',
                    'Add the chicken and curry powder.',
                    'Pour in the coconut milk.',
                    'Simmer until the chicken is cooked.'
                ],
                new Date(),
                'chicken_curry.jpg',
                6,
                '45 minutes',
                'A spicy and flavorful dish.'
            )
        ]
    }

    async getAllCookbookRecipes(cookbookId: string): Promise<Recipe[]> {
        return [
            new Recipe(
                '1',
                'Spaghetti Carbonara',
                '1',
                cookbookId,
                [
                    new Ingredient('Spaghetti', '200g'),
                    new Ingredient('Eggs', '4'),
                    new Ingredient('Pancetta', '100g'),
                    new Ingredient('Parmesan cheese', '50g'),
                    new Ingredient('Black pepper', 'to taste')
                ],
                [
                    'Boil the spaghetti.',
                    'Fry the pancetta.',
                    'Mix eggs and cheese.',
                    'Combine all ingredients.'
                ],
                new Date(),
                'carbonara.jpg',
                4,
                '30 minutes',
                'A classic Italian pasta dish.'
            ),
            new Recipe(
                '2',
                'Chicken Curry',
                '1',
                cookbookId,
                [
                    new Ingredient('Chicken', '500g'),
                    new Ingredient('Curry powder', '2 tbsp'),
                    new Ingredient('Coconut milk', '400ml'),
                    new Ingredient('Onions', '2'),
                    new Ingredient('Garlic', '3 cloves')
                ],
                [
                    'Cook the onions and garlic.',
                    'Add the chicken and curry powder.',
                    'Pour in the coconut milk.',
                    'Simmer until the chicken is cooked.'
                ],
                new Date(),
                'chicken_curry.jpg',
                6,
                '45 minutes',
                'A spicy and flavorful dish.'
            )
        ]
    }

    async getRecipeById(recipeId: string): Promise<Recipe> {
        return new Recipe(
            recipeId,
            'Spaghetti Carbonara',
            '1',
            '101',
            [
                new Ingredient('Spaghetti', '200g'),
                new Ingredient('Eggs', '4'),
                new Ingredient('Pancetta', '100g'),
                new Ingredient('Parmesan cheese', '50g'),
                new Ingredient('Black pepper', 'to taste')
            ],
            [
                'Boil the spaghetti.',
                'Fry the pancetta.',
                'Mix eggs and cheese.',
                'Combine all ingredients.'
            ],
            new Date(),
            'carbonara.jpg',
            4,
            '30 minutes',
            'A classic Italian pasta dish.'
        )
    }

    async getRecipeByName(recipeName: string): Promise<Recipe> {
        return new Recipe(
            '1',
            recipeName,
            '1',
            '101',
            [
                new Ingredient('Spaghetti', '200g'),
                new Ingredient('Eggs', '4'),
                new Ingredient('Pancetta', '100g'),
                new Ingredient('Parmesan cheese', '50g'),
                new Ingredient('Black pepper', 'to taste')
            ],
            [
                'Boil the spaghetti.',
                'Fry the pancetta.',
                'Mix eggs and cheese.',
                'Combine all ingredients.'
            ],
            new Date(),
            'carbonara.jpg',
            4,
            '30 minutes',
            'A classic Italian pasta dish.'
        )
    }
}