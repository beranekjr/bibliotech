import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

import { acceptSolicitation, rejectSolicitation } from '../../hooks/booksRent';

const RequestsCtas = ({ book, onPress }) => {
    const acceptBookSolicitation = () => {
        acceptSolicitation(book.referenceId, () => {
            onPress({ success: true });
        })
    }

    const rejectBookSolicitation = () => {
        rejectSolicitation(book.referenceId, () => {
            onPress({ success: true });
        })
    }

    return <View style={styles.requestsCtaContainer}>
        <TouchableOpacity
            style={[styles.requestsCtas, styles.acceptCta]}
            onPress={acceptBookSolicitation}
        >
            <Text style={styles.requestsCtasText}>
                aceitar
            </Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={[styles.requestsCtas, styles.rejectCta]}
            onPress={rejectBookSolicitation}
        >
            <Text style={[styles.requestsCtasText, styles.rejectCtaText]}>
                rejeitar
            </Text>
        </TouchableOpacity>
    </View>;
}

export default RequestsCtas;