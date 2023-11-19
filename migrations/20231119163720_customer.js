/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('customer', (table) => {
        table.increments('id').primary().unsigned();
        table.string('name');
        table.string('waId');
        table.enum('status', ['onHandle', 'standby']);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.schema.dropTable('customer');
};
