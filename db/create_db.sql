create database if not exists studentteacher;

use studentteacher;

create table if not exists studentInfo(
 id int PRIMARY key auto_increment,
 sname varchar(30),
 scourse varchar(30),
 sfee int
 );


 create table if not exists teachers(
 id int PRIMARY key auto_increment,
 mail varchar(30)
 );

 create table if not exists students(
 id int PRIMARY key auto_increment,
 mail varchar(30),
 isSuspended boolean
 );

create table if not exists registration(
 teacher_id int,
 student_id int
 );

commit;