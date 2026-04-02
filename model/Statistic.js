const mongoose = require("mongoose");

const statisticSchema = new mongoose.Schema(
{
    label: {
        type: String,
        required: true,
        trim: true
    },
    value: {
        type: Number,
        required: true
    },
    suffix: {
        type: String,
        default: "+"
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Statistic", statisticSchema);