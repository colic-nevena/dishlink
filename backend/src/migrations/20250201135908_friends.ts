import { Knex } from "knex"

const TABLE = "friends"

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TABLE, (table) => {
        table.string("id").primary()
        table.string("user_1").notNullable()
        table.string("user_2").notNullable()
        table.timestamp("created_at").defaultTo(knex.fn.now())

        table.foreign("user_1").references("users.id")
        table.foreign("user_2").references("users.id")

        table.unique(["user_1", "user_2"])
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(TABLE)
}