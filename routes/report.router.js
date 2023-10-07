const express = require('express');
const router = express.Router();

const reportController = require('../controllers/report.controller');

router.use('/', (req, res, next) => {
    console.log('Time: ', Date.now());
    next();
})

router.get('/testReport', reportController.testReport);

router.post('/user-Report-Confirmation', reportController.userReportConfirm);
router.post('/booster-Report-Confirmation', reportController.boosterReportConfirm)
router.post('/shop-Buyer-Report-Confirmation', reportController.shopBuyerReportConfirm)

router.get('/admin-ID-Confirmation', reportController.adminIDConfirm);
router.get('/admin-Judge-ID/:uid', reportController.adminJudgeID);
router.delete('/admin-Judge-ID/:uid', reportController.adminDeleteID);

router.get('/admin-Boosting-Confirmtaion', reportController.adminBoostingConfirm);
router.get('/admin-Judge-Boosting/:uid', reportController.adminJudgeBoosting);
router.delete('/admin-Judge-Boosting/:uid', reportController.adminDeleteBoosting);


module.exports = router;