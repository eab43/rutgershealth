import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ConfirmSignUpScreen from '../screens/ConfirmSignUpScreen';

const AuthenticationStack = createStackNavigator();
const AppStack = createStackNavigator();

const AuthenticationNavigator = props => {
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
            component={ConfirmSignUpScreen}
          />
        </AuthenticationStack.Navigator>
      );
    };

    const AppNavigator = props => {
      return (
        <AppStack.Navigator>
          <AppStack.Screen name="HomeScreen">
            {screenProps => (
              <HomeScreen {...screenProps} updateAuthState={props.updateAuthState} />
            )}
          </AppStack.Screen>
        </AppStack.Navigator>
      );
    };