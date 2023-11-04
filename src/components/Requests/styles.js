import { StyleSheet } from 'react-native';

import { $dark_white, $black } from '../../styles/colors.style';

export default styles = StyleSheet.create({
    requestsCtaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    requestsCtas: {
        width: '42%',
        height: 34,
        margin: 8,
        borderRadius: 15,
    },
    requestsCtasText: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    acceptCta: {
        backgroundColor: $dark_white
    },
    rejectCta: {
        backgroundColor: $black,
        borderColor: $dark_white,
        borderWidth: 2,
    },
    rejectCtaText: {
        color: $dark_white
    }
});
