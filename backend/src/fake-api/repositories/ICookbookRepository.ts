export type Cookbook = {
    id: string
    name: string
    createdBy: string
    createdAt: Date
}

export interface ICookbookRepository {
    getUserCookbooks(userId: string): Promise<Cookbook[]>
    getUserCookbookDetail(userId: string, cookbookId: string): Promise<Cookbook>
}

export default class CookbookRepository implements ICookbookRepository {
    async getUserCookbooks(userId: string): Promise<Cookbook[]> {
        return [
            {
                id: '101',
                name: 'Italian Favorites',
                createdBy: userId,
                createdAt: new Date()
            },
            {
                id: '102',
                name: 'Asian Delights',
                createdBy: userId,
                createdAt: new Date()
            }
        ]
    }

    async getUserCookbookDetail(userId: string, cookbookId: string): Promise<Cookbook> {
        return {
            id: cookbookId,
            name: 'Italian Favorites',
            createdBy: userId,
            createdAt: new Date()
        }
    }
}