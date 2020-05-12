import {Alert} from "react-native";
import {getGameData} from "./getGameData";

const openTrump = function (playerCode, gameCode,
                            onChangeGameMessage, onChangecardLeft1, onChangecardLeft2,
                            onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4, onChangesetsWon1, onChangesetsWon2,
                            onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,  onChangePlayerToMove,
                            onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, onChangeCurrentSet1,  onChangeCurrentSet2,
                            onChangeCurrentSet3, onChangeCurrentSet4,  setRefreshing, onChangeHeartData, onChangeSpadeData, onChangeDiamondData, onChangeClubData,
                            onChangeRelativePlayerToMove) {
    fetch('https://43bb4c92.ngrok.io/demo/openTrump?gameCode='+gameCode+"&playerCode="+playerCode, {
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
                onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, onChangeCurrentSet1,  onChangeCurrentSet2,
                onChangeCurrentSet3, onChangeCurrentSet4,  setRefreshing, onChangeHeartData, onChangeSpadeData, onChangeDiamondData, onChangeClubData,
                onChangeRelativePlayerToMove);
        })
        .catch(error => {
            Alert.alert(serverUnreachableError);
        });
}

export { openTrump }
