import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const Combinaison = () => {
  const [professors, setProfessors] = useState([]);
  const [combinations, setCombinations] = useState([]);

  useEffect(() => {
    fetchProfessors();
  }, []);

  const fetchProfessors = async () => {
    try {
      const response = await fetch(
        'https://troubled-red-garb.cyclic.app/professeurs'
      );
      const data = await response.json();
      setProfessors(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCombination = () => {
    const combinationsData = [];

    professors.forEach((professor) => {
      const { _id, villeFaculteActuelle, villeDesiree } = professor;
      const possibleCombinations = professors.filter(
        (p) =>
          p._id !== _id &&
          p.villeFaculteActuelle === villeDesiree &&
          p.villeDesiree === villeFaculteActuelle
      );

      if (possibleCombinations.length > 0) {
        combinationsData.push({
          professor,
          combinations: possibleCombinations,
        });
      }
    });

    setCombinations(combinationsData);
  };

  const renderCombination = ({ item }) => {
    const { professor, combinations } = item;
    return (
      <View style={styles.card}>
        <Text
          style={
            styles.professorName
          }>{`${professor.prenom} ${professor.nom}`}</Text>
        <Text
          style={
            styles.professorDetails
          }>{`Current City: ${professor.villeFaculteActuelle}`}</Text>
        <Text
          style={
            styles.professorDetails
          }>{`Desired City: ${professor.villeDesiree}`}</Text>
        <Text style={styles.combinationLabel}>Can Combine With:</Text>
        {combinations && combinations.length > 0 ? (
          <FlatList
            data={combinations}
            renderItem={renderCombinationItem}
            keyExtractor={(item) => item._id}
            style={styles.combinationsList}
          />
        ) : (
          <Text style={styles.noCombinationsText}>No combinations found.</Text>
        )}
      </View>
    );
  };

  const renderCombinationItem = ({ item }) => {
    const { prenom, nom, villeFaculteActuelle, villeDesiree } = item;
    return (
      <Text
        style={
          styles.professorDetails
        }>{`${prenom} ${nom} (${villeFaculteActuelle} - ${villeDesiree})`}</Text>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleCombination} style={styles.button}>
        <Text style={styles.buttonText}>Possible Combinations</Text>
      </TouchableOpacity>
      {combinations && combinations.length > 0 ? (
        <FlatList
          data={combinations}
          renderItem={renderCombination}
          keyExtractor={(item) => item.professor._id}
          style={styles.combinationsList}
        />
      ) : (
        <Text></Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#6495ed',
    borderRadius: 10,
    padding: 16,
    marginBottom: 8,
    elevation: 2,
  },
  professorName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
    color: 'white',
  },
  professorDetails: {
    fontSize: 14,
    marginBottom: 2,
    color: 'white',
  },
  combinationLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
    color: 'white',
  },
  combinationsList: {
    marginLeft: 8,
    color: 'white',
  },
  button: {
    backgroundColor: 'blue',
    padding: 16,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Combinaison;
