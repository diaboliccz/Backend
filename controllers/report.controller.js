const pool = require('../database/index');
const multer = require('multer');
const storage = multer.memoryStorage(); // Store image in memory
const upload = multer({ storage });
const fs = require('fs'); // Import the fs module

const reportController = {
    testReport: async (req, res) => {
        try {
            const query = `SELECT * FROM boosterreportconfirm UNION SELECT * FROM userreportconfirm`
            pool.query(query)
            .then((result) => {
                console.log(result);
            })
            .catch((err) => {
                console.log(err)
            });
        }
        catch (err) {
            console.log(err)
        }
    },
    userReportConfirm: async (req, res) => {
        try {
            const uid = req.body.uid;
            var boostingID = -1;
            const query_boostingID = `
            SELECT boostorder.boostingID
            FROM boostorder
            JOIN users ON boostorder.employee_email = users.user_email WHERE users.uid = ?`

            pool.query(query_boostingID, [uid])
            .then((result) => {
                boostID = result[0][0].boostingID;
                console.log(boostID);
            })
            .catch((err) => {
                console.log(err)
            })

            const start_pic = req.file.buffer;
            const after_pic = req.file.buffer;

            const before_tier = req.body.before_tier;
            const before_gold = req.body.before_gold;
            const before_diamond = req.body.before_diamond;
            const before_marble = req.body.before_marble;
            const before_coupon = req.body.before_coupon;

            const after_tier = req.body.after_tier;
            const after_gold = req.body.after_gold;
            const after_diamond = req.body.after_diamond;
            const after_marble = req.body.after_marble;
            const after_coupon = req.body.after_coupon;

            const email = req.body.email;
            const con_num = req.body.con_num;
            const facebook = req.body.facebook;
            const line = req.body.line;

            const datetime = req.body.datetime;

            var query = `INSERT INTO userreportconfirm (boostingID, start_pic, after_pic, before_tier, before_gold, before_diamond, before_marble, before_coupon, after_tier, after_gold, after_diamond, after_marble, after_coupon, email, con_num, facebook, line, datetime) VALUES`
            pool.query(query, [boostID, before_pic, after_pic, before_tier, before_gold, before_diamond, before_marble, before_coupon, after_tier, after_gold, after_diamond, after_marble, after_coupon, email, con_num, facebook, line, datetime])
            .then((result) => {
                console.log(result);
            })
            .catch((err) => {
                console.log(err)
            })

            console.log('userReportConfirm')
        }
        catch (err) {
            console.log(err)
        }
    },
    boosterReportConfirm: async (req, res) => {
        try {
            const uid = req.body.uid;
            var boostingID = -1;
            const query_orderID = `
            SELECT boostorder.boostingID
            FROM boostorder
            JOIN users ON boostorder.seller_email = users.user_email WHERE users.uid = ?`

            const start_pic = req.file.buffer;
            const after_pic = req.file.buffer;

            const before_tier = req.body.before_tier;
            const before_gold = req.body.before_gold;
            const before_diamond = req.body.before_diamond;
            const before_marble = req.body.before_marble;
            const before_coupon = req.body.before_coupon;

            const after_tier = req.body.after_tier;
            const after_gold = req.body.after_gold;
            const after_diamond = req.body.after_diamond;
            const after_marble = req.body.after_marble;
            const after_coupon = req.body.after_coupon;

            const email = req.body.email;
            const con_num = req.body.con_num;
            const facebook = req.body.facebook;
            const line = req.body.line;

            const datetime = req.body.datetime;

            const query = `INSERT INTO boosterreportconfirm (boostingID, start_pic, after_pic, before_tier, before_gold, before_diamond, before_marble, before_coupon, after_tier, after_gold, after_diamond, after_marble, after_coupon, email, con_num, facebook, line, datetime) VALUES`

            pool.query(query, [boostID, before_pic, after_pic, before_tier, before_gold, before_diamond, before_marble, before_coupon, after_tier, after_gold, after_diamond, after_marble, after_coupon, email, con_num, facebook, line, datetime])
            .then((result) => {
                console.log(result);
            })
            .catch((err) => {
                console.log(err)
            })

            console.log('boosterReportConfirm')
        }
        catch (err) {
            console.log(err)
        }
    },
    shopBuyerReportConfirm: async (req, res) => {
        try {
            const uid = req.body.uid;
            var orderID = -1;
            const query_orderID = `
            SELECT sellorder.orderID
            FROM sellorder
            JOIN users ON sellorder.seller_email = users.user_email WHERE users.uid = ?`

            pool.query(query_orderID, [uid])
            .then((result) => {
                orderID = result[0][0].orderID;
                console.log(orderID);
            })

            const pic = req.file.buffer;
            const detail = req.body.detail;
            const facebook = req.body.facebook;
            const line = req.body.line;

            const query = `INSERT INTO buyerreport (orderID, pic, detail, uid, facebook, line) VALUES (?, ?, ?, ?, ?, ?)`
            pool.query(query, [orderID, pic, detail, uid, facebook, line])
            .then((result) => {
                console.log(result);
            })
            .catch((err) => {
                console.log(err)
            })

            console.log('shopBuyerConfirm')
        }
        catch (err) {
            console.log(err)
        }
    },
    adminIDConfirm: async (req, res) => {
        try {
            var query = `SELECT * FROM buyerreport`
            pool.query(query)
            .then((result) => {
                console.log(result);
            })
            .catch((err) => {
                console.log(err)
            })
            console.log('adminIDConfirmation')
        }
        catch (err) {
            console.log(err)
        }
    },
    adminJudgeID: async (req, res) => {
        try {
            const uid = req.params.uid

            var query = `SELECT * FROM buyerreport WHERE uid = ?`
            pool.query(query, [uid])
            .then((result) => {
                console.log(result);
            })
            .catch((err) => {
                console.log(err)
            })

            var user_email = ""
            var user_facebook = ""
            var user_line = ""
            var query_user = `
            SELECT users.user_email, users.con_num, users.facebook, users.line
            FROM buyerreport
            JOIN users ON buyerreport.uid = users.uid
            `
            pool.query(query_user)
            .then((result) => {
                console.log(result);
                user_email = result[0][0].user_email;
                user_facebook = result[0][0].facebook;
                user_line = result[0][0].line;
            })
            .catch((err) => {
                console.log(err)
            })

            var seller_email = ""
            var seller_facebook = ""
            var seller_line = ""
            var query_seller = `
            SELECT sellorder.seller_email, users.con_num, users.facebook, users.line
            FROM buyerreport
            JOIN users ON buyerreport.uid = users.uid
            JOIN sellorder ON buyerreport.orderID = sellorder.orderID
            WHERE users.user_email = sellorder.seller_email
            `
            pool.query(query_seller)
            .then((result) => {
                console.log(result);
                booster_email = result[0][0].seller_email;
                booster_facebook = result[0][0].facebook;
                booster_line = result[0][0].line;
            })
            .catch((err) => {
                console.log(err)
            })

            console.log('adminJudgeID')
        }
        catch (err) {
            console.log(err)
        }
    },
    adminDeleteID: async (req, res) => {
        try {
            const uid = req.params.uid
            const button_status = req.body.button_status

            if (button_status != 'Approve') {
                var query = `
                DELETE FROM buyerreport WHERE uid = ?
                `
                pool.query(query, [uid])
                .then((result) => {
                    console.log(result);
                })
                .catch((err) => {
                    console.log(err)
                })
            }
            console.log('adminDeleteID')
        }
        catch (err) {
            console.log(err)
        }
    },
    adminBoostingConfirm: async (req, res) => {
        try {
            var query = `SELECT * FROM boosterreportconfirm UNION SELECT * FROM userreportconfirm`
            pool.query(query)
            .then((result) => {
                console.log(result);
            })
            .catch((err) => {
                console.log(err)
            })
            console.log('adminBoostingConfirm')
        }
        catch (err) {
            console.log(err)
        }
    },
    adminJudgeBoosting: async (req, res) => {
        try {
            const uid = req.params.uid

            var query = `SELECT * FROM boosterreportconfirm WHERE uid = ?`
            pool.query(query, [uid])
            .then((result) => {
                console.log(result);
            })
            .catch((err) => {
                console.log(err)
            })

            var query_user = `
            SELECT users.user_email, users.con_num, users.facebook, users.line
            FROM boosterreportconfirm
            JOIN users ON boosterreportconfirm.uid = users.uid
            `
            pool.query(query_user)
            .then((result) => {
                console.log(result);
            })
            .catch((err) => {
                console.log(err)
            })

            var query_booster = `
            SELECT boostorder.employee_email, users.con_num, users.facebook, users.line
            FROM boosterreportconfirm
            JOIN users ON boosterreportconfirm.uid = users.uid
            JOIN boostorder ON boosterreportconfirm.orderID = boostorder.orderID
            WHERE users.user_email = boostorder.employee_email
            `
            pool.query(query_booster)
            .then((result) => {
                console.log(result);
            })
            .catch((err) => {
                console.log(err)
            })

            console.log('adminJudgeBoosting')
        }
        catch (err) {
            console.log(err)
        }
    },
    adminDeleteBoosting: async (req, res) => {
        try {
            const uid = req.body.uid
            const button_status = req.body.button_status

            if (button_status != 'Approve') {
                var query = `
                DELETE FROM boosterreportconfirm WHERE uid = ?,
                DELETE FROM userreportconfirm WHERE uid = ?
                `
                pool.query(query, [uid])
                .then((result) => {
                    console.log(result);
                })
                .catch((err) => {
                    console.log(err)
                })
            }
            console.log('adminDeleteBoosting')
        }
        catch (err) {
            console.log(err)
        }
    },
}
module.exports = reportController;