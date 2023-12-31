import React from 'react';
import { TextInput, StyleSheet, Text, View } from 'react-native';

const MyInput = ({ placeholder, value, onChangeText, labelName, type, customStyle, maxLength }) => {
    return (
        <View>
            <Text>{labelName}</Text>
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                style={[styles.input, customStyle]}
                keyboardType={type}
                maxLength={maxLength || '50'}
                secureTextEntry={placeholder === 'senha'}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 44,
        borderColor: '#FFFBFB',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: 'rgb(222 220 190)',
        borderRadius: 13,
    },
});

export default MyInput;