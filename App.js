import React from 'react';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Remote debugger']);
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, TextInput , ScrollView, RefreshControl} from 'react-native';
import Constants from 'expo-constants';
import Pusher from 'pusher-js/react-native';
import { Platform,  TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native';
import { showMessage, hideMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

var pusher = new Pusher('ea0535911cc427f0e599', {
    cluster: 'mt1',
    forceTLS: true
});

function Separator() {
    return <View style={styles.separator} />;
}

function subscribeAndBind(gameCode,playerCode, onChangeText4,
                          onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                          onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                          onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard,
                          onChangeCurrentSet, setRefreshing, onChangeHeartData, onChangeSpadeData, onChangeDiamondData,
                          onChangeClubData) {
    var channel = pusher.subscribe(gameCode);

    channel.bind('move-event', function(data) {
        getGameData(gameCode, onChangeText4,
            onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
            onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
            onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, setRefreshing
        );
        showMessage({
            message: data['message'],
            backgroundColor: "black", // background color
            color: "white"
        });
    });

    channel.bind('open-trump', function(data) {
        getGameData(gameCode, onChangeText4,
            onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
            onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
            onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, setRefreshing
        );
        showMessage({
            message: data['message'],
            backgroundColor: "black", // background color
            color: "white",
        });
    });
    channel.bind('set-trump', function(data) {
        getGameData(gameCode, onChangeText4,
            onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
            onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
            onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, setRefreshing
        );
        showMessage({
            message: data['message'],
            backgroundColor: "black", // background color
            color: "white"
        });
    });
    channel.bind('distribute-cards', function(data) {
        if (playerCode !== undefined || playerCode !== null || playerCode !== '') {
            getPlayerData(playerCode, onChangeText4,
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
    });
    channel.bind('player-entered', function(data) {
        getGameData(gameCode, onChangeText4,
            onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
            onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
            onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, setRefreshing
        );
        showMessage({
            message: data['message'],
            backgroundColor: "black", // background color
            color: "white"
        });
    });
    channel.bind('open-trump', function(data) {
        getGameData(gameCode, onChangeText4,
            onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
            onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
            onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, setRefreshing
        );
        showMessage({
            message: data['message'],
            type: "success",
            backgroundColor: "black", // background color
            color: "white"
        });
    });
    console.log("subscribeAndBind done for game " + gameCode);
}

export default function App() {
    const [gameCode, onChangeText1] = React.useState('');
    const [playerNumericCode, onChangeText2] = React.useState('');
    const [playerNickName, onChangeNickName] = React.useState('');
    const [totalNumberOfCards, onChangeTotalCards] = React.useState('');
    const [numberOfPlayers, onChangeTotalPlayers] = React.useState('');
    const [playerCode, onChangeText3] = React.useState('');
    const [gameMessage, onChangeText4] = React.useState('');
    const [nickName1, onChangenickName1] = React.useState('');
    const [nickName2, onChangenickName2] = React.useState('');
    const [nickName3, onChangenickName3] = React.useState('');
    const [nickName4, onChangenickName4] = React.useState('');
    const [cardLeft1, onChangecardLeft1] = React.useState('');
    const [cardLeft2, onChangecardLeft2] = React.useState('');
    const [cardLeft3, onChangecardLeft3] = React.useState('');
    const [cardLeft4, onChangecardLeft4] = React.useState('');
    const [setsWon1, onChangesetsWon1] = React.useState('');
    const [setsWon2, onChangesetsWon2] = React.useState('');
    const [setsWon3, onChangesetsWon3] = React.useState('');
    const [setsWon4, onChangesetsWon4] = React.useState('');
    //onChangesetsWon4

    const [playerToMove, onChangePlayerToMove] = React.useState('');
    const [numberOfCardsPerPerson, onChangeCardsPerPerson] = React.useState('');
    const [cardNumber, onChangeCardNumber] = React.useState('');
    const [trump, onChangeTrump] = React.useState('');
    const [trumpDeclaredBy, onChangeTrumpDeclaredBy] = React.useState('');
    const [canGameBeStarted, onChangeCanGameBeStarted] = React.useState(false);
    const [currentSet, onChangeCurrentSet] =
        React.useState('');
    const [heartsCards, onChangeHeartData] =
        React.useState('');
    const [diamondCards, onChangeDiamondData] =
        React.useState('');
    const [spadeCards, onChangeSpadeData] =
        React.useState('');
    const [clubCards, onChangeClubData] =
        React.useState('');
    const [trumpCard, onChangeTrumpCard] =
        React.useState('');

    const [refreshing, setRefreshing] = React.useState(false);

    const [pointsWon1, onChangesetsPointsWon1] = React.useState('');
    const [pointsWon2, onChangesetsPointsWon2] = React.useState('');
    const [pointsWon3, onChangesetsPointsWon3] = React.useState('');
    const [pointsWon4, onChangesetsPointsWon4] = React.useState('');

    const onRefresh = function() {
        console.log("onRefresh called");
        setRefreshing(true);
        getGameData(gameCode, onChangeText4,
            onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
            onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
            onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, setRefreshing);
    };
    console.ignoredYellowBox = ['Remote debugger'];
    console.ignoredYellowBox = ['Setting a timer'];
    YellowBox.ignoreWarnings(['Setting a timer']);

    return (
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing}  onRefresh={onRefresh} />
        }>
        <SafeAreaView style={styles.container}>
            <View>
                <FlashMessage position="top" />
                <Text style={styles.title}>
                    Welcome to world of card 1.0.2
                </Text>
                {null == gameCode || gameCode === undefined || gameCode === '' || !canGameBeStarted   ?  (<Text style={styles.title}>
                    Enter total number of cards to distribute
                </Text>) : null }
                {null == gameCode || gameCode === undefined || gameCode === '' || !canGameBeStarted ? (
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={text => onChangeTotalCards(text)}
                        value={totalNumberOfCards}
                    />
                ) : null
                }
                {null == gameCode || gameCode === undefined || gameCode === '' || !canGameBeStarted   ?  (<Text style={styles.title}>
                    Enter number of players
                </Text>) : null }
                {null == gameCode || gameCode === undefined || gameCode === '' || !canGameBeStarted ? (
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={text => onChangeTotalPlayers(text)}
                        value={numberOfPlayers}
                    />
                ) : null
                }
                {null == gameCode || false || gameCode === '' || !canGameBeStarted  ?
                    (<Button
                    title="Generate game"
                    onPress={() => {generateGame(totalNumberOfCards, numberOfPlayers, onChangeText1,
                        onChangeText4,
                        onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                        onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                        onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet,
                        setRefreshing, onChangeHeartData, onChangeSpadeData, onChangeDiamondData, onChangeClubData)}}
                />) : null }
            </View>
            <Text style={styles.title}>
                {gameMessage} Trump is declared by {trumpDeclaredBy}
            </Text>
            {/*<Text style={styles.title}>
                Game code is {gameCode}  Game can
                be  {canGameBeStarted === true ? 'started' : ''}
            </Text>*/}
            {trumpCard === undefined || trumpCard === null || trumpCard === ''  ? null :
            <Text style={styles.title}>
                Trump card ({getCardFromCardType(trumpCard)})
            </Text>}
            {/*<Text style={styles.title}>
                Your Player number is {playerNumericCode}
            </Text>*/}
            <Separator />
            <View>
                {gameCode === undefined || gameCode === null || gameCode === '' || !canGameBeStarted ?
                <Text style={styles.title}>
                    Enter  game code
                </Text> : null }
                    {gameCode === undefined || gameCode === null || gameCode === '' || !canGameBeStarted ?
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => onChangeText1(text)}
                    value={gameCode}
                /> : null}
                {!(playerCode === undefined || playerCode === '') ? null : (<Text style={styles.title}>
                    Enter player numeric id (1 to 4)
                </Text>)}
                {!(playerCode === undefined || playerCode === '') ? null :(
                        <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                            onChangeText={text => onChangeText2(text)}
                            value={playerNumericCode}
                        />
                    )
                }
                {!(playerCode === undefined || playerCode === '') ? null : (<Text style={styles.title}>
                    Enter player nick name(max 10 letter)
                </Text>)}
                {!(playerCode === undefined || playerCode === '') ? null :(
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={text => onChangeNickName(text)}
                        value={playerNickName}
                    />
                )
                }
                {!(playerCode === undefined || playerCode === '') ? null :(
                <Button
                    title="Generate player code"
                    color="#f194ff"
                    onPress={() => generatePlayerCode(playerNumericCode, gameCode, playerNickName, onChangeText3,
                        onChangeText4,
                        onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                        onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                        onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard,
                        onChangeCurrentSet, setRefreshing, onChangeHeartData, onChangeSpadeData, onChangeDiamondData,
                        onChangeClubData)}
                />)}
                {!(playerCode === undefined || playerCode === '') ? null :(
                <Text style={styles.title}>
                    Player code
                </Text>)}
                {null != playerCode ? null :(
                <Text style={styles.title}>
                    {playerCode}
                </Text>)}
                <Button
                    title="Refresh game data"
                    color="#f194ff"
                    onPress={() => getGameData(gameCode, onChangeText4,
                        onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                        onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                        onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, setRefreshing)}
                />
                {canGameBeStarted ? null :
                <Text style={styles.title}>
                    Select number of cards per person to distribute
                </Text>}
                {canGameBeStarted ? null :
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => onChangeCardsPerPerson(text)}
                    value={numberOfCardsPerPerson}
                />}
                {canGameBeStarted ? null :
                <Button
                    title="Distribute cards"
                    color="#f194ff"
                    onPress={() => distributeCards( numberOfCardsPerPerson, gameCode, playerCode,
                        onChangeText4, onChangecardLeft1, onChangecardLeft2,
                        onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4, onChangesetsWon1, onChangesetsWon2,
                        onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,  onChangePlayerToMove, onChangeTrumpDeclaredBy,
                        onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, setRefreshing,onChangeHeartData, onChangeSpadeData, onChangeDiamondData,
                        onChangeClubData)}
                />}
                {null !=  trumpDeclaredBy ? null :
                <Text style={styles.title}>
                    Select trump number
                </Text>}
                {null !=  trumpDeclaredBy ? null :
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => onChangeTrump(text)}
                    value={trump}
                />}
                {null !=  trumpDeclaredBy ? null :
                <Text style={styles.title}>
                1-->(♥)           2-->(♦)         3-->(♠)             4-->(♣)
                </Text>}
                {null !=  trumpDeclaredBy ? null :
                <Button
                    title="Choose trump"
                    color="#f194ff"
                    onPress={() => setTrump( trump, playerCode , gameCode,
                        onChangeText4, onChangecardLeft1, onChangecardLeft2,
                        onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4, onChangesetsWon1, onChangesetsWon2,
                        onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,  onChangePlayerToMove,
                        onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, setRefreshing)}
                />}
            </View>
            <Separator />
            {canGameBeStarted ?
            <Text style={styles.title}>
                Current set of game
            </Text> : null}
            {canGameBeStarted ?
            <Text style={styles.title}>
                {currentSet}
            </Text> : null}
            {canGameBeStarted ? <Separator /> : null}
            {canGameBeStarted ? <Separator /> : null}
            <Text style={styles.title}>
                My cards
            </Text>
            <Text style={styles.title}>
                {heartsCards}
            </Text>
            <Text style={styles.title}>
                {diamondCards}
            </Text>
            <Text style={styles.title}>
                {spadeCards}
            </Text>
            <Text style={styles.title}>
                {clubCards}
            </Text>
            <TouchableHighlight onPress={() => getPlayerData(playerCode, onChangeText4,
                onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                onChangePlayerToMove, onChangeHeartData, onChangeSpadeData, onChangeDiamondData,
                onChangeClubData)} onLongPress={() => getPlayerData(playerCode, onChangeText4,
                onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                onChangePlayerToMove, onChangeHeartData, onChangeSpadeData, onChangeDiamondData,
                onChangeClubData)} underlayColor="white">
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Refresh my cards</Text>
                </View>
            </TouchableHighlight>
            {/*<Button
                title="Refresh my cards"
                color="#f194ff"
                onPress={() => getPlayerData(playerCode, onChangeText4,
                    onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                    onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                    onChangePlayerToMove, onChangeHeartData, onChangeSpadeData, onChangeDiamondData,
                    onChangeClubData)}
            />*/}
            {playerNumericCode === playerToMove && canGameBeStarted ?
                <Text style={styles.title}>
                    Select card to move
                </Text> : null
            }
            {playerNumericCode == playerToMove && canGameBeStarted ?
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => onChangeCardNumber(text)}
                    value={cardNumber}
                /> : null
            }
            {playerNumericCode == playerToMove && canGameBeStarted ?
                <Button
                    title="Move card"
                    color="#f194ff"
                    onPress={() => moveCard( cardNumber, playerCode, gameCode,onChangeText4,
                        onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                        onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                        onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, setRefreshing,
                        onChangeHeartData, onChangeSpadeData, onChangeDiamondData,
                        onChangeClubData)}
                />
                : null}
            <Text style={styles.title}>
                {undefined !== nickName1 && null!== nickName1 && '' !== nickName1 ? nickName1 : "Player 1 "} card left {cardLeft1} sets won {setsWon1} points {pointsWon1}
            </Text>
            <Text style={styles.title}>
                {undefined !== nickName2 && null!== nickName2 && '' !== nickName2 ? nickName2 : "Player 2 "} card left {cardLeft2} sets won {setsWon2} points {pointsWon2}
            </Text>
            <Text style={styles.title}>
                {undefined !== nickName3 && null!== nickName3 && '' !== nickName3 ? nickName3 : "Player 3 "} card left {cardLeft3} sets won {setsWon3} points {pointsWon3}
            </Text>
            <Text style={styles.title}>
                {undefined !== nickName4 && null!== nickName4 && '' !== nickName4 ? nickName4 : "Player 4 "} card left {cardLeft4} sets won {setsWon4} points {pointsWon4}
            </Text>
            {trumpCard === undefined || trumpCard === '' || trumpCard === null ?
            <Button
                title="Open trump"
                color="#f194ff"
                onPress={() => openTrump( playerCode, gameCode,onChangeText4,
                    onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                    onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                    onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, setRefreshing)}
            />: null}
        </SafeAreaView>
        </ScrollView>
    );
}

