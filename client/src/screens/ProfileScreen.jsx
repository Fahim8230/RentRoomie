import { StyleSheet, Text, View, Button, TextInput, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../utils/colors';
import { fonts } from '../utils/fonts';

const ProfileScreen = () => {
  const navigation = useNavigation();

  // Placeholder user data
  const userData = {
    gender: 'Not Specified',
    age: 'Not Specified',
    bio: 'No bio available.',
    preferences: {
      agePreference: {
        minAge: '',
        maxAge: '',
      },
      genderPreference: '',
      budgetPreference: {
        low: '',
        high: '',
      },
    },
  };

  const [preferences, setPreferences] = useState(userData.preferences);

  const handleSave = () => {
    // Handle save action
  };

  return (
    <ScrollView style={styles.container}>
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

      <Text style={styles.sectionHeader}>Preferences</Text>

      <View style={styles.preferenceContainer}>
        <Text style={styles.label}>Age Preference:</Text>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="Min Age"
            keyboardType="numeric"
            value={preferences.agePreference.minAge}
            onChangeText={(text) =>
              setPreferences({
                ...preferences,
                agePreference: { ...preferences.agePreference, minAge: text },
              })
            }
          />
          <Text style={styles.toText}>to</Text>
          <TextInput
            style={styles.input}
            placeholder="Max Age"
            keyboardType="numeric"
            value={preferences.agePreference.maxAge}
            onChangeText={(text) =>
              setPreferences({
                ...preferences,
                agePreference: { ...preferences.agePreference, maxAge: text },
              })
            }
          />
        </View>
      </View>

      <View style={styles.preferenceContainer}>
        <Text style={styles.label}>Gender Preference:</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Male, Female"
          value={preferences.genderPreference}
          onChangeText={(text) =>
            setPreferences({ ...preferences, genderPreference: text })
          }
        />
      </View>

      <View style={styles.preferenceContainer}>
        <Text style={styles.label}>Budget Preference:</Text>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="Low"
            keyboardType="numeric"
            value={preferences.budgetPreference.low}
            onChangeText={(text) =>
              setPreferences({
                ...preferences,
                budgetPreference: { ...preferences.budgetPreference, low: text },
              })
            }
          />
          <Text style={styles.toText}>to</Text>
          <TextInput
            style={styles.input}
            placeholder="High"
            keyboardType="numeric"
            value={preferences.budgetPreference.high}
            onChangeText={(text) =>
              setPreferences({
                ...preferences,
                budgetPreference: { ...preferences.budgetPreference, high: text },
              })
            }
          />
        </View>
      </View>

      <Button title="Save Preferences" onPress={handleSave} color={colors.primary} />
      
    </ScrollView>
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
  sectionHeader: {
    fontSize: 24,
    color: colors.primary,
    fontFamily: fonts.SemiBold,
    marginTop: 30,
    marginBottom: 10,
  },
  infoContainer: {
    marginBottom: 15,
  },
  preferenceContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: colors.secondary,
    fontFamily: fonts.Regular,
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    color: colors.primary,
    fontFamily: fonts.Light,
    marginTop: 5,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    fontFamily: fonts.Regular,
    fontSize: 16,
    color: colors.primary,
  },
  toText: {
    fontSize: 16,
    color: colors.secondary,
    alignSelf: 'center',
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});