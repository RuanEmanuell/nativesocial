import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function PostNavbar({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon
          name="exit-to-app"
          size={32}
          color={"white"}
          style={styles.icon}
          onPress={() => navigation.navigate("Login")}
        />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>NativeSocial</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: "100%",
    backgroundColor: "deepskyblue",
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 40,
  },
  icon: {
    marginLeft: 10,
    transform: [{ scaleX: -1 }],
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 32,
  },
});

export default PostNavbar;
1234