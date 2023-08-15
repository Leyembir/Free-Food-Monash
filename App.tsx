import React, { useState, useEffect } from "react";
import styles from "./AppStyles";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Card, withTheme } from "@rneui/themed";
import axios from "axios";
import { color } from "@rneui/themed/dist/config";
const App = () => {
  const [scheduleData, setScheduleData] = useState({
    monday: { time: [], event_name: [], location: [] },
    tuesday: { time: [], event_name: [], location: [] },
    wednesday: { time: [], event_name: [], location: [] },
    thursday: { time: [], event_name: [], location: [] },
    friday: { time: [], event_name: [], location: [] },
  });


  const currentDate = new Date().toLocaleString("en-US", { timeZone: "Australia/Sydney" });
  const currentDay = new Intl.DateTimeFormat('en-US', { weekday: 'long', timeZone: 'Australia/Sydney' }).format(new Date()).toLowerCase();
  const currentHour = new Date(currentDate).getHours();
  // const currentHour = "4:23:37 PM";

  console.log("Current date:", currentDate); // Debug statement 1
  console.log("Current day:", currentDay); // Debug statement 2
  console.log("Current hour:", currentHour); // Debug statement 3




  //opens up google maps with the location of the event
  const openGoogleMaps = (location: string | number | boolean) => {
    let query = encodeURIComponent(location);

    console.log("Original query:", query); // Debug statement 1

    if (query.toLowerCase() === "boob%20lawn") {
      // Updated check
      query = "-37.9109535387807, 145.13193000867986";
      const url = `http://www.google.com/maps/place/${query}`;
      Linking.openURL(url);
      console.log("URL:", url); // Debug statement 2
    }
    if (query.toLowerCase() === "wholefoods") {
      // Updated check
      query = "-37.9109535387807, 145.13193000867986";
      const url = `https://goo.gl/maps/WNnENvnQk8tfDx8X6`;
      Linking.openURL(url);
      console.log("URL:", url); // Debug statement 2
     } 
     if (query.toLowerCase() === "dining%20hall") {
      // Updated check
      const url = `https://goo.gl/maps/hVntoJ4nXnubEJSb7`;
      Linking.openURL(url);
      console.log("URL:", url); // Debug statement 2
     }
    if (query.toLowerCase() === "airport%20lounge") {
     // Updated check
     const url = `https://goo.gl/maps/4DBjgvatHZcE4JAZ7`;
     Linking.openURL(url);
     console.log("URL:", url); // Debug statement 2
    }
     else {
      const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
      Linking.openURL(url);
      console.log("URL:", url); // Debug statement 3
    }
  };
  const isCurrentEvent = (eventTime, eventDay) => {
    const timeParts = eventTime.split('-');
    if (timeParts.length !== 2) return false; // Ensure there are start and end times

    let startHour = timeParts[0] && parseInt(timeParts[0]);
    let endHour = timeParts[1] && parseInt(timeParts[1]);

    // Adjust for AM/PM
    if (timeParts[0] && timeParts[0].includes('pm') && startHour !== 12) startHour += 12;
    if (timeParts[1] && timeParts[1].includes('pm') && endHour !== 12) endHour += 12;

    return currentDay === eventDay && currentHour >= startHour && currentHour < endHour;
};


  
  //fetches the data from the server
  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const response = await axios.get('http://13.239.40.234/json-object');
        setScheduleData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };





    fetchScheduleData();
  }, []); // Empty dependency array ensures it runs only once when the component mounts
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={{ alignItems: 'center', paddingVertical: 10 }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'white', fontFamily: 'Helvetica' }}>
          Monash Free Food Guide
        </Text>
      </View>
      <View style={{ alignItems: 'center', paddingVertical: 1 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', fontFamily: 'Helvetica' }}>
          Week 3
        </Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingVertical: 16 }}>
        {/* Render the schedule for each day */}
        {Object.entries(scheduleData).map(([day, data]) => (
          <View key={day} style={{ marginBottom: 18}}>
            {/* Center the day's title */}
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </Text>
            </View>
            {data.time.map((time, index) => (
              
              <View
                key={index}
                style={{
                  marginBottom: 8,
                  borderRadius: 10, // Apply border-radius to make the View rounded
                  overflow: 'hidden', // Ensure content stays within rounded corners
                  backgroundColor: isCurrentEvent(time, day) ? 'green' : 'transparent' // Apply conditional styling
                }}
              ><Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                {isCurrentEvent(time, day) ? 'Happening now!' : ''}
                </Text>
                <Card containerStyle={{borderRadius: 10}}>
                  <Card.Title>{time}</Card.Title>
                  <Card.Divider />
                  <Text style={{ fontWeight: 'bold' }}>{data.event_name[index]}</Text>
                  {/* Make the location text clickable */}
                  <TouchableOpacity onPress={() => openGoogleMaps(data.location[index])}>
                    <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
                      {data.location[index]}
                    </Text>
                  </TouchableOpacity>
                </Card>
              </View>
            ))}
          </View>
          
        ))}
        <View style={{padding: 1}}>            <Text style= {{color:'white'}}>Created by Amir©</Text></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;



