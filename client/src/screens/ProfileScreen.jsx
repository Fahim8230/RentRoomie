import { StyleSheet, Text, View, Button, TextInput, ScrollView } from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../utils/colors';
import { fonts } from '../utils/fonts';
import {usePreferences} from "../utils/PreferencesContext";
import axios from "axios";

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

  const { preferences, setPreferences } = usePreferences();
  console.log("PREFS")
  console.log(preferences);
  const handleSave = async () => {
    const token = await AsyncStorage.getItem('token');
    //This is sample code for setting & getting prefs
    const setPrefs = await axios.put('http://10.0.2.2:5001/api/users/preferences', preferences, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(setPrefs.data)

  };

  return (
      <ScrollView style={styles.container} contentContainerStyle={{
        paddingBottom: 60
      }}>
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

        <View key={JSON.stringify(preferences.agePreference)} style={styles.preferenceContainer}>
          <Text style={styles.label}>Age Preference:</Text>
          <View style={styles.row}>
            <TextInput
                style={styles.input}
                placeholder="Min Age"
                keyboardType="numeric"
                value={preferences.agePreference.minAge.toString()}
                onChangeText={(text) =>
                    setPreferences({
                      ...preferences,
                      agePreference: { ...preferences.agePreference, minAge: parseInt(text) },
                    })
                }
            />
            <Text style={styles.toText}>to</Text>
            <TextInput
                style={styles.input}
                placeholder="Max Age"
                keyboardType="numeric"
                value={preferences.agePreference.maxAge.toString()}
                onChangeText={(text) =>
                    setPreferences({
                      ...preferences,
                      agePreference: { ...preferences.agePreference, maxAge: parseInt(text) },
                    })
                }
            />
          </View>
        </View>

        <View key={preferences.genderPreference.join(',')} style={styles.preferenceContainer}>
          <Text style={styles.label}>Gender Preference:</Text>
          <TextInput
              style={styles.input}
              placeholder="e.g., Male, Female"
              value={preferences.genderPreference.join(', ')} // Join array for display
              onChangeText={(text) => {
                const newGenderPreference = text.split(',').map(s => s.trim()); // Split into array
                setPreferences({ ...preferences, genderPreference: newGenderPreference });
              }}
          />
        </View>

        <View key={JSON.stringify(preferences.budgetPreference)} style={styles.preferenceContainer}>
          <Text style={styles.label}>Budget Preference:</Text>
          <View style={styles.row}>
            <TextInput
                style={styles.input}
                placeholder="Low"
                keyboardType="numeric"
                value={preferences.budgetPreference.low.toString()}
                onChangeText={(text) =>
                    setPreferences({
                      ...preferences,
                      budgetPreference: { ...preferences.budgetPreference, low: parseInt(text) },
                    })
                }
            />
            <Text style={styles.toText}>to</Text>
            <TextInput
                style={styles.input}
                placeholder="High"
                keyboardType="numeric"
                value={preferences.budgetPreference.high.toString()}
                onChangeText={(text) =>
                    setPreferences({
                      ...preferences,
                      budgetPreference: { ...preferences.budgetPreference, high: parseInt(text) },
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