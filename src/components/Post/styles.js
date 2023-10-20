
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    card: {
        marginBottom: 16,
        marginTop: 8,
        flexDirection: 'row',
        borderRadius: 20,
        backgroundColor: '#D9D9D9',
        paddingVertical: 23,
        paddingHorizontal: 17,
        alignItems: 'flex-start',
        overflow: 'hidden'
    },
    title: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 8
    },
    subText: {
        color: '#413F3F',
        fontWeight: 'bold',
        fontSize: 8,
        fontStyle: 'italic'
    },
    info: {
        maxWidth: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        overflow: 'hidden',
    },
    desc: {
        maxWidth: 200,
    },
    text: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 12
    },
    cardInfo: {
        marginLeft: 12,
    }
});

export default styles