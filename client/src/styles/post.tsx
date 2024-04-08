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
      margin: 5,
      color: '#333'
    },
    textInput: {
      width: "90%",
      borderWidth: 2,
      borderColor: "gray",
      marginTop: 5
    },
    postsSection: {
      marginVertical: 10,
    },
    post: {
      width: screenWidth,
      borderTopWidth: 2,
      borderTopColor: "lightgray",
      paddingVertical: 5,
    },
    modalOverlay: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)", 
    },
    modalBox: {
      width: "90%",
      height: "15%",
      backgroundColor: "white",
      minHeight: 100,
      borderRadius: 10,
      alignItems: "center", 
      justifyContent: "center", 
    },
    modalBoxColumn: {
      flex: 1,
      flexDirection: "column",
      alignItems: "center"
    },
    modalButtonRow: {
      flexDirection: "row",
      padding: 20,
    }
});

export default postStyle;