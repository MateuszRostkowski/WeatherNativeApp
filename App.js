import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StatusBar,
  ImageBackground
} from "react-native";

import SearchInput from "./components/SearchInput";
import getImageForWeather from "./utils/getImageForWeather";
import { fetchLocationId, fetchWeather } from "./utils/api"

export default class App extends Component {
  state = {
    loading: false,
    error: false,
    errorName: "",
    location: "",
    temperature: 0,
    weather: ''
  };

  componentDidMount() {
    this.handleUpdateLocation("Warsaw");
  }

  handleUpdateLocation = city => {
    if(!city) return

    this.setState({loading: true}, async () => {
      try {
        const locationId = await fetchLocationId(city);
        const { location, weather, temperature } = await fetchWeather(locationId) 
    
        this.setState({
          loading: false,
          error: false,
          location: city,
          weather,
          temperature,
        })
      } catch (e) {
        this.setState({
          loading: false,
          error: true,
          errorName: e
        })
      }
    })
    

    this.setState({ city });
  };

  render() {
    const { location, error, errorName, loading, temperature, weather } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <StatusBar barStyle="light-content"/>
        <ImageBackground
          source={getImageForWeather("Clear")}
          style={styles.imageContainer}
          imageStyle={styles.image}
        >
          <View style={styles.detailsContainer}>
            <ActivityIndicator animating={loading} color="white" size="large" />
            {!loading && (
              <View>
                {error && (
                  <Text>
                    Could not load load weather, please try another 
                    location. This is error that happend:
                  </Text>
                )}

                {!error && (
                  <View>
                    <Text style={[styles.textStyle, styles.largeText]}>
                      { location }
                    </Text>
                    <Text style={[styles.textStyle, styles.smallText]}>
                      { weather }
                    </Text>
                    <Text style={[styles.textStyle, styles.largeText]}>
                      {`${Math.round(temperature)}°`}
                    </Text>
                    <SearchInput
                      placeholder="Search any city"
                      onSubmit={this.handleUpdateLocation}
                    />
                  </View>
                )}                
              </View>
            )}
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "center"
  },
  imageContainer: {
    flex: 1
  },
  imageStyle: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover"
  },
  textStyle: {
    textAlign: "center",
    color: "#fff",
    fontFamily: Platform.OS === "ios" ? "AvenirNext-Regular" : "Roboto"
  },
  largeText: {
    fontSize: 44
  },
  smallText: {
    fontSize: 18
  }
});
