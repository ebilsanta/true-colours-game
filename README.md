# True Colours Digital

## About the game

True Colors is a social party game where participants are presented with a series of questions, often in the form of "Who is most likely to...?" The questions are designed to reveal aspects of the participants' personalities, behaviors, or preferences. Players then vote on who they think best fits the description.

## Gameplay Rules
Every turn,
* Vote for the two players you think are most likely to do the thing in the question
* If they're really likely, you can give them both votes.
* Then, predict how many votes you will get from others, either **none**, **some**, or **most** of the votes.
* You get **3** points if you correctly predict you'll get **none** or **most** of the votes.
* You get **1** point if you correctly predict you'll get **some** of the votes.
* And no points if you predictly wrongly!

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
* Backend - set database url in backend/src/main/application.properties
* Frontend - set your localhost IP as NEXT_PUBLIC_BASE_API_URL in frontend/.env.sample (use this if you want to access the application from other devices)

###### Populating database
* You can run the sql script questions.sql to populate the `question` table.

### Initializing backend without IDE
If you have an IDE like IntelliJ you should be able to run it easily. Else, you can follow these instructions. 
* Change directory
```
cd backend
```

* Make the gradlew script executable
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

Any advise for common problems or issues.
```
command to run if program contains helper info
```
