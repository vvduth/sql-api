/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {

    pgm.sql(`
        CREATE TABLE posts (
        id serial PRIMARY KEY,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    url varchar(200) not NULL,
    caption varchar(40),
    lat real CHECK (lat is NULL OR ( lat >= -90 AND lat <= 90 )),
    lng real CHECK (lng is NULL OR ( lng >= -180 AND lng <= 180 ))
      )  `)
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.sql(` drop table posts;`)
};
