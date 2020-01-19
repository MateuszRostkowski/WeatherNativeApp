import React, { Component } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, ImageBackground } from 'react-native';
import SearchInput from "./components/SearchInput"
import getImageForWeather from "./utils/getImageForWeather"

export default class App extends Component {
  render() {
    return (
      <KeyboardAvoidingView
       style={styles.container}
       behavior="padding"
      >
        <ImageBackground
          source={getImageForWeather("Clear")}
          style={styles.imageContainer}
          imageStyle={styles.image}
        > 
          <View style={styles.detailsContainer}>
            <Text style={[styles.textStyle, styles.largeText]}>
              San Francisco
            </Text>
            <Text style={[styles.textStyle, styles.smallText]}>
              Light Cloud
            </Text>
            <Text style={[styles.textStyle, styles.largeText]}>
              24°
            </Text>
            <SearchInput placeholder="Search any city" />
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1, 
  },
  imageStyle: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  textStyle: {
    textAlign: "center",
    fontFamily: 
      Platform.OS === "ios" ? 'AvenirNext-Regular' : 'Roboto',
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },  
});
