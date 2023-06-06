import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View,ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import HomeScreen from './HomeScreen';

const LoginScreen = () => {
  const [focused, setFocused] = useState(false);
  const navigation = useNavigation();

  return (
    <ScrollView>
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Login here</Text>
          <Text style={styles.subtitle}>Welcome back, you've been missed!</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholderTextColor="dark"
            style={[
              styles.input,
              focused && styles.inputFocused,
            ]}
          />
          <TextInput
            placeholder="Password"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholderTextColor="dark"
            style={[
              styles.input,
              focused && styles.inputFocused,
            ]}
          />
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.button}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.createAccountText}>Create new account</Text>
        </TouchableOpacity>

        <View style={styles.socialContainer}>
          <Text style={styles.socialText}>Or continue with</Text>
          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-google" color="black" size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-apple" color="black" size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-facebook" color="black" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
        </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10 * 2,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 10 * 3,
  },
  title: {
    fontSize: 50,
    color: 'blue',
    fontFamily: 'bold',
    marginVertical: 10 * 3,
  },
  subtitle: {
    fontFamily: 'poppins-semiBold',
    fontSize: 20,
    maxWidth: '60%',
    textAlign: 'center',
  },
  inputContainer: {
    marginVertical: 10 * 3,
  },
  input: {
    fontFamily: 'poppins-regular',
    fontSize: 14,
    padding: 10 * 2,
    backgroundColor: '#f1f4ff',
    borderRadius: 10,
    marginVertical: 10,
  },
  inputFocused: {
    borderWidth: 3,
    borderColor: '#1F41BB',
    shadowOffset: { width: 4, height: 10 },
    shadowColor: '#1F41BB',
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  button: {
    padding: 10 * 2,
    backgroundColor: 'blue',
    marginVertical: 10 * 3,
    borderRadius: 10,
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  buttonText: {
    fontFamily: 'poppins-bold',
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
  createAccountText: {
    fontFamily: 'poppins-regular',
    fontSize: 14,
    color: 'blue',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  socialContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10 * 4,
  },
  socialText: {
    fontFamily: 'poppins-regular',
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
    marginBottom: 10,
  },
  socialButtons: {
    flexDirection: 'row',
  },
  socialButton: {
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'black',
  },
});

export default LoginScreen;
