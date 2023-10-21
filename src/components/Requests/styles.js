import { StyleSheet } from 'react-native';

const $black = '#331E38';

export default styles = StyleSheet.create({
    container: {
        backgroundColor: $black,
        margin: 16,
        borderRadius: 15
    },
    collapsableCta: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    collapsedContainer: {
        padding: 8,
        paddingTop: 16,
        paddingBottom: 16,
        borderRadius: 10
    }
});
