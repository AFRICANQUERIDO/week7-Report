CREATE OR ALTER PROCEDURE createUser(
    @user_id VARCHAR(100),
    @cohort_no VARCHAR(100),
    @fname VARCHAR(100),
    @lname VARCHAR(100),
    @email VARCHAR(100),
    @phone_no VARCHAR(100),
   @password VARCHAR(100))

AS 
BEGIN
INSERT INTO Users(user_id,cohort_no,fname,lname,email,phone_no)
VALUES (@user_id,@cohort_no,@fname,@lname,@email,@phone_no)
END
