const pool = require('../database/index');
const multer = require('multer');
const storage = multer.memoryStorage(); // Store image in memory
const upload = multer({ storage });
const fs = require('fs'); // Import the fs module

const reportController = {
    testReport: async (req, res) => {
        res.send('testReport')
        console.log('testReport');
    },
    userReportConfirm: async (req, res) => {
        try {
            const orderID = `
            SELECT buyorder.orderID
            FROM buyorder
            JOIN users ON buyorder.buyer_email = users.user_email
            WHERE users.uid = ?
            `
            const uid = req.params.uid;

            const before_pic = req.file.buffer;
            const after_pic = req.file.buffer;

            const before_tier = req.params.before_tier;
            const before_gold = req.params.before_gold;
            const before_diamond = req.params.before_diamond;
            const before_marble = req.params.before_marble;
            const before_coupon = req.params.before_coupon;

            const after_tier = req.params.after_tier;
            const after_gold = req.params.after_gold;
            const after_diamond = req.params.after_diamond;
            const after_marble = req.params.after_marble;
            const after_coupon = req.params.after_coupon;

            const email = req.params.email;
            const con_num = req.params.con_num;
            const facebook = req.params.facebook;
            const line = req.params.line;

            const datetime = req.params.datetime;

            var query = `INSERT INTO userreport (before_pic, after_pic, before_tier, before_gold, before_diamond, before_marble, before_coupon, after_tier, after_gold, after_diamond, after_marble, after_coupon, email, con_num, facebook, line, datetime) VALUES`
            pool.query(query, [before_pic, after_pic, before_tier, before_gold, before_diamond, before_marble, before_coupon, after_tier, after_gold, after_diamond, after_marble, after_coupon, email, con_num, facebook, line, datetime], (err, result) => {
                if (err) throw err;
                console.log(result);
            })

            console.log('userReportConfirm')
        }
        catch (err) {
            console.log(err)
        }
    },
    boosterReportConfirm: async (req, res) => {
        try {
            const boostID = `
            SELECT boostorder.boostingID
            FROM boostorder
            `
            const uid = req.params.uid;

            const before_pic = req.file.buffer;
            const after_pic = req.file.buffer;

            const before_tier = req.params.before_tier;
            const before_gold = req.params.before_gold;
            const before_diamond = req.params.before_diamond;
            const before_marble = req.params.before_marble;
            const before_coupon = req.params.before_coupon;

            const after_tier = req.params.after_tier;
            const after_gold = req.params.after_gold;
            const after_diamond = req.params.after_diamond;
            const after_marble = req.params.after_marble;
            const after_coupon = req.params.after_coupon;

            const email = req.params.email;
            const con_num = req.params.con_num;
            const facebook = req.params.facebook;
            const line = req.params.line;

            const datetime = req.params.datetime;
            console.log('boosterReportConfirm')
        }
        catch (err) {
            console.log(err)
        }
    },
    shopBuyerReportConfirm: async (req, res) => {
        try {
            const orderID = `
            SELECT sellorder.orderID
            FROM sellorder
            JOIN users ON sellorder.seller_email = users.user_email
            WHERE users.uid = ?
            `
            pool.query(orderID, [uid], (err, result) => {
                if (err) throw err;
            })
            const pic = req.file.buffer;
            const detail = req.params.detail;
            const uid = req.params.uid;
            const facebook = req.params.facebook;
            const line = req.params.line;

            var query = `INSERT INTO buyerreport (orderID, pic, detail, uid, facebook, line) VALUES (?, ?, ?, ?, ?, ?)`
            pool.query(query, [orderID, pic, detail, uid, facebook, line], (err, result) => {
                if (err) throw err;
                console.log(result);
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
            pool.query(query, (err, result) => {
                if (err) throw err;
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

            var query_user = `
            SELECT users.user_email, users.con_num, users.facebook, users.line
            FROM buyerreport
            JOIN users ON buyerreport.uid = users.uid
            `

            var query_seller = `
            SELECT sellorder.seller_email, users.con_num, users.facebook, users.line
            FROM buyerreport
            JOIN users ON buyerreport.uid = users.uid
            JOIN sellorder ON buyerreport.orderID = sellorder.orderID
            WHERE users.user_email = sellorder.seller_email
            `

            pool.query(query, [uid], (err, result) => {
                if (err) throw err;
            })

            pool.query(query_user, (err, result) => {
                if (err) throw err;
            })

            pool.query(query_seller, (err, result) => {
                if (err) throw err;
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
            const button_status = req.params.button_status

            if (button_status != 'Approve') {
                var query = `
                DELETE FROM buyerreport WHERE uid = ?
                `
                pool.query(query, [uid], (err, result) => {
                    if (err) throw err;
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
            pool.query(query, (err, result) => {
                if (err) throw err;
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

            var query_user = `
            SELECT users.user_email, users.con_num, users.facebook, users.line
            FROM boosterreportconfirm
            JOIN users ON boosterreportconfirm.uid = users.uid
            `

            var query_booster = `
            SELECT boostorder.employee_email, users.con_num, users.facebook, users.line
            FROM boosterreportconfirm
            JOIN users ON boosterreportconfirm.uid = users.uid
            JOIN boostorder ON boosterreportconfirm.orderID = boostorder.orderID
            WHERE users.user_email = boostorder.employee_email
            `

            pool.query(query, [uid], (err, result) => {
                if (err) throw err;
            })

            pool.query(query_user, (err, result) => {
                if (err) throw err;
            })

            pool.query(query_booster, (err, result) => {
                if (err) throw err;
            })
            console.log('adminJudgeBoosting')
        }
        catch (err) {
            console.log(err)
        }
    },
    adminDeleteBoosting: async (req, res) => {
        try {
            const uid = req.params.uid
            const button_status = req.params.button_status

            if (button_status != 'Approve') {
                var query = `
                DELETE FROM boosterreportconfirm WHERE uid = ?,
                DELETE FROM userreportconfirm WHERE uid = ?
                `
                pool.query(query, [uid], (err, result) => {
                    if (err) throw err;
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