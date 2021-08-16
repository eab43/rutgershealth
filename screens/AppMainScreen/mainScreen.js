
import React, { useState, useEffect, useCallback, useRef } from 'react';
import YoutubePlayer from "react-native-youtube-iframe";
import URLS from '../../components/YoutubeUrls'
//import URLS from '../../components/AWSKeys'

import * as LocalAuthentication from 'expo-local-authentication';
import { WebView } from 'react-native-webview';
import { Video, AVPlaybackStatus } from 'expo-av';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
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
  Button,
  Component,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { max } from 'react-native-reanimated';
import Amplify, { Auth, Analytics, Storage } from 'aws-amplify';

checkUser = async (e) => {
  let user = await Auth.currentAuthenticatedUser();
  const { attributes } = user;

  try {
    Analytics.record({
      name: 'Video Page User Tracking',
      attributes: { username: user.attributes.email },
      metrics: { minutesListened: 30 }
    });
  }
  catch (error) {
    console.log('user tracking failed', error)
  }
}
checkUser()

export default function mainScreen({ updateAuthState }) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [playing, setPlaying] = useState(false);
  const [data, setData] = React.useState([]);

  const onStateChange = useCallback((state) => {
    if (state === "playing") {
      var start = new Date();

      let sHours = start.getHours();
      let sMinutes = start.getMinutes();
      let sSeconds = start.getSeconds();
      console.log(sHours, sMinutes, sSeconds);
      //video.current?.getCurrentTime().then(
      //  currentTime => console.log({currentTime})
      //);
    }

    if (state === "paused") {
      //video.current?.getCurrentTime().then(
      // currentTime => console.log({currentTime})
      //);
      var duration = new Date();
      console.log(duration);
      var dur = duration - start;
      console.log(dur);
      let dHours = duration.getHours();
      let dMinutes = duration.getMinutes();
      let dSeconds = duration.getSeconds();
    }
    if (state === "ended") {
      setPlaying(false);
      //Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  useEffect(() => {
    setIsLoading(true)
    //LocalAuth();
    fetchAll();




    /*console.log(URLS);
    for (var i = 0; i < URLS.length; i++) {
      let videoID = URLS[i].uri.split('=').pop();
      let key = URLS[i].key
      setData( arr => [...arr, {uri: videoID, key: `${key}`}]);
      console.log(`${URLS[i].key}`);
      }*/

    //getList();
  }, []);

  function fetchAll() {
    fetch('Youtube API here')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setIsLoading(false)
        setData(data.items)

      })
  }
  function fetchBeginner() {
    fetch('Youtube API here')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setIsLoading(false)
        setData(data.items)

      })
  }
  function fetchIntermediate() {
    fetch('Youtube API here')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setIsLoading(false)
        setData(data.items)
      })
  }
  function fetchAdvanced() {
    fetch('Youtube API here')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setIsLoading(false)
        setData(data.items)
      })
  }
  async function LocalAuth() {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    const AuthType = await LocalAuthentication.supportedAuthenticationTypesAsync();

    console.log(AuthType);
    console.log(isEnrolled);
    if (hasHardware && isEnrolled) {
      try {
        await LocalAuthentication.authenticateAsync()
      } catch (err) {
        console.log(err)
      }

    } else {


    }
  }
  async function getList() {
    URLSet(URLS);
    /*
      //let name = 'Myself.mp4';
      //const access = { level: "private" };
      //let fileUrl = await Storage.get(name, access);
      //console.log(fileUrl);
      //  setData({
      //    ...data,
      //    uri: fileUrl,});
      let listFiles = await Storage.list('', {level: "private"}) // for listing ALL files without prefix, pass '' instead
        //.then(result => console.log(result))
      .catch(err => console.log(err));
      console.log(listFiles)
      URLSet(listFiles);*/
  }

  async function getFile(key, id) {
    let name = 'Myself.mp4';
    const access = { level: "public" };
    //let fileUrl = await Storage.get(key, access);
    let fileUrl = 'http://d184tc28tjdmb6.cloudfront.net/public/' + key
    console.log(fileUrl);
    setData(arr => [...arr, { uri: fileUrl, key: `${id}` }]);
    //setData({
    //...data,
    //uri: fileUrl,});
    //let listFiles = await Storage.list('', {level: "private"}) // for listing ALL files without prefix, pass '' instead
    //.then(result => console.log(result))
    //.catch(err => console.log(err));
    //console.log(listFiles)
    //setData(data => [data, listFiles]);
    //URLSet(listFiles);
  }

  const URLSet = (list) => {
    //const access = { level: "private" };
    for (var i = 0; i < list.length; i++) {
      let fileUrl = getFile(list[i].key, i);

      //Do something
    }

    //setData( arr => [...arr, {uri: ""}]);
    console.log(data);
  }
  return (

    <View style={styles.container}>
      <View style={styles.containerMargin}>
        {isLoading ? <ActivityIndicator style={styles.AIndicator} size="large" color="black" /> : null}
        <View
          style={styles.scrollviewFilter}
        >
          <TouchableOpacity
            style={styles.filterButton}
            onPress={fetchAll}
          >
            <Text style={[styles.textSign, {
              color: '#fff'
            }]}>All</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.filterButton}
            onPress={fetchBeginner}
          >
            <Text style={[styles.textSign, {
              color: '#fff'
            }]}>Beginner</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.filterButton}
            onPress={fetchIntermediate}
          >
            <Text style={[styles.textSign, {
              color: '#fff'
            }]}>Intermediate</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={fetchAdvanced}
          >
            <Text style={[styles.textSign, {
              color: '#fff'
            }]}>Advanced</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={data}
          keyExtractor={item => item.id.videoId}
          renderItem={({ item }) => (
            <View style={styles.content}>

              <View style={styles.videosContainer}>
                {/*<Video
                ref={video}
                style={styles.video}
                source={{
                  uri: item.uri,
                }}
                useNativeControls
                resizeMode="contain"
                isLooping
                onPlaybackStatusUpdate={status => setStatus(() => status)}
              />*/}
                <YoutubePlayer
                  ref={video}
                  webViewStyle={styles.video}
                  height={221}
                  play={playing}
                  videoId={item.id.videoId}
                  onChangeState={onStateChange}
                />
                <Text style={styles.title}>{item.snippet.title}</Text>
                <Text style={styles.description}>{item.snippet.description}</Text>
                {/*<View style={styles.buttons}>
              <Button
                title={status.isPlaying ? 'Pause' : 'Play'}
                onPress={() => {getList()}
                  //status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
            }
              />
            </View>*/}
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
              </View>

            </View>
          )}

        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',
    backgroundColor: '#42a4e3'
  },
  containerMargin: {
    flex: 1,
    marginTop: 10,

    //alignItems: 'center',
    //justifyContent: 'center',
    backgroundColor: '#42a4e3'
  },
  AIndicator: {
    flex: 10,
    marginTop: 10,

    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    //justifyContent: 'center',
    backgroundColor: '#42a4e3',
  },
  header: {
    flex: .5,
    justifyContent: 'center',

  },
  videosContainer: {

    width: '95%',
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 4,
    padding: 5,
    //borderTopRightRadius: 30,
    //paddingHorizontal: 20,
    //paddingVertical: 30,
    height: 320
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000000'
  },
  description: {
    fontSize: 13,
    color: '#000000'
  },
  logo: {

  },
  video: {
    alignSelf: 'center',
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: 221,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  scrollviewFilter: {
    width: '95%',
    alignSelf: 'center',
    marginBottom: 4,
    justifyContent: 'center',
    flexGrow: 0,
    flexShrink: 1,
    flexDirection: 'row'
  },
  filterButton: {
    backgroundColor: '#2e729e',
    borderRadius: 15,
    padding: 10,
    marginRight: 5,
  }
});
