import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

const MyButton = ({ label, customStyle, onPress, disabled  }) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled ? styles.disabledButton : null]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.label, customStyle, disabled ? styles.disabledLabel : null]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 13,
    backgroundColor: '#331E38',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  label: {
    color: 'white',
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: '#CABCBC',
  },
  disabledLabel: {
    color: '#331E38',
  },
});

export default MyButton;