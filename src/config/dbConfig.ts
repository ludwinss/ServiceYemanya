const DB_URI = process.env.SERVE_DB_URI;
let dbConfig = "";
if (DB_URI || DB_URI === "") {
  dbConfig = DB_URI;
} else {
  const tmpDBConfig = {
    database: process.env.SERVE_DB_DATABASE || "",
    username: process.env.SERVE_DB_USERNAME || "",
    password: process.env.SERVE_DB_PASSWORD || "",
    host: process.env.SERVE_DB_HOST || "",
    port: process.env.SERVE_DB_PORT || "",
    dialect: process.env.SERVE_DIALECT || "",
  };
  dbConfig = `${tmpDBConfig.dialect}://${tmpDBConfig.username}:${tmpDBConfig.password}@${tmpDBConfig.host}:${tmpDBConfig.port}/${tmpDBConfig.database}`;
}

export { dbConfig };
