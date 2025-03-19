const pg = require('pg')

class Pool {
    _pool = null;

    connect(options) {
        this._pool = new pg.Pool(options)
        return this._pool.query('select 1+1;')
    }

    close() {
        this._pool.end();
    }

    query(sql) {
        return this._pool.query(sql)
    }
}

module.exports  = new Pool()