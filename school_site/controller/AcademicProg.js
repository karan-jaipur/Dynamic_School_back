const Program = require("../model/AcademicProg");

exports.createProgram = async (req, res) => {
  const { title, grades, description } = req.body;

  const program = await Program.create({
    title,
    grades,
    description,
  });

  return res.status(201).json({
    success: true,
    message: "Program created successfully",
    data: program,
  });
};

exports.deleteProgram = async (req, res) => {

    const { id } = req.params;

    const program = await Program.findByIdAndDelete(id);

    if (!program) {
        return res.status(404).json({
            success: false,
            message: "Program not found"
        });
    }

    return res.status(200).json({
        success: true,
        message: "Program deleted successfully"
    });

};

exports.getAllPrograms = async (req, res) => {

    const programs = await Program.find().sort({ createdAt: -1 });
    return res.status(200).json({
        success: true,
        message: "Programs fetched successfully",
        count: programs.length,
        data: programs
    });

};

exports.updateProgram = async (req, res) => {
  const { id } = req.params;

  const updatedProgram = await Program.findByIdAndUpdate(
    id,
    {
      title: req.body.title,
      grades: req.body.grades,
      description: req.body.description,
    },
    {
      new: true,          // return updated data
      runValidators: true // apply schema validation
    }
  );

  if (!updatedProgram) {
    return res.status(404).json({
      success: false,
      message: "Program not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Program updated successfully",
    data: updatedProgram,
  });
};