const getCardFromCardType = function (cardType) {
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

const openTrump = function (playerCode, gameCode,
                           onChangeText4, onChangecardLeft1, onChangecardLeft2,
                           onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4, onChangesetsWon1, onChangesetsWon2,
                           onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,  onChangePlayerToMove,
                           onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, setRefreshing) {
    fetch('https://cf86d894.ngrok.io/demo/openTrump?gameCode='+gameCode+"&playerCode="+playerCode, {
        method: 'POST',
    })
        .then(response => {
            ////console.log(response);
            return response.json();
        })
        .then(json => {
            //console.log(json);
            Alert.alert(json['message']);
            getGameData(gameCode, onChangeText4,
                onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, setRefreshing);
        })
        .catch(error => {
            console.error(error);
        });
}

const moveCard = function (card, playerCode, gameCode,onChangeText4,
                           onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                           onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                           onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard,
                           onChangeCurrentSet, setRefreshing,onChangeHeartData, onChangeSpadeData, onChangeDiamondData,
                           onChangeClubData) {
    fetch('https://cf86d894.ngrok.io/demo/moveCard?card='
        +card+'&gameCode='+gameCode+"&playerCode="+playerCode, {
        method: 'POST',
    })
        .then(response => {
            ////console.log(response);
            return response.json();
        })
        .then(json => {
            //console.log(json);
            //Alert.alert(json['message']);
            getGameData(gameCode, onChangeText4,
                onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, setRefreshing);
            getPlayerData(playerCode, onChangeText4,
                onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                onChangePlayerToMove, onChangeHeartData, onChangeSpadeData, onChangeDiamondData,
                onChangeClubData)
        })
        .catch(error => {
            console.error(error);
        });
}

const setTrump = function (trump, playerCode, gameCode,
                                  onChangeText4, onChangecardLeft1, onChangecardLeft2,
                                  onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4, onChangesetsWon1, onChangesetsWon2,
                                  onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,  onChangePlayerToMove,
                           onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, setRefreshing) {
    //console.log("trump " + trump);
    if (undefined === trump || null === trump) {
        return;
    }
    if (trump.length === 0) {
        return;
    }
    fetch('https://cf86d894.ngrok.io/demo/setTrump?trump='
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
            getGameData(gameCode, onChangeText4,
                onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, setRefreshing);
        })
        .catch(error => {
            console.error(error);
        });
}

