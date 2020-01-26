import React, { Component } from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";
import propTypes from 'prop-types';

export default class SearchInput extends Component {
  state = {
    text: ""
  };

  static propTypes = {
    onSubmit: propTypes.func.isRequired,
    placeholder: propTypes.string,
  }
  
  static defaultProps = {
    placeholder: '',
  }  

  handleChangeText = text => {
    const { onChangeText } = this.props
    this.setState({ text }, () => {
      onChangeText(text)
    });
    
  };

  handleSubmitEditing = () => {
    const { onSubmit } = this.props;
    const { text } = this.state;

    if (!text) return;

    onSubmit(text);
    this.setState({ text: "" });
  };

  render() {
    const { placeholder } = this.props;
    const { text } = this.state;

    return (
      <View style={styles.container}>
        <TextInput
          autoCorrect={false}
          value={text}
          placeholder={placeholder}
          placeholderTextColor="white"
          underlineColorAndroid="transparent"
          style={styles.textInput}
          clearButtonMode="always"
          onChangeText={this.handleChangeText}
          onSubmitEditing={this.handleSubmitEditing}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 300,
    marginTop: 20,
    backgroundColor: "#666",    
    marginHorizontal: 40,
    paddingHorizontal: 10,
    borderRadius: 5
  },
  textInput: {
    flex: 1,
    color: "#fff"
  }
});
