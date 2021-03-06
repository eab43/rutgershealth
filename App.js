import 'react-native-gesture-handler';
import { StatusBar} from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

//Amplify stuff here
import { withAuthenticator } from 'aws-amplify-react-native';
import Amplify from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config)

import {Authenticator} from 'aws-amplify-react-native'

import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from './src/navigation/TabNavigator';
import MyTabs from './src/navigation/TabNavigator';

const App = () => {
  return(
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
};
export default withAuthenticator(App, {
  includeGreetings: true, 
});
