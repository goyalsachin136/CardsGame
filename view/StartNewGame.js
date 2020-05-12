import {styles} from "../styles/styles";
import {Alert, Text, TouchableOpacity, View} from "react-native";

export default function StartNewGame() {

    return (

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
        </View>)
}
