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
    pgm.sql(`ALTER TABLE posts
DROP COLUMN lat ,
DROP COLUMN lng;`)
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.sql(`ALTER TABLE posts
        add COLUMN lat real CHECK (lat is NULL OR ( lat >= -90 AND lat <= 90 )),
        add COLUMN lng real CHECK (lat is NULL OR ( lat >= -90 AND lat <= 90 ));`)
};
