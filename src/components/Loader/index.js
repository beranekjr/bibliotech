import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import styles from './styles';

const Loader = () => {
  return <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#FFF" />
    </View>;
};

export default Loader;