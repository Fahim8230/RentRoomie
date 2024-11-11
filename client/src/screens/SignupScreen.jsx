import { StyleSheet, Text, TextInput, TouchableOpacity, View, Pressable, Platform } from 'react-native'
import React, { useState } from 'react'
import {colors} from "../utils/colors";
import { fonts } from '../utils/fonts';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import DateTimePicker from "@react-native-community/datetimepicker";


const SignupScreen = () => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
  };
  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatepicker();
        setDateOfBirth(currentDate.toDateString());
      }
    }
    else{
      toggleDatepicker();
    }
  };

  return (
    <>
    <View style={styles.textContainer}>
      <Text style={styles.headingText}>Let's get </Text>
      <Text style={styles.headingText}>Started</Text>
    </View>
    
    <View style={styles.formContainer}>
      <View style={styles.inputContainer}>
        <MaterialIcons name={"drive-file-rename-outline"} size={30} color={colors.secondary}/>
        <TextInput style={styles.textInput} 
        placeholder='First Name' 
        placeholderTextColor={colors.secondary}
         />
      </View>
      <View style={styles.inputContainer}>
        <MaterialIcons name={"drive-file-rename-outline"} size={30} color={colors.secondary}/>
        <TextInput style={styles.textInput} 
        placeholder='Last Name' 
        placeholderTextColor={colors.secondary}
         />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons name={"mail-outline"} size={30} color={colors.secondary}/>
        <TextInput style={styles.textInput} 
        placeholder='Email' 
        placeholderTextColor={colors.secondary}
        keyboardType='email-address' />
      </View>
      <View style={styles.inputContainer}>
        <SimpleLineIcons name={"lock"} size={30} color={colors.secondary}/>
        <TextInput style={styles.textInput} 
        placeholder='Password' 
        placeholderTextColor={colors.secondary}
        secureTextEntry={true} />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons name={"calendar"} size={40} color={colors.secondary}/>
        {!showPicker && (
          <Pressable onPress={toggleDatepicker}>
          <TextInput style={styles.textInput} 
          placeholder='Date of Birth' 
          value={dateOfBirth}
          onChange={setDateOfBirth}
          placeholderTextColor={colors.secondary}
          editable={false}
          />
        </Pressable>
        )}
        {showPicker && (<DateTimePicker
          mode="date"
          display="spinner"
          value={date}
          onChange={onChange}
        />)}
      </View>
      <TouchableOpacity style={styles.loginButtonWrapper}>
        <Text style={styles.loginText}>Sign up</Text>
      </TouchableOpacity>
    </View>
    </>
  );
}

export default SignupScreen

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
      flexDirection: "row",
      alignItems: "center",
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
      textAlign: "center",
      padding: 10,

    },
    footerContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
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