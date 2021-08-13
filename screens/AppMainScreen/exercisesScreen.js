import * as React from 'react';
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
  AppRegistry,
  ImageBackground,
  Image,
  Paragraph
} from 'react-native';
import Swiper from 'react-native-swiper';

import AppLoading from 'expo-app-loading';
import { useFonts, Pacifico_400Regular } from '@expo-google-fonts/pacifico';


const styles = StyleSheet.create({
  wrapper: {
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#42a4e3'
  },
  content: {

    width: '95%',
    backgroundColor: '#fff',
    borderRadius: 20,
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
  containerMargin: {
    flex: 1,
    marginTop: 10,

    alignItems: 'center',
    //justifyContent: 'center',
    backgroundColor: '#42a4e3'
  },
  container: {
    flex: 1,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  slide1: {
    flex: 1,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  paragraph: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  text: {
    flex: 1,
    color: '#000000',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center'

  },
  image: {
    width: 330,
    height: 330,
    borderRadius: 330 / 2,
    borderWidth: 4,
    borderColor: '#42a4e3'

  },
  image2: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    borderWidth: 4,
    borderColor: '#42a4e3',
  }
})

export default function exercisesScreen() {
  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.contentContainer}>
      <View style={styles.containerMargin}>
        <View style={styles.content}>
          <Swiper style={styles.wrapper} showsButtons={false}>

            <View style={styles.container}>

              <Text style={styles.text,
                { fontFamily: 'Pacifico_400Regular', fontSize: 60 }}>
                Welcome!
              </Text>
              <Image
                source={require('../../assets/undraw_yoga2.png')}
                style={styles.image}
              />
              <Text style={
                {
                  fontFamily: 'Pacifico_400Regular',
                  fontSize: 30,
                  flex: 1,
                }}>
              </Text>
            </View>

            <View style={styles.container}>
              <Text style={styles.text,
              {
                fontFamily: 'Pacifico_400Regular',
                fontSize: 25,
              }}>
                Welcome to our app!
              </Text>

              <Text style={
                {
                  fontFamily: 'Pacifico_400Regular',
                  fontSize: 23,
                  flex: 1,
                }}>
                -This application was made for Professor Daneault of Rutgers Health and Movement Sciences as a research tool that will help in understanding of whether yoga exercises can have a
                discernible impact in health wellness.
                {'\n'}
                {'\n'}

                -In this application you will find yoga videos that will help you guide through the various exercises shown.
              </Text>

            </View>

            <View style={styles.slide3}>
              <Text style={styles.text,
              {
                fontFamily: 'Pacifico_400Regular',
                fontSize: 50,
              }}>
                Contact
              </Text>
              <Image
                source={require('../../assets/undraw_contact_us.png')}
                style={styles.image2}
              />
              <Text style={
                {
                  fontFamily: 'Pacifico_400Regular',
                  fontSize: 21,
                  flex: 1,
                  textAlign: 'center'
                }}>
                Occasionally you will receive questionnaires that will ask you questions regarding the yoga excercises. Completing these
                questionnaires will help in gathering useful data for Professor Daneault's research.
              </Text>


            </View>
          </Swiper>
        </View>
      </View>
    </View>
  );
}

