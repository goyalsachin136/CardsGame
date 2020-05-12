import {Alert} from "react-native";
import {getGameData} from "./getGameData";

const setTrump = function (trump, playerCode, gameCode,
                           onChangeGameMessage, onChangecardLeft1, onChangecardLeft2,
                           onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4, onChangesetsWon1, onChangesetsWon2,
                           onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,  onChangePlayerToMove,
                           onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, onChangeCurrentSet1,  onChangeCurrentSet2,
                           onChangeCurrentSet3, onChangeCurrentSet4,  setRefreshing, onChangeHeartData, onChangeSpadeData, onChangeDiamondData, onChangeClubData,
                           onChangeRelativePlayerToMove) {
    //console.log("trump " + trump);
    if (undefined === trump || null === trump) {
        return;
    }
    if (trump.length === 0) {
        return;
    }
    fetch('https://43bb4c92.ngrok.io/demo/setTrump?trump='
        +trump+'&gameCode='+gameCode+"&playerCode="+playerCode, {
        method: 'POST',
    })
        .then(response => {
            ////console.log(response);
            return response.json();
        })
        .then(json => {
            //console.log(json);
            Alert.alert(json['message']);
            getGameData(gameCode, playerCode, onChangeGameMessage,
                onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, onChangeCurrentSet1,
                onChangeCurrentSet2,  onChangeCurrentSet3, onChangeCurrentSet4,  setRefreshing, onChangeHeartData, onChangeSpadeData, onChangeDiamondData, onChangeClubData,
                onChangeRelativePlayerToMove);
        })
        .catch(error => {
            Alert.alert(serverUnreachableError);
        });
}

export { setTrump }
