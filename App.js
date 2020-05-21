import React from 'react';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Remote debugger']);
import BlinkView from 'react-native-blink-view'
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, TextInput , ScrollView, RefreshControl, FlatList, TouchableHighlight, Image,
    TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';
import Pusher from 'pusher-js/react-native';
import { showMessage, hideMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";
import ignoreWarnings from 'react-native-ignore-warnings';
import * as Speech from 'expo-speech';
import { ChonseSelect } from 'react-native-chonse-select';
import {styles} from './styles/styles';
// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

var pusher = new Pusher('ea0535911cc427f0e599', {
    cluster: 'mt1',
    forceTLS: true
});

function Separator() {
    return <View style={styles.separator} />;
}

const serverUnreachableError = "Looks like server is unreachable. Please try after some time";
import { Audio } from 'expo-av';

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

let isSubscribed = false;
let subscribedForGameCode = null;
let channel = null;

const numberOfPlayersList = [
    {
        value:'2',
        label:'2'
    },
    {
        value:'3',
        label:'3'
    },
    {
        value:'4',
        label:'4'
    }
]

const playerNumericCodes = [
    {
        value:'1',
        label:'1'
    },
    {
        value:'2',
        label:'2'
    },
    {
        value:'3',
        label:'3'
    },
    {
        value:'4',
        label:'4'
    }
]

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

export default function App() {
    const [createGameOn, onChangeCreateGame] = React.useState(true);
    const [gameCode, onChangeGameCode] = React.useState('');
    const [playerNumericCode, onChangePlayerNumericCode] = React.useState('');
    const [playerNickName, onChangeNickName] = React.useState('');
    const [totalNumberOfCards, onChangeTotalCards] = React.useState('');
    const [numberOfPlayers, onChangeTotalPlayers] = React.useState('');
    const [playerCode, onChangePlayerCode] = React.useState('');
    const [gameMessage, onChangeGameMessage] = React.useState('');
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
    /*const [cardNumber, onChangeCardNumber] = React.useState('');
    const [trump, onChangeTrump] = React.useState('');*/
    const [trumpDeclaredBy, onChangeTrumpDeclaredBy] = React.useState(null);
    const [canGameBeStarted, onChangeCanGameBeStarted] = React.useState(false);
    const [currentSet, onChangeCurrentSet] =
        React.useState('');
    const [currentSet1, onChangeCurrentSet1] =
        React.useState(null);
    const [currentSet2, onChangeCurrentSet2] =
        React.useState(null);
    const [currentSet3, onChangeCurrentSet3] =
        React.useState(null);
    const [currentSet4, onChangeCurrentSet4] =
        React.useState(null);
    const [heartsCards, onChangeHeartData] =
        React.useState([]);
    const [diamondCards, onChangeDiamondData] =
        React.useState([]);
    const [spadeCards, onChangeSpadeData] =
        React.useState([]);
    const [clubCards, onChangeClubData] =
        React.useState([]);
    const [trumpCard, onChangeTrumpCard] =
        React.useState('');

    const [refreshing, setRefreshing] = React.useState(false);

    const [pointsWon1, onChangesetsPointsWon1] = React.useState('');
    const [pointsWon2, onChangesetsPointsWon2] = React.useState('');
    const [pointsWon3, onChangesetsPointsWon3] = React.useState('');
    const [pointsWon4, onChangesetsPointsWon4] = React.useState('');
    const [relativePlayerToMove, onChangeRelativePlayerToMove] = React.useState('');

    const onRefresh = function() {
        console.log("onRefresh called");
        setRefreshing(true);
        getGameData(gameCode, playerCode, onChangeGameMessage,
            onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
            onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
            onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, onChangeCurrentSet1,
            onChangeCurrentSet2,  onChangeCurrentSet3, onChangeCurrentSet4,  setRefreshing, onChangeHeartData, onChangeSpadeData, onChangeDiamondData, onChangeClubData,
            onChangeRelativePlayerToMove);
    };
    console.disableYellowBox = true;
    console.ignoredYellowBox = ['Remote debugger'];
    console.ignoredYellowBox = ['Setting a timer'];
    YellowBox.ignoreWarnings(['Setting a timer']);
    ignoreWarnings([
        'VirtualizedLists',
        'flexWrap',
        'Setting a timer',
        'Beware the ides of March'
    ]);


    return (
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing}  onRefresh={onRefresh} />
        }>
        <SafeAreaView style={styles.container}>
            <View>
                <FlashMessage position="top" />
                <Text style={styles.marginAround}>
                    Welcome to PANNA Version 2.0
                </Text>
                {playerCode.length !== 0 ?
                    <View style={styles.inline}>
                        <TouchableOpacity style={[styles.buttonTop, styles.greyColor]} onPress={() => Alert.alert(
                            'Start new game',
                            'This will delete all your progress. Do you want to continue ?',
                            [
                                {text: 'NO', onPress: () => console.warn('NO Pressed'), style: 'cancel'},
                                {text: 'YES', onPress: () => resetGame(onChangeGameCode, onChangePlayerCode,
                                        onChangeCanGameBeStarted,onChangeTotalCards,onChangeTotalPlayers, onChangeGameMessage,onChangenickName1,onChangenickName2,onChangenickName3,onChangenickName4,onChangecardLeft1,onChangecardLeft2,onChangecardLeft3,onChangecardLeft4,onChangesetsWon1,onChangesetsWon2,onChangesetsWon3,onChangesetsWon4,onChangePlayerToMove,onChangeCardsPerPerson,onChangeTrumpDeclaredBy,onChangeCurrentSet1,onChangeCurrentSet2,
                                        onChangeCurrentSet3,onChangeCurrentSet4,onChangeHeartData,onChangeDiamondData,onChangeSpadeData,onChangeClubData,onChangeTrumpCard,onChangesetsPointsWon1,onChangesetsPointsWon2,
                                        onChangesetsPointsWon3,onChangesetsPointsWon4)},
                            ]
                        )}>
                            <Text style={styles.boldFont}>Start new game</Text>
                        </TouchableOpacity>
                    </View> : null
                }
                {playerCode.length === 0 ?
                <View style={styles.inline}>
                    <TouchableOpacity style={[styles.buttonTop, createGameOn ? styles.blueColor : styles.greyColor]} onPress={() => onChangeCreateGame(true)}>
                        <Text style={styles.boldFont}>Create game</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttonTop, !createGameOn ? styles.blueColor : styles.greyColor]} onPress={() => onChangeCreateGame(false)}>
                        <Text style={styles.boldFont}>Join game</Text>
                    </TouchableOpacity>
                </View> : null
                }
                {createGameOn && (null == gameCode || gameCode === undefined || gameCode === '' || !canGameBeStarted)   ?  (<Text style={styles.boldTitle}>
                    Enter total number of cards to distribute
                </Text>) : null }
                {createGameOn && (null == gameCode || gameCode === undefined || gameCode === '' || !canGameBeStarted) ? (
                    <TextInput
                        style={{ height: 40, width: 100, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={text => onChangeTotalCards(text)}
                        value={totalNumberOfCards}
                        keyboardType={'numeric'}
                        maxLength = {2}
                    />
                ) : null
                }
                {createGameOn && (null == gameCode || gameCode === undefined || gameCode === '' || !canGameBeStarted)   ?  (<Text style={styles.boldTitle}>
                    Enter number of players
                </Text>) : null }
                {createGameOn && (null == gameCode || gameCode === undefined || gameCode === '' || !canGameBeStarted) ? (

                    <View>
                        <ChonseSelect
                            height={55}
                            style={{marginLeft: 20, marginBottom: 10}}
                            data={numberOfPlayersList}
                            initValue={numberOfPlayers}
                            onPress={(item) => {
                                onChangeTotalPlayers(item.value)
                            }}
                        />
                    </View>
                ) : null
                }
                {createGameOn && (null == gameCode || false || gameCode === '' || !canGameBeStarted)  ?
                    (<Button
                    title="Generate game"
                    onPress={() => {generateGame(totalNumberOfCards, numberOfPlayers, onChangePlayerCode, onChangeGameCode,
                        onChangeGameMessage,
                        onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                        onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                        onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, onChangeCurrentSet1,  onChangeCurrentSet2,  onChangeCurrentSet3, onChangeCurrentSet4,
                        setRefreshing, onChangeHeartData, onChangeSpadeData, onChangeDiamondData, onChangeClubData,
                        onChangeCreateGame)}}
                />) : null }
            </View>
            {!canGameBeStarted?
            <BlinkView blinking={true} delay={100}>
                <Text>{gameMessage}</Text>
            </BlinkView>: null}
            {null != trumpDeclaredBy && '' !== trumpDeclaredBy ?
            <Text style={styles.title}>
                Trump is declared by {trumpDeclaredBy}
            </Text>: null
            }
            {null != gameCode && '' !== gameCode ?
            <Text style={styles.boldTitle} selectable>
                Game code is {gameCode}
            </Text> : null
            }
            {trumpCard === undefined || trumpCard === null || trumpCard === ''  ? null :
            <Text style={styles.title}>
                Trump card ({getCardFromCardType(trumpCard)})
            </Text>}
            {/*<Text style={styles.title}>
                Your Player number is {playerNumericCode}
            </Text>*/}
            {/*<Separator />*/}
            <View>
                {!createGameOn && (undefined === playerCode || null === playerCode  || playerCode.length ===0) ?
                <Text style={styles.boldTitle}>
                    Enter game code
                </Text> : null }
                    {!createGameOn && (undefined === playerCode || null === playerCode  || playerCode.length ===0) ?
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => onChangeGameCode(text)}
                    value={gameCode}
                /> : null}
                {createGameOn || (!(playerCode === undefined || playerCode === '')) ? null : (<Text style={styles.boldTitle}>
                    Choose player numeric id (1 to 4)
                </Text>)}
                {createGameOn || (!(playerCode === undefined || playerCode === '')) ? null :(
                    <View>
                        <ChonseSelect
                            height={55}
                            style={{ marginLeft: 20, marginBottom: 10 }}
                            data={playerNumericCodes}
                            initValue={playerNumericCode}
                            onPress={(item) => {onChangePlayerNumericCode(item.value)}}
                        />
                    </View>
                )}
                {/*{createGameOn || (!(playerCode === undefined || playerCode === '')) ? null :(
                        <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                            onChangeText={text => onChangePlayerNumericCode(text)}
                            value={playerNumericCode}
                        />
                    )
                }*/}
                {createGameOn || (!(playerCode === undefined || playerCode === '')) ? null : (<Text style={styles.boldTitle}>
                    Enter player nick name(max 10 letter)
                </Text>)}
                {createGameOn || (!(playerCode === undefined || playerCode === '')) ? null :(
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={text => onChangeNickName(text)}
                        value={playerNickName}
                    />
                )
                }
                {createGameOn || (!(playerCode === undefined || playerCode === '')) ? null :(
                <Button
                    title="Join game"
                    color="#f194ff"
                    onPress={() => generatePlayerCode(playerNumericCode, gameCode, playerNickName, onChangePlayerCode,
                        onChangeGameMessage,
                        onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                        onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                        onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard,
                        onChangeCurrentSet, onChangeCurrentSet1,  onChangeCurrentSet2,  onChangeCurrentSet3, onChangeCurrentSet4,  setRefreshing, onChangeHeartData, onChangeSpadeData, onChangeDiamondData,
                        onChangeClubData, onChangeRelativePlayerToMove)}
                />)}
                {/*<Text style={styles.title}>Enter Player code</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => onChangePlayerCode(text)}
                    value={playerCode}
                />*/}
                {playerCode.length !== 0 ? <Button
                    title="Refresh game data"
                    color="#f194ff"
                    onPress={() => getGameData(gameCode, playerCode, onChangeGameMessage,
                        onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                        onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                        onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, onChangeCurrentSet1,
                        onChangeCurrentSet2,  onChangeCurrentSet3, onChangeCurrentSet4,  setRefreshing, onChangeHeartData, onChangeSpadeData, onChangeDiamondData, onChangeClubData,
                        onChangeRelativePlayerToMove)}
                />: null}
                {canGameBeStarted || playerCode.length === 0 ? null :
                <Text style={styles.title}>
                    Select number of cards per person to distribute
                </Text>}
                {canGameBeStarted || playerCode.length === 0 ? null :
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => onChangeCardsPerPerson(text)}
                    value={numberOfCardsPerPerson}
                    keyboardType={'numeric'}
                    maxLength = {2}
                />}
                {canGameBeStarted || playerCode.length === 0 ? null :
                <Button
                    title="Distribute cards"
                    color="#f194ff"
                    onPress={() => distributeCards( numberOfCardsPerPerson, gameCode, playerCode,
                        onChangeGameMessage, onChangecardLeft1, onChangecardLeft2,
                        onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4, onChangesetsWon1, onChangesetsWon2,
                        onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,  onChangePlayerToMove, onChangeTrumpDeclaredBy,
                        onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, onChangeCurrentSet1,  onChangeCurrentSet2,  onChangeCurrentSet3, onChangeCurrentSet4,  setRefreshing,onChangeHeartData, onChangeSpadeData, onChangeDiamondData,
                        onChangeClubData, onChangeRelativePlayerToMove)}
                />}
                {playerCode.length === 0 || (null != trumpDeclaredBy && undefined != trumpDeclaredBy && trumpDeclaredBy.length !== 0) ? null :
                    <Text style={styles.title}>
                        Choose trump
                    </Text>
                }
                {playerCode.length === 0 || (null !=  trumpDeclaredBy && '' !== trumpDeclaredBy && undefined !== trumpDeclaredBy) ? null :
                <FlatList columnWrapperStyle={styles.contentContainerStyleEqualSpace}
                          numColumns={4}
                          data={[{'key':'♥',value: 1}, {'key':'♦',value: 2}, {'key':'♠',value: 3}, {'key':'♣',value: 4}]}
                          renderItem={({item}) => <Text onPress={() => setTrump( item.value, playerCode , gameCode,
                              onChangeGameMessage, onChangecardLeft1, onChangecardLeft2,
                              onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4, onChangesetsWon1, onChangesetsWon2,
                              onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,  onChangePlayerToMove,
                              onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, onChangeCurrentSet1,  onChangeCurrentSet2,
                              onChangeCurrentSet3, onChangeCurrentSet4,  setRefreshing, onChangeHeartData, onChangeSpadeData, onChangeDiamondData, onChangeClubData,
                              onChangeRelativePlayerToMove)} style={styles.item}>{item.key}</Text>}
                />}
                {/*{null !=  trumpDeclaredBy ? null :
                <Button
                    title="Choose trump"
                    color="#f194ff"
                    onPress={() => setTrump( trump, playerCode , gameCode,
                        onChangeGameMessage, onChangecardLeft1, onChangecardLeft2,
                        onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4, onChangesetsWon1, onChangesetsWon2,
                        onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,  onChangePlayerToMove,
                        onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, onChangeCurrentSet1,  onChangeCurrentSet2,
                        onChangeCurrentSet3, onChangeCurrentSet4,  setRefreshing, onChangeHeartData, onChangeSpadeData, onChangeDiamondData, onChangeClubData)}
                />}*/}
            </View>
            {/*<Separator />*/}
            {canGameBeStarted ?
                <Text style={styles.title}>
                    {/*blank space*/}
                </Text> : null}
            {playerCode.length === 0 ? null :
            <View>
                {relativePlayerToMove === 'nickName1' && canGameBeStarted ?
                    <BlinkView blinking={true} delay={100}>
                        <Text style={styles.titleBold}>
                            {nickName1} {cardLeft1} cards {setsWon1} sets {pointsWon1} points
                        </Text>
                    </BlinkView> : <Text style={styles.titleBold}>
                        {nickName1} {cardLeft1} cards {setsWon1} sets {pointsWon1} points
                    </Text>
                }
                {null !== currentSet1 && '' !== currentSet1 ? <Text style={styles.setItem}>
                    {currentSet1}
                </Text> : null}
                {relativePlayerToMove === 'nickName2'   && canGameBeStarted ?
                    <BlinkView blinking={true} delay={100} style={styles.overImage}>
                        <Text style={styles.titleBold}>
                            {nickName2} {cardLeft2} cards {setsWon2} sets {pointsWon2} points
                        </Text>
                    </BlinkView> : <Text style={styles.overImage}>
                        {nickName2} {cardLeft2} cards {setsWon2} sets {pointsWon2} points
                    </Text>
                }
                {null !== currentSet2 && '' !== currentSet2 ? <Text style={styles.overImageTableLeft}>
                    {currentSet2}
                </Text> : null}
                <View style={styles.container}>
                    <Image
                        style={styles.tinyLogo}
                        source={require('./assets/round-green-table.png')}
                    />
                </View>
                {null !== currentSet3 && '' !== currentSet3 ? <Text style={styles.setItemDown}>
                    {/*{currentSet3}{cardLeft3} --> {setsWon3} points {pointsWon3}*/}
                    {currentSet3}
                </Text> : null
                }
                {
                    relativePlayerToMove === 'nickName3' &&  canGameBeStarted ?
                    <BlinkView blinking={true} delay={100} style={styles.titleBold}>
                        <Text style={styles.titleBold}>
                            {nickName3} {cardLeft3} cards {setsWon3} sets {pointsWon3} points
                        </Text>
                    </BlinkView> : <Text style={styles.titleBold}>
                            {nickName3} {cardLeft3} cards {setsWon3} sets {pointsWon3} points
                        </Text>
                }
                {relativePlayerToMove === 'nickName4' && canGameBeStarted ?
                    <BlinkView blinking={true} delay={100} style={styles.overImageRight}>
                        <Text style={styles.titleBold}>
                            {nickName4} {cardLeft4} cards {setsWon4} sets {pointsWon4} points
                        </Text>
                    </BlinkView> : <Text style={styles.overImageRight}>
                        {nickName4} {cardLeft4} cards {setsWon4} sets {pointsWon4} points
                    </Text>
                }
                {null !== currentSet4 && '' !== currentSet4 ? <Text style={styles.overImageRightTable}>
                    {currentSet4}
                    {/*{currentSet4}{cardLeft4} --> {setsWon4} points {pointsWon4}*/}
                </Text> : null}
            </View>}
            {canGameBeStarted ? <Separator /> : null}
            {canGameBeStarted ? <Separator /> : null}
            {/*{playerNumericCode == playerToMove && canGameBeStarted ?
                <Text style={styles.title}>
                    Move card
                </Text>
                : null
            }*/}
            <View style={styles.cards}>
                {heartsCards.length !==0 ?
                <FlatList
                    key={"heartsCards" + heartsCards.length}
                    numColumns={heartsCards.length}
                    containerStyle={styles.contentContainerStyleEqualSpace}

                          data={heartsCards}
                    renderItem={({item}) => <Text onPress={() => moveCard( item.value, playerCode, gameCode,onChangeGameMessage,
                        onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                        onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                        onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, onChangeCurrentSet1,  onChangeCurrentSet2,
                        onChangeCurrentSet3, onChangeCurrentSet4,  setRefreshing, onChangeHeartData, onChangeSpadeData, onChangeDiamondData,
                        onChangeClubData, onChangeRelativePlayerToMove)} style={styles.item}>{item.key}</Text>}
                /> : null}
                {diamondCards.length !==0 ?
                <FlatList key={"diamondCards" + diamondCards.length}
                          numColumns={diamondCards.length}
                          containerStyle={styles.contentContainerStyleEqualSpace}
                          data={diamondCards}
                          renderItem={({item}) => <Text onPress={() => moveCard( item.value, playerCode, gameCode,onChangeGameMessage,
                              onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                              onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                              onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, onChangeCurrentSet1,  onChangeCurrentSet2,  onChangeCurrentSet3, onChangeCurrentSet4,  setRefreshing,
                              onChangeHeartData, onChangeSpadeData, onChangeDiamondData,
                              onChangeClubData, onChangeRelativePlayerToMove)} style={styles.item}>{item.key}</Text>}
                /> : null}
                {spadeCards.length !==0 ?
                <FlatList key={"spadeCards" + spadeCards.length}
                          numColumns={spadeCards.length}
                          containerStyle={styles.contentContainerStyleEqualSpace}
                          data={spadeCards}
                          renderItem={({item}) => <Text onPress={() => moveCard( item.value, playerCode, gameCode,onChangeGameMessage,
                              onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                              onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                              onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, onChangeCurrentSet1,  onChangeCurrentSet2,  onChangeCurrentSet3, onChangeCurrentSet4,  setRefreshing,
                              onChangeHeartData, onChangeSpadeData, onChangeDiamondData,
                              onChangeClubData, onChangeRelativePlayerToMove)} style={styles.item}>{item.key}</Text>}
                /> : null}
                {clubCards.length !==0 ?
                <FlatList key={"clubCards" + clubCards.length}
                          numColumns={clubCards.length}
                          containerStyle={styles.contentContainerStyleEqualSpace}
                          data={clubCards}
                          renderItem={({item}) => <Text onPress={() => moveCard( item.value, playerCode, gameCode,onChangeGameMessage,
                              onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                              onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                              onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, onChangeCurrentSet1,  onChangeCurrentSet2,  onChangeCurrentSet3, onChangeCurrentSet4,  setRefreshing,
                              onChangeHeartData, onChangeSpadeData, onChangeDiamondData,
                              onChangeClubData, onChangeRelativePlayerToMove)} style={styles.item}>{item.key}</Text>}
                /> : null}
            </View>
            {playerCode.length === 0 ? null :
            <Button title="Refresh my cards" color="#f194ff" onPress={() => getPlayerData(playerCode, onChangeGameMessage,
                onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                onChangePlayerToMove, onChangeHeartData, onChangeSpadeData, onChangeDiamondData,
                onChangeClubData)}/>
            }
            {/*<Button
                title="Refresh my cards"
                color="#f194ff"
                onPress={() => getPlayerData(playerCode, onChangeGameMessage,
                    onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                    onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                    onChangePlayerToMove, onChangeHeartData, onChangeSpadeData, onChangeDiamondData,
                    onChangeClubData)}
            />*/}
           {/* {playerNumericCode === playerToMove && canGameBeStarted ?
                <Text style={styles.title}>
                    Select card to move
                </Text> : null
            }*/}
            {/*{playerNumericCode == playerToMove && canGameBeStarted ?
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => onChangeCardNumber(text)}
                    value={cardNumber}
                /> : null
            }*/}
            {playerCode.length !== 0 && (trumpCard === undefined || trumpCard === '' || trumpCard === null) ?
            <Button
                title="Open trump"
                color="#f194ff"
                onPress={() => openTrump( playerCode, gameCode,onChangeGameMessage,
                    onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                    onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                    onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, onChangeCurrentSet1,  onChangeCurrentSet2,  onChangeCurrentSet3, onChangeCurrentSet4,
                    setRefreshing, onChangeHeartData, onChangeSpadeData, onChangeDiamondData, onChangeClubData,
                    onChangeRelativePlayerToMove)}
            />: null}
        </SafeAreaView>
        </ScrollView>
    );
}

