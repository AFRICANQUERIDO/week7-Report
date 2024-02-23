CREATE TABLE Users(
    user_id VARCHAR(100) NOT NULL,
    cohort_no VARCHAR(100) NOT NULL,
    fname VARCHAR(100) NOT NULL,
    lname VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone_no VARCHAR(100) NOT NULL,
password VARCHAR(100) NOT NULL,
isWelcomed BIT DEFAULT 0,
isDeleted BIT DEFAULT 0
)

select * FROM Users

-- ALTER TABLE Users ADD isDeleted Bit Default 0
-- ALTER TABLE Users ADD isWelcomed Bit Default 0
-- DROP TABLE Users

-- UPDATE Users SET isDeleted = 0
-- UPDATE Users SET isWelcomed = 0