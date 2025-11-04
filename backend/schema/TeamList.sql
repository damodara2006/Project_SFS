CREATE TABLE Team_List(ID INT PRIMARY KEY AUTO_INCREMENT, NAME VARCHAR(50), SPOC_ID INT);

create table users(ID INT  PRIMARY KEY AUTO_INCREMENT, EMAIL VARCHAR(256)
, PASSWORD VARCHAR(256), ROLE VARCHAR(10), COLLEGE VARCHAR(100));

create table problems(
                      ID INT PRIMARY KEY AUTO_INCREMENT, 
                      TITLE VARCHAR(100), 
                      DESCRIPTION TEXT,
                      SUB_DATE DATE,
                      CATEGORY VARCHAR(50),
                      DEPT VARCHAR(50),
                      Links VARCHAR(256),
                      Reference VARCHAR(256)
);

create table submissions(
                        ID INT PRIMARY KEY AUTO_INCREMENT,
                        PROBLEM_ID INT,
                        TEAM_ID INT,
                        SOL_TITLE VARCHAR(100),
                        SOL_DESCRIPTION TEXT,
                        SUB_DATE DATE,
                        STATUS VARCHAR(20) DEFAULT 'PENDING',
                        SOL_LINK VARCHAR(256),
                        FOREIGN KEY (PROBLEM_ID) REFERENCES problems(ID),
                        FOREIGN KEY (TEAM_ID) REFERENCES Team_List(ID)
);