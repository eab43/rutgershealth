import { StatusBar } from "expo-status-bar";
import React, { useRef } from "react";
import { StyleSheet, Text, View, Dimensions, Animated } from "react-native";



const { width, height } = Dimensions.get("window");
const circleWidth = width / 2;
export default function App() {
  const move = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(1)).current;
  Animated.loop(
    Animated.sequence([
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(move, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(textOpacity, {
          delay: 100,
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(move, {
          delay: 1000,
          toValue: 0,
          duration: 4000,
          useNativeDriver: true,
        }),
      ]),
    ])
  ).start();
  const translate = move.interpolate({
    inputRange: [0, 1],
    outputRange: [0, circleWidth / 6],
  });
  const exhale = textOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });
  return (
<View style={styles.container}>
      <View style={styles.containerMargin}>
      <View style={styles.content}>
    <Text style={styles.text}>Take some time to breathe</Text>
    <View style={styles.breathe}>
      <Animated.View
        style={{
          width: circleWidth,
          height: circleWidth,
          ...StyleSheet.absoluteFill,
          alignItems: "center",
          justifyContent: "center",
          opacity: textOpacity,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
          }}
        >
          Inhale
        </Text>
      </Animated.View>
      <Animated.View
        style={{
          width: circleWidth,
          height: circleWidth,
          ...StyleSheet.absoluteFill,
          alignItems: "center",
          justifyContent: "center",
          opacity: exhale,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
          }}
        >
          Exhale
        </Text>
      </Animated.View>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((item) => {
        const rotation = move.interpolate({
          inputRange: [0, 1],
          outputRange: [`${item * 45}deg`, `${item * 45 + 180}deg`],
        });
        return (
          
          <Animated.View
            key={item}
            style={{
              opacity: 0.1,
              backgroundColor: "#00BFFF",
              width: circleWidth,
              height: circleWidth,
              borderRadius: circleWidth / 2,
              ...StyleSheet.absoluteFill,
              transform: [
                {
                  rotateZ: rotation,
                },
                { translateX: translate },
                { translateY: translate },
              ],
            }}
          ></Animated.View>
        );
      })}
      </View>
      </View>
      </View>
    </View>
  );
}

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
    height: '90%'
  },
  breathe: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },

  containerMargin: {
    flex: 1,
    marginTop: 10,
    
    alignItems: 'center',
    //justifyContent: 'center',
    backgroundColor: '#42a4e3'
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  contentContainer: {
    
    width: '95%',
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 4,
    padding: 15,
    //borderTopRightRadius: 30,
    //paddingHorizontal: 20,
    //paddingVertical: 30,
    height: '77%'
  },
  text: {
    margin: 10,
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',

  },
  questionContainer: {
    
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
    
  }
});