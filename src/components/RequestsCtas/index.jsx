import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

import { acceptSolicitation, rejectSolicitation } from '../../hooks/booksRent';

const RequestsCtas = ({ book }) => {

    const acceptBookSolicitation = () => {
        acceptSolicitation(book.uid, () => {
            console.log('aceitado com sucesso');
        })
    }

    const rejectBookSolicitation = () => {
        rejectSolicitation(book.uid, () => {
            console.log('rejeitado com sucesso')
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