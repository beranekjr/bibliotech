import { StyleSheet } from 'react-native';

const $white = '#D9D9D9';
const $black = '#331E38';

export default styles = StyleSheet.create({
    requestsCtaContainer: {
        // backgroundColor: 'white',
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
        backgroundColor: $white
    },
    rejectCta: {
        backgroundColor: $black,
        borderColor: $white,
        borderWidth: 2,
    },
    rejectCtaText: {
        color: $white
    }
});
