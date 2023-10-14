const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sellorder = require("./sellorder.model.js")(sequelize, Sequelize);
db.boostorder = require("./boostorder.model.js")(sequelize, Sequelize);
db.boostreportconfirm = require("./boostreportconfirm.model.js")(sequelize, Sequelize);
db.buyerreport = require("./buyerreport.model.js")(sequelize, Sequelize);
db.boosterdetail = require("./boosterdetail.model.js")(sequelize, Sequelize);