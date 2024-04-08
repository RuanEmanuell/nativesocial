import React from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';

function InputAndLabel({label, value, setValue, placeholder} : {label: string, value: string, setValue : React.Dispatch<React.SetStateAction<string>>, placeholder: string}) {
    return (
        <>
            <Text style={{ color: "white", width: "90%", margin: 5 }}>{label}</Text>
            <TextInput
                value={value}
                onChangeText={(text) => setValue(text)}
                placeholder={placeholder}
                style={style.textInput}
                placeholderTextColor={"white"}
            />
        </>
    );
}

const style = StyleSheet.create({
    textInput: {
        width: "90%",
        borderWidth: 2,
        borderColor: "white",
        marginTop: 5,
        color: "white"
    }
});

export default InputAndLabel;
