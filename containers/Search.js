import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';

import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  StyleSheet,
} from 'react-native';


const Matches = () => {
  const [professeurs, setProfesseurs] = useState([]);
  const [uniqueSpecialites, setUniqueSpecialites] = useState([]);
  const [selectedSpecialite, setSelectedSpecialite] = useState(null);
  const [selectedvilleFaculteActuelle, setSelectedvilleFaculteActuelle] =
    useState(null);
  const [selectedVilleDesiree, setSelectedVilleDesiree] = useState(null);
  const [results, setResults] = useState('');

  useEffect(() => {
    fetch('https://troubled-red-garb.cyclic.app/professeurs')
      .then((response) => response.json())
      .then((data) => {
        setProfesseurs(data);
        const uniqueSpecialites = [
          ...new Set(data.map((entry) => entry.specialite)),
        ];
        setUniqueSpecialites(uniqueSpecialites);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSpecialiteChange = (value) => {
    setSelectedSpecialite(value);
    const selectedProfesseur = professeurs.find(
      (professeur) => professeur.specialite === value
    );
    if (selectedProfesseur) {
      setSelectedvilleFaculteActuelle(selectedProfesseur.villeFaculteActuelle);
      setSelectedVilleDesiree(selectedProfesseur.villeDesiree);
    } else {
      setSelectedvilleFaculteActuelle(null);
      setSelectedVilleDesiree(null);
    }
  };

  const formatResults = () => {
    const selectedProfesseur = professeurs.find(
      (professeur) =>
        professeur.specialite === selectedSpecialite &&
        professeur.villeFaculteActuelle === selectedvilleFaculteActuelle &&
        professeur.villeDesiree === selectedVilleDesiree
    );
    if (selectedProfesseur) {
      const {
        nom,
        prenom,
        email,
        tel,
        grade,
        specialite,
        faculteActuelle,
        villeFaculteActuelle,
        villeDesiree,
      } = selectedProfesseur;

      return `${nom} ${prenom} (${email} | ${tel} | ${grade}) - ${specialite} - (${faculteActuelle} | ${villeFaculteActuelle}) ---> ${villeDesiree}`;
    }
    return '';
  };

  const handleRelease = () => {
    const formattedResults = formatResults();
    setResults(formattedResults);
  };

  return (
    <ImageBackground
      style={styles.bg}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.headerText}>Professeurs:</Text>
          <Picker
            selectedValue={selectedSpecialite}
            onValueChange={handleSpecialiteChange}
            style={styles.picker}>
            {uniqueSpecialites.map((specialite) => (
              <Picker.Item
                key={specialite}
                label={specialite}
                value={specialite}
              />
            ))}
          </Picker>
          <Text style={styles.headerText}>Ville Faculte Actuelle:</Text>
          <Picker
            selectedValue={selectedvilleFaculteActuelle}
            onValueChange={(value) => setSelectedvilleFaculteActuelle(value)}
            style={styles.picker}>
            {professeurs
              .filter(
                (professeur) => professeur.specialite === selectedSpecialite
              )
              .map((professeur) => (
                <Picker.Item
                  key={professeur.villeFaculteActuelle}
                  label={professeur.villeFaculteActuelle}
                  value={professeur.villeFaculteActuelle}
                />
              ))}
          </Picker>
          <Text style={styles.headerText}>Ville Desiree:</Text>
          <Picker
            selectedValue={selectedVilleDesiree}
            onValueChange={(value) => setSelectedVilleDesiree(value)}
            style={styles.picker}>
            {professeurs
              .filter(
                (professeur) =>
                  professeur.specialite === selectedSpecialite &&
                  professeur.villeFaculteActuelle ===
                    selectedvilleFaculteActuelle
              )
              .map((professeur) => (
                <Picker.Item
                  key={professeur.villeDesiree}
                  label={professeur.villeDesiree}
                  value={professeur.villeDesiree}
                />
              ))}
          </Picker>
          <TouchableOpacity onPress={handleRelease} style={styles.button}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
          <View style={styles.card}>
            <Text style={styles.buttonText}>{results}</Text>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Matches;

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
    borderRadius: 10,
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
  card: {
    backgroundColor: '#6495ed',
    borderRadius: 10,
    padding: 16,
    marginBottom: 8,
    elevation: 2,
  },
});
