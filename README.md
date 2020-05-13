# React native application of Cards game using expo 

## Architecture

Flow starts from App.js

All of the api calls(backedn data store) are in apiCalls folder

Images and sound used are in assets folder

View folder development in ongoing and currently need fixes. In future view should contain react small modular
components. So ideally View in App.js will be divided into smaller components and placed in view folder

App related version details , android, ios bundling details in app.json

package.json and package-lock.json contains dependency information

Pusher.js is used in real time push events when one player move --> other players screen refresh and play sound
for other entered players when someone joins a game

Api.js is not being used anywhere but shows that how react components are made and App.js view must be broken
into small react components

