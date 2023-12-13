import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

const ConverterApp = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');

  const conversionRates = {
    weight: {
      kg: 1,
      g: 1000,
      lb: 2.20462,
    },
    length: {
      cm: 1,
      m: 0.01,
      km: 0.00001,
      mile: 0.00000621371,
    },
    currency: {
      usd: 1,
      eur: 0.93,
      rub: 89.95,
    },
    temperature: {
      C: {
        toCelsius: (f) => (f - 32) * (5 / 9),
        fromCelsius: (c) => (c * 9) / 5 + 32,
      },
      F: {
        toCelsius: (c) => c,
        fromCelsius: (c) => c,
      },
    },
    area: {
      squareMeter: 1,
      squareKilometer: 0.000001,
    },
  };

  const handleConvert = () => {
    if (
      inputValue &&
      !isNaN(inputValue) &&
      fromUnit &&
      toUnit &&
      conversionRates[selectedCategory][fromUnit] &&
      conversionRates[selectedCategory][toUnit]
    ) {
      let calculatedResult;
      if (selectedCategory === 'currency') {
        const fromValue = parseFloat(inputValue);
        calculatedResult =
          (fromValue / conversionRates[selectedCategory][fromUnit]) *
          conversionRates[selectedCategory][toUnit];
      } else if (selectedCategory === 'temperature') {
        const fromValue = parseFloat(inputValue);
        const convertedValue = conversionRates[selectedCategory][toUnit].toCelsius(fromValue);
        calculatedResult = conversionRates[selectedCategory][fromUnit].fromCelsius(convertedValue);
      } else if (selectedCategory === 'area') {
        const fromValue = parseFloat(inputValue);
        calculatedResult =
          (fromValue * conversionRates[selectedCategory][fromUnit]) /
          conversionRates[selectedCategory][toUnit];
      } else {
        const fromValue = parseFloat(inputValue);
        const rate = conversionRates[selectedCategory][toUnit] / conversionRates[selectedCategory][fromUnit];
        calculatedResult = fromValue * rate;
      }
      setResult(calculatedResult.toFixed(2).toString());
    } else {
      setResult('Invalid Input');
    }
  };

  const renderCategoryButtons = () => {
    return (
      <View style={styles.categories}>
        <TouchableOpacity
          style={styles.categoryButton}
          onPress={() => setSelectedCategory('weight')}>
          <Text>Weight</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categoryButton}
          onPress={() => setSelectedCategory('length')}>
          <Text>Length</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categoryButton}
          onPress={() => setSelectedCategory('currency')}>
          <Text>Currency</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categoryButton}
          onPress={() => setSelectedCategory('temperature')}>
          <Text>Temperature</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categoryButton}
          onPress={() => setSelectedCategory('area')}>
          <Text>Area</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const resetConverter = () => {
    setSelectedCategory(null);
    setFromUnit('');
    setToUnit('');
    setInputValue('');
    setResult('');
  };

  return (
    <View style={styles.container}>
      {!selectedCategory ? (
        renderCategoryButtons()
      ) : (
        <View style={styles.converter}>
          <TouchableOpacity style={styles.backButton} onPress={resetConverter}>
            <Text style={styles.backButtonText}>Back to Menu</Text>
          </TouchableOpacity>
          <Text style={styles.heading}>Converter - {selectedCategory}</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setFromUnit(text)}
            value={fromUnit}
            placeholder={`From ${selectedCategory.charAt(0).toUpperCase()}${selectedCategory.slice(1)} Unit`}
          />
          {(selectedCategory !== 'currency' && selectedCategory !== 'temperature') && (
            <TextInput
              style={styles.input}
              onChangeText={(text) => setToUnit(text)}
              value={toUnit}
              placeholder={`To ${selectedCategory.charAt(0).toUpperCase()}${selectedCategory.slice(1)} Unit`}
            />
          )}
          {(selectedCategory === 'currency' || selectedCategory === 'temperature') && (
            <TextInput
              style={styles.input}
              onChangeText={(text) => setToUnit(text)}
              value={toUnit}
              placeholder={`To ${selectedCategory.charAt(0).toUpperCase()}${selectedCategory.slice(1)} Unit`}
            />
          )}
          <TextInput
            style={styles.input}
            placeholder="Enter value"
            keyboardType="numeric"
            value={inputValue}
            onChangeText={(text) => setInputValue(text)}
          />
          <TouchableOpacity style={styles.convertButton} onPress={handleConvert}>
            <Text style={styles.convertButtonText}>Convert</Text>
          </TouchableOpacity>
          <Text style={styles.result}>{result}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  categoryButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
  },
  converter: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    width: '80%',
    backgroundColor: '#ffffff',
  },
  convertButton: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  convertButtonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  result: {
    fontSize: 20,
    marginTop: 15,
    fontWeight: 'bold',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 10,
  },
  backButtonText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default ConverterApp;
