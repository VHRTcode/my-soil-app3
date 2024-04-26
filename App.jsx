import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet,ActivityIndicator  } from 'react-native';
import { db } from './firebase/firebaseConfig';
import { ref, onValue, off } from 'firebase/database';
import Cards from './components/CardsRefersh'; // Import the Cards component
import { Appbar, Button } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import EmptyFAB from './components/FabForm'; // Import the EmptyFAB component

function App() {
  const [plantData, setPlantData] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      try {
        const plantRef = ref(db, 'PlantDatabase');
        // Set up a listener for real-time updatesr
        onValue(plantRef, (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            setPlantData(data);
          } else {
            console.log('No data available for Tulip');
          }
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // Cleanup function to remove the listener when component unmounts
    return () => {
      const plantRef = ref(db, 'PlantDatabase');
      // Unsubscribe from real-time updates when component unmounts
      off(plantRef);
    };
  }, []);

  // Render your component with plantData state

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Appbar.Header style={styles.appBar}>
          <Appbar.Content title="Plant Moisture Data" titleStyle={styles.appBarTitle} />
     
        </Appbar.Header>
        <ScrollView vertical showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {plantData ? (
              Object.keys(plantData).map((plantId) => (
                <Cards key={plantId} plantData={plantData[plantId]} />
              ))
            ) : (
              <View style={styles.loadingContainer}>
                 <ActivityIndicator size="large" color="#6b717d" />
            </View>
            )}
          </View>
        </ScrollView>
        <EmptyFAB />
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#447154', // Background color of the app #699e6e
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 19,
  },
  appBar: {
    backgroundColor: '#447154', // Background color of the app bar
  },
  appBarTitle: {
    color: '#294834', // Text color of the app bar title
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
