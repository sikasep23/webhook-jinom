/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('message', (table) => {
        table.increments('id').primary().unsigned();
        table.string('type').notNullable();
        table.string('sender');
        table.string('messageId').notNullable();
        table.string('pushName');
        table.enum('isMedia', ['true', 'false']);
        table.string('quotedMsg', 255);
        table.string('body', 255);
        table.string('apiKey',100);
        table.integer('ack');
        table.text('media');
        table.string('mimeType');
        table.timestamp('created_at').defaultTo(knex.raw('now()'));
    });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.schema.dropTable('message');
};
