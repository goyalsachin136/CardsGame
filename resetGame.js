const resetGame = function (onChangeGameCode, onChangePlayerCode, onChangeCanGameBeStarted,onChangeTotalCards,onChangeTotalPlayers,
                            onChangeGameMessage,onChangenickName1,onChangenickName2,onChangenickName3,onChangenickName4,onChangecardLeft1,
                            onChangecardLeft2,onChangecardLeft3,onChangecardLeft4,onChangesetsWon1,onChangesetsWon2,onChangesetsWon3,
                            onChangesetsWon4,onChangePlayerToMove,onChangeCardsPerPerson,onChangeTrumpDeclaredBy,onChangeCurrentSet1,
                            onChangeCurrentSet2, onChangeCurrentSet3,onChangeCurrentSet4,onChangeHeartData,onChangeDiamondData,
                            onChangeSpadeData, onChangeClubData,onChangeTrumpCard,onChangesetsPointsWon1,onChangesetsPointsWon2,
                            onChangesetsPointsWon3,onChangesetsPointsWon4) {
    onChangeGameCode('');
    onChangePlayerCode('');
    onChangeCanGameBeStarted(false);
    onChangeGameMessage('');
    onChangenickName1('');
    onChangenickName2('');
    onChangenickName3('');
    onChangenickName4('');
    onChangecardLeft1('');
    onChangecardLeft2('');
    onChangecardLeft3('');
    onChangecardLeft4('');
    onChangesetsWon1('');
    onChangesetsWon2('');
    onChangesetsWon3('');
    onChangesetsWon4('');
    onChangePlayerToMove('');
    onChangeCardsPerPerson('');
    onChangeTrumpDeclaredBy('');
    onChangeCurrentSet1('');
    onChangeCurrentSet2('');
    onChangeCurrentSet3('');
    onChangeCurrentSet4('');
    onChangeHeartData('');
    onChangeDiamondData('');
    onChangeSpadeData('');
    onChangeClubData('');
    onChangeTrumpCard('');
    onChangesetsPointsWon1('');
    onChangesetsPointsWon2('');
    onChangesetsPointsWon3('');
    onChangesetsPointsWon4('');
}

export {resetGame}
