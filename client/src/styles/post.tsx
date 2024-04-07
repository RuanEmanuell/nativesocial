import { Dimensions, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get("window").width;

const postStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    scrollViewContent: {
      flexGrow: 1,
      alignItems: 'center',
      marginVertical: 10
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
      backgroundColor: "deepskyblue",
      marginVertical: 10,
      padding: 10,
      borderRadius: 5,
    },
    postsSection: {
      marginVertical: 10,
    },
    post: {
      width: screenWidth,
      borderTopWidth: 2,
      borderTopColor: "lightgray",
      paddingVertical: 5,
    }
});

export default postStyle;