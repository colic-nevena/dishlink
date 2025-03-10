import Cookbook from "../../domain/cookbook/Cookbook"

export interface ICookbookRepository {
    getUserCookbooks(userId: string): Promise<Cookbook[]>
    getUserCookbookDetail(userId: string, cookbookId: string): Promise<Cookbook>

    createCookbook(cookbook: Cookbook): Promise<Cookbook>
}

export default class CookbookRepository implements ICookbookRepository {
    async getUserCookbooks(userId: string): Promise<Cookbook[]> {
        return [
            new Cookbook('101', 'Italian Favorites', userId, new Date()),
            new Cookbook('102', 'Mexican Favorites', userId, new Date()),
            new Cookbook('103', 'Chinese Favorites', userId, new Date())
        ]
    }

    async getUserCookbookDetail(userId: string, cookbookId: string): Promise<Cookbook> {
        return new Cookbook(cookbookId, 'Italian Favorites', userId, new Date())
    }


    async createCookbook(cookbook: Cookbook): Promise<Cookbook> {
        console.log("Creating cookbook... Updating db table cookbooks")
        return cookbook
    }
}