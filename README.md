# News App Rest - Api Nodejs, Mongodb & Express JS
##

[![Build Status](https://travis-ci.org/anksji/NewsApp-RestApi.svg?branch=main)](https://travis-ci.org/anksji/NewsApp-RestApi)

## Introduction
A complete News Api developed with the help of Node and Express js. I am using middleware to authenticate every request and also implemented a router to distinguish the endpoints.

## Using
- This Api has been built with the help of Nodejs and Express js.
- Using JWT token for authentication. 
- Using middleware for authentication of every request.
- Using Router structure for api path navigation
- Using MongoDB as a backend for the project.


## Features
- This project covers complete operations such as create, update, read, and delete on different endpoints such as users, news articles, and comments.
- I am authenticating each request with the help of middleware.

## Route path 

| METHOD | PATH |
| ------ | ------ |
| Post | /api/v1/users/signup/ |
| Post | /api/v1/users/signin/ |
| Post, Get, Put, Delete | /api/v1/users/profile/ |
| Post, Get, Put, Delete  | /api/v1/news/ |
| Post, Get, Put, Delete  | /api/v1/comments/ |
| Post, Get, Put, Delete  | /api/v1/category/ |


## How to use it

1. You should have node js installed in your system.
2. I used VS code editor to write this program you can use of your choice.
3. Clone this repo in your local machine and import it to your editor and hit run in your terminal _npm start_, project will run in your localhost in port number 5000. 
4. Test all the Api with Postman.



+-----------------------------------+
|                                   |
|          Author    -              |
|   Ankit Dwivedi                   |
+-----------------------------------+