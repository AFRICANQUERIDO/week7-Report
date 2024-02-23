create or alter procedure getAllUsers 
AS
BEGIN
SELECT* FROM Users WHERE isDeleted =0
END