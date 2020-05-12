import {showMessage} from "react-native-flash-message";
import Pusher from "pusher-js/react-native";
import {Audio} from "expo-av";
import * as Speech from "expo-speech";
import {getGameData} from "./apiCalls/getGameData";
import {getPlayerData} from "./apiCalls/getPlayerData";

let isSubscribed = false;
let subscribedForGameCode = null;
let channel = null;

var pusher = new Pusher('ea0535911cc427f0e599', {
    cluster: 'mt1',
    forceTLS: true
});


async function welcomePlayer(thingToSay) {
    console.log("Calling welcomePlayer");
    const soundObject = new Audio.Sound();
    try {
        /*await soundObject.loadAsync(require('./assets/move_card.wav'));
        await soundObject.playAsync();*/
        Speech.speak(thingToSay);
        // Your sound is playing!
    } catch (error) {
        console.log("error in welcomePlayer " + error)
        // An error occurred!
    }
}

async function myMoveSound() {
    console.log("Calling myMoveSound");
    const soundObject = new Audio.Sound();
    try {
        await soundObject.loadAsync(require('./assets/my_move.mp3'));
        await soundObject.playAsync();
        // Your sound is playing!
    } catch (error) {
        // An error occurred!
    }
}

async function distributeCardsSound() {
    console.log("distributeCardsSound");
    const soundObject = new Audio.Sound();
    try {
        await soundObject.loadAsync(require('./assets/distribute_cards.mp3'));
        await soundObject.playAsync();
        // Your sound is playing!
    } catch (error) {
        // An error occurred!
    }
}

async function openTrumpSound() {
    console.log("Calling openTrump");
    const soundObject = new Audio.Sound();
    try {
        await soundObject.loadAsync(require('./assets/trump_open.mp3'));
        await soundObject.playAsync();
        // Your sound is playing!
    } catch (error) {
        // An error occurred!
    }
}

function subscribeAndBind(gameCode,playerCode, onChangeGameMessage,
                          onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                          onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                          onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard,
                          onChangeCurrentSet, onChangeCurrentSet1,  onChangeCurrentSet2,  onChangeCurrentSet3, onChangeCurrentSet4,  setRefreshing, onChangeHeartData, onChangeSpadeData, onChangeDiamondData,
                          onChangeClubData, onChangeRelativePlayerToMove) {
    console.log("gameCode " + gameCode + " subscribedForGameCode " + subscribedForGameCode);

    if (gameCode !== subscribedForGameCode) {
        console.log("new game code found");
        if (isSubscribed) {
            console.log("unbinding from all channels");
            channel.unbind();
        }
    } else if (isSubscribed) {
        console.log("Already subscribed")
        return;
    }

    channel = pusher.subscribe(gameCode);

    channel.bind('move-event', function(data) {
        getGameData(gameCode, playerCode, onChangeGameMessage,
            onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
            onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
            onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, onChangeCurrentSet1,  onChangeCurrentSet2,
            onChangeCurrentSet3, onChangeCurrentSet4,  setRefreshing,onChangeHeartData, onChangeSpadeData, onChangeDiamondData, onChangeClubData,
            onChangeRelativePlayerToMove
        );
        showMessage({
            message: data['message'],
            backgroundColor: "black", // background color
            color: "white"
        });
        myMoveSound();
    });

    channel.bind('open-trump', function(data) {
        getGameData(gameCode, playerCode, onChangeGameMessage,
            onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
            onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
            onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, onChangeCurrentSet1,  onChangeCurrentSet2,
            onChangeCurrentSet3, onChangeCurrentSet4,  setRefreshing, onChangeHeartData, onChangeSpadeData, onChangeDiamondData, onChangeClubData,
            onChangeRelativePlayerToMove
        );
        showMessage({
            message: data['message'],
            backgroundColor: "black", // background color
            color: "white",
        });
        openTrumpSound();
    });
    channel.bind('set-trump', function(data) {
        getGameData(gameCode, playerCode, onChangeGameMessage,
            onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
            onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
            onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, onChangeCurrentSet1,
            onChangeCurrentSet2,  onChangeCurrentSet3, onChangeCurrentSet4,  setRefreshing, onChangeHeartData, onChangeSpadeData, onChangeDiamondData, onChangeClubData,
            onChangeRelativePlayerToMove
        );
        showMessage({
            message: data['message'],
            backgroundColor: "black", // background color
            color: "white"
        });
    });
    channel.bind('distribute-cards', function(data) {
        if (playerCode !== undefined || playerCode !== null || playerCode !== '') {
            getPlayerData(playerCode, onChangeGameMessage,
                onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                onChangePlayerToMove, onChangeHeartData, onChangeSpadeData, onChangeDiamondData,
                onChangeClubData)
        }
        showMessage({
            message: data['message'],
            backgroundColor: "black", // background color
            color: "white"
        });
        distributeCardsSound();
    });
    channel.bind('player-entered', function(data) {
        getGameData(gameCode, playerCode, onChangeGameMessage,
            onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
            onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
            onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, onChangeCurrentSet1,
            onChangeCurrentSet2,  onChangeCurrentSet3, onChangeCurrentSet4,  setRefreshing, onChangeHeartData, onChangeSpadeData, onChangeDiamondData, onChangeClubData,
            onChangeRelativePlayerToMove
        );
        getGameData(gameCode, playerCode, onChangeGameMessage,
            onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
            onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
            onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, onChangeCurrentSet1,
            onChangeCurrentSet2,  onChangeCurrentSet3, onChangeCurrentSet4,  setRefreshing, onChangeHeartData, onChangeSpadeData, onChangeDiamondData, onChangeClubData,
            onChangeRelativePlayerToMove
        );
        showMessage({
            message: data['message'],
            backgroundColor: "black", // background color
            color: "white"
        });
        welcomePlayer(data['message']);
    });
    isSubscribed = true;
    subscribedForGameCode = gameCode;
    console.log("subscribeAndBind done for game " + gameCode);
}

export {subscribeAndBind}
