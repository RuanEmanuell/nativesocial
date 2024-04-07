import { Dimensions, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    scrollViewContent: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    postText: {
      fontSize: 24,
      marginLeft: 5,
      color: '#333'
    },
    textInput: {
      width: "90%",
      borderWidth: 2,
      borderColor: "gray",
      marginTop: 5
    },
    button: {
      backgroundColor: "blue",
      marginTop: 5,
      padding: 10,
      borderRadius: 5,
    },
    postsSection: {
      marginTop: 10,
    },
    post: {
      width: screenWidth,
      borderTopWidth: 2,
      borderTopColor: "lightgray"
    }
});

export default styles;