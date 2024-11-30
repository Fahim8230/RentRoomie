import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import { colors } from '../utils/colors';
import { fonts } from '../utils/fonts';

const ProfileCreationScreen = () => {
  const navigation = useNavigation(); // Initialize navigation

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Profile</Text>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Gender:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your gender"
            placeholderTextColor={colors.secondary}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Age:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your age"
            placeholderTextColor={colors.secondary}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Bio:</Text>
          <TextInput
            style={[styles.textInput, styles.bioInput]}
            placeholder="Tell us about yourself"
            placeholderTextColor={colors.secondary}
            multiline
          />
        </View>
        <Button
          title="Done"
          onPress={() => navigation.navigate('HomeScreen')} // Navigate to HomeScreen
          color={colors.primary}
        />
      </View>
    </View>
  );
};

export default ProfileCreationScreen;

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
  formContainer: {
    marginTop: 10,
  },
  inputContainer: {
    marginVertical: 10,
    padding: 10,
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    color: colors.primary,
    fontFamily: fonts.Regular,
    marginBottom: 5,
  },
  textInput: {
    fontFamily: fonts.Light,
    fontSize: 16,
    color: colors.primary,
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top', // Ensures text starts at the top in multiline
  },
});
