# online-training-platform

# Requirements
You need to install these tools before setup this project:
1. Node version 10
2. Docker version 19.03.8
3. Yarn version 1.17.3

# Setup
1. Build online-training-platform image:
$ docker build --no-cache -t online-training-platform .
2. Run all containers by Docker Composer:
$ docker-composer up
3. Rename temp.env file to .env 
4. They're ready to use once you see this message on the ternimal:
5. Import database.sql to the MYSQL server with this account:
    hostname: localhost
    port: 3306
    username: root
    password: 
6. Once you imported the data to the database server, you can start to use this web app by this URL:
    http://localhost:80

# Accounts
1. Student Account:
   Username: akkapon
   Password: skillaneTest256
2. Instructor Account:
   

# Features
1. The student account only can search the course and edit his profile.
2. The instructor account can search/add the course and edit his profile.

# Database Management
- There are 2 tables that relates to this webapp
  1. users - To store all user data
  2. courses - to store all course data

# Docker Containers
1. The frontend container can be access via http://localhost:80 and you can see the source code at `/src` directory.
2. The backend container can be access via http://localhost:9000  and you can see the source code at `/server` directory.
3. The database container can be access via localhost with port 3306.
4. We use the redis server to manage the user session. The session will be expired in 10 minutes if the client does not send any request to the backend server.