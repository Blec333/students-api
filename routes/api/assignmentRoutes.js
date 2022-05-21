const router = require('express').Router();
const {
  getAssignments,
  getSingleAssignment,
  createAssignment,
  updateAssignment,
  deleteAssignment,
} = require('../../controllers/assignmentController.js');

// /api/Assignments
router.route('/')
.get(getAssignments)
.post(createAssignment);

// /api/Assignments/:AssignmentId
router
  .route('/:assignmentId')
  .get(getSingleAssignment)
  .put(updateAssignment)
  .delete(deleteAssignment);

module.exports = router;
