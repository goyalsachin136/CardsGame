import {subscribeAndBind} from "../Pusher";
import {Alert} from "react-native";

const   getCardFromCardType = function (cardType) {
    if (cardType === 'HEART') {
        return '♥';
    } else if (cardType === 'DIAMOND') {
        return '♦';
    } else if (cardType === 'SPADE') {
        return '♠';
    } else if (cardType === 'CLUB') {
        return '♣';
    }
    return '';
}


const getCardSetStringList = function (array) {
    if (array === undefined || array === null) {
        return '';
    }
    var ans = '';
    for (var i=0; i < array.length; i++) {
        //console.log(array[i]);
        if (null !== array[i]['playerNickName'] && undefined !== array[i]['playerNickName'] && array[i]['playerNickName'] !== '') {
            ans = ans + "  " + array[i]['playerNickName'] + "  " + array[i]['displayCard']
                + getCardFromCardType(array[i]['cardType']) + "       ";
        } else {
            ans = ans + "  player " + array[i]['playerNumericCode'] + "  " + array[i]['displayCard']
                + getCardFromCardType(array[i]['cardType']) + "       ";
        }
    }
    return ans;
}

const getCardSetStringListByPlayer = function (array, playerNumericCode) {
    if (array === undefined || array === null) {
        return '';
    }
    var ans = '';
    for (var i=0; i < array.length; i++) {
        //console.log(array[i]);
        if (null !== array[i]['playerNickName'] && undefined !== array[i]['playerNickName']
            && array[i]['playerNickName'] !== '' && array[i]['playerNumericCode'] == playerNumericCode) {
            return (null !== array[i]['displayCard'] ? array[i]['displayCard'] : "")
                + (null != array[i]['cardType'] ? getCardFromCardType(array[i]['cardType']) : "");
        }
    }
    return ans;
}

const getGameData = function (gameCode, playerCode, onChangeGameMessage, onChangecardLeft1, onChangecardLeft2,
                              onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4, onChangesetsWon1, onChangesetsWon2,
                              onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,  onChangePlayerToMove, onChangeTrumpDeclaredBy,
                              onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, onChangeCurrentSet1,  onChangeCurrentSet2,  onChangeCurrentSet3,
                              onChangeCurrentSet4, setRefreshing, onChangeHeartData, onChangeSpadeData, onChangeDiamondData, onChangeClubData,
                              onChangeRelativePlayerToMove) {
    setRefreshing(true);
    console.log("getGameData called for " + gameCode + " playerCode " + playerCode);
    if (null === playerCode || playerCode === '') {
        console.log("getGameData not calling for empty playerCode " + playerCode);
        return;
    }
    //console.log("getGameData refresh called");
    if (undefined === gameCode || null === gameCode || gameCode.length === 0 ) {
        console.log("getGameData game code empty");
        setRefreshing(false);
        return;
    }
    fetch('https://43bb4c92.ngrok.io/demo/gameState?gameCode='+gameCode+'&playerCode='+playerCode, {
        method: 'GET',
    })
        .then(response => {
            //console.log(response);
            return response.json();
        })
        .then(json => {
            //console.log(json);
            setRefreshing(false);
            onChangeGameMessage(json['gameStateToDisplay']);
            if (undefined === json['playerInfoDTOS']) {
                return;
            }
            if (undefined !== json['playerInfoDTOS'][0]) {
                //console.log("playerInfoDTOS0");
                var x1 = json['playerInfoDTOS'][0]['cardsLeft'];
                onChangecardLeft1(x1);
                onChangesetsWon1(json['playerInfoDTOS'][0]['setsWon']);
                onChangesetsPointsWon1(json['playerInfoDTOS'][0]['points']);
                onChangenickName1(json['playerInfoDTOS'][0]['nickName']);
                //console.log(json['playerInfoDTOS'][0]['toMove']);
                if (json['playerInfoDTOS'][0]['toMove']) {
                    console.log("relativePlayerToMove set");
                    onChangeRelativePlayerToMove('nickName1');
                }
            }
            if (undefined !== json['playerInfoDTOS'][1]['setsWon']) {
                //console.log("playerInfoDTOS1");
                var x2 = json['playerInfoDTOS'][1]['cardsLeft'];
                onChangesetsWon2(json['playerInfoDTOS'][1]['setsWon']);
                onChangecardLeft2(x2);
                onChangesetsPointsWon2(json['playerInfoDTOS'][1]['points']);
                onChangenickName2(json['playerInfoDTOS'][1]['nickName']);
                //console.log(json['playerInfoDTOS'][1]['toMove']);
                if (json['playerInfoDTOS'][1]['toMove']) {
                    console.log("relativePlayerToMove set");
                    onChangeRelativePlayerToMove('nickName2');
                }
            }
            if (json['playerInfoDTOS'][2] !== undefined) {
                //console.log("playerInfoDTOS2");
                var x3 = json['playerInfoDTOS'][2]['cardsLeft'];
                onChangesetsWon3(json['playerInfoDTOS'][2]['setsWon']);
                onChangecardLeft3(x3);
                onChangesetsPointsWon3(json['playerInfoDTOS'][2]['points']);
                onChangenickName3(json['playerInfoDTOS'][2]['nickName']);
                //console.log(json['playerInfoDTOS'][2]['toMove']);
                if (json['playerInfoDTOS'][2]['toMove']) {
                    //console.log("relativePlayerToMove set");
                    onChangeRelativePlayerToMove('nickName3');
                }
            }
            if (json['playerInfoDTOS'][3] !== undefined) {
                //console.log("playerInfoDTOS3");
                var x4 = json['playerInfoDTOS'][3]['cardsLeft'];
                onChangesetsWon4(json['playerInfoDTOS'][3]['setsWon']);
                onChangecardLeft4(x4);
                onChangesetsPointsWon4(json['playerInfoDTOS'][3]['points']);
                onChangenickName4(json['playerInfoDTOS'][3]['nickName']);
                //console.log(json['playerInfoDTOS'][3]['toMove']);
                if (json['playerInfoDTOS'][3]['toMove']) {
                    //console.log("relativePlayerToMove set");
                    onChangeRelativePlayerToMove('nickName4');
                }
            }
            onChangePlayerToMove(json['playerToMove']);
            onChangeTrumpDeclaredBy(json['trumpDeclaredBy']);
            onChangeCanGameBeStarted(json['canGameBeStarted']);
            //console.log("trump card is " + (json['trumpCard']));
            onChangeTrumpCard(json['trumpCard']);
            //console.log("cardSetDTOS " + json['cardSetDTOS']);
            //onChangeCurrentSet(getCardSetStringList(json['cardSetDTOS']));
            subscribeAndBind(gameCode,playerCode, onChangeGameMessage,
                onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, onChangeCurrentSet1,  onChangeCurrentSet2,  onChangeCurrentSet3, onChangeCurrentSet4,
                setRefreshing, onChangeHeartData, onChangeSpadeData, onChangeDiamondData, onChangeClubData, onChangeRelativePlayerToMove);
            onChangeCurrentSet1(getCardSetStringListByPlayer(json['cardSetDTOS'],1));
            onChangeCurrentSet2(getCardSetStringListByPlayer(json['cardSetDTOS'], 2));
            onChangeCurrentSet3(getCardSetStringListByPlayer(json['cardSetDTOS'], 3));
            onChangeCurrentSet4(getCardSetStringListByPlayer(json['cardSetDTOS'], 4));
        })
        .catch(error => {
            Alert.alert(serverUnreachableError);
        });
}

export {getGameData}
