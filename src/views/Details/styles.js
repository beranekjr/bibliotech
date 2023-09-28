
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        borderRadius: 20,
        backgroundColor: '#D9D9D9', // Pode personalizar a cor de fundo aqui
        paddingVertical: 23,
        paddingHorizontal: 17,
        alignItems: 'flex-start',
        gap: 25
      },
      title: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 15
      },
      subText: {
        color: '#413F3F',
        fontWeight: 'bold',
        fontSize: 8,
        fontStyle: 'italic'
      },
      info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      text: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 10
      },
});

export default styles