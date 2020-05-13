import React from 'react';
import { YellowBox } from 'react-native';
import BlinkView from 'react-native-blink-view'
import { Button, View, SafeAreaView, Text, Alert, TextInput , ScrollView, RefreshControl, FlatList, Image, TouchableOpacity} from 'react-native';
import Pusher from 'pusher-js/react-native';
import FlashMessage from "react-native-flash-message";
import ignoreWarnings from 'react-native-ignore-warnings';
import { ChonseSelect } from 'react-native-chonse-select';
import {styles} from './styles/styles';
import { generatePlayerCode } from './apiCalls/generatePlayerCode'
import { getGameData } from './apiCalls/getGameData'
import { getPlayerData } from './apiCalls/getPlayerData'
import { generateGame } from './apiCalls/generateGame'
import { distributeCards } from './apiCalls/distributeCards'
import { openTrump } from './apiCalls/openTrump'
import { setTrump } from './apiCalls/setTrump'
import { moveCard } from './apiCalls/moveCard'
import { resetGame } from "./resetGame";
// Enable pusher logging - don't include this in productio
Pusher.logToConsole = true;


function Separator() {
    return <View style={styles.separator} />;
}

const serverUnreachableError = "Looks like server is unreachable. Please try after some time";


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
];

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
    const [relativePlayerToMove, onChangeRelativePlayerToMove] = React.useState('');


    console.disableYellowBox = true;
    console.ignoredYellowBox = ['Remote debugger'];
    console.ignoredYellowBox = ['Setting a timer'];
    YellowBox.ignoreWarnings(['Setting a timer']);
    YellowBox.ignoreWarnings(['Remote debugger']);
    ignoreWarnings([
        'flexWrap',
        'Setting a timer',
        'Beware the ides of March'
    ]);


    return (
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing}  onRefresh={() =>
                getGameData(gameCode, playerCode, onChangeGameMessage,
                onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, onChangeCurrentSet1,
                onChangeCurrentSet2,  onChangeCurrentSet3, onChangeCurrentSet4,  setRefreshing, onChangeHeartData, onChangeSpadeData, onChangeDiamondData, onChangeClubData,
                onChangeRelativePlayerToMove)} />
        }>
        <SafeAreaView style={styles.container}>
            <View>
                <FlashMessage position="top" />
                <Text style={styles.marginAround}>
                    Welcome to PANNA Version 2.0
                </Text>
                {playerCode.length !== 0 ?
                    <View style={styles.inline}>
                        <TouchableOpacity style={styles.buttonTop} onPress={() => Alert.alert(
                            'Start new game',
                            'This will delete all your progress. Do you want to continue ?',
                            [
                                {text: 'NO', onPress: () => console.warn('NO Pressed'), style: 'cancel'},
                                {
                                    text: 'YES', onPress: () => resetGame(onChangeGameCode, onChangePlayerCode,
                                        onChangeCanGameBeStarted, onChangeTotalCards, onChangeTotalPlayers, onChangeGameMessage, onChangenickName1, onChangenickName2,
                                        onChangenickName3, onChangenickName4, onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangesetsWon1,
                                        onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangePlayerToMove, onChangeCardsPerPerson, onChangeTrumpDeclaredBy,
                                        onChangeCurrentSet1, onChangeCurrentSet2,
                                        onChangeCurrentSet3, onChangeCurrentSet4, onChangeHeartData, onChangeDiamondData, onChangeSpadeData, onChangeClubData,
                                        onChangeTrumpCard, onChangesetsPointsWon1, onChangesetsPointsWon2,
                                        onChangesetsPointsWon3, onChangesetsPointsWon4)
                                },
                            ]
                        )}>
                            <Text>Start new game</Text>
                        </TouchableOpacity>
                    </View> : null
                }
                {playerCode.length === 0 ?
                    <View style={styles.inline}>
                        <TouchableOpacity style={styles.buttonTop} onPress={() => onChangeCreateGame(true)}>
                            <Text>Create game</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonTop} onPress={() => onChangeCreateGame(false)}>
                            <Text>Join game</Text>
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
                    <TextInput
                        style={{ height: 40, width: 50, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={text => onChangeTotalPlayers(text)}
                        value={numberOfPlayers}
                        keyboardType={'numeric'}
                        maxLength = {1}
                    />
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
                    keyboardType={'numeric'}
                    value={numberOfCardsPerPerson}
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
                <FlatList contentContainerStyle={styles.contentContainerStyleEqualSpace}
                          data={[{'key':'♥',value: 1}, {'key':'♦',value: 2}, {'key':'♠',value: 3}, {'key':'♣',value: 4}]}
                          renderItem={({item}) => <Text onPress={() => setTrump( item.value, playerCode , gameCode,
                              onChangeGameMessage, onChangecardLeft1, onChangecardLeft2,
                              onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4, onChangesetsWon1, onChangesetsWon2,
                              onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,  onChangePlayerToMove,
                              onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, onChangeCurrentSet1,  onChangeCurrentSet2,
                              onChangeCurrentSet3, onChangeCurrentSet4,  setRefreshing, onChangeHeartData, onChangeSpadeData, onChangeDiamondData, onChangeClubData,
                              onChangeRelativePlayerToMove)} style={styles.item}>{item.key}</Text>}
                />}
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
                <FlatList contentContainerStyle={styles.contentContainerStyle}
                          data={getDataFromCards(heartsCards)}
                    renderItem={({item}) => <Text onPress={() => moveCard( item.value, playerCode, gameCode,onChangeGameMessage,
                        onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                        onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                        onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, onChangeCurrentSet1,  onChangeCurrentSet2,
                        onChangeCurrentSet3, onChangeCurrentSet4,  setRefreshing, onChangeHeartData, onChangeSpadeData, onChangeDiamondData,
                        onChangeClubData, onChangeRelativePlayerToMove)} style={styles.item}>{item.key}</Text>}
                />
                <FlatList contentContainerStyle={styles.contentContainerStyle}
                          data={getDataFromCards(diamondCards)}
                          renderItem={({item}) => <Text onPress={() => moveCard( item.value, playerCode, gameCode,onChangeGameMessage,
                              onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                              onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                              onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, onChangeCurrentSet1,  onChangeCurrentSet2,  onChangeCurrentSet3, onChangeCurrentSet4,  setRefreshing,
                              onChangeHeartData, onChangeSpadeData, onChangeDiamondData,
                              onChangeClubData, onChangeRelativePlayerToMove)} style={styles.item}>{item.key}</Text>}
                />
                <FlatList contentContainerStyle={styles.contentContainerStyle}
                          data={getDataFromCards(spadeCards)}
                          renderItem={({item}) => <Text onPress={() => moveCard( item.value, playerCode, gameCode,onChangeGameMessage,
                              onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                              onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                              onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, onChangeCurrentSet1,  onChangeCurrentSet2,  onChangeCurrentSet3, onChangeCurrentSet4,  setRefreshing,
                              onChangeHeartData, onChangeSpadeData, onChangeDiamondData,
                              onChangeClubData, onChangeRelativePlayerToMove)} style={styles.item}>{item.key}</Text>}
                />
                <FlatList contentContainerStyle={styles.contentContainerStyle}
                          data={getDataFromCards(clubCards)}
                          renderItem={({item}) => <Text onPress={() => moveCard( item.value, playerCode, gameCode,onChangeGameMessage,
                              onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                              onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                              onChangePlayerToMove, onChangeTrumpDeclaredBy, onChangeCanGameBeStarted, onChangeTrumpCard, onChangeCurrentSet, onChangeCurrentSet1,  onChangeCurrentSet2,  onChangeCurrentSet3, onChangeCurrentSet4,  setRefreshing,
                              onChangeHeartData, onChangeSpadeData, onChangeDiamondData,
                              onChangeClubData, onChangeRelativePlayerToMove)} style={styles.item}>{item.key}</Text>}
                />
            </View>
            {playerCode.length === 0 ? null :
            <Button title="Refresh my cards" color="#f194ff" onPress={() => getPlayerData(playerCode, onChangeGameMessage,
                onChangecardLeft1, onChangecardLeft2, onChangecardLeft3, onChangecardLeft4, onChangenickName1, onChangenickName2, onChangenickName3, onChangenickName4,
                onChangesetsWon1, onChangesetsWon2, onChangesetsWon3, onChangesetsWon4, onChangesetsPointsWon1, onChangesetsPointsWon2, onChangesetsPointsWon3, onChangesetsPointsWon4,
                onChangePlayerToMove, onChangeHeartData, onChangeSpadeData, onChangeDiamondData,
                onChangeClubData)}/>
            }
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

const getDataFromCards = function (array) {
    var answer = new Array();
    for (var i =0; i < array.length; i++) {
        var x = new Object();
        x['key'] = getCardFromCardType(array[i]['cardType']) + array[i]['displayCode'];
        x['value'] = array[i]['card'];
        answer.push(x);
    }
    return answer;
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
