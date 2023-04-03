/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('posts',(table)=>{
        table.increments()
        table.string('title')
        table.string('message')
        table.string('url')
        table.integer('likes')
        table.integer('dislikes')
        table.string('user_name')
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
