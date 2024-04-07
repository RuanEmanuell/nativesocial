import { StyleSheet } from 'react-native';

const loginStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    scrollViewContent: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    textInput: {
      width: "90%",
      borderWidth: 2,
      borderColor: "gray",
      marginTop: 5
    },
    button: {
      backgroundColor: "deepskyblue",
      marginTop: 5,
      padding: 10,
      borderRadius: 5,
    }
});

export default loginStyle;