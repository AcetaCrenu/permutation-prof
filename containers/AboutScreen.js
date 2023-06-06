import React from 'react';

import {
  ScrollView,
  Text,
  TouchableOpacity,
  ImageBackground,
  View,
  FlatList,
  StyleSheet,
} from 'react-native';


const Messages = () => {
  return (
    <ImageBackground
      style={styles.bg}>
      <ScrollView>
        <View style={styles.containerMessages}>
          <Text style={styles.headerText}>
            Interchange Platform for University Teachers:
          </Text>

          <Text style={styles.text}>
           This platform is simply a space for university professors to search for a partner for a swap. It is limited to this functionality. Teachers can look for partners interested in an exchange in other higher education institutions. The system facilitates research and correspondence between teachers with a mutual desire to exchange.

The platform offers a user-friendly and secure interface for teachers to communicate and exchange the necessary information. Members can create personal profiles and fill in information regarding their specialties, institutions and contact information. Teachers can view the profiles of potential partners and get in touch with them to discuss the details of the exchange agreement.

By using this platform, teachers can facilitate their search for exchange partners, save time and effort by avoiding one-to-one communications and continuous searches for exchange opportunities. This system is efficient and useful for teachers wishing to change institutions or work in a new establishment to broaden their academic experience.

          </Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Messages;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign:'center'
  },
    text: {
    fontSize: 14,
    marginBottom: 8,
    textAlign:'center'
  },
  picker: {
    backgroundColor: '#efefef',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    marginBottom: 16,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
    borderRadius: 4,
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bg: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