const resetGame = function (onChangeGameCode, onChangePlayerCode, onChangeCanGameBeStarted,onChangeTotalCards,onChangeTotalPlayers, onChangeGameMessage,onChangenickName1,onChangenickName2,onChangenickName3,onChangenickName4,onChangecardLeft1,onChangecardLeft2,onChangecardLeft3,onChangecardLeft4,onChangesetsWon1,onChangesetsWon2,onChangesetsWon3,onChangesetsWon4,onChangePlayerToMove,onChangeCardsPerPerson,onChangeTrumpDeclaredBy,onChangeCurrentSet1,onChangeCurrentSet2,
                            onChangeCurrentSet3,onChangeCurrentSet4,onChangeHeartData,onChangeDiamondData,onChangeSpadeData,onChangeClubData,onChangeTrumpCard,onChangesetsPointsWon1,onChangesetsPointsWon2,
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
    onChangeHeartData([]);
    onChangeDiamondData([]);
    onChangeSpadeData([]);
    onChangeClubData([]);
    onChangeTrumpCard('');
    onChangesetsPointsWon1('');
    onChangesetsPointsWon2('');
    onChangesetsPointsWon3('');
    onChangesetsPointsWon4('');
}

const getDataFromCards = function (array) {
    var answer = [];
    /**
     * for (var i=0; i < array.length; i++) {
        ans.push()
        ans = ans + "   " + getCardFromCardType(array[i]['cardType']) + array[i]['displayCode'] + "---->(" + array[i]['card']  + ")       ";
    }
     */
    for (var i =0; i < array.length; i++) {
        var x = new Object();
        x['key'] = getCardFromCardType(array[i]['cardType']) + array[i]['displayCode'];
        x['value'] = array[i]['card'];
        answer.push(x);
    }
    return answer;
    /*return[
        {key: 'Devin'},
        {key: 'Dan'},
        {key: 'Dominic'},
        {key: 'Jackson'},
        {key: 'James'},
        {key: 'Joel'},
        {key: 'John'},
        {key: 'Jillian'},
        {key: 'Jimmy'},
        {key: 'Julie'},
    ]*/
}

