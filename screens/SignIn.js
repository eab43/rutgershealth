import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify';
import { SafeAreaView, SafeAreaProvider, } from 'react-native-safe-area-context';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
export default function SignIn({ navigation, updateAuthState }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function signIn() {
        try {
            await Auth.signIn(username, password);
            console.log(' Success');
            updateAuthState('loggedIn');
        }   catch (error) {
            console.log(' Error signing in...', error);
        }
    }
    return (
        <SafeAreaProvider style={styles.safeAreaContainer}>
            <View style={styles.container}>
              <Text style={styles.title}>Sign in to your account</Text>
                <AppTextInput
                    value={username}
                    onChangeText={text => setUsername(text)}
                    leftIcon="account"
                    placeholder="Enter username"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                />
                <AppTextInput
                    value={password}
                    onChangeText={text => setPassword(text)}
                    leftIcon="lock"
                    placeholder="Enter password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry
                    textContentType="password"
                />
                <AppButton title="Login" onPress={signIn} />
                <View style={styles.footerButtonContainer}>
                  <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.forgotPasswordButtonText}>
                        Don't have an account? Sign Up
                    </Text>
                  </TouchableOpacity>
                </View>
            </View>
        </SafeAreaProvider>
    );
}
const styles = StyleSheet.create({

      safeAreaContainer: {
        flex: 1,
        backgroundColor: 'rgb(66, 164, 227)'
      },
      container: {
        flex: 1,
        alignItems: 'center'
      },
      title: {
        fontSize: 20,
        color: '#202020',
        fontWeight: '500',
        marginVertical: 15
      },
      footerButtonContainer: {
        marginVertical: 15,
        justifyContent: 'center',
        alignItems: 'center'
      },
      forgotPasswordButtonText: {
        color: 'tomato',
        fontSize: 18,
        fontWeight: '600'
      }
    });