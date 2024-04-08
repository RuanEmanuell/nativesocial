import { StyleSheet } from 'react-native';

const loginStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'deepskyblue',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        width: "90%",
        borderWidth: 2,
        borderColor: "white",
        marginTop: 5,
        color: "white"
    },
    button: {
        backgroundColor: "white",
        marginTop: 5,
        padding: 10,
        borderRadius: 5,
    },
    logo: {
        color: "white",
        margin: 10,
        fontSize: 48,
        fontWeight: "bold",
    },
});

export default loginStyle;