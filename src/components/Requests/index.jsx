import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Collapsible from 'react-native-collapsible';

import styles from './styles';
import globalStyle from '../../styles/global.style';

import MyButton from '../MyButton';
import Post from '../Post';

import RequestsCtas from '../RequestsCtas';

const Requests = () => {

    const book = {
        "creationDate": "2023-10-20T01:19:04.559Z",
        "description": "Harry potter e as relíquias da morte. Livro em bom estado e não muito desgastado ",
        "local": "Benfica",
        "name": "Harry Potter",
        "owner": "florian@ahhaa.com",
        "pending": false,
        "rentTime": "11",
        "uid": "32ec1007-994b-4639-b0f9-7f49a90af4d7",
        "user": ""
    }

    const [isCollapsed, setCollapsed] = useState(false);

    return <View style={[globalStyle.container, styles.container]}>
        <MyButton
            customStyle={styles.collapsableCta}
            label='Solicitacoes'
            onPress={() => setCollapsed(!isCollapsed)}
        />
        <Collapsible
            style={styles.collapsedContainer}
            collapsed={isCollapsed}>
            <View style={styles.collapsedContainer}>
                <Post book={book}></Post>
                <RequestsCtas book={book}/>
            </View>
        </Collapsible>
    </View>
}

export default Requests;