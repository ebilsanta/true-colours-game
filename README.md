# True Colours Clone
True Colours game clone using WebSockets for real-time gameplay.  
Deployed on Vercel and Fly.io. Check it out here! https://true-colours-tl.vercel.app/
### Features
* Real-time updates to client devices using WebSockets with SpringBoot
* Consistent, mobile-friendly responsive UI using ChakraUI
* Typesafe frontend development with Typescript
* CI/CD pipeline for code changes to backend and frontend repositories

Built with 

<div align="center">
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/183890598-19a0ac2d-e88a-4005-a8df-1ee36782fde1.png" alt="TypeScript" title="TypeScript"/></code>
	<code><img width="50" src="https://github.com/marwin1991/profile-technology-icons/assets/136815194/5f8c622c-c217-4649-b0a9-7e0ee24bd704" alt="Next.js" title="Next.js"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/190887639-d0ba4ec9-ddbe-45dd-bea1-4db83846503e.png" alt="Chakra UI" title="Chakra UI"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/183891303-41f257f8-6b3d-487c-aa56-c497b880d0fb.png" alt="Spring Boot" title="Spring Boot"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/187070862-03888f18-2e63-4332-95fb-3ba4f2708e59.png" alt="websocket" title="websocket"/></code>
</div>

## About the game

True Colors is a social party game where participants are presented with a series of questions, often in the form of "Who is most likely to...?"  

The questions are designed to reveal aspects of the participants' personalities, behaviors, or preferences.  

Players then vote on who they think best fits the description.

## Gameplay Rules
Every turn,
* Vote for the two players you think are most likely to do the thing in the question
* If they're really likely, you can give them both votes.
* Then, predict how many votes you will get from others, either **none**, **some**, or **most** of the votes.
* You get **3** points if you correctly predict you'll get **none** or **most** of the votes.
* You get **1** point if you correctly predict you'll get **some** of the votes.
* And no points if you predictly wrongly!

## Screenshots
<img src="https://github.com/ebilsanta/true-colours-game/assets/101983505/c8c4d6c1-a81f-421a-9644-247efd2cdc70" 
     width="288" 
     height="593">
<img src="https://github.com/ebilsanta/true-colours-game/assets/101983505/9e107dc8-748a-4dff-89c5-07c74118059c" 
     width="288" 
     height="593">
<img src="https://github.com/ebilsanta/true-colours-game/assets/101983505/2a269eda-27b5-4992-ab46-0ec182a78462" 
     width="288" 
     height="593">
<img src="https://github.com/ebilsanta/true-colours-game/assets/101983505/39dd8f52-6744-43f6-8461-9842ee3c444d" 
     width="288" 
     height="593">

## Demo
### Creating and joining games
<img src="https://github.com/ebilsanta/true-colours-game/assets/101983505/fc7925b2-d0c6-48f9-a614-aba5bfe44113.gif" 
     alt="creating and joining game" 
     width="537" 
     height="535">
### Voting each round
<img src="https://github.com/ebilsanta/true-colours-game/assets/101983505/d899b735-00a7-481c-aaf1-82e4f1796b66" 
     alt="creating and joining game" 
     width="537" 
     height="535">

### Showing results at the end of each round
<img src="https://github.com/ebilsanta/true-colours-game/assets/101983505/209a70f9-aedc-4361-affe-fe2fe37bbeeb" 
     alt="creating and joining game" 
     width="537" 
     height="535">

## Getting Started

### Dependencies

* node
* npm
* Java


### Installing
* Clone the repo
```
git clone https://github.com/ebilsanta/true-colours-game
```

### Setup
###### Setting Environment Variables
* Backend - set spring.datasource.url and spring.datasource.drive-class-name in backend/src/main/application.properties
By default, they are these values:
```
spring.datasource.url=jdbc:mysql://localhost:3306/true_colours
spring.datasource.drive-class-name=com.mysql.cj.jdbc.Driver
```
But you may choose to use a different database and url. 
* Rename frontend/.env.sample to .env.local
* Frontend - set your localhost IP (eg. 192.168.1.105) as NEXT_PUBLIC_BASE_API_URL (use this if you want to access the application from other devices)

###### Setting up database
* Start up your database and create the schema to use, eg. MySQL and true_colours schema etc. 
* Questions are populated automatically when Springboot is started, You can also run the sql script questions.sql to populate the `question` table.

### Initializing backend
If you have an IDE like IntelliJ you should be able to run it easily. Else, you can follow these instructions. 
* Change directory
```
cd backend
```

* Make the gradlew script executable (Unix/Linux/macOS)
```
chmod +x gradlew
```

* Launch application
```
./gradlew bootRun
```

* It should be accepting requests at localhost:8080
```
localhost:8080
```
### Initializing frontend
* Change directory
```
cd frontend
```

* Install dependencies
```
npm i
```

* Launch application
```
npm run dev
```

* It should be live at localhost:3000
```
localhost:3000
```

## Roadmap/To-do

### Functional
* Rooms show question number
* Players can quit room
* Show results immediately after everyone has voted
* Host can kick players from room
* Host can end room and display final scores

### Non-functional
###### Frontend
* Use static generation for main page

###### Backend
* Use Redis instead of in-memory singleton for storing room state (more scalable, but more complex with locks)
* Expire rooms and clear from memory (implementable with Redis TTL)
* Explore better user session storage - currently stored on client sessionStorage
