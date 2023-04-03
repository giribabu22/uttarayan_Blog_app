/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('register',(table)=>{
        table.increments()
        table.string('email').notNullable()
        table.string('name').notNullable()
        table.string('password').notNullable()
        table.integer('age').notNullable()
        table.string('phone_no').notNullable()
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
