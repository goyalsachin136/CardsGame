import {Alert} from "react-native";
import {urlProd} from "../config/urlConfig";

const generateGame = function (totalNumberOfCards, numberOfPlayers, onChangePlayerCode, onChangeGameCode,
                               onChangeGameMessage,
                               onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                               onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                               onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard,
                               onChangeCurrentSet, onChangeCurrentSet1,  onChangeCurrentSet2,  onChangeCurrentSet3, onChangeCurrentSet4,  setRefreshing, onChangeHeartData, onChangeSpadeData, onChangeDiamondData,
                               onChangeClubData, onChangeCreateGame) {
    if (undefined === totalNumberOfCards || null === totalNumberOfCards || '' === totalNumberOfCards) {
        Alert.alert("enter total cards");
        return;
    }
    if (isNaN(totalNumberOfCards)) {
        Alert.alert("enter valid total cards '" + totalNumberOfCards + "' is not a valid number");
        return;
    }
    if (undefined === numberOfPlayers || null === numberOfPlayers || '' === numberOfPlayers) {
        Alert.alert("enter number of  players");
        return;
    }
    if (isNaN(numberOfPlayers)) {
        Alert.alert("enter valid total number of players");
        return;
    }
    //console.log("totalNumberOfCards " + totalNumberOfCards);
    //console.log("numberOfPlayers " + numberOfPlayers);
    fetch(urlProd + '/demo/addGame?numberOfPlayers='+numberOfPlayers+'&numberOfCards='+totalNumberOfCards, {
        method: 'POST',
    })
        .then(response => {
            ////console.log(response);
            return response.json();
        })
        .then(json => {
            //console.log(json);
            if (json['error'] !== undefined) {
                Alert.alert(json['message'] );
                return;
            }
            Alert.alert("Game generated with code " + json['message']);
            onChangeGameCode(json['message']);
            onChangePlayerCode('');
            onChangeCreateGame(false);
            /*subscribeAndBind(json['message'],null, onChangeGameMessage,
                onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, onChangeCurrentSet1,  onChangeCurrentSet2,  onChangeCurrentSet3, onChangeCurrentSet4,
                setRefreshing, onChangeHeartData, onChangeSpadeData, onChangeDiamondData,
                onChangeClubData);*/
        })
        .catch(error => {
            Alert.alert(serverUnreachableError);
        });
}

export {generateGame}
