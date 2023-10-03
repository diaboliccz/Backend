const express = require('express');
const router = express.Router();

const reportController = require('../controllers/report.controller');

router.post('/booster_report_confirmation', reportController.boosterReportConfirm);
router.post('/user_report_confirmation', reportController.userReportConfirm);
router.post('/shop-buyer_report_confirmation', reportController.shopBuyerReportConfirm);

router.get('/admin-ID-Confirm', reportController.IDConfirm);
router.get('/admin-boosting-Confirm', reportController.boostingConfirm);

router.get('/admin-judge_boosting/:boostingID', reportController.showBoosterReport);
router.get('/admin-judge_ID/:boostingID', reportController.showUserReport);

module.exports = router;