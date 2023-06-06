import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { PieChart } from 'react-native-svg-charts';

function HomeScreen() {
  const [professors, setProfessors] = useState([]);

  useEffect(() => {
    fetchProfessors();
  }, []);

  const fetchProfessors = async () => {
    try {
      const response = await fetch('https://troubled-red-garb.cyclic.app/professeurs');
      const data = await response.json();
      setProfessors(data);
    } catch (error) {
      console.error("Une erreur s'est produite lors de la récupération des données:", error);
    }
  };

  const calculateProfessorsByGrade = () => {
    const professorsByGrade = {};

    professors.forEach((professor) => {
      if (professor.grade in professorsByGrade) {
        professorsByGrade[professor.grade]++;
      } else {
        professorsByGrade[professor.grade] = 1;
      }
    });

    return professorsByGrade;
  };


  const calculateMostDemandedCities = () => {
    const citiesCount = {};
    const totalProfessors = professors.length;

    professors.forEach((professor) => {
      const desiredCities = professor.villeDesiree.split(';');
      desiredCities.forEach((city) => {
        if (city in citiesCount) {
          citiesCount[city]++;
        } else {
          citiesCount[city] = 1;
        }
      });
    });

    const citiesPercentage = {};
    for (const city in citiesCount) {
      const percentage = (citiesCount[city] / totalProfessors) * 100;
      citiesPercentage[city] = percentage.toFixed(2);
    }

    return citiesPercentage;
  };

  const calculateProfessorsBySpeciality = () => {
    const professorsBySpeciality = {};
    professors.forEach((professor) => {
      if (professor.specialite in professorsBySpeciality) {
        professorsBySpeciality[professor.specialite]++;
      } else {
        professorsBySpeciality[professor.specialite] = 1;
      }
    });
    return professorsBySpeciality;
  };

  const professorsByGrade = calculateProfessorsByGrade();
  const mostDemandedCities = calculateMostDemandedCities();
  const professorsBySpeciality = calculateProfessorsBySpeciality();

  const renderPieChart = (data, colors, title, description) => (
    <ScrollView>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>{title}</Text>
        <View style={styles.chart}>
          <PieChart
            style={{ height: 200 }}
            data={data.map((value, index) => ({
              value,
              svg: {
                fill: colors[index % colors.length],
                onPress: () => console.log('press', index),
              },
              key: `pie-${index}`,
            }))}
            innerRadius={'40%'}
            outerRadius={'70%'}
          />
        </View>
        <Text style={styles.chartDescription}>{description}</Text>
        <View style={styles.legendContainer}>
          {data.map((value, index) => {
            const label = Object.keys(data)[index];
            return (
              <View style={styles.legendItem} key={`legend-${index}`}>
                <View style={[styles.legendColor, { backgroundColor: colors[index % colors.length] }]} />
                <Text style={styles.legendLabel}>{`${label}: ${value} (${((value / Object.values(data).reduce((a, b) => a + b)) * 100).toFixed(2)}%)`}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );

  const gradeColors = ['#FFC300', '#FF5733', '#C70039', '#900C3F', '#581845'];
  const cityColors = ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099'];
  const specialityColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

  return (
    <ScrollView>
      <View style={styles.container}>
        {renderPieChart(
          Object.values(professorsByGrade),
          gradeColors,
          'Nombre de professeurs par grade',
          'Les couleurs représentent les différents grades des professeurs'
        )}

        {renderPieChart(
          Object.values(mostDemandedCities),
          cityColors,
          'Villes les plus demandées',
          'Les couleurs représentent les différentes villes demandées par les professeurs'
        )}

        {renderPieChart(
          Object.values(professorsBySpeciality),
          specialityColors,
          'Nombre de professeurs par spécialité',
          'Les couleurs représentent les différentes spécialités des professeurs'
        )}
      </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  chartContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  chart: {
    height: 200,
    width: 200,
  },
  chartDescription: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  legendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 4,
  },
  legendLabel: {
    fontSize: 12,
  },
});

export default HomeScreen;
