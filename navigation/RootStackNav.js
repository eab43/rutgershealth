import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ConfirmSignUpScreen from '../screens/ConfirmSignUpScreen';
const RootStack = createStackNavigator();
export default function Navigation(){
    return (
        <NavigationContainer
        //linking={LinkingConfiguration}
        //theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
            <RootStackScreen />
        </NavigationContainer>
        );
}
function RootStackScreen() {
    return (
        <RootStack.Navigator headerMode='none'>
            <RootStack.Screen name="SignInScreen" component={SignInScreen}/>
            <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/>
            <RootStack.Screen name="ConfirmSignUpScreen" component={ConfirmSignUpScreen}/>
        </RootStack.Navigator>
)};