const dbConfig = {
    database: process.env.SERVE_DB_DATABASE || "",
    username: process.env.SERVE_DB_USERNAME || "",
    password: process.env.SERVE_DB_PASSWORD || "",
    host: process.env.SERVE_DB_HOST || "",
    port: process.env.SERVE_DB_PORT || "",
}

export default dbConfig;