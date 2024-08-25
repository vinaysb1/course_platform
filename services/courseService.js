import connection from '../config/database.js';

export const addCourse = (courseData) => {
  const { course_name, course_duration, course_price } = courseData;
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO course (course_name, course_duration, course_price) VALUES (?, ?, ?)';
    const values = [course_name, course_duration, course_price];

    connection.query(query, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          course_id: results.insertId,
          course_name,
          course_duration,
          course_price,
        });
      }
    });
  });
};

export const getCourses = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM course';

    connection.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

export const updateCourse = (id, courseData) => {
  const { course_name, course_duration, course_price } = courseData;
  return new Promise((resolve, reject) => {
    const query = 'UPDATE course SET course_name = ?, course_duration = ?, course_price = ? WHERE course_id = ?';
    const values = [course_name, course_duration, course_price, id];

    connection.query(query, values, (err, results) => {
      if (err) {
        reject(err);
      } else if (results.affectedRows === 0) {
        reject(new Error('Course not found'));
      } else {
        resolve({ course_id: id, course_name, course_duration, course_price });
      }
    });
  });
};

export const deleteCourse = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM course WHERE course_id = ?';

    connection.query(query, [id], (err, results) => {
      if (err) {
        reject(err);
      } else if (results.affectedRows === 0) {
        reject(new Error('Course not found'));
      } else {
        resolve();
      }
    });
  });
};
