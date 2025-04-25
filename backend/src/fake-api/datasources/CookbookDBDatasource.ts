import Cookbook from "../../domain/cookbook/Cookbook"

export type CookbookDTO = {
    id: string
    name: string
    createdBy: string
    createdAt: string
}

export interface ICookbookDBDatasource {
    getCookbook(id: Cookbook["id"]): Promise<CookbookDTO>
    getCookbooksCreatedBy(userId: string): Promise<CookbookDTO[]>

    save(cookbook: Cookbook): Promise<void>
    update(cookbook: Cookbook): Promise<void>
    delete(cookbookId: Cookbook["id"]): Promise<void>
}

export default class CookbookDBDatasource implements ICookbookDBDatasource {
    async delete(cookbookId: Cookbook["id"]): Promise<void> {
        try {
            console.log("Deleting cookbook... Deleting from db tables cookbooks and recipes")
        } catch (error) {
            throw new Error(`Error - ${(error as Error).message}`)
        }
    }

    async getCookbook(id: string): Promise<CookbookDTO> {
        try {
            return {
                id,
                name: 'Italian Favorites',
                createdBy: 'userId',
                createdAt: new Date().toISOString()
            }
        } catch (error) {
            throw new Error(`Error - ${(error as Error).message}`)
        }
    }

    async save(cookbook: Cookbook): Promise<void> {
        try {
            console.log("Updating cookbook... Updating db table cookbooks")
        } catch (error) {
            throw new Error(`Error - ${(error as Error).message}`)
        }
    }

    async update(cookbook: Cookbook): Promise<void> {
        try {
            console.log("Updating cookbook... Updating db table cookbooks")
        } catch (error) {
            throw new Error(`Error - ${(error as Error).message}`)
        }
    }

    async getCookbooksCreatedBy(userId: string): Promise<CookbookDTO[]> {
        try {
            return [
                {
                    id: '101',
                    name: 'Italian Favorites',
                    createdBy: userId,
                    createdAt: new Date().toISOString()
                },
                {
                    id: '102',
                    name: 'Mexican Favorites',
                    createdBy: userId,
                    createdAt: new Date().toISOString()
                },
                {
                    id: '103',
                    name: 'Chinese Favorites',
                    createdBy: userId,
                    createdAt: new Date().toISOString()
                }
            ]
        } catch (error) {
            throw new Error(`Error - ${(error as Error).message}`)
        }
    }
}