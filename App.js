import React, { Component } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform } from 'react-native';
import SearchInput from "./components/SearchInput"

export default class App extends Component {
  render() {
    return (
      <KeyboardAvoidingView
       style={styles.container}
       behavior="padding"
      >
        <Text style={[styles.textStyle, styles.largeText]}>
          San Francisco
        </Text>
        <Text style={[styles.textStyle, styles.smallText]}>
          Light Cloud
        </Text>
        <Text style={[styles.textStyle, styles.largeText]}>
          24°
        </Text>
        <SearchInput />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
