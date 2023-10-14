module.exports = (sequelize, Sequelize) => {
    const buyerreport = sequelize.define("buyerreport", {
        uid: {
            type: Sequelize.INTEGER
        },
        pic: {
            type: Sequelize.TEXT
        },
        detail: {
            type: Sequelize.TEXT
        },
        facebook: {
            type: Sequelize.STRING
        },
        line: {
            type: Sequelize.STRING
        },
    })
}