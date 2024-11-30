import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import { colors } from '../utils/colors';
import { fonts } from '../utils/fonts';

const ProfileScreen = () => {
  const navigation = useNavigation(); // Initialize navigation

  // Placeholder user data
  const userData = {
    gender: 'Not Specified',
    age: 'Not Specified',
    bio: 'No bio available.',
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Your Profile</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Gender:</Text>
        <Text style={styles.value}>{userData.gender}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Age:</Text>
        <Text style={styles.value}>{userData.age}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Bio:</Text>
        <Text style={styles.value}>{userData.bio}</Text>
      </View>
      <Button
        title="Edit Profile"
        onPress={() => navigation.navigate('ProfileCreationScreen')} // Navigate to ProfileCreationScreen
        color={colors.primary}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  headingText: {
    fontSize: 32,
    color: colors.primary,
    fontFamily: fonts.SemiBold,
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: colors.secondary,
    fontFamily: fonts.Regular,
  },
  value: {
    fontSize: 18,
    color: colors.primary,
    fontFamily: fonts.Light,
    marginTop: 5,
  },
});
