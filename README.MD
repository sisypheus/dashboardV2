# **Dashboard Epitech**

## **Authors**

- alizee.soussan@epitech.eu
- theo.poette@epitech.eu

## **Preview of the finished project**

![Dark mode](/screenshots/dark_mode.png)
![Light mode](/screenshots/light_mode.png)

## **Project description**

The goal of this project is to create a dashboard that will allow the user to see the status of the different services like the weather at a certain city, the exchange rate between two currencies, the last video from a youtube channel...  
**All in one place !**

## **Development and Build**

To get started, clone this repository on your machine.

***First Method***  
You'll need to instances of a terminal, one for to run the front end react client, and another to run the backend node server.

You'll first need to install the dependencies, for the client and the server:
`npm install`
or
`yarn install`

Then you'll need to start the server:  
`npm start`  
It will launch the server on port 8080.  

Then you'll need to start the client:  
`npm start`  
It will launch the client on port 3000.  

You're all set !

***

***Second Method***  
Another way, if you just want to test the application, without installing the dependencies:

Have docker and docker-compose installed on your machine.

Run, at the root of the project, the following command:  
`docker-compose build && docker-compose up`

You'll be able to see the application on http://localhost:3000

## **Services**

For this dashboard, we provide the following services and associated widgets:
- Weather:
  - Weather for a certain city
- Currency:
  - Exchange rate between two currencies
- Youtube:
  - Last video from a youtube channel
  - Statistics about a youtube channel
- Github:
  - Github contributions of a user
  - Github pinned repositories of a user
  - Github user profile
- Reddit:
  - Best n posts from a subreddit
- Nasa:
  - Astronomy picture of the day
  - Last picture taken from curiosity rover on Mars
- Quotes:
  - Random quote in a certain category
  - Quote of the day in a certain category
- Epitech Intranet:
  - User profile
  - User notifications and alerts
