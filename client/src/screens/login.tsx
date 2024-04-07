import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, TextInput, KeyboardAvoidingView, Platform, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import Snackbar from 'react-native-snackbar';
import styles from '../styles/styles';

function LoginScreen({ navigation }: { navigation: any }) {
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");

  let snackbarMessage: string = "";
  let snackbarError: boolean = true;

  async function loginUser() {
    const regexEmail = /\S+@\S+\.\S+/;

    if (userName.length < 5) {
      snackbarMessage = "Username needs to be at least 5 characters long!"
    } else if (!regexEmail.test(userEmail)) {
      snackbarMessage = "Use a valid email!"
    } else if (userPassword.length < 6) {
      snackbarMessage = "Password needs to be at least 6 characters long!"
    }
    else {
      snackbarError = false;
    }
    if (snackbarError) {
      showSnackbar(snackbarMessage);
    } else {
      try {
        const response = await fetch(`http://10.0.2.2:5000/loginuser?userName=${encodeURIComponent(userName)}&userEmail=${encodeURIComponent(userEmail)}&userPassword=${encodeURIComponent(userPassword)}`);
        const data = await response.json();
        const userExists: boolean = data["userEmail"] != "";
        if (!userExists) {
          showSnackbar("User does not exists or invalid credentials!");
        } else {
          navigation.navigate("Posts", { userName: userName, userEmail: userEmail });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  function showSnackbar(snackbarText: string) {
    Snackbar.show({ text: snackbarText, backgroundColor: "red", textColor: "white" });
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
          <TextInput
            value={userPassword}
            onChangeText={(text) => setUserPassword(text)}
            placeholder='Your password'
            style={styles.textInput} />
          <Pressable
            onPress={() => navigation.navigate("Register")}>
            <Text style={{ color: "deepskyblue", marginVertical: 10 }}>Don't have an account? Create one...</Text>
          </Pressable>
          <Pressable
            onPress={loginUser}
            style={styles.button}>
            <Text style={{ color: "white" }}>Sign in</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default LoginScreen;
