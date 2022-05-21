const { Assignment, Student } = require('../models');

module.exports = {
  // Get all assignments
  getAssignments(req, res) {
    Assignment.find()
      .then((assignments) => res.json(assignments))
      .catch((err) => res.status(500).json(err));
  },
  // Get an assignment
  getSingleAssignment(req, res) {
    Assignment.findOne({ _id: req.params.courseId })
      .select('-__v')
      .then((assignment) =>
        !assignment
          ? res.status(404).json({ message: 'No assignments with that ID' })
          : res.json(assignment)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create an assignment
  createAssignment(req, res) {
    Assignment.create(req.body)
      .then((assignment) => res.json(assignment))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete an assignment
  deleteAssignment(req, res) {
    Assignment.findOneAndDelete({ _id: req.params.courseId })
      .then((assignment) =>
        !assignment
          ? res.status(404).json({ message: 'No assignment with that ID' })
          : Student.deleteMany({ _id: { $in: assignment.students } })
      )
      .then(() => res.json({ message: 'Assignment and students deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update an assignment
  updateAssignment(req, res) {
    Assignment.findOneAndUpdate(
      { _id: req.params.courseId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((assignment) =>
        !assignment
          ? res.status(404).json({ message: 'No assignment with this id!' })
          : res.json(course)
      )
      .catch((err) => res.status(500).json(err));
  },
};
