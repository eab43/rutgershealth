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
  Component
} from 'react-native';
import { Auth } from 'aws-amplify';

const breathingScreen = ({updateAuthState}) => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Breathing screen</Text>

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}

export default breathingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
