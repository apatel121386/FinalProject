
/*
  -------------------------------------------------------------------------------------------
  Commands
  -------------------------------------------------------------------------------------------
  psql -U postgres                            # enter psql shell
  \password                                   # changing current user's password
  \l                                          # list databases
  CREATE DATABASE users;                      # create a database
  \c users                                    # move inside a database (connect to a database)
  CREATE TABLE userdetails();                 # create table in a database
  \dt                                         # show tables of a databases (describe table)
  \q                                          # Exit postgres shell
  SELECT * FROM userdetails;                  # show everything from userdetails table
  DROP TABLE userdetails;                     # delete a table

  -------------------------------------------------------------------------------------------
  Keyword References
  -------------------------------------------------------------------------------------------
  PRIMARY KEY = unique key to identify a record
  VARCHAR(255) = string with a max length of 255
  smallint = small-range integer in the range of -32768 to +32767

  Data Types Reference - https://www.postgresql.org/docs/9.1/datatype.html
  Numeric Types Reference - https://www.postgresql.org/docs/9.1/datatype-numeric.html
*/


-- Create a Database called "myapp" and a table inside that database "users"
CREATE DATABASE myapp;
CREATE TABLE users(
  user_id VARCHAR(255) PRIMARY KEY,
  firstname VARCHAR(255),
  email VARCHAR(255),
  country VARCHAR(255),
  spotifyurl VARCHAR(255),
  age smallint
);
SELECT * FROM users;
DROP TABLE users;

-- Example Queries (Replace $1, $2, etc with actual values that are to be inserted/updated)
-- (actual references are in /server/index.js)
INSERT INTO users (user_id, firstname, email, country, spotifyurl) VALUES($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING;
SELECT * FROM users WHERE user_id=$1;
UPDATE users SET age=$1 WHERE user_id=$2 RETURNING *;
DELETE FROM users WHERE user_id=$1;
INSERT INTO users (user_id, firstname, email, country, spotifyurl, age) VALUES($1, $2, $3, $4, $5, $6) ON CONFLICT DO NOTHING RETURNING *;
