import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as LocalAuthentication from 'expo-local-authentication';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  View, 
  Text,
  TouchableOpacity, 
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Component, 
  Image,
  LogBox
} from 'react-native';
import { MaterialCommunityIcons, Ionicons, FontAwesome5, Feather } from '@expo/vector-icons'; 
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import MainScreen from '../screens/AppMainScreen/mainScreen';
import ExercisesScreen from '../screens/AppMainScreen/exercisesScreen';
import surveyScreen from '../screens/AppMainScreen/surveyScreen';
import searchScreen from '../screens/AppMainScreen/searchScreen';
import notificationsScreen from '../screens/AppMainScreen/notificationsScreen';
import BreatheScreen from '../screens/AppMainScreen/breatheScreen';
import ProfileScreen from '../screens/AppMainScreen/profileScreen';
import ViewProfileScreen from '../screens/AppMainScreen/viewProfileScreen';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator(props) {
  const colorScheme = useColorScheme();

  useEffect(() => {
    setTimeout(
      function() {
        LocalAuth();
      },
      1200
    );
    
  }, []);

  async function LocalAuth() {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    const AuthType = await LocalAuthentication.supportedAuthenticationTypesAsync();
    
    console.log(AuthType);
    console.log(isEnrolled);
    if (hasHardware && isEnrolled){
      try {
        await LocalAuthentication.authenticateAsync()
      } catch (err){
        console.log(err)
      }

    }else{


    }
  }

  return (
    <BottomTab.Navigator
      initialRouteName="main"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint, showLabel: false }}>
      <BottomTab.Screen
        name="main"
        //component={mainNavigator}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="home" color={color} size={30} style={{ marginBottom: -3 }}/>,
        }}
      >
        {screenProps => (
          <MainNav {...screenProps} updateAuthState={props.updateAuthState} />
        )}
        </BottomTab.Screen>
      <BottomTab.Screen
        name="exercises"
        //component={ExercisesNav}
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="dumbbell" size={30} color={color} />,
        }}
      >
        {screenProps => (
          <ExercisesNav {...screenProps} updateAuthState={props.updateAuthState} />
        )}
        </BottomTab.Screen>
      <BottomTab.Screen
        name="search"
        component={surveyNavigator}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome5 name="user-check" color={color} size={25} style={{ marginBottom: -3 }}/>,
        }}
      />
      <BottomTab.Screen
        name="breathe"
        component={breatheNavigator}
        options={{
          tabBarIcon: ({ color }) => <Feather name="wind" color={color} size={25} style={{ marginBottom: -3 }}/>,
        }}
      />
      <BottomTab.Screen
        name="notifications"
        component={notificationsNavigator}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="notifications" color={color} size={30} style={{ marginBottom: -3 }}/>,
        }}
      />
      <BottomTab.Screen
        name="profile"
        //component={profileNavigator}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="person-circle" color={color} size={30} style={{ marginBottom: -3 }}/>,
        }}
      >
      {screenProps => (
          <ProfileNav {...screenProps} updateAuthState={props.updateAuthState} />
        )}
       </BottomTab.Screen> 
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
//function TabBarIcon( ) {
//  return <Ionicons size={30} style={{ marginBottom: -3 }}/>;
//}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const mainStack = createStackNavigator();

function MainNav(props) {
  return (
    <mainStack.Navigator screenOptions={{headerStyle: { backgroundColor: '#42a4e3', elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0}, headerTitleAlign: 'center', }} headerMode="none" >
      <mainStack.Screen
        name="mainScreen"
        //component={mainScreen}
        options={{ headerTitle: () => <Image source = {require('../assets/logo3.png')} style={styles.logo}/>} }
      >
        {screenProps => (
          <ExercisesScreen {...screenProps} updateAuthState={props.updateAuthState} />
        )}
        </mainStack.Screen>
    </mainStack.Navigator>
  );
}

const exercisesStack = createStackNavigator();

function ExercisesNav(props) {
  return (
    <exercisesStack.Navigator headerMode="none">
      <exercisesStack.Screen
        name="exercisesScreen"
        //component={surveyScreen}
        options={{ headerTitle: 'Tab Two Title' }}
      >
        {screenProps => (
          <MainScreen {...screenProps} updateAuthState={props.updateAuthState} />
        )}
        </exercisesStack.Screen>
    </exercisesStack.Navigator>
  );
}

const searchStack = createStackNavigator();

function surveyNavigator() {
  return (
    <searchStack.Navigator headerMode="none">
      <searchStack.Screen
        name="searchScreen"
        component={surveyScreen}
        options={{ headerTitle: 'Tab Two Title' }}
      />
    </searchStack.Navigator>
  );
}
const breatheStack = createStackNavigator();

function breatheNavigator() {
  return (
    <breatheStack.Navigator headerMode="none">
      <breatheStack.Screen
        name="breatheScreen"
        component={BreatheScreen}
        options={{ headerTitle: 'Tab Two Title' }}
      />
    </breatheStack.Navigator>
  );
}

const notificationsStack = createStackNavigator();

function notificationsNavigator() {
  return (
    <notificationsStack.Navigator headerMode="none">
      <notificationsStack.Screen
        name="notificationsScreen"
        component={notificationsScreen}
        options={{ headerTitle: 'Tab Two Title' }}
      />
    </notificationsStack.Navigator>
  );
}

const profileStack = createStackNavigator();

function ProfileNav(props) {
  return (
    <profileStack.Navigator headerMode="none">
      <profileStack.Screen
        name="ProfileScreen"
      >
        {screenProps => (
          <ProfileScreen {...screenProps} updateAuthState={props.updateAuthState} />
        )}
      </profileStack.Screen>
    </profileStack.Navigator>
  );
}

const {height} = Dimensions.get("screen");
const height_logo = height * 0.075;
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
  }
});