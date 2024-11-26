import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {colors} from "../utils/colors";
import { fonts } from '../utils/fonts';
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from '@react-navigation/native';

//Login Screen for RentRoomie
const LoginScreen = () => {

  const navigation = useNavigation();
  const handleContainer = () => {
    navigation.navigate("CONTAINER");
  }

  return (
    <>
    <View style={styles.textContainer}>
      <Text style={styles.headingText}>Hey,</Text>
      <Text style={styles.headingText}>Welcome</Text>
      <Text style={styles.headingText}>Back</Text>
    </View>
    
    <View style={styles.formContainer}>
      <View style={styles.inputContainer}>
        <Ionicons name={"mail-outline"} size={30} color={colors.secondary}/>
        <TextInput style={styles.textInput} 
        placeholder='Enter your email' 
        placeholderTextColor={colors.secondary}
        keyboardType='email-address' />
      </View>
      <View style={styles.inputContainer}>
        <SimpleLineIcons name={"lock"} size={30} color={colors.secondary}/>
        <TextInput style={styles.textInput} 
        placeholder='Enter your password' 
        placeholderTextColor={colors.secondary}
        secureTextEntry={true} />
      </View>
      <TouchableOpacity style={styles.loginButtonWrapper} onPress={handleContainer}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.footerContainer}>
        <Text style={styles.accountText}>Don't have an account?</Text>
        <Text style={styles.signupText}> Sign up</Text>
      </View>
    </View>
    </>
  );
}

export default LoginScreen

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