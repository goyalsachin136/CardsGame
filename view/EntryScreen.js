import {styles} from "../styles/styles";
import {Text, TouchableOpacity, View} from "react-native";


export default function EntryScreen() {
    return (
    <View style={styles.inline}>
        <TouchableOpacity style={styles.buttonTop} onPress={() => onChangeCreateGame(true)}>
            <Text>Create game</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonTop} onPress={() => onChangeCreateGame(false)}>
            <Text>Join game</Text>
        </TouchableOpacity>
    </View>
    );
}
