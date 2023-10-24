import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

const CollapsibleComponent = ({ content }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapsible = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleCollapsible}>
                <Text style={styles.toggleButton}>
                    {isCollapsed ? 'Expandir' : 'Recolher'}
                </Text>
            </TouchableOpacity>
            <Animatable.View
                animation={isCollapsed ? 'fadeOutUp' : 'fadeInDown'}
                duration={500}
                style={styles.content}
            >
                {content}
            </Animatable.View>
        </View>
    );
};

export default CollapsibleComponent;
