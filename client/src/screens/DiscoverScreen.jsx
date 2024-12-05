import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../utils/colors';
import { fonts } from '../utils/fonts';

const DiscoverScreen = () => {
  const exampleCards = [
    {
      id: 1,
      name: 'Max',
      age: 3,
      image:
        'https://www.princeton.edu/sites/default/files/styles/1x_full_2x_half_crop/public/images/2022/02/KOA_Nassau_2697x1517.jpg?itok=Bg2K7j7J',
      bio: 'Max loves long walks in the park and playing fetch with his favorite ball.',
      likes: 'Long walks, treats, fetch',
      dislikes: 'Loud noises, baths',
      owners: 2,
      energy: 'High',
    },
    {
      id: 2,
      name: 'Lion',
      age: 5,
      image:
        'https://cdn.britannica.com/79/232779-050-6B0411D7/German-Shepherd-dog-Alsatian.jpg',
      bio: 'Lion is a loyal guardian who enjoys training sessions and treats.',
      likes: 'Training, running, treats',
      dislikes: 'Being ignored, small animals',
      owners: 3,
      energy: 'Medium',
    },
    {
      id: 3,
      name: 'Dexter',
      age: 7,
      image:
        'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1xw:0.99967xh;center,top&resize=1200:*',
      bio: 'Dexter is a playful companion with a knack for finding hidden treasures.',
      likes: 'Running, playing, adventures',
      dislikes: 'Loud noises, staying still',
      owners: 1,
      energy: 'High',
    },
    {
      id: 4,
      name: 'Oreo',
      age: 2,
      image:
        'https://images.squarespace-cdn.com/content/v1/54822a56e4b0b30bd821480c/45ed8ecf-0bb2-4e34-8fcf-624db47c43c8/Golden+Retrievers+dans+pet+care.jpeg',
      bio: 'Oreo is a bundle of joy who loves cuddles and belly rubs.',
      likes: 'Cuddles, treats, belly rubs',
      dislikes: 'Loud sounds, water',
      owners: 1,
      energy: 'Low',
    },
  ];

  const Card = ({ card }) => (
    <View style={styles.card}>
      <Image source={{ uri: card.image }} style={styles.cardImage} />
    </View>
  );

  const CardDetails = ({ card }) => (
    <ScrollView style={styles.cardDetails} contentContainerStyle={{ paddingBottom: 20 }}>
      <Text style={styles.cardName}>{card.name}</Text>
      <View style={styles.cardInfo}>
        <Ionicons name="paw" size={18} color={colors.primary} />
        <Text style={styles.cardAge}>{card.age} years old</Text>
      </View>
      <Text style={styles.cardBio}>{card.bio}</Text>

      <View style={styles.cardStats}>
        <Text style={styles.cardStatsText}>Likes: {card.likes}</Text>
        <Text style={styles.cardStatsText}>Dislikes: {card.dislikes}</Text>
        <Text style={styles.cardStatsText}>Number of Owners: {card.owners}</Text>
        <Text style={styles.cardStatsText}>Energy Level: {card.energy}</Text>
      </View>
    </ScrollView>
  );

  const [index, setIndex] = useState(0);

  const onSwiped = () => {
    setIndex(index + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.swiperContainer}>
        <Swiper
          cards={exampleCards}
          cardIndex={index}
          renderCard={(card) => <Card card={card} />}
          onSwiped={onSwiped}
          stackSize={1}
          animateOverlayLabelsOpacity
          infinite
          animateCardOpacity
          backgroundColor={'transparent'}
          overlayLabels={{
            left: {
              title: 'NOPE',
              style: {
                label: {
                  backgroundColor: '#ff0000',
                  color: colors.white,
                  fontSize: 24,
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  marginTop: 20,
                  marginLeft: -20,
                },
              },
            },
            right: {
              title: 'LIKE',
              style: {
                label: {
                  backgroundColor: '#006400',
                  color: colors.white,
                  fontSize: 24,
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  marginTop: 20,
                  marginLeft: 20,
                },
              },
            },
          }}
        />
      </View>
      <View style={styles.bottomContainer}>
        <CardDetails card={exampleCards[index]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  card: {
    flex: 0.45,
    borderRadius: 8,
    shadowRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 0 },
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 2,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    resizeMode: 'cover',
  },
  swiperContainer: {
    flex: 0.65,
  },
  bottomContainer: {
    flex: 0.35,
  },
  cardDetails: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.lightGray,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  cardName: {
    fontFamily: fonts.Bold,
    fontSize: 28,
    color: colors.primary,
    marginBottom: 10,
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  cardAge: {
    fontFamily: fonts.Regular,
    fontSize: 18,
    color: colors.darkGray,
    marginLeft: 5,
  },
  cardBio: {
    fontFamily: fonts.Regular,
    fontSize: 16,
    color: colors.darkGray,
    textAlign: 'center',
    marginTop: 10,
  },
  cardStats: {
    marginTop: 20,
  },
  cardStatsText: {
    fontFamily: fonts.Regular,
    fontSize: 16,
    color: colors.darkGray,
    marginBottom: 5,
    textAlign: 'center',
  },
});

export default DiscoverScreen;