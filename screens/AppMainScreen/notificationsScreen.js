import React, { useState, useEffect, useCallback, useRef } from 'react';
import * as Notifications from 'expo-notifications';
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
  Switch,
  Component
} from 'react-native';
import { set } from 'react-native-reanimated';
export default function exercisesScreen() {
  const [isEnabled, setIsEnabled] = useState({
    Sunday: false,
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    disableSun: false,
    disableMon: false,
    disableTues: false,
    disableWed: false,
    disableThurs: false,
    disableFri: false,
    disableSat: false,
  });
  const [sundayToggle, toggleSunday] = useState(false);
  const [mondayToggle, toggleMonday] = useState(false);
  const [tuesdayToggle, toggleTuesday] = useState(false);
  const [wednesdayToggle, toggleWednesday] = useState(false);
  const [thursdayToggle, toggleThursday] = useState(false);
  const [fridayToggle, toggleFriday] = useState(false);
  const [saturdayToggle, toggleSaturday] = useState(false);

  const [isSundayEnabled, setIsSundayEnabled] = useState(false);
  const [isMondayEnabled, setIsMondayEnabled] = useState(false);
  const [isTuesdayEnabled, setIsTuesdayEnabled] = useState(false);
  const [isWednesdayEnabled, setIsWednesdayEnabled] = useState(false);
  const [isThursdayEnabled, setIsThursdayEnabled] = useState(false);
  const [isFridayEnabled, setIsFridayEnabled] = useState(false);
  const [isSaturdayEnabled, setIsSaturdayEnabled] = useState(false);

  useEffect(() => {
    getSchedule();
  }, []);
  async function getSchedule() {
    let sunday = false;
    let monday = false;
    let tuesday = false;
    let wednesday = false;
    let thursday = false;
    let friday = false;
    let saturday = false;
    const schedule = await Notifications.getAllScheduledNotificationsAsync();
    for (var i = 0; i < schedule.length; i++) {
    console.log(schedule[i].trigger.dateComponents.weekday);
    //let day = schedule[i].identifier;
    let day = schedule[i].trigger.dateComponents.weekday;
    switch(day)
      {
        case 1:
          toggleSunday(true);
          sunday = true;
          break;
        case 2:
          toggleMonday(true);
          monday = true;
          break;
        case 3:
          toggleTuesday(true);
          tuesday = true;
          break;
        case 4:
          toggleWednesday(true);
          wednesday = true;
          break;
        case 5:
          toggleThursday(true);
          thursday = true;
          break;
        case 6:
          toggleFriday(true);
          friday = true;
          break;
        case 7:
          toggleSaturday(true);
          saturday = true;
          break;      
      }
    }
    check5(sunday, monday, tuesday, wednesday, thursday, friday, saturday);
    console.log(schedule);
  }

  
  async function scheduleSunday(Enabled) {
    await Notifications.scheduleNotificationAsync({
      identifier: 'Sun',
      content: {
        title: "Rutgers Health and Rehabilitation",
        body: "It's time to exercise, Tap to watch more videos and progress your health!",
      },
      trigger: {
        weekday: 1,
        hour: 17,
        minute: 15,
        repeats: true,
      },
    });
  }
  
  async function scheduleMonday(Enabled) {
    await Notifications.scheduleNotificationAsync({
      identifier: 'Mon',
      content: {
        title: "Rutgers Health and Rehabilitation",
        body: "It's time to exercise, Tap to watch more videos and progress your health!",
      },
      trigger: {
        weekday: 2,
        hour: 17,
        minute: 15,
        repeats: true,
      },
    });
  }
  async function scheduleTuesday(Enabled) {
    await Notifications.scheduleNotificationAsync({
      identifier: 'Tues',
      content: {
        title: "Rutgers Health and Rehabilitation",
        body: "It's time to exercise, Tap to watch more videos and progress your health!",
      },
      trigger: {
        weekday: 3,
        hour: 17,
        minute: 15,
        repeats: true,
      },
    });
  }
  async function scheduleWednesday(Enabled) {
    await Notifications.scheduleNotificationAsync({
      identifier: 'Wed',
      content: {
        title: "Rutgers Health and Rehabilitation",
        body: "It's time to exercise, Tap to watch more videos and progress your health!",
      },
      trigger: {
        weekday: 4,
        hour: 17,
        minute: 15,
        repeats: true,
      },
    });
  }
  async function scheduleThursday(Enabled) {
    await Notifications.scheduleNotificationAsync({
      identifier: 'Thurs',
      content: {
        title: "Rutgers Health and Rehabilitation",
        body: "It's time to exercise, Tap to watch more videos and progress your health!",
      },
      trigger: {
        weekday: 5,
        hour: 17,
        minute: 15,
        repeats: true,
      },
    });
  }
  async function scheduleFriday(Enabled) {
    await Notifications.scheduleNotificationAsync({
      identifier: 'Fri',
      content: {
        title: "Rutgers Health and Rehabilitation",
        body: "It's time to exercise, Tap to watch more videos and progress your health!",
      },
      trigger: {
        weekday: 6,
        hour: 17,
        minute: 15,
        repeats: true,
      },
    });
  }

  async function scheduleSaturday(Enabled) {
    await Notifications.scheduleNotificationAsync({
      identifier: 'Sat',
      content: {
        title: "Rutgers Health and Rehabilitation",
        body: "It's time to exercise, Tap to watch more videos and progress your health!",
      },
      trigger: {
        weekday: 7,
        hour: 17,
        minute: 15,
        repeats: true,
      },
    });
  }

  async function cancelSunday(Enabled) {
    await Notifications.cancelScheduledNotificationAsync('Sun');
  }
  async function cancelMonday(Enabled) {
    await Notifications.cancelScheduledNotificationAsync('Mon');
  }
  async function cancelTuesday(Enabled) {
    await Notifications.cancelScheduledNotificationAsync('Tues');
  }
  async function cancelWednesday(Enabled) {
    await Notifications.cancelScheduledNotificationAsync('Wed');
  }
  async function cancelThursday(Enabled) {
    await Notifications.cancelScheduledNotificationAsync('Thurs');
  }
  async function cancelFriday(Enabled) {
    await Notifications.cancelScheduledNotificationAsync('Fri');
  }
  async function cancelSaturday(Enabled) {
    await Notifications.cancelScheduledNotificationAsync('Sat');
  }

  
  const SundaySwitch = () => {
    toggleSunday(previousState => !previousState);
    setIsEnabled({...isEnabled, Sunday: !isEnabled.Sunday}); 
    check5(!sundayToggle, mondayToggle, tuesdayToggle, wednesdayToggle, thursdayToggle, fridayToggle, saturdayToggle);
    setSchedule(!sundayToggle, mondayToggle, tuesdayToggle, wednesdayToggle, thursdayToggle, fridayToggle, saturdayToggle);
  }
  const MondaySwitch = () => {
    toggleMonday(previousState => !previousState);
    setIsEnabled({...isEnabled, Monday: !isEnabled.Monday}); 
    check5(sundayToggle, !mondayToggle, tuesdayToggle, wednesdayToggle, thursdayToggle, fridayToggle, saturdayToggle);
    setSchedule(sundayToggle, !mondayToggle, tuesdayToggle, wednesdayToggle, thursdayToggle, fridayToggle, saturdayToggle);
  }
  const TuesdaySwitch = () => {
    toggleTuesday(previousState => !previousState);
    setIsEnabled({...isEnabled, Tuesday: !isEnabled.Tuesday}); 
    check5(sundayToggle, mondayToggle, !tuesdayToggle, wednesdayToggle, thursdayToggle, fridayToggle, saturdayToggle);
    setSchedule(sundayToggle, mondayToggle, !tuesdayToggle, wednesdayToggle, thursdayToggle, fridayToggle, saturdayToggle);
  }
  const WednesdaySwitch = () => {
    toggleWednesday(previousState => !previousState);
    setIsEnabled({...isEnabled, Wednesday: !isEnabled.Wednesday}); 
    check5(sundayToggle, mondayToggle, tuesdayToggle, !wednesdayToggle, thursdayToggle, fridayToggle, saturdayToggle);
    setSchedule(sundayToggle, mondayToggle, tuesdayToggle, !wednesdayToggle, thursdayToggle, fridayToggle, saturdayToggle);
  }
  const ThursdaySwitch = () => {
    toggleThursday(previousState => !previousState);
    setIsEnabled({...isEnabled, Thursday:!isEnabled.Thursday}); 
    check5(sundayToggle, mondayToggle, tuesdayToggle, wednesdayToggle, !thursdayToggle, fridayToggle, saturdayToggle);
    setSchedule(sundayToggle, mondayToggle, tuesdayToggle, wednesdayToggle, !thursdayToggle, fridayToggle, saturdayToggle);
  }
  const FridaySwitch = () => {
    toggleFriday(previousState => !previousState);
    setIsEnabled({...isEnabled, Friday: !isEnabled.Friday});
    check5(sundayToggle, mondayToggle, tuesdayToggle, wednesdayToggle, thursdayToggle, !fridayToggle, saturdayToggle);
    setSchedule(sundayToggle, mondayToggle, tuesdayToggle, wednesdayToggle, thursdayToggle, !fridayToggle, saturdayToggle);
  }
  const SaturdaySwitch = () => {
    toggleSaturday(previousState => !previousState);
    setIsEnabled({...isEnabled, Saturday: !isEnabled.Saturday}); 
    check5(sundayToggle, mondayToggle, tuesdayToggle, wednesdayToggle, thursdayToggle, fridayToggle, !saturdayToggle);
    setSchedule(sundayToggle, mondayToggle, tuesdayToggle, wednesdayToggle, thursdayToggle, fridayToggle, !saturdayToggle);
  }
  const DisableSun = () => {setIsSundayEnabled(previousState => !previousState)}
  const DisableMon = () => {setIsMondayEnabled(previousState => !previousState)}
  const DisableTues = () => {setIsTuesdayEnabled(previousState => !previousState)}
  const DisableWed = () => {setIsWednesdayEnabled(previousState => !previousState)}
  const DisableThurs = () => {setIsThursdayEnabled(previousState => !previousState)}
  const DisableFri = () => {setIsFridayEnabled(previousState => !previousState)}
  const DisableSat = () => {setIsSaturdayEnabled(previousState => !previousState)}

  const setSchedule = (Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday) => {
    console.log(Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday);
    Sunday ? scheduleSunday(Sunday) : cancelSunday();
    Monday ? scheduleMonday(Monday) : cancelMonday();
    Tuesday ? scheduleTuesday(Tuesday) : cancelTuesday();
    Wednesday ? scheduleWednesday(Wednesday) : cancelWednesday();
    Thursday ? scheduleThursday(Thursday) : cancelThursday();
    Friday ? scheduleFriday(Friday) : cancelFriday();
    Saturday ? scheduleSaturday(Saturday) : cancelSaturday();
  }
  //const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const check5 = (Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday) => {
      
    if ((Sunday ? 1:0)+(Monday ? 1:0)+(Tuesday ? 1:0)+(Wednesday ? 1:0)+(Thursday ? 1:0)+(Friday ? 1:0)+(Saturday ? 1:0) >= 5)
    {
      Sunday ? null : DisableSun();
      Monday ? null : DisableMon();
      Tuesday ? null : DisableTues();
      Wednesday ? null : DisableWed();
      Thursday ? null : DisableThurs();
      Friday ? null : DisableFri();
      Saturday ? null : DisableSat();
      console.log(Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday);
    }
    else{
      setIsSundayEnabled(false)
      setIsMondayEnabled(false)
      setIsTuesdayEnabled(false)
      setIsWednesdayEnabled(false)
      setIsThursdayEnabled(false)
      setIsFridayEnabled(false)
      setIsSaturdayEnabled(false)
    }
  }




  return (
    <View style={styles.container}>
      <View style={styles.containerMargin}>
      <View style={styles.questionContainer}>
      <Text style={styles.title}>Choose any 5 days to recieve notifications about your excercises</Text>
      </View>
      <View style={styles.contentContainer}>
      <View style={styles.weekSelect}>
      <Text style={styles.title}>Sunday</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={sundayToggle ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={SundaySwitch}
        value={sundayToggle}
        disabled={isSundayEnabled}
      />
      </View>
      <View style={styles.weekSelect}>
      <Text style={styles.title}>Monday</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={mondayToggle ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={MondaySwitch}
        value={mondayToggle}
        disabled={isMondayEnabled}
      />
      </View>
      <View style={styles.weekSelect}>
      <Text style={styles.title}>Tuesday</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={tuesdayToggle ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={TuesdaySwitch}
        value={tuesdayToggle}
        disabled={isTuesdayEnabled}
      />
      </View>
      <View style={styles.weekSelect}>
      <Text style={styles.title}>Wednesday</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={wednesdayToggle ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={WednesdaySwitch}
        value={wednesdayToggle}
        disabled={isWednesdayEnabled}
      />
      </View>
      <View style={styles.weekSelect}>
      <Text style={styles.title}>Thursday</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={thursdayToggle ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={ThursdaySwitch}
        value={thursdayToggle}
        disabled={isThursdayEnabled}
      />
      </View>
      <View style={styles.weekSelect}>
      <Text style={styles.title}>Friday</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={fridayToggle ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={FridaySwitch}
        value={fridayToggle}
        disabled={isFridayEnabled}
      />
      </View>
      <View style={styles.weekSelect}>
      <Text style={styles.title}>Saturday</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={saturdayToggle ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={SaturdaySwitch}
        value={saturdayToggle}
        disabled={isSaturdayEnabled}
      />
      </View>
      
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      </View>
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
    
    alignItems: 'center',
    //justifyContent: 'center',
    backgroundColor: '#42a4e3'
  },
  weekSelect: {
    marginBottom: 15,
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'row', 
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  switch: {
    
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
    
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
