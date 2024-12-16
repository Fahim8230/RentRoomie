import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../utils/colors';
import {fonts} from '../utils/fonts';
import {usePreferences} from '../utils/PreferencesContext';
import axios from 'axios';

const ProfileScreen = () => {
  const navigation = useNavigation();

  // Placeholder user data
  const userPrefs = {
    agePreference: {
      minAge: 20,
      maxAge: 35,
    },
    budgetPreference: {
      low: 500,
      high: 4000,
    },
    genderPreference: ['male', 'female', 'non-binary'],
    bio: 'No bio available.',
  };

  const {preferences, setPreferences} = usePreferences();
  if (!preferences) {
    setPreferences(userPrefs);
  }

  // Local state for preferences
  const [localAgeMin, setLocalAgeMin] = useState(preferences.agePreference.minAge.toString());
  const [localAgeMax, setLocalAgeMax] = useState(preferences.agePreference.maxAge.toString());
  const [localGenderPreference, setLocalGenderPreference] = useState(preferences.genderPreference.join(', '));
  const [localBudgetLow, setLocalBudgetLow] = useState(preferences.budgetPreference.low.toString());
  const [localBudgetHigh, setLocalBudgetHigh] = useState(preferences.budgetPreference.high.toString());
  const [localBio, setLocalBio] = useState(preferences.bio);

  // Local state for bio

  const handleSave = async () => {
    const token = await AsyncStorage.getItem('token');

    // Update preferences
    const newPreferences = {
      bio: localBio,
      agePreference: {
        minAge: parseInt(localAgeMin) || '',
        maxAge: parseInt(localAgeMax) || '',
      },
      genderPreference: localGenderPreference.split(',').map(s => s.trim()),
      budgetPreference: {
        low: parseInt(localBudgetLow) || '',
        high: parseInt(localBudgetHigh) || '',
      },
    };

    setPreferences(newPreferences);

    // Make network request
    try {
      const setPrefs = await axios.put('http://10.0.2.2:5001/api/users/preferences', newPreferences, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(setPrefs.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
      <ScrollView style={styles.container} contentContainerStyle={{
        paddingBottom: 60
      }}>
        <Text style={styles.headingText}>Your Profile</Text>
        {/*<View style={styles.infoContainer}>*/}
        {/*  <Text style={styles.label}>Gender:</Text>*/}
        {/*  <Text style={styles.value}>{userData.gender}</Text>*/}
        {/*</View>*/}
        {/*<View style={styles.infoContainer}>*/}
        {/*  <Text style={styles.label}>Age:</Text>*/}
        {/*  <Text style={styles.value}>{userData.age}</Text>*/}
        {/*</View>*/}
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Bio:</Text>
          <TextInput
              style={styles.bioInput}
              multiline
              numberOfLines={4}
              placeholder="Enter your bio"
              value={localBio}
              onChangeText={setLocalBio}
          />
        </View>

        <Text style={styles.sectionHeader}>Preferences</Text>

        <View style={styles.preferenceContainer}>
          <Text style={styles.label}>Age Preference:</Text>
          <View style={styles.row}>
            <TextInput
                style={styles.input}
                placeholder="Min Age"
                keyboardType="numeric"
                value={localAgeMin}
                onChangeText={setLocalAgeMin}
            />
            <Text style={styles.toText}>to</Text>
            <TextInput
                style={styles.input}
                placeholder="Max Age"
                keyboardType="numeric"
                value={localAgeMax}
                onChangeText={setLocalAgeMax}
            />
          </View>
        </View>

        <View style={styles.preferenceContainer}>
          <Text style={styles.label}>Gender Preference:</Text>
          <TextInput
              style={styles.input}
              placeholder="e.g., Male, Female"
              value={localGenderPreference}
              onChangeText={setLocalGenderPreference}
          />
        </View>

        <View style={styles.preferenceContainer}>
          <Text style={styles.label}>Budget Preference:</Text>
          <View style={styles.row}>
            <TextInput
                style={styles.input}
                placeholder="Low"
                keyboardType="numeric"
                value={localBudgetLow}
                onChangeText={setLocalBudgetLow}
            />
            <Text style={styles.toText}>to</Text>
            <TextInput
                style={styles.input}
                placeholder="High"
                keyboardType="numeric"
                value={localBudgetHigh}
                onChangeText={setLocalBudgetHigh}
            />
          </View>
        </View>

        <Button title="Save Changes" onPress={handleSave} color={colors.primary} />

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
  bioInput: {
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 5,
    padding: 10,
    fontFamily: fonts.Regular,
    fontSize: 16,
    color: colors.primary,
    backgroundColor: '#f0f0f0',
    textAlignVertical: 'top',
  },
});