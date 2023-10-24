import { StyleSheet } from 'react-native';

import { $dark_white, $black } from '../../styles/colors.style';

export default styles = StyleSheet.create({
    container: {
        backgroundColor: $black
    },
    removeCta: {
        backgroundColor: $dark_white,
        borderRadius: 60,
        height: 32,
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 16
    },
    publishedCtasText: {
        fontSize: 16,
        fontWeight: 'bold'
    }
});
