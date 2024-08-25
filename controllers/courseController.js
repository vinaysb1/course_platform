import * as courseService from '../services/courseService.js';

export const addCourse = async (req, res) => {
  try {
    const course = await courseService.addCourse(req.body);
    res.status(201).json({ message: 'Course added successfully', course });
  } catch (error) {
    console.error('Error adding course:', error);
    res.status(500).json({ error: 'Database error' });
  }
};

export const getCourses = async (req, res) => {
  try {
    const courses = await courseService.getCourses();
    res.status(200).json({ message: 'Courses retrieved successfully', courses });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Database error' });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const updatedCourse = await courseService.updateCourse(req.params.id, req.body);
    res.status(200).json({ message: 'Course updated successfully', course: updatedCourse });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ error: 'Database error' });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    await courseService.deleteCourse(req.params.id);
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ error: 'Database error' });
  }
};
