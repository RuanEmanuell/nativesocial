import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, TextInput, KeyboardAvoidingView, Platform, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import Snackbar from 'react-native-snackbar';
import loginStyle from '../styles/login';

function RegisterScreen({ navigation }: { navigation: any }) {
    const [userName, setUserName] = useState<string>("");
    const [userEmail, setUserEmail] = useState<string>("");
    const [userPassword, setUserPassword] = useState<string>("");
    const [userConfirmPassword, setUserConfirmPassword] = useState<string>("");
    const regexEmail = /\S+@\S+\.\S+/;

    async function createUser() {
        let snackbarMessage: string = "";
        let snackbarError: boolean = true;

        if (userName.length < 5) {
            snackbarMessage = "Username needs to be at least 5 characters long!"
        } else if (!regexEmail.test(userEmail)) {
            snackbarMessage = "Use a valid email!"
        } else if (userPassword.length < 6) {
            snackbarMessage = "Password needs to be at least 6 characters long!"
        } else if (userConfirmPassword != userPassword) {
            snackbarMessage = "Both passwords need to be identical!"
        }
        else {
            snackbarError = false;
        }

        if (snackbarError) {
            showSnackbar(snackbarMessage);
        } else {
            try {
                const response = await fetch(`http://10.0.2.2:5000/getuser?userEmail=${encodeURIComponent(userEmail)}`);
                const data = await response.json();
                const userExists: boolean = data["userEmail"] != "";
                if (!userExists) {
                    try {
                        await fetch(
                            "http://10.0.2.2:5000/adduser", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(
                                { userName: userName, userEmail: userEmail, userPassword: userPassword }
                            )
                        }
                        );
                        navigation.navigate("Posts", { userName: userName, userEmail: userEmail });
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    showSnackbar("There is another user with this email already!");
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
                    <TextInput
                        value={userName}
                        onChangeText={(text) => setUserName(text)}
                        placeholder='Your username'
                        style={loginStyle.textInput} />
                    <TextInput
                        value={userEmail}
                        onChangeText={(text) => setUserEmail(text)}
                        placeholder='Your email'
                        style={loginStyle.textInput} />
                    <TextInput
                        value={userPassword}
                        onChangeText={(text) => setUserPassword(text)}
                        placeholder='Your password'
                        style={loginStyle.textInput} />
                    <TextInput
                        value={userConfirmPassword}
                        onChangeText={(text) => setUserConfirmPassword(text)}
                        placeholder='Confirm your password'
                        style={loginStyle.textInput} />
                    <Pressable
                        onPress={() => navigation.navigate("Login")}>
                        <Text style={{ color: "deepskyblue", marginVertical: 10 }}>Already have an account? Sign in</Text>
                    </Pressable>
                    <Pressable
                        onPress={createUser}
                        style={loginStyle.button}>
                        <Text style={{ color: "white" }}>Sign up</Text>
                    </Pressable>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default RegisterScreen;
