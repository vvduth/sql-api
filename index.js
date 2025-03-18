
const app = require('./src/app.js')

const pool = require('./src/pool')

pool.connect({
    user: "postgres",
    password: "admin",
    database: "social",
    host: "localhost",
    port: 5432,
}).then(() => {
    app().listen(3000, () => {
        console.log('Listening on port 3000...')
    })
}).catch((err) => console.log(err))

