-- Roles: teacher, staff, student
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password_hash TEXT,
    phone VARCHAR(15),
    parent_phone VARCHAR(15),
    role VARCHAR(20) DEFAULT 'student',
    student_type VARCHAR(20), -- 'online' or 'center'
    history_id VARCHAR(20) UNIQUE, -- Generated AK-XXXX
    learning_stage VARCHAR(50), -- Sec 1, 2, 3
    receiving_wallet_no VARCHAR(15) -- For Teacher Only
);

CREATE TABLE lectures (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    video_url TEXT,
    month_name VARCHAR(20),
    stage VARCHAR(20),
    lecture_no INT
);

CREATE TABLE student_access (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES users(id),
    lecture_id INT REFERENCES lectures(id),
    is_activated BOOLEAN DEFAULT FALSE, -- Center activation
    is_paid BOOLEAN DEFAULT FALSE,      -- Payment verification
    watch_count INT DEFAULT 0
);