# online-training-platform

# Requirements
You need to install these tools before setup this project:
1. Node version 10
2. Docker version 19.03.8
3. Yarn version 1.17.3

# Setup
1. Go to the base directory then setup dependencies with yarn command:
```
$ yarn
```
2. Build online-training-platform image:
```
$ docker build --no-cache -t online-training-platform .
```
3. Run all containers by Docker Composer:
```
$ docker-composer up
```
4. Rename `temp.env` file to `.env` 
5. They're ready to use once you see these message on the ternimal:
```
frontend    | You can now view hello-react in the browser.
frontend    | 
frontend    |   Local:            http://localhost:3000
frontend    |   On Your Network:  http://172.26.0.5:3000
frontend    | 
frontend    | Note that the development build is not optimized.
frontend    | To create a production build, use yarn build.
```
6. You can start to use this web app by this URL:
    http://localhost:80

# Accounts
1. Student Account:
```
   Username: akkapon
   Password: skillaneTest256
```
2. Instructor Account:
```
   Username: instructor
   Password: test
```
   

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
3. The database container can be access via localhost with port 3306. Here is a root account:
```
    hostname: localhost
    port: 3306
    username: root
    password: appleA12#4
```
4. We use the redis server to manage the user session. The session will be expired in 10 minutes if the client does not send any request to the backend server.