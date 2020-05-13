# React native application of Cards game using expo 

Backend code  at https://github.com/goyalsachin136/cardsWorld 
## Architecture

Flow starts from App.js

Player will land on create game or join game screen

Create game will ask two information (number of cards, number of players)

Join game will ask three information(game code, player numeric id , player nick name)

After join game --> So when somebody joins game from pusher a channel is subscribed (channel name is game code itself)
Refer Pusher.js file
This channel receives following event  
1)move-event
2)open-trump
3)set-trump
4)distribute-cards
5)player-entered (Sound is played using speech library)


Player code generated on join game is shown nowhere and is only a unique code to get player data like cards left and other
player level sensitive data. This player code resides in playerCode variable. So if currently somebody closes application
from recent application game data will be lost

Another way to do this is by clicking on start new game which will call resetGame function which will reset all of the state
variables.



All of the api calls(backend data store) are in apiCalls folder

Images and sound used are in assets folder

View folder development in ongoing and currently need fixes. In future view should contain react small modular
components. So ideally View in App.js will be divided into smaller components and placed in view folder

App related version details , android, ios bundling details in app.json

package.json and package-lock.json contains dependency information

Pusher.js is used in real time push events when one player move --> other players screen refresh and play sound
for other entered players when someone joins a game

Api.js is not being used anywhere but shows that how react components are made and App.js view must be broken
into small react components

Game views snapshot

https://photos.app.goo.gl/md234AQ4C7certV49


## Build app
npm install

## Run app
npm start

It will open a tab at port 19001. Install expo app on your mobile and scan qr code. You are ready to play with the 
application

