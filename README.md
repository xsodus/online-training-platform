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
3. Rename `temp.env` file to `.env` 
4. Run all containers by Docker Composer:
```
$ docker-composer up
```
5. Import `database.sql` to MySQL server by using this settings to access:
```
    hostname: localhost
    port: 3306
    username: root
    password: appleA12#4
```
6. Shutdown all docker containers by pressing ctrl+c on keyboard or `docker-compose down` or `docker stop [container_name]` command.
7. Start all containers again by `docker-composer up` command.
8. They're ready to use once you see these message on the ternimal:
```
frontend    | You can now view hello-react in the browser.
frontend    | 
frontend    |   Local:            http://localhost:3000
frontend    |   On Your Network:  http://172.26.0.5:3000
frontend    | 
frontend    | Note that the development build is not optimized.
frontend    | To create a production build, use yarn build.
```
9. You can start to use this web app by this URL:
    http://localhost:80

# Accounts
1. Student Account:
```
   Username: akkapon
   Password: skillaneTest256
```
2. Instructor Account:
```
   Username: Instructor
   Password: test
```
3. If you want to create a new account, please add a new record to `users` table and the `password` value should be MD5 hashed before inserting.
   

# Features
1. The student account only can search the course and edit his profile.
2. The instructor account can search/add the course and edit his profile.

# Database Management
- There are 2 tables that relates to this webapp
  1. users - To store all user data
  2. courses - To store all course data

# Docker Containers
1. The frontend container can be accessed via http://localhost:80 and you can see the source code at `/src` directory.
2. The backend container can be accessed via http://localhost:9000  and you can see the source code at `/server` directory.
3. The database container can be accessed via localhost with port 3306. Here is a root account:
```
    hostname: localhost
    port: 3306
    username: root
    password: appleA12#4
```
4. We use the redis server to manage the user session. It run on port 6379. The session will be expired in 10 minutes if the client does not send any request to the backend server.