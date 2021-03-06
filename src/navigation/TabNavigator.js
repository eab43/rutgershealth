import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator, createMaterialTopTabNavigator} from '@react-navigation/material-bottom-tabs';
import { useNavigation} from '@react-navigation/native';

import { Ionicons, Icon, Fontisto, MaterialCommunityIcons, Feather, AntDesign     } from '@expo/vector-icons'; 


import Home from '../Screens/Home';
import Yoga from '../Screens/Yoga';
import Contact from '../Screens/Contact';
import Settings from '../Screens/Settings';



const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
    return (

        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#f0edf6"
            inactiveColor="#000000"
            barStyle={{ backgroundColor: 'tomato' }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="home" color={color} size={25} />
                    ),
            }} 
            />
            
            <Tab.Screen
                name="Yoga"
                component={Yoga}
                options={{
                    tabBarLabel: 'Yoga',
                    tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="yoga" color={color} size={25} />
                    ),
            }} 
            />
            
            <Tab.Screen
                name="Contact"
                component={Contact}
                options={{
                    tabBarLabel: 'Contact',
                    tabBarIcon: ({ color }) => (
                    <AntDesign name="contacts" color={color} size={25} />
                    ),
            }} 
            />            
            <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ color }) => (
                    <Feather name="settings" color={color} size={25} />
                    ),
            }} 
            />
        </Tab.Navigator>
    );
  }
export default MyTabs;
