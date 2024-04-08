import React, { useState } from 'react';
import { Text, Pressable, TextInput, KeyboardAvoidingView, Platform, ScrollView, SafeAreaView } from 'react-native';
import Snackbar from 'react-native-snackbar';
import loginStyle from '../styles/login';
import InputAndLabel from '../components/inputlabel';
import StandartButton from '../components/standartbutton';

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
                    <InputAndLabel
                        label="Confirm Password"
                        value={userConfirmPassword}
                        setValue={setUserConfirmPassword}
                        placeholder="Confirm your password..."
                    />
                    <Pressable
                        onPress={() => navigation.navigate("Login")}>
                        <Text style={{ color: "white", marginVertical: 10 }}>Already have an account? Sign in</Text>
                    </Pressable>
                    <StandartButton
                        onPress={createUser}
                        backgroundColor="white"
                        color="deepskyblue"
                        label="Sign up"
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default RegisterScreen;
