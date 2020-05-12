import {Alert} from "react-native";

const getCardStringList = function (array) {
    if (array === undefined || array === null) {
        return new Array();
    }
    /*var ans = new Array();

    for (var i=0; i < array.length; i++) {
        ans.push()
        ans = ans + "   " + getCardFromCardType(array[i]['cardType']) + array[i]['displayCode'] + "---->(" + array[i]['card']  + ")       ";
    }*/
    return array;
}

const getPlayerData = function (playerCode, onChangeGameMessage, onChangecardLeft1, onChangecardLeft2,
                                onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4, onChangesetsWon1, onChangesetsWon2,
                                onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,  onChangePlayerToMove,
                                onChangeHeartData, onChangeSpadeData, onChangeDiamondData,
                                onChangeClubData) {
    console.log("getPlayerData " + playerCode);
    if (playerCode === undefined || playerCode === null || playerCode === '') {
        return;
    }
    //console.log("playerCode " + playerCode);
    fetch('/demo/playerState?playerCode='+playerCode, {
        method: 'GET',
    })
        .then(response => {
            ////console.log(response);
            return response.json();
        })
        .then(json => {
            //console.log(json);
            //console.log(json);
            if (json['cardTypeToCardDisplayStringMap'] === undefined) {
                return;
            }
            //console.log(json['cardTypeToCardDisplayStringMap']['CLUB']);
            //console.log(json['cardTypeToCardDisplayStringMap']['DIAMOND']);
            //console.log(json['cardTypeToCardDisplayStringMap']['HEART']);
            //console.log(json['cardTypeToCardDisplayStringMap']['SPADE']);
            onChangeHeartData(getCardStringList(json['cardTypeToCardDisplayStringMap']['HEART']));
            onChangeDiamondData(getCardStringList(json['cardTypeToCardDisplayStringMap']['DIAMOND']));
            onChangeClubData(getCardStringList(json['cardTypeToCardDisplayStringMap']['CLUB']));
            onChangeSpadeData(getCardStringList(json['cardTypeToCardDisplayStringMap']['SPADE']));
        })
        .catch(error => {
            Alert.alert(serverUnreachableError);
        });
}

export {getPlayerData}
