import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from './styles';
import globalStyle from '../../styles/global.style';

import NavBar from '../../components/NavBar';
import MyButton from '../../components/MyButton';
import Requests from '../../components/Requests';
import Published from '../../components/Published';
import Borrowed from '../../components/Borrowed';
import Renting from '../../components/Renting';

const Manage = ({navigation, extraData}) => {
    return (
        <View style={[globalStyle.body, styles.manageContainer]}>
            <View style={globalStyle.container}>
                <MyButton
                    customStyle={styles.announceCta}
                    label='anunciar'
                    onPress={() => navigation.navigate('AddBook', { user:   extraData })}
                    />
            </View>
            <ScrollView styles={[globalStyle.scrollView, styles.accordion]}>
                <Requests ownerEmail={extraData.email}/>
                <Published ownerEmail={extraData.email} />
                <Borrowed ownerEmail={extraData.email} />
                <Renting ownerEmail={extraData.email} />
            </ScrollView>
            <NavBar navigation={navigation} extraData={extraData} />
        </View>
    );
};

export default Manage;