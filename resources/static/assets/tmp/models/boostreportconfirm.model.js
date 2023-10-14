module.exports = (sequelize, Sequelize) => {
    const boostreportconfirm = sequelize.define("boostreportconfirm", {
        start_pic: {
            type: Sequelize.TEXT
        },
        after_pic: {
            type: Sequelize.TEXT
        },
        uid: {
            type: Sequelize.INTEGER
        },
        before_tier: {
            type: Sequelize.STRING
        },
        before_gold: {
            type: Sequelize.INTEGER
        },
        before_diamond: {
            type: Sequelize.INTEGER
        },
        before_marble: {
            type: Sequelize.INTEGER
        },
        before_coupon: {
            type: Sequelize.INTEGER
        },
        after_tier: {
            type: Sequelize.STRING
        },
        after_gold: {
            type: Sequelize.INTEGER
        },
        after_diamond: {
            type: Sequelize.INTEGER
        },
        after_marble: {
            type: Sequelize.INTEGER
        },
        after_coupon: {
            type: Sequelize.INTEGER
        },
        facebook: {
            type: Sequelize.STRING
        },
        line: {
            type: Sequelize.STRING
        },
        side: {
            type: Sequelize.STRING
        },
        date: {
            type: Sequelize.DATE
        },
    })

    return boostreportconfirm;
}