# Website/API-Uptime-Monitoring-System

## Table of contents
* [General Info](#general-info)
* [Features](#features)
* [Technologies](#technologies)
* [Setup](#setup)

## General Info
This application is a simple server state monitoring system developed in plain NodeJS(without libraries). The main functions includes,
user can add up to 5 endpoints to monitor their state. When the state of server changes(goes up/goes down) the user is notified via SMS. 

![Alt text](https://github.com/SonishMaharjan/Website-Uptime-Monitoring-System/blob/master/readme/app_image.png?raw=true)

## Features
* Can monitor up to 5 endpoints for each users.
* Can monitor REST API with four http verbs(GET, POST, PUT, DELETE)
* Send notification via SMS to user's phone number whent state of server changes.
	
## Technologies
Project is created with:
* NodeJS: 12.18
* Twilio's API
	
## Setup
To run this project, clone/download the project. Go to project folder and run

```
$ node index.js
```
