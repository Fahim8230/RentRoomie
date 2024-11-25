import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from "../utils/colors";
import { fonts } from '../utils/fonts';

const LikeScreen = () => {

  const exampleCards = [
    { id: 1, name: 'Max', age: 3,  image: 'https://www.princeton.edu/sites/default/files/styles/1x_full_2x_half_crop/public/images/2022/02/KOA_Nassau_2697x1517.jpg?itok=Bg2K7j7J' },
    { id: 2, name: 'Lion', age: 5,  image: 'https://cdn.britannica.com/79/232779-050-6B0411D7/German-Shepherd-dog-Alsatian.jpg' },
    { id: 3, name: 'Dexter', age: 7, image: 'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1xw:0.99967xh;center,top&resize=1200:*' },
    { id: 4, name: 'Oreo', age: 2, image: 'https://images.squarespace-cdn.com/content/v1/54822a56e4b0b30bd821480c/45ed8ecf-0bb2-4e34-8fcf-624db47c43c8/Golden+Retrievers+dans+pet+care.jpeg' },
  ];


  const Card = ({card}) => (
    <View style={styles.card}>
      <Image source={{uri: card.image}} style={styles.cardImage}/>
    </View>
  )
  const CardDetails = ({card}) => (
    <View style={styles.cardDetails}>
      <Text style={styles.text}>{card.name}</Text>
      <Text style={styles.text}> • {card.age}</Text>
    </View>
  )
  const [index, setIndex] = React.useState(0);
  const onSwiped = () => {
    setIndex(index + 1);
  };


  return (
    <View style={styles.container}>
      <View style={styles.swiperContainer}>
        <Swiper
          cards={exampleCards}
          cardIndex={index}
          renderCard={(card) => <Card card={card}/>}
          onSwiper={onSwiped}
          stackSize={4}
          stackScale={4}
          stackSeparation={2}
          animateOverlayLabelsOpacity
          animateCardOpacity 
          backgroundColor={'transparent'}
          overlayLabels={{
            left: {
              title: 'NOPE',
              style: {
                label: {
                  backgroundColor: '#ff0000',
                  color: colors.white,
                  fontSize: 24
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  marginTop: 20,
                  marginLeft: -20,
                }
              }
            },
            right: {
              title: 'MATCH',
              style: {
                label: {
                  backgroundColor: '#006400',
                  color: colors.white,
                  fontSize: 24
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  marginTop: 20,
                  marginLeft: 20,
                }
              }
            },
          }}
        />
      </View>
      <View style={styles.bottomContainer}>
        <CardDetails card={exampleCards[index]}/>
      </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  card: {
    flex: 0.45,
    borderRadius: 8,
    shadowRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: {width: 0, height: 0},
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',

  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    resizeMode: 'contain',
  },
  swiperContainer: {
    flex: 0.55,
  },
  bottomContainer: {
    flex: 0.45,
  },
  cardDetails: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
  },
  text: {
    fontFamily: fonts.Regular,
    fontSize: 24,

  },

});

export default LikeScreen;
