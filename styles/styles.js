import {StyleSheet} from "react-native";
import Constants from "expo-constants";


const styles = StyleSheet.create({
    defaultButtonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#2196F3',
    },
    inline: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 300,
        zIndex: -1
    },
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        marginHorizontal: 16,
    },
    cards: {
        flexDirection : "row",
        flexWrap : "wrap"
    },
    contentContainerStyle :{
        flexDirection : "row",
        flexWrap : "wrap"
    },
    contentContainerStyleEqualSpace :{
        justifyContent: "space-between"
    },
    setItemDown: {
        position: 'absolute',
        zIndex: 999,
        left: 30,
        right: 0,
        top: '50%', /* Adjust this value to move the positioned div up and down */
        //textAlign: 'center',
        //width: '23%' /* Set the width of the positioned div */,
        width: 50,
        //position: 'relative',
        marginLeft: 140,
        marginTop: 16,
        height: 80,
        //width: 50,
        paddingVertical: 0,
        paddingHorizontal: 4,
        borderWidth: 4,
        borderColor: "#20232a",
        borderRadius: 6,
        backgroundColor: "white",
        color: "#20232a",
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold"
    },
    boldFont : {
        fontWeight: "bold"
    },
    setItem: {
        position: 'absolute',
        zIndex: 999,
        left: 30,
        right: 0,
        top: '13%', /* Adjust this value to move the positioned div up and down */
        //textAlign: 'center',
        //width: '13%' /* Set the width of the positioned div */,
        marginLeft: 140,
        marginTop: 16,
        width: 50,
        height: 80,
        //width: 50,
        paddingVertical: 0,
        paddingHorizontal: 0,
        borderWidth: 4,
        borderColor: "#20232a",
        borderRadius: 6,
        backgroundColor: "white",
        color: "#20232a",
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold"
    },
    red : {
      color: 'red'
    },
    black : {
        color: 'black'
    },
    item: {
        marginTop: 2,
        marginRight: 5,
        paddingVertical: 0,
        paddingHorizontal: 0,
        width: 50,
        height: 75,
        borderWidth: 4,
        borderColor: "#20232a",
        borderRadius: 6,
        backgroundColor: "white",
        color: "#20232a",
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold"
    },
    overImageRightTable: {
        position: 'absolute',
        zIndex: 999,
        left: 0,
        right: 0,
        top: '39%', /* Adjust this value to move the positioned div up and down */
        textAlign: 'center',
        //width: '15%' /* Set the width of the positioned div */,
        marginLeft: 230,
        marginTop: 1,
        width: 50,
        height: 80,
        //width: 50,
        paddingVertical: 0,
        paddingHorizontal: 0,
        borderWidth: 4,
        borderColor: "#20232a",
        borderRadius: 6,
        backgroundColor: "white",
        color: "#20232a",
        //textAlign: "center",
        fontSize: 30,
        fontWeight: "bold"
    },
    overImageRight: {
        flexDirection : "row",
        flexWrap : "wrap",
        position: 'absolute',
        zIndex: 999,
        left: 300,
        right: 0,
        top: '39%', /* Adjust this value to move the positioned div up and down */
        textAlign: 'center',
        width: '24%' /* Set the width of the positioned div */,
        fontWeight: "bold"
    },
    overImageTableLeft: {
        position: 'absolute',
        zIndex: 999,
        left: 0,
        right: 0,
        top: '37%', /* Adjust this value to move the positioned div up and down */
        textAlign: 'center',
        //width: '13%' /* Set the width of the positioned div */,
        marginLeft: 109,
        marginTop: 1,
        width: 50,
        height: 80,
        //width: 50,
        paddingVertical: 0,
        paddingHorizontal: 0,
        borderWidth: 4,
        borderColor: "#20232a",
        borderRadius: 6,
        backgroundColor: "white",
        color: "#20232a",
        //textAlign: "center",
        fontSize: 30,
        fontWeight: "bold"
    },
    overImage: {
        flexDirection : "row",
        flexWrap : "wrap",
        position: 'absolute',
        zIndex: 999,
        left: 1,
        right: 0,
        top: '39%', /* Adjust this value to move the positioned div up and down */
        textAlign: 'center',
        width: '25%' /* Set the width of the positioned div */,
        fontWeight: "bold"
    },
    overImageDown: {
        position: 'absolute',
        zIndex: 999,
        left: 1,
        right: 0,
        top: '53%', /* Adjust this value to move the positioned div up and down */
        textAlign: 'center',
        width: '30%' /* Set the width of the positioned div */,
        fontWeight: "bold"
    },
    boldTitle: {
        marginTop: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 0,
        fontSize: 20
    },
    title: {
        textAlign: 'center',
        marginVertical: 0,
    },
    marginAround : {
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 0,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10
    },
    titleBold: {
        textAlign: 'center',
        marginVertical: 0,
        fontWeight: 'bold'
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
    blueColor: {
        backgroundColor: "#2196F3",
    },
    greyColor: {
        backgroundColor: "#DDDDDD",
    },
    buttonTop: {
        alignItems: "center",
        padding: 10,
        height: 40,
        marginTop: 10 ,
        borderColor: 'black'
    },
    buttonText: {
        textAlign: 'center',
        padding: 20,
        color: 'white'
    },
    tinyLogo: {
        marginLeft: 80,
        width: 200,
        height: 200,
        marginBottom: 20,
        position: 'relative',
        display: 'flex'
    }
});

export {styles}
