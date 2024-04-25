import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CircularProgress } from 'react-native-circular-progress';
import { MaterialIcons } from '@expo/vector-icons'; // Import Expo vector icons

const Cards = ({ plantData }) => {
  const healthCondition = getHealthCondition(plantData.Temperature, plantData.Moisture);

  return (
    <View style={styles.card}>
      <Text style={styles.name}>{plantData.Name}</Text>
      <View style={styles.detailsContainer}>
        <Stat label="Temperature" value={plantData.Temperature} color="#fa7272" iconName="thermostat" />
        <Stat label="Moisture" value={plantData.Moisture} color="#4682B4" iconName="opacity" />
      </View>
      <Text style={styles.healthCondition}>{healthCondition}</Text>
    </View>
  );
};

const Stat = ({ label, value, color, iconName }) => (
  <View style={styles.stat}>
    <Text style={styles.statlabel}>{label}</Text>
    <View style={styles.circularProgressContainer}>
      <CircularProgress
        size={60}
        width={4}
        fill={(value / 100) * 100}
        tintColor={color}
        backgroundColor="#b7b7b7"
        rotation={0}
        lineCap="round"
      />
      {/* Icon placed as a sibling component */}
      
      <View style={styles.iconContainer}>
        <MaterialIcons name={iconName} size={17} color={color} />
        <Text style={styles.statValue}>{value}</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#699e6e',
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    width: 150,
    height: 200, // Adjusted height to accommodate the health condition message
    maxWidth: 300,
    backgroundColor: '#a3d8aa', // Background color of the card
    alignItems: 'center',
    elevation: 70, // For Android shadow
    shadowColor: 'black', // For iOS shadow
    shadowOffset: { width: 5, height: 5 }, // For iOS shadow
    shadowOpacity: 0.25, // For iOS shadow
    shadowRadius: 3.84, // For iOS shadow
  },
  
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#273d2c', // Text color of the name
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  stat: {
    alignItems: 'center',
  },
  circularProgressContainer: {
    position: 'relative', // Needed for positioning the icon
  },
  iconContainer: {
    position: 'absolute',
    top: '50%',
    left: '55%',
    transform: [{ translateX: -12 }, { translateY: -12 }], // Adjust position to center the icon
  },
  statValue: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#273d2c', // Text color of the value
  },
  statlabel:{
    fontSize: 11,
    fontWeight: '500',
    color: 'black', // Text color of the value
    marginBottom: 10,

  },
  healthCondition: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6b717d', // Text color for health condition message
  },
});

// Define the getHealthCondition function
const getHealthCondition = (temperature, moisture) => {
  let healthCondition = '';

  // Define thresholds for temperature and moisture
  const temperatureThreshold = 25; // Example threshold for temperature
  const moistureThreshold = 60; // Example threshold for moisture

  // Check temperature and moisture levels to determine health condition
  if (temperature > temperatureThreshold && moisture > moistureThreshold) {
    healthCondition = 'Optimal';
  } else if (temperature > temperatureThreshold) {
    healthCondition = 'High Temperature';
  } else if (moisture > moistureThreshold) {
    healthCondition = 'High Moisture';
  } else {
    healthCondition = 'Normal';
  }

  return healthCondition;
};

export default Cards;
