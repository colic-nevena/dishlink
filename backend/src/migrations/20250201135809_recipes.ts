import { Knex } from "knex"

const TABLE = "recipes"

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TABLE, (table) => {
        table.string("id").primary()
        table.string("title").notNullable()
        table.string("cookbook_id").references("cookbooks.id").notNullable()
        table.string("image")
        table.integer("portions")
        table.string("preparation_time")
        table.text("special_note")
        table.jsonb("ingredients")
        table.jsonb("steps")
        table.timestamp("created_at").defaultTo(knex.fn.now())

        table.foreign("cookbook_id").references("cookbooks.id")
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(TABLE)
}