import { StyleSheet, Text, TextInput, TouchableOpacity, View, Pressable, Platform, ScrollView } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import { colors } from '../utils/colors';
import { fonts } from '../utils/fonts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

const SignupScreen = () => {
  const navigation = useNavigation();

  // States for form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [budgetLow, setBudgetLow] = useState('');
  const [budgetHigh, setBudgetHigh] = useState('');

  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }, selectedDate) => {
    if (type == 'set') {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === 'android') {
        toggleDatepicker();
        setDateOfBirth(currentDate.toISOString().split('T')[0]); // Format date for backend
      }
    } else {
      toggleDatepicker();
    }
  };

  // Function to handle sign-up and connect to backend
  const handleSignup = async () => {
    try {
      const payload = {
        firstName,
        lastName,
        email,
        password,
        dateOfBirth,
        gender,
        additionalInfo: budgetLow && budgetHigh ? { budget: { low: +budgetLow, high: +budgetHigh } } : undefined,
      };

      // const response = await axios.post('http://localhost:5001/api/users', payload);
        const response = await axios.post('http://10.0.2.2:5001/api/users', payload);
      if (response.status === 201) {
        alert('User registered successfully!');
        navigation.navigate('PROFILECREATION'); // Navigate to the profile creation screen
      }
    } catch (error) {
      console.error('Error during sign-up:', error.response?.data || error.message);
      alert(error.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Let's get </Text>
        <Text style={styles.headingText}>Started</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <MaterialIcons name={'drive-file-rename-outline'} size={30} color={colors.secondary} />
          <TextInput
            style={styles.textInput}
            placeholder="First Name"
            placeholderTextColor={colors.secondary}
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialIcons name={'drive-file-rename-outline'} size={30} color={colors.secondary} />
          <TextInput
            style={styles.textInput}
            placeholder="Last Name"
            placeholderTextColor={colors.secondary}
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name={'mail-outline'} size={30} color={colors.secondary} />
          <TextInput
            style={styles.textInput}
            placeholder="Email"
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
            placeholder="Password"
            placeholderTextColor={colors.secondary}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name={'calendar'} size={40} color={colors.secondary} />
          {!showPicker && (
            <Pressable onPress={toggleDatepicker}>
              <TextInput
                style={styles.textInput}
                placeholder="Date of Birth"
                value={dateOfBirth}
                placeholderTextColor={colors.secondary}
                editable={false}
              />
            </Pressable>
          )}
          {showPicker && (
            <DateTimePicker mode="date" display="spinner" value={date} onChange={onChange} />
          )}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Gender (e.g., Male/Female)"
            placeholderTextColor={colors.secondary}
            value={gender}
            onChangeText={setGender}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Budget Low (Optional)"
            placeholderTextColor={colors.secondary}
            keyboardType="numeric"
            value={budgetLow}
            onChangeText={setBudgetLow}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Budget High (Optional)"
            placeholderTextColor={colors.secondary}
            keyboardType="numeric"
            value={budgetHigh}
            onChangeText={setBudgetHigh}
          />
        </View>
        <TouchableOpacity style={styles.loginButtonWrapper} onPress={handleSignup}>
          <Text style={styles.loginText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20, // Add padding to ensure button is reachable
  },
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
});