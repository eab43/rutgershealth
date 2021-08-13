import React,{ useState, useEffect } from 'react';

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
//import Toast from 'react-native-simple-toast';
import * as ImagePicker from 'expo-image-picker';
import { getFocusedRouteNameFromRoute } from '@react-navigation/core';

const ProfileScreen = ({updateAuthState}) => {
  async function signOut() {
    try {
      await Auth.signOut();
      updateAuthState('loggedOut');
    } catch (error) {
      console.log('Error signing out: ', error.message);
    }
  }
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [fname, setfname] = useState('');
  const [lname, setlname] = useState('');
  const [age, setage] = useState('');
  const [location, setlocation] = useState('');

  const [show1, setshow1] = useState(true);
  const [show2, setshow2] = useState(false);

  const { colors } = useTheme();

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('fname', fname)
      await AsyncStorage.setItem('lname', lname)
      await AsyncStorage.setItem('age', age)
      await AsyncStorage.setItem('location', location)
      Alert.alert('Profile Saved', '', [
        {text: 'Okay'}
    ]);
    } catch (e) {
      Alert.Alert('Error.. Please try again', '', [
        {text: 'Okay'}
    ]);
    }
  }

useEffect(  ()  =>  loadData(), []);

  function loadData()
{
  AsyncStorage.getItem('fname').then(response =>{
    setfname(response)
  }).catch(err =>{
    setfname('')
  })

  AsyncStorage.getItem('lname').then(response =>{
    setlname(response)
  }).catch(err =>{
    setlname('')
  })

  AsyncStorage.getItem('age').then(response =>{
    setage(response)
  }).catch(err =>{
    setage('')
  })

  AsyncStorage.getItem('location').then(response =>{
    setlocation(response)
  }).catch(err =>{
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

let openImagePickerAsync = async () => {
  let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionResult.granted === false) {
    alert('Permission to access camera roll is required!');
    return;
  }

  let pickerResult = await ImagePicker.launchImageLibraryAsync();

  if (pickerResult.cancelled === true) {
    return;
  }

  console.log(pickerResult);
  setSelectedImage({ localUri: pickerResult.uri });

  setshow1(false);
  setshow2(true);
};

  return (
    <View style={styles.container}>
      <View style={styles.containerMargin}>
      <View style={styles.content}>
      <Text style={styles.title}>Profile</Text>
      <TouchableOpacity onPress={openImagePickerAsync}>
      {show1 && <Image style={styles.stretch} source = {require('../../assets/userDefault.jpg')} />}
      {show2 && <Image style={styles.stretch} source = {{ uri: selectedImage.localUri }} />}
      </TouchableOpacity>
      <Text style={[styles.text_footer, {
                color: colors.text,
                marginLeft:10
            }]}>First Name</Text>
            <View style={styles.action}>
             
                <TextInput 
                    placeholder="First Name"
                    placeholderTextColor="#666666"
                    autoCorrect= {false}
                    autoCompleteType = "off"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => fnameChange(val)}
                    value={fname}
                />
            </View>
            <Text style={[styles.text_footer, {
                color: colors.text,
                marginLeft:10
            }]}>Last Name</Text>
            <View style={styles.action}>
              
                <TextInput 
                    placeholder="Last Name"
                    placeholderTextColor="#666666"
                    autoCorrect= {false}
                    autoCompleteType = "off"
                    // keyboardType="email-address"
                    // textContentType="emailAddress"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => lnameChange(val)}
                    value={lname}
                />
            </View>
            <Text style={[styles.text_footer, {
                color: colors.text,
                marginLeft:10
            }]}>Age</Text>
            <View style={styles.action}>
            
                <TextInput 
                    placeholder="Age"
                    placeholderTextColor="#666666"
                    autoCorrect= {false}
                    autoCompleteType = "off"
                    keyboardType="number-pad"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => ageChange(val)}
                    value={age}
                />
            </View>
            <Text style={[styles.text_footer, {
                color: colors.text,
                marginLeft:10
            }]}>Location</Text>
            <View style={styles.action}>
             
                <TextInput 
                    placeholder="Location"
                    placeholderTextColor="#666666"
                    autoCorrect= {false}
                    autoCompleteType = "off"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => locationChange(val)}
                    value={location}
                />
            </View>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {storeData()}}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Save</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.button}>
            <TouchableOpacity
            style={[styles.signIn, {
            borderColor: '#42a4e3',
            borderWidth: 1,
            marginTop: 20
            }]}
            onPress={() => {signOut()}}
          >
            <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign Out</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      </View>
      </View>
    </View>
  );
}

export default ProfileScreen;
const styles = StyleSheet.create({
  stretch: {
    width: 70,
    height: 70,
    alignSelf:'center',
    borderRadius: 150 / 2,
    overflow: "hidden"
  },
  
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#000",
    textAlign: "center",
    padding:15
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
      marginTop:10
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
      marginTop: 20
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

