
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, Dimensions, StyleSheet, Image  } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Amplify, { Auth, Analytics } from 'aws-amplify';
import {  DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AnimatedSplash from "react-native-animated-splash-screen";
import config from './aws-exports';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import ConfirmSignUpScreen from './screens/ConfirmSignUpScreen';
import MainAppNavigator from './navigation/MainAppNavigator';
import ProfileScreen from './screens/AppMainScreen/profileScreen';

import AppLoading from 'expo-app-loading';
import { useFonts, Pacifico_400Regular } from '@expo-google-fonts/pacifico';

Amplify.configure(config);

const AuthenticationStack = createStackNavigator();
const AppStack = createStackNavigator();

function AuthenticationNavigator(props) {
  return (
    <AuthenticationStack.Navigator headerMode="none">
      <AuthenticationStack.Screen name="SignInScreen">
        {screenProps => (
          <SignInScreen {...screenProps} updateAuthState={props.updateAuthState} />
        )}
      </AuthenticationStack.Screen>
      <AuthenticationStack.Screen name="SignUpScreen" component={SignUpScreen} />
      <AuthenticationStack.Screen
        name="ConfirmSignUpScreen"
        component={ConfirmSignUpScreen} />
    </AuthenticationStack.Navigator>
  );
}

function AppNavigator(props) {
  return (
    <AppStack.Navigator screenOptions={{headerStyle: { backgroundColor: '#42a4e3', elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0, }, headerTitleAlign: 'center'}} >
      <AppStack.Screen name="MainAppNavigator" options={{ headerTitle: () => <Image source = {require('./assets/logo3.png')} style={styles.logoHeader}/>} }>
        {screenProps => (
          <MainAppNavigator {...screenProps} updateAuthState={props.updateAuthState} />
        )}
      </AppStack.Screen>
    </AppStack.Navigator>
  );
}

function App() {
    
  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });
  
    const [isUserLoggedIn, setUserLoggedIn] = useState('loggedOut');
    const [isLoaded, setisLoaded] = useState(false);


    useEffect(() => {
          checkAuthState();
          setTimeout(
            function() {
                setisLoaded(true);
            }
            .bind(this),
            1000
          );
        }, []);
        async function checkAuthState() {
          try {
            await Auth.currentAuthenticatedUser();
            console.log(' User is signed in');
            setUserLoggedIn('loggedIn');
          } catch (err) {
            console.log(' User is not signed in');
            setUserLoggedIn('loggedOut');
          }
        }

        function updateAuthState(isUserLoggedIn) {
          setUserLoggedIn(isUserLoggedIn);
        }
        {
          
        return (
          <AnimatedSplash
      a
          translucent={true}
          isLoaded={isLoaded}
          logoImage={require("./assets/logo3.png")}
          backgroundColor={"#42a4e3"}
          logoHeight={height}
          logoWidth={height_logo}
        >
              <NavigationContainer>
                  <SafeAreaProvider>
                    {isUserLoggedIn === 'loggedIn' && (
                      <AppNavigator updateAuthState={updateAuthState} />
                    )}
                    {isUserLoggedIn === 'loggedOut' && (
                      <AuthenticationNavigator updateAuthState={updateAuthState} />
                    )}
                  </SafeAreaProvider>
              </NavigationContainer>
          </AnimatedSplash>
              );
            }
}
export default App;
const {height} = Dimensions.get("screen");
const height_logo = height * 0.20;
const height_logo_header = height * 0.075;
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#42a4e3'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  logo: {
    width: height_logo,
    height: height_logo
  },
  logoHeader: {
    width: height_logo_header,
    height: height_logo_header,
  }


});