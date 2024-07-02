import React, { useState, useEffect } from "react";
import styles from "./AppStyles";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  Image,
} from "react-native";
import { Card, withTheme } from "@rneui/themed";
import axios from "axios";
import logo from './logo/freefood_monash_logo.png'; // Adjust the path to where you save your logo

const App = () => {
  const [scheduleData, setScheduleData] = useState({
    monday: { time: [], event_name: [], location: [] },
    tuesday: { time: [], event_name: [], location: [] },
    wednesday: { time: [], event_name: [], location: [] },
    thursday: { time: [], event_name: [], location: [] },
    friday: { time: [], event_name: [], location: [] },
  });
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const currentDate = currentTime.toLocaleString("en-US", { timeZone: "Australia/Sydney" });
  const currentDay = new Intl.DateTimeFormat('en-US', { weekday: 'long', timeZone: "Australia/Sydney" }).format(currentTime).toLowerCase();
  const currentHour = currentTime.getHours();
  // const currentHour = "9";
  // const currentDay = "wednesday";

  const currentMinute = currentTime.getMinutes();

  console.log("Current date:", currentDate);
  console.log("Current day:", currentDay);
  console.log("Current time:", currentHour + ":" + currentMinute);

  const openGoogleMaps = (location) => {
    let query = encodeURIComponent(location);

    if (query.toLowerCase() === "boob%20lawn") {
      query = "-37.9109535387807, 145.13193000867986";
      const url = `http://www.google.com/maps/place/${query}`;
      Linking.openURL(url);
    } else if (query.toLowerCase() === "wholefoods") {
      query = "-37.9109535387807, 145.13193000867986";
      const url = `https://goo.gl/maps/WNnENvnQk8tfDx8X6`;
      Linking.openURL(url);
    } else if (query.toLowerCase() === "dining%20hall") {
      const url = `https://goo.gl/maps/hVntoJ4nXnubEJSb7`;
      Linking.openURL(url);
    } else if (query.toLowerCase() === "airport%20lounge") {
      const url = `https://goo.gl/maps/4DBjgvatHZcE4JAZ7`;
      Linking.openURL(url);
    } else {
      const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
      Linking.openURL(url);
    }
  };

  const isCurrentEvent = (eventTime, eventDay) => {
    const parseTime = (time) => {
      const [timePart, modifier] = time.trim().split(' ');
      let [hours, minutes] = timePart.split(':').map(Number);
      if (modifier && modifier.toLowerCase() === 'pm' && hours !== 12) hours += 12;
      if (modifier && modifier.toLowerCase() === 'am' && hours === 12) hours = 0;
      return { hours, minutes: minutes || 0 };
    };

    const [startTime, endTime] = eventTime.split('-').map(parseTime);
    if (!startTime || !endTime) return false;

    const currentMinutes = currentHour * 60 + currentMinute;
    const startMinutes = startTime.hours * 60 + startTime.minutes;
    const endMinutes = endTime.hours * 60 + endTime.minutes;

    console.log(`Checking event on ${eventDay} from ${startMinutes} to ${endMinutes}. Current time: ${currentMinutes}`);

    const isEventNow = currentDay === eventDay && currentMinutes >= startMinutes && currentMinutes < endMinutes;
    console.log(`Is current event: ${isEventNow}`);

    return isEventNow;
  };

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const response = await axios.get('https://free-food-monash-api-337668b48c95.herokuapp.com/json-object');
        setScheduleData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchScheduleData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: 'center', paddingVertical: 10 }}>
        <Image source={logo} style={{ width: 150, height: 100 }} />
      </View>
      <ScrollView contentContainerStyle={{ padding: 5 }}>
        {Object.entries(scheduleData).map(([day, data]) => (
          <View key={day} style={{ marginBottom: 18 }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </Text>
            </View>
            {data.time.map((time, index) => (
              <View
                key={index}
                style={{
                  marginBottom: 1,
                  borderRadius: 20,
                  overflow: 'hidden',
                  backgroundColor: isCurrentEvent(time, day) ? 'orange' : 'transparent'
                }}
              >
                {isCurrentEvent(time, day) && (
                  <Text style={{ alignSelf: 'center',fontSize: 20, fontWeight: 'bold', color: 'white', padding: 10 }}>
                    Happening now!
                  </Text>
                )}
                <Card containerStyle={{alignSelf: 'center', width:500,  borderRadius: 20  ,backgroundColor: isCurrentEvent(time, day) ? 'green' : 'white' }}>
                  <Card.Title style={{ color: isCurrentEvent(time, day) ? 'white' : 'black' }}>{time}</Card.Title>
                  <Card.Divider />
                  <Text style={{ alignSelf: 'center',fontWeight: 'bold', color: isCurrentEvent(time, day) ? 'white' : 'black' }}>{data.event_name[index]}</Text>
                  <TouchableOpacity onPress={() => openGoogleMaps(data.location[index])}>
                    <Text style={{alignSelf:'center', color: isCurrentEvent(time, day) ? 'lightblue' : 'blue', textDecorationLine: 'underline' }}>
                      {data.location[index]}
                    </Text>
                  </TouchableOpacity>
                </Card>
              </View>
            ))}
          </View>
        ))}
        <View style={{ padding: 1 }}>
          <Text style={{ color: 'white' }}>Created by Amir©</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
