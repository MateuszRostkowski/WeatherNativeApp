import React, { Component } from "react"
import { StyleSheet, TextInput, View } from "react-native"


export default class SearchInput extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TextInput 
                    autoCorrect={false}
                    placeholder="Search any city"
                    placeholderTextColor="white"
                    style={styles.textInput}
                    clearButtonMode="always" 
                />
            </View>
        )
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
        color: "#000"
    },
})