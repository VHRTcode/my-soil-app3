import React, { useState } from 'react';
import { View, TextInput, Button, Modal, TouchableOpacity, Text, StyleSheet } from 'react-native';

const FirebaseExample = () => {
  const [plantsData, setPlantsData] = useState({});
  const [plantName, setPlantName] = useState('');
  const [newPlantData, setNewPlantData] = useState({
    Humidity: '',
    Moisture: '',
    Name: '',
    Temperature: ''
  });
  const [modalVisible, setModalVisible] = useState(false);

  const handleInputChange = (key, value) => {
    setNewPlantData(prevState => ({
      ...prevState,
      [key]: value
    }));
  };

  const postDataToFirebase = async () => {
    try {
      const firebaseUrl = 'https://my-soil-app2-default-rtdb.firebaseio.com/PlantDatabase.json';
      const response = await fetch(firebaseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPlantData), // Just post new plant data
      });
  
      if (!response.ok) {
        throw new Error('Failed to post data to Firebase');
      }
  
      // Clear input fields after successful posting
      setPlantName('');
      setNewPlantData({
        Humidity: '',
        Moisture: '',
        Name: '',
        Temperature: ''
      });
  
      console.log('Data posted successfully!');
    } catch (error) {
      console.error('Error posting data to Firebase:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Plant Name"
              value={plantName}
              onChangeText={text => setPlantName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Humidity"
              value={newPlantData.Humidity}
              onChangeText={text => handleInputChange('Humidity', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Moisture"
              value={newPlantData.Moisture}
              onChangeText={text => handleInputChange('Moisture', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={newPlantData.Name}
              onChangeText={text => handleInputChange('Name', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Temperature"
              value={newPlantData.Temperature}
              onChangeText={text => handleInputChange('Temperature', text)}
            />
            <Button style={styles.Addbutton}
              title="Add Plant"
              onPress={() => {
                postDataToFirebase();
                setModalVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#a3d8aa',
    borderColor: '#294834', // Border color
    borderWidth: 2, // Border width
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  fabText: {
    fontSize: 30,
    color: '#294834',
  },
  modalContainer: {
    
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width:250,
    backgroundColor: '#e2ded3',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  Addbutton:{
    backgroundColor:'black',
    color:'black',

  },
});

export default FirebaseExample;
