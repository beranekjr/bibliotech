import { StyleSheet } from "react-native";

import { $light_blue, $white, $black } from './colors.style';

export default styles = StyleSheet.create({
    body: {
        backgroundColor: $light_blue,
        flex: 1,
    },
    scrollView: {
        marginBottom: 64
    },
    container: {
        padding: 20,
        marginTop: 60
    },
    mb1: {
        marginBottom: 12,
    },
    mb5: {
        marginBottom: 32,
    },
    text: {
        textAlign: 'center',
        color: $white,
        fontSize: 20,
        marginBottom: 10,
        marginTop: 10,
    },
    title: {
        textAlign: 'center',
        color: $white,
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    logo: {
        textAlign: 'center',
        color: $white,
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 10,
        padding: 20,
        borderRadius: 22,
        backgroundColor: $black,
    },
    manageItemContainer: {
        padding: 0,
        backgroundColor: $black,
        marginVertical: 16,
        marginHorizontal: 16,
        borderRadius: 15,
    },
    collapsedContainer: {
        padding: 8,
        paddingTop: 16,
        paddingBottom: 16,
        borderRadius: 10
    },
    collapsedContainerView: {
        flex:1
    },
    collapsableCta: {
        height: 50,
        alignSelf: 'flex-start',
        fontSize: 24,
        paddingLeft: 12,
        fontWeight: '500'
    }
});