const getData = function () {
return[
    {key: 'Devin'},
    {key: 'Dan'},
    {key: 'Dominic'},
    {key: 'Jackson'},
    {key: 'James'},
    {key: 'Joel'},
    {key: 'John'},
    {key: 'Jillian'},
    {key: 'Jimmy'},
    {key: 'Julie'},
]
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
                           onChangeGameMessage, onChangecardLeft1, onChangecardLeft2,
                           onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4, onChangesetsWon1, onChangesetsWon2,
                           onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,  onChangePlayerToMove,
                           onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, onChangeCurrentSet1,  onChangeCurrentSet2,
                            onChangeCurrentSet3, onChangeCurrentSet4,  setRefreshing, onChangeHeartData, onChangeSpadeData, onChangeDiamondData, onChangeClubData,
                            onChangeRelativePlayerToMove) {
    fetch('http://192.168.0.7:8080/openTrump?gameCode='+gameCode+"&playerCode="+playerCode, {
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

const moveCard = function (card, playerCode, gameCode,onChangeGameMessage,
                           onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                           onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                           onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard,
                           onChangeCurrentSet, onChangeCurrentSet1,  onChangeCurrentSet2,  onChangeCurrentSet3, onChangeCurrentSet4,  setRefreshing,onChangeHeartData, onChangeSpadeData, onChangeDiamondData,
                           onChangeClubData, onChangeRelativePlayerToMove) {
    fetch('http://192.168.0.7:8080/moveCard?card='
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
            //console.log(json);
            if (json['error'] !== undefined) {
                showMessage({
                    message: json['message'],
                    backgroundColor: "black", // background color
                    color: "white"
                });
            }
            getGameData(gameCode, playerCode, onChangeGameMessage,
                onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, onChangeCurrentSet1,
                onChangeCurrentSet2,  onChangeCurrentSet3, onChangeCurrentSet4,  setRefreshing, onChangeHeartData, onChangeSpadeData, onChangeDiamondData, onChangeClubData,
                onChangeRelativePlayerToMove);
            getPlayerData(playerCode, onChangeGameMessage,
                onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                onChangePlayerToMove, onChangeHeartData, onChangeSpadeData, onChangeDiamondData,
                onChangeClubData)
        })
        .catch(error => {
            Alert.alert(serverUnreachableError);
        });
}

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
    fetch('http://192.168.0.7:8080/setTrump?trump='
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

const distributeCards = function (numberOfCardsPerPlayer, gameCode, playerCode,
                                  onChangeGameMessage, onChangecardLeft1, onChangecardLeft2,
                                  onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4, onChangesetsWon1, onChangesetsWon2,
                                  onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,  onChangePlayerToMove,
                                  onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, onChangeCurrentSet1,  onChangeCurrentSet2,  onChangeCurrentSet3, onChangeCurrentSet4,  setRefreshing,
                                  onChangeHeartData, onChangeSpadeData, onChangeDiamondData,
                                  onChangeClubData,onChangeRelativePlayerToMove) {
    console.log("numberOfCardsPerPlayer " + numberOfCardsPerPlayer);
    if (undefined === numberOfCardsPerPlayer || null === numberOfCardsPerPlayer || '' === numberOfCardsPerPlayer) {
        console.log("inside " + numberOfCardsPerPlayer);
        return;
    }
    if (numberOfCardsPerPlayer.length === 0) {
        return;
    }
    console.log(numberOfCardsPerPlayer);
    var isNumber = isNaN(numberOfCardsPerPlayer);
    if (isNumber) {
        Alert.alert("enter valid number '" + numberOfCardsPerPlayer + "' is not a valid number");
        return;
    }
    fetch('http://192.168.0.7:8080/distributeCards?numberOfCardsPerPlayer='
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
            getGameData(gameCode, playerCode, onChangeGameMessage,
                onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, onChangeCurrentSet1,
                onChangeCurrentSet2,  onChangeCurrentSet3, onChangeCurrentSet4,  setRefreshing, onChangeHeartData, onChangeSpadeData, onChangeDiamondData, onChangeClubData,
                onChangeRelativePlayerToMove);
            getPlayerData(playerCode, onChangeGameMessage,
                onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                onChangePlayerToMove, onChangeHeartData, onChangeSpadeData, onChangeDiamondData,
                onChangeClubData)
        })
        .catch(error => {
            Alert.alert(serverUnreachableError);
        });
}

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
    fetch('http://192.168.0.7:8080//addGame?numberOfPlayers='+numberOfPlayers+'&numberOfCards='+totalNumberOfCards, {
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
            console.log(error);
            Alert.alert(serverUnreachableError);
        });
}

const getCardStringList = function (array) {
    if (array === undefined || array === null) {
        return [];
    }
    /*var ans = new Array();

    for (var i=0; i < array.length; i++) {
        ans.push()
        ans = ans + "   " + getCardFromCardType(array[i]['cardType']) + array[i]['displayCode'] + "---->(" + array[i]['card']  + ")       ";
    }*/
    return array;
    /**
     * return[
     {key: 'Devin'},
     {key: 'Dan'},
     {key: 'Dominic'},
     {key: 'Jackson'},
     {key: 'James'},
     {key: 'Joel'},
     {key: 'John'},
     {key: 'Jillian'},
     {key: 'Jimmy'},
     {key: 'Julie'},
     ]
     */
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
    fetch('http://192.168.0.7:8080/playerState?playerCode='+playerCode, {
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
                console.log("undefined");
                return;
            }
            //console.log(json['cardTypeToCardDisplayStringMap']['CLUB']);
            //console.log(json['cardTypeToCardDisplayStringMap']['DIAMOND']);
            //console.log(json['cardTypeToCardDisplayStringMap']['HEART']);
            //console.log(json['cardTypeToCardDisplayStringMap']['SPADE']);
            onChangeHeartData(getDataFromCards(getCardStringList(json['cardTypeToCardDisplayStringMap']['HEART'])));
            onChangeDiamondData(getDataFromCards(getCardStringList(json['cardTypeToCardDisplayStringMap']['DIAMOND'])));
            onChangeClubData(getDataFromCards(getCardStringList(json['cardTypeToCardDisplayStringMap']['CLUB'])));
            onChangeSpadeData(getDataFromCards(getCardStringList(json['cardTypeToCardDisplayStringMap']['SPADE'])));
        })
        .catch(error => {
            console.log(error);
            Alert.alert(serverUnreachableError);
        });
}


