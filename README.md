# Teacher Student - Node with MySQL
----
## 4 APIs have been created
1. API to register one or more students to a specified teacher.
2. API for teacher to retrieve a list of students common to a given list of teachers.
3. API for teacher to suspend a specified student.
4. API for teacher to retrieve a list of students who can receive a given notification.

----

###Installation Guide 

1. Install node using `sudo apt-get update; sudo apt-get install nodejs; sudo apt-get install npm`
2. Install MySQL using `sudo apt-get update; sudo apt-get install mysql-server; mysql_secure_installation`
3. Run `db/create_db.sql`.
4. Run `npm install`
5. create .env based on .env.default
6. Run app using `npm start`

----

####MySQL is used for storing data.
####Digital Ocean is used for hosting the application. 
####Droplet IP : http://157.230.165.138

----
## 1. API to register one or more students to a specified teacher.
This API helps teacher register multiple students. 
A student can also be registered to multiple teachers.

API - Type : `POST` - For Local - `http://127.0.0.1:3000/api/register`

API - Type : `POST` - For Digital Ocean - `http://157.230.165.138/api/register`

Request Body Example


          {
            "teacher": "teacherken@gmail.com"
            "students":
              [
                "studentjon@example.com",
                "studenthon@example.com"
              ]
          }


----
## 2. API for teacher to retrieve a list of students common to a given list of teachers.
This API helps retrieve students who are registered to ALL of the given teachers.

API - Type : `GET` - For Local : `http://127.0.0.1:3000/api/commonstudents`

API - Type : `GET` - For Digital Ocean : `http://157.230.165.138:3000/api/commonstudents`

Example
    
    Request Example 1:  BASE_IP_ADDRESS/api/commonstudents?teacher=teacherken%40example.com
    Response Example 1:
      {
        "students" :
          [
            "commonstudent1@gmail.com", 
            "commonstudent2@gmail.com",
            "student_only_under_teacher_ken@gmail.com"
          ]
      }
      
      Request Example 2:  BASE_IP_ADDRESS//api/commonstudents?teacher=teacherken%40example.com&teacher=teacherjoe%40example.com
          Response Example 2:
            {
              "students" :
                [
                  "commonstudent1@gmail.com", 
                  "commonstudent2@gmail.com"
                ]
            }




## 3. API for teacher to suspend a specified student.
This API helps teacher suspend a student

API - Type : `POST` - For Local : `http://127.0.0.1:3000//api/suspend`

API - Type : `POST` - For Digital Ocean : `http://157.230.165.138:3000/api/suspend`

Request Bosy Example:

        {
          "student" : "studentmary@gmail.com"
        }

## 4. API for teacher to retrieve a list of students who can receive a given notification.

This API helps teacher to check for students who can recieve notification.

API - Type : `POST` - For Local : `http://127.0.0.1:3000/api/retrievefornotifications` 

API - Type : `POST` - For Digital Ocean : `http://157.230.165.138:3000//api/retrievefornotifications`

Request Body Example

        {
          "teacher":  "teacherken@example.com",
          "notification": "Hello students! @studentagnes@example.com @studentmiche@example.com"
        }

Response Body Example

        {
          "recipients":
            [
              "studentbob@example.com",
              "studentagnes@example.com", 
              "studentmiche@example.com"
            ]   
        }
        
Request Body Example 
        
        {
          "teacher":  "teacherken@example.com",
          "notification": "Hey everybody"
        }

Response Body Example

        {
          "recipients":
            [
              "studentbob@example.com",
            ]   
        }
