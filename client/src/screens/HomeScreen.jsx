import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {colors} from "../utils/colors";
import { fonts } from '../utils/fonts';
import { useNavigation } from '@react-navigation/native';

function HomeScreen() {
  const navigation = useNavigation();
  const handleLogin = () => {
    navigation.navigate("LOGIN");
  };
  const handleSignup = () => {
    navigation.navigate("SIGNUP");
  }
  return (
    <View style={styles.container}>
      <Image source={require("../assets/RentaRoomie_transparent.png")} style={styles.logo} tintColor={"black"}/>
      <Image source={require("../assets/friends_together.jpg")} style={styles.bannerImage}/>
      <Text style={styles.title}>Find Your Match</Text>
      <View style={styles.buttonContainer}> 
        <TouchableOpacity style= {[styles.loginButtonWrapper, {backgroundColor: colors.primary},]}
        onPress={handleLogin}>
          <Text style= {styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {[styles.loginButtonWrapper]} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>Sign-up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
  },
  logo: {
    height: 40,
    width: 300,
    marginVertical: 40,
  },
  bannerImage: {
    marginVertical: -40,
    height: 250,
    width: 231,
  },
  title: {
    fontSize: 36,
    fontFamily: fonts.SemiBold,
    marginVertical: 70,
    textAlign: "center",
    color: colors.primary,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    borderWidth: 1,
    borderColor: colors.primary,
    width: "80%",
    height: 60,
    borderRadius: 100,
  },
  loginButtonWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    borderRadius: 98,
  },
  loginButtonText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: fonts.SemiBold,
  },
  signupButtonText: {
    fontSize: 18,
    fontFamily: fonts.SemiBold,
  },
});