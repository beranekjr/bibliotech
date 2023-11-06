import React, { useState } from 'react'
import { View, Dimensions, Image } from 'react-native'
import styles from './styles'
import Carousel, { Pagination } from 'react-native-snap-carousel';

function carouselItem({item, index}) {
    return (
        <View key={index}>
            <Image style={styles.image} source={{uri: item.url}}/>
        </View>
    )
}

const Slide = ({ items, config}) => {
    const widthSlide = config?.width ? config.width : Dimensions.get('window').width
    const widthItem = widthSlide
    const [activeSlide, setActiveSlide] = useState(0);
    const layout = config?.layout ? config.layout : 'default';

    console.log('aqui', items)

    return (
        <View>
            <Carousel
                layout={layout}
                data={items}
                renderItem={carouselItem}
                sliderWidth={widthSlide}
                itemWidth={widthItem}
                useScrollView={true}
                onSnapToItem={(index) => setActiveSlide(index)}
            />
            <Pagination
                dotsLength={items.length}
                activeDotIndex={activeSlide}
                containerStyle={{ marginTop: -16 }}
                dotStyle={{
                    width: 12,
                    height: 12,
                    borderRadius: 50,
                    backgroundColor: '#D9D9D9',
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        </View>
    );
};

export default Slide;