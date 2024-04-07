import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, TextInput, KeyboardAvoidingView, Platform, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import styles from '../styles/styles';

function LoginScreen({navigation} : {navigation: any}) {
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");

  async function userLogin(){
    try {
      const response = await fetch(`http://10.0.2.2:5000/getuser?userEmail=${encodeURIComponent(userEmail)}`);
      const data = await response.json();
      if (!data){
        try {
          await fetch(
            "http://10.0.2.2:5000/adduser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
              { userName: userName, userEmail : userEmail }
            )
          }
          ); 
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
    navigation.navigate("Posts", {userName: userName, userEmail: userEmail});
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <TextInput
            value={userName}
            onChangeText={(text) => setUserName(text)}
            placeholder='Your username'
            style={styles.textInput} />
          <TextInput
            value={userEmail}
            onChangeText={(text) => setUserEmail(text)}
            placeholder='Your email'
            style={styles.textInput} />
          <Pressable
            onPress={userLogin}
            style={styles.button}>
            <Text style={{ color: "white" }}>Login</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default LoginScreen;