const distributeCards = function (numberOfCardsPerPlayer, gameCode, playerCode,
                                  onChangeText4, onChangecardLeft1, onChangecardLeft2,
                                  onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4, onChangesetsWon1, onChangesetsWon2,
                                  onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,  onChangePlayerToMove,
                                  onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, setRefreshing,
                                  onChangeHeartData, onChangeSpadeData, onChangeDiamondData,
                                  onChangeClubData) {
    console.log("numberOfCardsPerPlayer " + numberOfCardsPerPlayer);
    if (undefined === numberOfCardsPerPlayer || null === numberOfCardsPerPlayer || '' === numberOfCardsPerPlayer) {
        console.log("inside " + numberOfCardsPerPlayer);
        return;
    }
    if (numberOfCardsPerPlayer.length === 0) {
        return;
    }
    console.log(numberOfCardsPerPlayer);
    var isNumber = console.log(isNaN(numberOfCardsPerPlayer));
    if (isNumber) {
        Alert('Enter valid number');
        return;
    }
    fetch('https://cf86d894.ngrok.io/demo/distributeCards?numberOfCardsPerPlayer='
        +numberOfCardsPerPlayer+'&gameCode='+gameCode, {
        method: 'POST',
    })
        .then(response => {
            ////console.log(response);
            return response.json();
        })
        .then(json => {
            //console.log(json);
            Alert.alert(json['message']);
            getGameData(gameCode, onChangeText4,
                onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, setRefreshing);
            getPlayerData(playerCode, onChangeText4,
                onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                onChangePlayerToMove, onChangeHeartData, onChangeSpadeData, onChangeDiamondData,
                onChangeClubData)
        })
        .catch(error => {
            console.error(error);
        });
}

