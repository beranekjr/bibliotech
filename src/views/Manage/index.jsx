import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import globalStyle from '../../styles/global.style';

import MyButton from '../../components/MyButton';
import Requests from '../../components/Requests';
import Published from '../../components/Published';
import Borrowed from '../../components/Borrowed';
import Renting from '../../components/Renting';
import NavBar from '../../components/NavBar';

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
            <View
                StickyHeaderComponent={true}
                styles={[globalStyle.scrollView, styles.accordion]}>
                <Requests navigation={navigation} ownerEmail={extraData.email}/>
                <Published navigation={navigation} ownerEmail={extraData.email} />
                <Borrowed navigation={navigation} ownerEmail={extraData.email} />
                <Renting navigation={navigation} ownerEmail={extraData.email} />
            </View>
            <NavBar navigation={navigation} extraData={extraData} />
        </View>
    );
};

export default Manage;