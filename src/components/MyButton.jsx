import React from 'react';
import { TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import up from '../../assets/up.png';
import down from '../../assets/down.png';
const MyButton = ({ label, customStyle, onPress, disabled,  isCollaps, collapsed}) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled ? styles.disabledButton : null, isCollaps ? styles.collaps : null]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.label, customStyle, disabled ? styles.disabledLabel : null]}>
        {label}
      </Text>
      {isCollaps? (
        <Image
          source={collapsed ?  down : up}
        />
      ): null}

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
  collaps: {
    justifyContent: "space-between",
    flexDirection: "row"
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