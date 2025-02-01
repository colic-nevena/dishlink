import Knex from "knex";
import config from "../../knexfile";

const knex = Knex(config.development);

export default knex;
