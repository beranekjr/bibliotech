import { StyleSheet } from "react-native";

import { $dark_white, $white } from "../../styles/colors.style";

export default styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'center',
        marginTop: 128,
        alignSelf: 'center',
        width: 300,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    footer: {
        // flex: 1
    },
    inputLabel: {
        color: $white,
        fontWeight: 'bold',
    },
    inputDisclaimer: {
        fontStyle: 'italic',
        color: $white,
        marginBottom: 16,
        fontSize: 12
    },
    logoutCta: {
        fontWeight: 'bold',
        fontSize: 20,
        color: $dark_white,
        alignSelf: 'center'
    }
});
