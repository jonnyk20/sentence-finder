"use strict";
module.exports = {
    development: {
        username: "root",
        password: "postgres",
        database: "sentence_finder_development",
        host: "127.0.0.1",
        dialect: "postgres",
        operatorsAliases: 0
    },
    test: {
        username: "root",
        password: null,
        database: "sentence_finder_test",
        host: "127.0.0.1",
        dialect: "postgres",
        operatorsAliases: 0
    },
    production: {
        username: "root",
        password: null,
        database: "sentence_finder_production",
        host: "127.0.0.1",
        dialect: "postgres",
        operatorsAliases: 0,
        use_env_variable: "DATABASE_URL"
    }
};
