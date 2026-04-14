const express = require("express");
const Statistic = require("../controller/StatisticController");
const auth = require("../middleware/auth");
const router = express.Router();


router.post("/add",auth, Statistic.createStatistic);
router.get("/", Statistic.getStatistics);
router.put("/new/:id",auth, Statistic.updateStatistic);
router.delete("/del/:id",auth, Statistic.deleteStatistic);

module.exports = router;