const generateGame = function (totalNumberOfCards, numberOfPlayers, onChangeText1,
                               onChangeText4,
                               onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                               onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                               onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard,
                               onChangeCurrentSet, setRefreshing, onChangeHeartData, onChangeSpadeData, onChangeDiamondData,
                               onChangeClubData) {
    if (undefined === totalNumberOfCards || null === totalNumberOfCards || '' === totalNumberOfCards) {
        Alert.alert("enter total cards");
        return;
    }
    if (undefined === numberOfPlayers || null === numberOfPlayers || '' === numberOfPlayers) {
        Alert.alert("enter number of  players");
        return;
    }
    //console.log("totalNumberOfCards " + totalNumberOfCards);
    //console.log("numberOfPlayers " + numberOfPlayers);
    fetch('https://cf86d894.ngrok.io/demo/addGame?numberOfPlayers='+numberOfPlayers+'&numberOfCards='+totalNumberOfCards, {
        method: 'POST',
    })
        .then(response => {
            ////console.log(response);
            return response.json();
        })
        .then(json => {
            console.log(json);
            if (json['error'] !== undefined) {
                Alert.alert(json['message'] );
                return;
            }
            Alert.alert("Game generated with code " + json['message']);
            onChangeText1(json['message']);
            subscribeAndBind(json['message'],null, onChangeText4,
                onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet,
                setRefreshing, onChangeHeartData, onChangeSpadeData, onChangeDiamondData,
                onChangeClubData);
        })
        .catch(error => {
            console.error(error);
        });
}

