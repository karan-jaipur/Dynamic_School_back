const express = require("express");
const ProgramControl = require("../controller/AcademicProg");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/add", auth,ProgramControl.createProgram);
router.delete("/delete/:id",auth, ProgramControl.deleteProgram);
router.get("/", ProgramControl.getAllPrograms);
router.put("/:id", ProgramControl.updateProgram);

module.exports = router;
