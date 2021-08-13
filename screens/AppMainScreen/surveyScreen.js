import React, { useState, useEffect } from 'react';
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
  Button,
  Separator,
  FlatList
} from 'react-native';
import { useFonts, Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import { Card, ListItem, Icon } from 'react-native-elements'
import AppLoading from 'expo-app-loading';


import { Rating, AirbnbRating } from 'react-native-ratings';

import Amplify, { Auth, Analytics } from 'aws-amplify';
import config from '../../aws-exports';
Amplify.configure(config);

const heart_imagefilled = require("../../assets/heart2filled.png");



export default class notificationsScreen extends React.Component {

  //initialize rating for the questions here
  //The rating is set to 1 as default. 
  //If rating is set to an empty string such as question1: '', then the API will send an empty string to the googlesheet when the user does not change the rating values from
  //its default state.
  state = {
    question1: '1',
    question2: '1',
    question3: '1',
    question4: '1',
    question5: '1',
  };

  //handles state when input is entered
  onChangeRating(key, value) {
    this.setState({
      [key]: value,
    });
  }

  //Handles sending data when the submit button is pressed
  //Data has to be turned into JSON format in order for the data to be sent and pasted on the google sheet.
  handleSubmit = async (e) => {
    e.preventDefault();

    //These two lines retrieves current user attributes
    let user = await Auth.currentAuthenticatedUser();
    const { attributes } = user;
    console.log(user);
    const { question1, question2, question3, question4, question5 } = this.state;

    try {

      //Analytics.record('Survey Submit Event', {username: user.username});
      Analytics.record({
        name: 'Survey Submit Event',
        // Attribute values must be strings
        attributes: { username: user.attributes.email }
      });

      const response = await fetch('https://v1.nocodeapi.com/eab289/google_sheets/LvrnQfMXFcBlrSwy?tabId=Sheet1',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify([
            [question1, question2, question3, question4, question5, user.attributes.email, new Date().toLocaleDateString()]
          ]),
        }
      );
      await response.json()
      Alert.alert('Successful', 'Your answers were successfully sent!', [
        { text: 'ok', onPress: () => console.log('alert closed') }
      ])
    }
    catch (err) {
      console.log('Submit error', err)
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerMargin}>
          <View style={styles.content}>
      <ScrollView>
          <Text style={styles.text,
          {
            fontFamily: 'Pacifico_400Regular',
            fontSize: 50,
            textAlign: 'center',

          }}>
            Wellness Check
        </Text>

          <Card containerStyle={styles.card}>
            <Text style={styles.question}>
              Overall, how do you feel today?
          </Text>

          <Rating
              type='heart'
              reviews={["Terrible", "Bad", "OK", "Good", "Very Good"]}
              ratingCount={5}
              imageSize={60}
              showRating
              minValue={1}
              startingValue={1}
              onStartRating={1}
              onFinishRating={value => this.onChangeRating('question1', value)}
            />
          </Card>

          <Card containerStyle={styles.card}>
            <Text style={styles.question}>
              How tired are you today?
          </Text>

          <Rating
              type='heart'
              reviews={["Terrible", "Bad", "OK", "Good", "Very Good"]}
              ratingCount={5}
              imageSize={60}
              showRating
              minValue={1}
              startingValue={1}
              onStartRating={1}
              onFinishRating={value => this.onChangeRating('question2', value)}
            />
          </Card>

          <Card containerStyle={styles.card}>
            <Text style={styles.question}>
              How much pain are you in today?
          </Text>

            <Rating
              type='heart'
              reviews={["Terrible", "Bad", "OK", "Good", "Very Good"]}
              ratingCount={5}
              imageSize={60}
              showRating
              minValue={1}
              startingValue={1}
              onStartRating={1}
              onFinishRating={value => this.onChangeRating('question3', value)}
            />
          </Card>

          <Card containerStyle={styles.card}>
            <Text style={styles.question}>
              Are you experiencing pain or discomfort as a result of these exercises?
          </Text>

            <Rating
              type='heart'
              ratingCount={5}
              imageSize={60}
              showRating
              minValue={1}
              startingValue={1}
              onStartRating={1}
              onFinishRating={value => this.onChangeRating('question4', value)}
            />
          </Card>

          <Card containerStyle={styles.card}>
            <Text style={styles.question}>
              Has watching the yoga videos made health improvements?
          </Text>

            <Rating
              type='heart'
              ratingCount={5}
              imageSize={60}
              showRating
              minValue={1}
              startingValue={1}
              onStartRating={1}
              onFinishRating={value => this.onChangeRating('question5', value)}
            />
          </Card>

          <Text>
            {'\n'}
          </Text>

          <View style={styles.button}>
                <TouchableOpacity
                    style={styles.submit}
                    onPress={this.handleSubmit.bind(this)}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Submit</Text>
                </TouchableOpacity>
              </View>

          <View style={styles.separator} lightColor='#eee' darkColor='rgba(255,255,255,0.1)' />
      </ScrollView>
      </View>
      </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
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
    height: '98%'
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  input: {
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: '#2196F3',
    margin: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  text: {
    margin: 10,
    color: '#000000',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',

  },
  question: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    lineHeight: 30,
    flex: 1
  },
  button: {
    alignItems: 'center',
    marginTop: 10
},
submit: {
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
},
  card: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "grey"
  }
});