const getGameData = function (gameCode, playerCode, onChangeGameMessage, onChangecardLeft1, onChangecardLeft2,
                              onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4, onChangesetsWon1, onChangesetsWon2,
                              onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,  onChangePlayerToMove, onChangeTrumpDeclaredBy,
                              onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, onChangeCurrentSet1,  onChangeCurrentSet2,  onChangeCurrentSet3,
                              onChangeCurrentSet4, setRefreshing, onChangeHeartData, onChangeSpadeData, onChangeDiamondData, onChangeClubData,
                              onChangeRelativePlayerToMove) {
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
    fetch('http://192.168.0.7:8080/gameState?gameCode='+gameCode+'&playerCode='+playerCode, {
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
                console.log("playerInfoDTOS0");
                var x1 = json['playerInfoDTOS'][0]['cardsLeft'];
                onChangecardLeft1(x1);
                onChangesetsWon1(json['playerInfoDTOS'][0]['setsWon']);
                onChangesetsPointsWon1(json['playerInfoDTOS'][0]['points']);
                onChangenickName1(json['playerInfoDTOS'][0]['nickName']);
                console.log(json['playerInfoDTOS'][0]['toMove']);
                if (json['playerInfoDTOS'][0]['toMove']) {
                    console.log("relativePlayerToMove set");
                    onChangeRelativePlayerToMove('nickName1');
                }
            }
            if (undefined !== json['playerInfoDTOS'][1]['setsWon']) {
                console.log("playerInfoDTOS1");
                var x2 = json['playerInfoDTOS'][1]['cardsLeft'];
                onChangesetsWon2(json['playerInfoDTOS'][1]['setsWon']);
                onChangecardLeft2(x2);
                onChangesetsPointsWon2(json['playerInfoDTOS'][1]['points']);
                onChangenickName2(json['playerInfoDTOS'][1]['nickName']);
                console.log(json['playerInfoDTOS'][1]['toMove']);
                if (json['playerInfoDTOS'][1]['toMove']) {
                    console.log("relativePlayerToMove set");
                    onChangeRelativePlayerToMove('nickName2');
                }
            }
            if (json['playerInfoDTOS'][2] !== undefined) {
                console.log("playerInfoDTOS2");
                var x3 = json['playerInfoDTOS'][2]['cardsLeft'];
                onChangesetsWon3(json['playerInfoDTOS'][2]['setsWon']);
                onChangecardLeft3(x3);
                onChangesetsPointsWon3(json['playerInfoDTOS'][2]['points']);
                onChangenickName3(json['playerInfoDTOS'][2]['nickName']);
                console.log(json['playerInfoDTOS'][2]['toMove']);
                if (json['playerInfoDTOS'][2]['toMove']) {
                    console.log("relativePlayerToMove set");
                    onChangeRelativePlayerToMove('nickName3');
                }
            }
            if (json['playerInfoDTOS'][3] !== undefined) {
                console.log("playerInfoDTOS3");
                var x4 = json['playerInfoDTOS'][3]['cardsLeft'];
                onChangesetsWon4(json['playerInfoDTOS'][3]['setsWon']);
                onChangecardLeft4(x4);
                onChangesetsPointsWon4(json['playerInfoDTOS'][3]['points']);
                onChangenickName4(json['playerInfoDTOS'][3]['nickName']);
                console.log(json['playerInfoDTOS'][3]['toMove']);
                if (json['playerInfoDTOS'][3]['toMove']) {
                    console.log("relativePlayerToMove set");
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


const generatePlayerCode = function (numericId, gameCode, playerNickName, onChangePlayerCode,
                                     onChangeGameMessage,
                                     onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                                     onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                                     onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard,
                                     onChangeCurrentSet, onChangeCurrentSet1,  onChangeCurrentSet2,  onChangeCurrentSet3, onChangeCurrentSet4,  setRefreshing, onChangeHeartData, onChangeSpadeData, onChangeDiamondData,
                                     onChangeClubData, onChangeRelativePlayerToMove) {
    //Alert.alert('sachni');
    if (numericId === undefined || numericId === '' || numericId.isNaN) {
        //Alert('Invalid numericId');
        return;
    }
    fetch('http://192.168.0.7:8080/enterGame?numericId='+numericId+'&gameCode='+gameCode+'&nickName='+playerNickName, {
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