const getCardStringList = function (array) {
    if (array === undefined || array === null) {
        return '';
    }
    var ans = '';
    for (var i=0; i < array.length; i++) {
        ans = ans + "   " + getCardFromCardType(array[i]['cardType']) + array[i]['displayCode'] + "---->(" + array[i]['card']  + ")       ";
    }
    return ans;
}

const getCardSetStringList = function (array) {
    if (array === undefined || array === null) {
        return '';
    }
    var ans = '';
    for (var i=0; i < array.length; i++) {
         console.log(array[i]);
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

const getPlayerData = function (playerCode, onChangeText4, onChangecardLeft1, onChangecardLeft2,
                              onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4, onChangesetsWon1, onChangesetsWon2,
                              onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,  onChangePlayerToMove,
                                onChangeHeartData, onChangeSpadeData, onChangeDiamondData,
                                onChangeClubData) {
    console.log("getPlayerData " + playerCode);
    if (playerCode === undefined || playerCode === null || playerCode === '') {
        return;
    }
    //console.log("playerCode " + playerCode);
    fetch('https://cf86d894.ngrok.io/demo/playerState?playerCode='+playerCode, {
        method: 'GET',
    })
        .then(response => {
            ////console.log(response);
            return response.json();
        })
        .then(json => {
            ////console.log(json);
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
            console.error(error);
        });
}


const getGameData = function (gameCode, onChangeText4, onChangecardLeft1, onChangecardLeft2,
                              onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4, onChangesetsWon1, onChangesetsWon2,
                              onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,  onChangePlayerToMove, onChangeTrumpDeclaredBy,
                              onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet,setRefreshing) {
    console.log("getGameData called for " + gameCode);
    //console.log("getGameData refresh called");
    if (undefined === gameCode || null === gameCode || gameCode.length === 0 ) {
        console.log("getGameData game code empty");
        setRefreshing(false);
        return;
    }
    fetch('https://cf86d894.ngrok.io/demo/gameState?gameCode='+gameCode, {
        method: 'GET',
    })
        .then(response => {
            ////console.log(response);
            return response.json();
        })
        .then(json => {
            //console.log(json);
            setRefreshing(false);
            onChangeText4(json['gameStateToDisplay']);
            if (undefined === json['playerInfoDTOS']) {
                return;
            }
            if (undefined !== json['playerInfoDTOS'][0]) {
                var x1 = json['playerInfoDTOS'][0]['cardsLeft'];
                onChangecardLeft1(x1);
                onChangesetsWon1(json['playerInfoDTOS'][0]['setsWon']);
                onChangesetsPointsWon1(json['playerInfoDTOS'][0]['points']);
                onChangenickName1(json['playerInfoDTOS'][0]['nickName']);
            }
            if (undefined !== json['playerInfoDTOS'][1]['setsWon']) {
                var x2 = json['playerInfoDTOS'][1]['cardsLeft'];
                onChangesetsWon2(json['playerInfoDTOS'][1]['setsWon']);
                onChangecardLeft2(x2);
                onChangesetsPointsWon2(json['playerInfoDTOS'][1]['points']);
                onChangenickName2(json['playerInfoDTOS'][1]['nickName']);
            }
            if (json['playerInfoDTOS'][2] !== undefined) {
                var x3 = json['playerInfoDTOS'][2]['cardsLeft'];
                onChangesetsWon3(json['playerInfoDTOS'][2]['setsWon']);
                onChangecardLeft3(x3);
                onChangesetsPointsWon3(json['playerInfoDTOS'][2]['points']);
                onChangenickName3(json['playerInfoDTOS'][2]['nickName']);
            }
            if (json['playerInfoDTOS'][3] !== undefined) {
                var x4 = json['playerInfoDTOS'][3]['cardsLeft'];
                onChangesetsWon4(json['playerInfoDTOS'][3]['setsWon']);
                onChangecardLeft4(x4);
                onChangesetsPointsWon4(json['playerInfoDTOS'][3]['points']);
                onChangenickName4(json['playerInfoDTOS'][3]['nickName']);
            }
            onChangePlayerToMove(json['playerToMove']);
            onChangeTrumpDeclaredBy(json['trumpDeclaredBy']);
            onChangeCanGameBeStarted(json['canGameBeStarted']);
            //console.log("trump card is " + (json['trumpCard']));
            onChangeTrumpCard(json['trumpCard']);
            console.log("cardSetDTOS " + json['cardSetDTOS']);
            onChangeCurrentSet(getCardSetStringList(json['cardSetDTOS']));
        })
        .catch(error => {
            console.error(error);
        });
}


const generatePlayerCode = function (numericId, gameCode, playerNickName, onChangeText3,
                                     onChangeText4,
                                     onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                                     onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                                     onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard,
                                     onChangeCurrentSet, setRefreshing, onChangeHeartData, onChangeSpadeData, onChangeDiamondData,
                                     onChangeClubData) {
    //Alert.alert('sachni');
    if (numericId === undefined || numericId === '' || numericId.isNaN) {
        //Alert('Invalid numericId');
        return;
    }
    fetch('https://cf86d894.ngrok.io/demo/enterGame?numericId='+numericId+'&gameCode='+gameCode+'&nickName='+playerNickName, {
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
                onChangeText3(json['message']);
                subscribeAndBind(gameCode,json['message'], onChangeText4,
                    onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                    onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                    onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, setRefreshing,
                    onChangeHeartData, onChangeSpadeData, onChangeDiamondData, onChangeClubData);
            } else {
                Alert.alert(json['message']);
            }
        })
        .catch(error => {
            Alert.alert(json['message']);
            console.error(error);
        });
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        marginHorizontal: 16,
    },
    title: {
        textAlign: 'center',
        marginVertical: 8,
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    button: {
        marginBottom: 30,
        width: 260,
        alignItems: 'center',
        backgroundColor: '#f194ff'
    },
    buttonText: {
        textAlign: 'center',
        padding: 20,
        color: 'white'
    }
});

