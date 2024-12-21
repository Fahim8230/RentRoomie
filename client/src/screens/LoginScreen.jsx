import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { colors } from '../utils/colors';
import { fonts } from '../utils/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import {usePreferences} from "../utils/PreferencesContext";
import {apiURL} from "../utils/utils";

const LoginScreen = () => {
  const navigation = useNavigation();

  // States for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setPreferences, preferences} = usePreferences();
  // Function to handle login
  const handleLogin = async () => {
    try {
      // Prepare the payload
      const payload = { email, password };
  
      // Make the POST request to the backend
      const response = await axios.post(apiURL + '/api/users/login', payload);
  
      // Store the JWT token using AsyncStorage
      const { token } = response.data;
      await AsyncStorage.setItem('token', token);

      // //This is sample code for setting & getting prefs
      // const setPrefs = await axios.put('http://10.0.2.2:5001/api/users/preferences',{
      //   "agePreference": {
      //     "minAge": 20,
      //     "maxAge": 35
      //   },
      //   "genderPreference": ["male", "female", "non-binary"],
      //   "budgetPreference": {
      //     "low": 500,
      //     "high": 2000
      //   }
      // }, {
      //   headers: {
      //     Authorization: `Bearer ${token}`
      //   }
      // });
      // console.log(setPrefs.data)

      const preferencesResponse = await axios.get(apiURL + '/api/users/preferences', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!preferencesResponse.data || Object.keys(preferencesResponse.data).length === 0) {
        const defaultPrefs = {
          agePreference: {
            minAge: 18,
            maxAge: 100
          },
          genderPreference: ["male", "female", "non-binary"],
          budgetPreference: {
            low: 0,
            high: 10000
          },
          bio: ""
        };
        preferencesResponse.data = defaultPrefs;
      }
      console.log(preferencesResponse.data);
      setPreferences(preferencesResponse.data);
      console.log(preferences);
      //End of sample code

      await AsyncStorage.setItem('preferences', JSON.stringify(preferencesResponse.data));
      // Navigate to the container screen
      navigation.navigate('CONTAINER');
    } catch (error) {
      console.error('Error during login:', error.response?.data || error.message);
      alert(error.response?.data?.error || 'Login failed. Please check your email and password.');
    }
  };

  return (
    <>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Hey,</Text>
        <Text style={styles.headingText}>Welcome</Text>
        <Text style={styles.headingText}>Back</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name={'mail-outline'} size={30} color={colors.secondary} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your email"
            placeholderTextColor={colors.secondary}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <SimpleLineIcons name={'lock'} size={30} color={colors.secondary} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your password"
            placeholderTextColor={colors.secondary}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity style={styles.loginButtonWrapper} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.footerContainer}>
          <Text style={styles.accountText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SIGNUP')}>
            <Text style={styles.signupText}> Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  textContainer: {
    marginVertical: 30,
    marginHorizontal: 20,
  },
  headingText: {
    fontSize: 32,
    color: colors.primary,
    fontFamily: fonts.SemiBold,
  },
  formContainer: {
    marginTop: 20,
    padding: 10,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 100,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontFamily: fonts.Light,
  },
  loginButtonWrapper: {
    backgroundColor: colors.primary,
    borderRadius: 100,
    marginTop: 40,
  },
  loginText: {
    color: colors.white,
    fontSize: 20,
    fontFamily: fonts.SemiBold,
    textAlign: 'center',
    padding: 10,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    gap: 2,
  },
  accountText: {
    color: colors.primary,
    fontFamily: fonts.Regular,
  },
  signupText: {
    color: colors.primary,
    fontFamily: fonts.Bold,
  },
});