import express from 'express';
import * as courseController from '../controllers/courseController.js';

const router = express.Router();

router.post('/add-course', courseController.addCourse);
router.get('/courses', courseController.getCourses);
router.put('/update-course/:id', courseController.updateCourse);
router.delete('/delete-course/:id', courseController.deleteCourse);

export default router;
