import Cookbook from "../../domain/cookbook/Cookbook"
import User from "../../domain/user/User"
import { CookbookDTO, ICookbookDBDatasource } from "../datasources/CookbookDBDatasource"

class CookbookRepositoryError extends Error {
    constructor(message: string) {
        super(`[CookbookRepository] Error: ${message}`)
    }
}

export interface ICookbookRepository {
    get(id: Cookbook["id"]): Promise<Cookbook>
    getCookbooksCreatedBy(userId: User["id"]): Promise<Cookbook[]>
    getCookbookDetails(cookbookId: Cookbook["id"]): Promise<Cookbook>

    save(cookbook: Cookbook): Promise<void>
    delete(cookbookId: Cookbook["id"]): Promise<void>
}

export default class CookbookRepository implements ICookbookRepository {
    constructor(private readonly _cookbookDBDatasource: ICookbookDBDatasource) { }

    async delete(cookbookId: Cookbook["id"]): Promise<void> {
        try {
            const exists = await this._cookbookDBDatasource.getCookbook(cookbookId)
            if (!exists) throw new Error("Cookbook does not exist")

            return this._cookbookDBDatasource.delete(cookbookId)
        } catch (error) {
            throw new CookbookRepositoryError(`[delete] - ${(error as Error).message}`)
        }
    }

    async get(id: Cookbook["id"]): Promise<Cookbook> {
        try {
            const dto = await this._cookbookDBDatasource.getCookbook(id)
            return this.mapToCookbook(dto)
        } catch (error) {
            throw new CookbookRepositoryError(`[get] - ${(error as Error).message}`)
        }
    }

    async getCookbooksCreatedBy(userId: string): Promise<Cookbook[]> {
        try {
            const dtos = await this._cookbookDBDatasource.getCookbooksCreatedBy(userId)
            return dtos.map(this.mapToCookbook)
        } catch (error) {
            throw new CookbookRepositoryError(`[getCookbooksCreatedBy] - ${(error as Error).message}`)
        }
    }

    async getCookbookDetails(cookbookId: string): Promise<Cookbook> {
        try {
            const dto = await this._cookbookDBDatasource.getCookbook(cookbookId)
            return this.mapToCookbook(dto)
        } catch (error) {
            throw new CookbookRepositoryError(`[getCookbookDetails] - ${(error as Error).message}`)
        }
    }

    async save(cookbook: Cookbook): Promise<void> {
        try {
            const exists = await this._cookbookDBDatasource.getCookbook(cookbook.id)
            if (!exists) {
                this._cookbookDBDatasource.save(cookbook)
            } else {
                this._cookbookDBDatasource.update(cookbook)
            }
        } catch (error) {
            throw new CookbookRepositoryError(`[createCookbook] - ${(error as Error).message}`)
        }
    }

    private mapToCookbook(dto: CookbookDTO): Cookbook {
        return new Cookbook(dto.id, dto.name, dto.createdBy, new Date(dto.createdAt))
    }
}