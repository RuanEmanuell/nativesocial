import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, TextInput, KeyboardAvoidingView, Platform, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles/post';

function PostNavbar({ navigation }: { navigation: any }) {
  return (
    <View style={{ height: 50, width: "100%", backgroundColor: "deepskyblue", display: "flex", alignItems: "center", flexDirection: "row" }}>
      <View style={{ width: 40 }}>
        <Icon
          name="exit-to-app"
          size={32}
          color={"white"}
          style={{ marginLeft: 10, transform: [{ scaleX: -1 }] }}
          onPress={() => navigation.navigate("Login")}>
        </Icon>
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={{ color: "white", fontSize: 24, fontWeight: "bold", marginRight: 32 }}>NativeSocial</Text>
      </View>
    </View>
  );
}

export default PostNavbar;
