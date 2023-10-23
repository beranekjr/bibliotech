import React from 'react';
import { View, ScrollView } from 'react-native';
import styles from './styles';
import globalStyle from '../../styles/global.style';

import NavBar from '../../components/NavBar';
import MyButton from '../../components/MyButton';
import Requests from '../../components/Requests';

const Manage = ({navigation, extraData}) => {
    return (
        <View style={globalStyle.body}>
            <View>
                <View style={globalStyle.container}>
                    <MyButton
                        customStyle={styles.announceCta}
                        label='anunciar'
                        onPress={() => navigation.navigate('AddBook', { user:   extraData })}
                    />
                    </View>
                    <View styles={styles.accordion}>
                        <Requests ownerEmail={extraData.email}/>
                    </View>
            </View>
            <NavBar navigation={navigation} extraData={extraData} />
        </View>
    );
};

export default Manage;