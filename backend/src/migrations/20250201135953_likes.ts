import { Knex } from "knex"

const TABLE = "likes"

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TABLE, (table) => {
        table.string("id").primary()
        table.string("user_id").notNullable()
        table.string("recipe_id").notNullable()
        table.timestamp("created_at").defaultTo(knex.fn.now())

        table.foreign("user_id").references("users.id")
        table.foreign("recipe_id").references("recipes.id")

        table.unique(["user_id", "recipe_id"])
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(TABLE)
}