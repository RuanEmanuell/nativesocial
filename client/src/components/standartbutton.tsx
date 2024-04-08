import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

function StandartButton({label, onPress, backgroundColor, color} : {label: string, onPress : () => void, backgroundColor:string, color: string}) {
  return (
        <Pressable
        onPress={onPress}
        style={[style.button, {backgroundColor : backgroundColor}]}>
        <Text style={{ color: color, fontWeight: "bold" }}>{label}</Text>
      </Pressable>
    );
}

const style = StyleSheet.create({
  button: {
      marginTop: 5,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
  }
});

export default StandartButton;
