const express = require('express');

const router = express.Router();
router.use(express.json());

const homeController = require("../controllers/home");
const uploadReportController = require("../controllers/report");
const uploadBoostReport = require("../middleware/boostreport");
const uploadBuyerReport = require("../middleware/buyerreport");

let routes = (app) => {
    router.get("/", homeController.getHome);

    router.post("/Booster-Report-Confirmation", uploadReportController.tokenCheck, uploadBoostReport.fields([
      {name: 'before_pic', maxCount: 1},
      {name: 'after_pic', maxCount: 1}]),
    uploadReportController.BoosterReportConfirmation);

    router.post("/User-Report-Confirmation", uploadReportController.tokenCheck, uploadBoostReport.fields([
      {name: 'before_pic', maxCount: 1},
      {name: 'after_pic', maxCount: 1}]),
    uploadReportController.BoosterReportConfirmation);

    router.post("/Shop-Buyer-Report-Confirmation", uploadReportController.tokenCheck, uploadBuyerReport.single('pic'),
    uploadReportController.ShopBuyerReportConfirmation)

    router.get("/Admin-ID-Confirmation", uploadReportController.tokenCheck, uploadReportController.AdminIDConfirmation);

    router.get("/Admin-Boosting-Confirmation", uploadReportController.tokenCheck, uploadReportController.AdminBoostingConfirmation);
    
    router.get("/Admin-Judge-ID", uploadReportController.tokenCheck, uploadReportController.AdminJudgeID);

    router.post("/Admin-Judge-ID", uploadReportController.tokenCheck, uploadReportController.AdminJudgeID);

    router.get("/Admin-Judge-Boosting", uploadReportController.tokenCheck, uploadReportController.AdminJudgeBoosting);

    router.post("/Admin-Judge-Boosting", uploadReportController.tokenCheck, uploadReportController.AdminJudgeBoosting);

    return app.use("/", router);
}

module.exports = routes;