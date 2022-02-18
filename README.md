# rock-paper-scissors-game

This's sample rock paper scissors game, It can be played from the browser or
even by interacting with game CLI

## Prerequisite

- NodeJs
- NPM

## Stack/Technologies

- Socket.io/Socket.client
- http
- express
- react
- typescript
- jest

## Setup

- Clone the repo => `git clone https://github.com/AhmedElsharkawyCS/rock-paper-scissors-game.git`
- Install frontend dependencies => `cd <game-root>/client && npm install`
- Install backend dependencies => `cd <game-root>/server && npm install`

## Available Scripts

In the project directory, you can

### `Start`

- Run frontend application => `cd client && npm run start`
- Run backend application => `cd server && npm run start`
- Run CLI => `cd server && npm run start:cli`

## `Test`

- Test frontend application => `cd client && npm run test:ci`
- Test backend application => `cd server && npm run test:ci`

## Usage

### `CLI`

You play RPS game from the terminal directly by going to `server` directory and
start terminal mode using `npm run start:cli`

### `Browser`

Also you can play RSP game from your browser by doing the next steps:

- Go to `server` directory and run `npm run start`
- Go to `client` directory and run `npm run start`
- open your browser on <http:localhost:3000>

### finally `Happy playing...`

### Improvement/new features/ TODO

- Create `NPM` package to include shared code or create shared folder includes shard code
  between frontend and backend `monorepo approach`

- Improve game UI
- Add more error handling
- Add more test cases to the frontend
- Add `eslint` and `prettier` and link theme with `lint-staged`

## How to play (RPS)

Game support two modes:

- `Computer VS Computer` means you can crate game and the computer will choose
  the game input instead of the human
- `Player VS Computer` means you can start to play with computer, so you can
  choose the game value by click on [rock, paper, scissors] and the computer
  will choose a random value

After running the applications as we mentioned in the `Browser` section

### Steps

- open the browser on <http://localhost:3000>
- chose start/create new game or join game
- for create new game
  - you need to enter your name or enter machine name or bot name `we use it as reference`
  - click on Start
  - share the received room ID with another player/machine to join you
  - wait till the second player joining you
  - in case you are a human you will be able to select a value/input and click
    submit and we will send the result directly after getting the choice/answer
    form another player/machine and in case you are a machine `start with Computer VS Computer` mode you will not be allowed to choose any values coz
    the player is not a human and the machine/bot will will select a random
    value
- for joining option
  - after getting the room ID as we mentioned you can go to join game and click
    on `continue`
  - we will ask you to enter the name of the cmputer/bot/machine and of course
    you need to enter `Room ID` and click on Join
  - you will see the computer select a value and submit it and once it's finish
    we will calculate to see who is the Winner
  - finally we will show a modal include the winner name and the names of
    players

### Notes

if you need to simulate the game correctly you need to open two browser or the
same browser twice and start the process as we mentioned
