

create table if not exists course (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL,
    course_duration VARCHAR(20) NOT NULL,
    course_price VARCHAR(20) NOT NULL
);