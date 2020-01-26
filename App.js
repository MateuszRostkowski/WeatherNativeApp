import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  ImageBackground,
  ScrollView
} from "react-native";

import SearchInput from "./components/SearchInput";
import getImageForWeather from "./utils/getImageForWeather";
import { fetchLocationId, fetchWeather } from "./utils/api"

export default class App extends Component {
  state = {
    text: '',
    loading: false,
    error: false,
    errorName: "",
    location: "",
    temperature: 0,
    degrees: "C",
    weather: '',
    cities: []
  };

  componentDidMount() {
    this.handleUpdateLocation("Warsaw");
  }

  handleUpdateLocation = city => {
    if(!city) return

    this.setState({loading: true}, async () => {
      try {
        const { locationId, locations} = await fetchLocationId(city);
        const { location, weather, temperature } = await fetchWeather(locationId) 
        
        console.log(locations)
        this.setState({
          loading: false,
          error: false,
          location,
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

  handlePressButton = (degrees) => {
    if (degrees == "C") {
      this.setState({ degrees: "F" })
    } else {
      this.setState({ degrees: "C" })
    }
  }

  onChangeText = (text) => {
    this.setState({ text }, async () => {
      try {
        const { locations } = await fetchLocationId(text);  
        const cities = locations.map((city) => {
          return city.title
        })
        this.setState({ cities })
      } catch (e) {
        if(this.state.text.length > 0) {
          this.setState({ cities: ["Can't find location with that name"] })
        }
      }
    })
  }

  get actualTemperature() {
    if(this.state.degrees == "C") {
      return this.state.temperature
    } else {
      return this.state.temperature * 1.8 + 32
    }
  }

  render() {
    const { location, error, loading, weather, degrees, cities, text } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <StatusBar barStyle="light-content"/>
        <ImageBackground
          source={getImageForWeather(weather)}
          style={styles.imageContainer}
          imageStyle={styles.image}
        >
          <View style={styles.detailsContainer}>
            <ActivityIndicator animating={loading} color="white" size="large" />
            {!loading && (
              <View style={styles.centerContainer}>
                {error && (
                  <Text style={[styles.textStyle, styles.smallText, styles.paddingForText]}>
                    Could not load load weather, please try another location.
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
                    <TouchableOpacity
                      onPress={() => this.handlePressButton(degrees)}
                    >
                      <View style={styles.button}>
                        <Text style={[styles.textStyle, styles.largeText]}>
                          {`${Math.round(this.actualTemperature)}°${degrees}`}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
                <SearchInput
                  placeholder="Search any city"
                  onSubmit={this.handleUpdateLocation}
                  onChangeText={this.onChangeText}
                />
                {cities.length > 0 && text.length > 0 && <ScrollView style={styles.scrollViewContainer}>
                  {cities.map((city, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          this.handleUpdateLocation(city)
                          this.setState({cities: []})
                        }}
                        key={index}
                      >
                        <Text style={[styles.textStyle, styles.smallText, styles.smallPaddingForText]}>
                          {city}
                        </Text>
                      </TouchableOpacity>
                    )
                  })}
                </ScrollView>}
              </View>
            )}            
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    height: 200,
    width: 300,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 10,
    marginHorizontal: 40,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "center"
  },
  paddingForText: {
    paddingVertical: 20,
  },
  smallPaddingForText: {
    paddingVertical: 8,
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
