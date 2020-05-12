import {Alert} from "react-native";
import {subscribeAndBind} from "../Pusher";

const generatePlayerCode = function (numericId, gameCode, playerNickName, onChangePlayerCode,
                                     onChangeGameMessage,
                                     onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                                     onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                                     onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard,
                                     onChangeCurrentSet, onChangeCurrentSet1,  onChangeCurrentSet2,  onChangeCurrentSet3, onChangeCurrentSet4,  setRefreshing, onChangeHeartData, onChangeSpadeData, onChangeDiamondData,
                                     onChangeClubData, onChangeRelativePlayerToMove) {
    if (numericId === undefined || numericId === '' || numericId.isNaN) {
        //Alert('Invalid numericId');
        return;
    }
    fetch('https://43bb4c92.ngrok.io/demo/enterGame?numericId='+numericId+'&gameCode='+gameCode+'&nickName='+playerNickName, {
        method: 'POST',
    })
        .then(response => {
            ////console.log(response);
            return response.json();
        })
        .then(json => {
            //console.log(json);
            if (json['error'] === undefined) {
                Alert.alert("Player generated with code " + json['message']);
                onChangePlayerCode(json['message']);
                subscribeAndBind(gameCode,json['message'], onChangeGameMessage,
                    onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                    onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                    onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, onChangeCurrentSet1,
                    onChangeCurrentSet2, onChangeCurrentSet3, onChangeCurrentSet4,  setRefreshing, onChangeHeartData, onChangeSpadeData, onChangeDiamondData, onChangeClubData,
                    onChangeRelativePlayerToMove);
                getGameData(gameCode, json['message'], onChangeGameMessage,
                    onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                    onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                    onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, onChangeCurrentSet1,
                    onChangeCurrentSet2,  onChangeCurrentSet3, onChangeCurrentSet4,  setRefreshing, onChangeHeartData, onChangeSpadeData, onChangeDiamondData, onChangeClubData,
                    onChangeRelativePlayerToMove)
            } else {
                Alert.alert(json['message']);
            }
        })
        .catch(error => {
            Alert.alert(serverUnreachableError);
        });
}

export {generatePlayerCode}
