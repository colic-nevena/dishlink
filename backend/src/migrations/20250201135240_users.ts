import type { Knex } from "knex"

const TABLE = "users"

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TABLE, (table) => {
        table.string("id").primary()
        table.string("email").notNullable()
        table.string("full_name").notNullable()
        table.string("image")
        table.timestamp("created_at").defaultTo(knex.fn.now())
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(TABLE)
}