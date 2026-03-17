const Statistic = require("../model/Statistic");

// CREATE
exports.createStatistic = async (req, res) => {
  const { label, value, suffix } = req.body;

  const statistic = await Statistic.create({
    label,
    value,
    suffix,
  });

  return res.status(201).json({
    success: true,
    message: "Statistic created successfully",
    data: statistic,
  });
};

// GET ALL
exports.getStatistics = async (req, res) => {
  const statistics = await Statistic.find().sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    count: statistics.length,
    data: statistics,
  });
};

// UPDATE
exports.updateStatistic = async (req, res) => {
  const { id } = req.params;

  const statistic = await Statistic.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  return res.status(200).json({
    success: true,
    message: "Statistic updated successfully",
    data: statistic,
  });
};

// DELETE
exports.deleteStatistic = async (req, res) => {
  const { id } = req.params;

  await Statistic.findByIdAndDelete(id);

  return res.status(200).json({
    success: true,
    message: "Statistic deleted successfully",
  });
};
