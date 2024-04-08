import React, { useState } from 'react';
import { Text, Pressable, TextInput, KeyboardAvoidingView, Platform, ScrollView, SafeAreaView } from 'react-native';
import Snackbar from 'react-native-snackbar';
import loginStyle from '../styles/login';
import InputAndLabel from '../components/inputlabel';
import StandartButton from '../components/standartbutton';

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
    <SafeAreaView style={loginStyle.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={loginStyle.container}>
        <ScrollView contentContainerStyle={loginStyle.scrollViewContent}>
          <Text style={loginStyle.logo}>NativeSocial</Text>
          <InputAndLabel
            label="Username"
            value={userName}
            setValue={setUserName}
            placeholder='Your username...'
          />
          <InputAndLabel
            label="Email"
            value={userEmail}
            setValue={setUserEmail}
            placeholder='Your email...'
          />
          <InputAndLabel
            label="Password"
            value={userPassword}
            setValue={setUserPassword}
            placeholder='Your password...'
          />
          <Pressable
            onPress={() => navigation.navigate("Register")}>
            <Text style={{ color: "white", marginVertical: 10 }}>Don't have an account? Create one...</Text>
          </Pressable>
          <StandartButton
            onPress={loginUser}
            backgroundColor="white"
            color="deepskyblue"
            label="Sign in"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default LoginScreen;
