import React, { useState, useEffect } from 'react';

import {
  Image,
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
  Component
} from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Auth } from 'aws-amplify';
import * as ImagePicker from 'expo-image-picker';
import { getFocusedRouteNameFromRoute } from '@react-navigation/core';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import ProfileScreen from './profileScreen';

const ViewProfileScreen = ({ updateAuthState, navigation }) => {
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [fname, setfname] = useState('');
  const [uname, setuname] = useState('');
  const [lname, setlname] = useState('');
  const [age, setage] = useState('');
  const [location, setlocation] = useState('');

  const [show1, setshow1] = useState(true);
  const [show2, setshow2] = useState(false);

  const { colors } = useTheme();


  useEffect(() => {
    getuname();
    loadData();


  }, []);
  async function getuname() {
    Auth.currentAuthenticatedUser({
      bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    }).then(user => setuname(user.attributes.email))
      .catch(err => console.log(err));
  }
  function loadData() {
    AsyncStorage.getItem('fname').then(response => {
      setfname(response)
    }).catch(err => {
      setfname('')
    })

    /*AsyncStorage.getItem('username').then(response => {

      if (response == "" || response == undefined) {
        setuname("email@example.com")
        AsyncStorage.setItem('username', "email@example.com")
      }
      else {
        setuname(response)
      }
    }).catch(err => {
      setuname('')
    })*/
    AsyncStorage.getItem('lname').then(response => {
      setlname(response)
    }).catch(err => {
      setlname('')
    })

    AsyncStorage.getItem('age').then(response => {
      setage(response)
    }).catch(err => {
      setage('')
    })

    AsyncStorage.getItem('location').then(response => {
      setlocation(response)
    }).catch(err => {
      setlocation('')
    })

    setshow1(true);
    setshow2(false);
  }

  const ageChange = (val) => {
    setage(val)

  }
  const fnameChange = (val) => {
    setfname(val)
  }
  const locationChange = (val) => {
    setlocation(val)
  }
  const lnameChange = (val) => {
    setlname(val)
  }


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
  return (
    <View style={styles.container}>
      <View style={styles.containerMargin}>
        <View style={styles.content}>
          <View >
            <TouchableOpacity
              onPress={() => navigation.navigate('ProfileScreen')}
            >
              <Ionicons name="create" size={30} style={{ marginBottom: 3, textAlign: "right", color: "#42a4e3" }} />
            </TouchableOpacity>
          </View>
          <View style={styles.userRow}>

            <View style={styles.userImage}>
              <Image style={styles.stretch} source={require('../../assets/userDefault.jpg')} />
            </View>
            <View style={styles.name}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>{fname} {lname}</Text>
            </View>
          </View>
          <View style={styles.action}>
            <View style={styles.body}>
              <View style={styles.bodyContent}>
                <Text style={styles.info}> <Ionicons name="mail" size={25} style={{ marginBottom: -3, color: "#42a4e3" }} />  {uname}</Text>
                <Text style={styles.info}><Ionicons name="location" size={25} style={{ marginBottom: -3, color: "#42a4e3" }} />  {location}</Text>
                {/* <Text style={styles.info}><Ionicons name="calendar" size={18} style={{ marginBottom: -3, color: "#42a4e3" }} />  {age}</Text> */}
                {/* <Text style={styles.info}><MaterialCommunityIcons name="phone" size={25} style={{ marginBottom: -3 , color: "#42a4e3"}} />  111111000</Text> */}
              </View>
            </View>
          </View>
          <View style={{ borderColor: "#42a4e3", borderWidth: 0.05, height: 150 }}></View>
          <View style={styles.action}>
            <View style={styles.body}>
              <View style={styles.bodyContent}>
                <Text style={styles.info2}> <Ionicons name="heart" size={25} style={{ marginBottom: -3, color: "brown" }} />  Your Favorites</Text>
                <Text style={styles.info2}><Ionicons name="share" size={25} style={{ marginBottom: -3, color: "brown" }} />  Tell Your Friends</Text>
                <Text style={styles.info2}><Ionicons name="person" size={25} style={{ marginBottom: -3, color: "brown" }} />  Support</Text>
                <Text style={styles.info2}><Ionicons name="settings" size={25} style={{ marginBottom: -3, color: "brown" }} />  Settings</Text>
              </View>
            </View>
          </View>

        </View>
      </View>
    </View>
  );
}

export default ViewProfileScreen;
const styles = StyleSheet.create({
  stretch: {
    width: 70,
    height: 70,
    // alignSelf:'center',
    borderRadius: 150 / 2,
    overflow: "hidden",

  },
  userRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 8,
    paddingLeft: 20,
    // paddingRight: 15,
    paddingTop: 6,
  },
  info: {
    fontSize: 20,
    marginBottom: 8
  },
  info2: {
    fontSize: 20,
    marginBottom: 8

  },
  userImage: {
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#fff",
    textAlign: "center",
    padding: 15
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#fff",
    textAlign: "center",
    padding: 15,

  },
  container: {
    flex: 1,
    backgroundColor: '#42a4e3'
  },
  containerMargin: {
    flex: 1,
    marginTop: 10,

    alignItems: 'center',
    //justifyContent: 'center',
    backgroundColor: '#42a4e3'
  },
  content: {

    width: '95%',
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 4,
    padding: 15,
    marginBottom: 15,
    //borderTopRightRadius: 30,
    //paddingHorizontal: 20,
    //paddingVertical: 30,
    height: '90%'
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50
  },
  signIn: {
    backgroundColor: '#42a4e3',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 4,
    fontSize: 18
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   signIn: {
//     backgroundColor: '#42a4e3',
//     width: '100%',
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 5 },
//     shadowOpacity: 0.3,
//     shadowRadius: 1,
//     elevation: 4,
//     fontSize: 18
// },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: '80%',
//   },
// });

