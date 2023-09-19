import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

const MyButton = ({ label, onPress  }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 13,
        backgroundColor: '#331E38', // Pode personalizar a cor de fundo aqui
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
      },
      label: {
        color: 'white', // Pode personalizar a cor do texto aqui
        fontSize: 16,
      },
});

export default MyButton;