const pool = require('../database/index');
const multer = require('multer');
const storage = multer.memoryStorage(); // Store image in memory
const upload = multer({ storage });
const fs = require('fs'); // Import the fs module

const reportController = {
    boosterReportConfirm: async (req, res) => {
        try {
            const boostingID = req.body.boostingID;

            const start_pic = req.file.buffer;
            const after_pic = req.file.buffer;
            const uid = req.body.uid;

            const before_gold = req.body.before_gold;
            const before_diamond = req.body.before_diamond;
            const before_marble = req.body.before_marble;
            const before_coupon = req.body.before_coupon;

            const after_gold = req.body.after_gold;
            const after_diamond = req.body.after_diamond;
            const after_marble = req.body.after_marble;
            const after_coupon = req.body.after_coupon;

            const facebook = req.body.facebook;
            const line = req.body.line;

            const datetime = new Date();

            const query = 'INSERT INTO boosterreportconfirm (boostingID, start_pic, after_pic, uid, before_gold, before_diamond, before_marble, before_coupon, after_gold, after_diamond, after_marble, after_coupon, facebook, line, datetime) VALUES';
            const [rows, fields] = await pool.execute(query, [boostingID, start_pic, after_pic, uid, before_gold, before_diamond, before_marble, before_coupon, after_gold, after_diamond, after_marble, after_coupon, facebook, line, datetime]);
            res.json({ status: 'ok', message: 'Report booster confirm successfully' });
        }
        catch (err) {
            res.json({ status: 'error', message: err });
        }
    }
    userReportConfirm: async (req, res) => {
        try {
            const boostingID = req.body.boostingID;

            const start_pic = req.file.buffer;
            const after_pic = req.file.buffer;
            const User_ID = req.body.User_ID;

            const before_gold = req.body.before_gold;
            const before_diamond = req.body.before_diamond;
            const before_marble = req.body.before_marble;
            const before_coupon = req.body.before_coupon;

            const after_gold = req.body.after_gold;
            const after_diamond = req.body.after_diamond;
            const after_marble = req.body.after_marble;
            const after_coupon = req.body.after_coupon;

            const facebook = req.body.facebook;
            const line = req.body.line;

            const datetime = new Date();

            const query = 'INSERT INTO boosterreportconfirm (boostingID, start_pic, after_pic, User_ID, before_gold, before_diamond, before_marble, before_coupon, after_gold, after_diamond, after_marble, after_coupon, facebook, line, datetime) VALUES';
            const [rows, fields] = await pool.execute(query, [boostingID, start_pic, after_pic, User_ID, before_gold, before_diamond, before_marble, before_coupon, after_gold, after_diamond, after_marble, after_coupon, facebook, line, datetime]);
            res.json({ status: 'ok', message: 'Report booster confirm successfully' });
        }
        catch (err) {
            res.json({ status: 'error', message: err });
        }
    }
    shopBuyerReportConfirm: async (req, res) => {
        try {
            const pic = req.file.buffer;
            const detail = req.body.detail;
            const User_ID = req.body.User_ID;
            const facebook = req.body.facebook;
            const line = req.body.line;
            const order_id = req.body.order_id;

            const query = 'INSERT INTO shopbuyerreport (orderID, pic, detail, uid, facebook, line) VALUES';
            const [rows, fields] = await pool.execute(query, [orderID, pic, detail, uid, facebook, line]);
            res.json({ status: 'ok', message: 'Report shop buyer successfully' });
        }
        catch (err) {
            res.json({ status: 'error', message: err });
        }
    }
    showBoosterReport: async (req, res) => {
        try {
            let query1 = 'SELECT * FROM boosterreportconfirm'
            query1 += ' WHERE boostingID = ${req.params['boostingID']}'

            let query2 = 'SELECT email, con_num FROM users'
            query2 += ' INNER JOIN boosterreportconfirm ON (users.id = boosterreportconfirm.User_ID)'

            let query3 = 'SELECT email, con_num FROM users'
            query3 += ' INNER JOIN boosterreportconfirm ON (users.id = boosterreportconfirm.User_ID)'
            query3 += ' INNER JOIN boosterdetail ON (users.id = boosterdetail.id)'

            const [rows, fields] = await pool.execute(query1);
            const [rows2, fields2] = await pool.execute(query2, [email, con_num]);
            const [rows3, fields3] = await pool.execute(query3, [email, con_num]);

            const reportsWithImages = rows.map((report) => {
                const start_pic = report.start_pic;
                const after_pic = report.after_pic;
                const start_picData = fs.readFileSync(start_pic, 'base64');
                const after_picData = fs.readFileSync(after_pic, 'base64');
                return {
                    ...report,
                    start_pic: `data:image/jpeg;base64,${start_picData}`,
                    after_pic: `data:image/jpeg;base64,${after_picData}`,
                };
            })
        }
        catch (err) {
            res.json({ status: 'error', message: err });
        }
    }
    showUserReport: async (req, res) => {
        try {
            let query = 'SELECT pic, detail, facebook, line, email, seller_email, con_num FROM buyerreport'
            query += ' INNERJOIN users ON (buyerreport.User_ID = users.id)'
            query += ' INNERJOIN sellorder ON (buyerreport.order_id = sellorder.id)'

            const [rows, fields] = await pool.execute(query);
            const reportsWithImages = rows.map((report) => {
                const pic = report.pic;
                const picData = fs.readFileSync(pic, 'base64');
                return {
                    ...report,
                    pic: `data:image/jpeg;base64,${picData}`,
                };
            })
        }
        catch (err) {
            res.json({ status: 'error', message: err });
        }
    },
    boostingConfirm: async (req, res) => {
        try {
            let query = 'SELECT user_name FROM '
        }
        catch {
            res.json({ status: 'error', message: err });
        }
    }
    IDConfirmation: async (req, res) => {
        try {
            let query = 'SELECT '
        }
        catch {
            res.json({ status: 'error', message: err });
        }
    }
};

module.exports = reportController;