CREATE OR ALTER PROCEDURE updateUser(
    @user_id VARCHAR(100),
    @cohort_no VARCHAR(100),
    @fname VARCHAR(100),
    @lname VARCHAR(100),
    @email VARCHAR(100),
    @phone_no VARCHAR(100),
   @password VARCHAR(100))

AS 
BEGIN
UPDATE Users SET user_id = @user_id,cohort_no =@cohort_no,fname=@fname,lname=@lname,email =@email,phone_no=@phone_no
END
