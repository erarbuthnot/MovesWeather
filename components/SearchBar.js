import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

/**
 * Takes function to be performed on search bar submission,
 * creates the search bar and then applies the function to
 * the onSubmitEditing property
 * @param {Function} func 
 * @returns Returns the SearchBar component
 */
const SearchBar = (func) => {
    return(
        <View style={styles.container}>
            <TextInput placeholder='Find city or zipcode (format: "zipcode,countrycode")' onSubmitEditing={(val) => func.func(val.nativeEvent.text)} style={styles.searchInput}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 8,
    },
    searchInput:{
        width: '100%',
        paddingLeft: 8,
        fontSize: 15,
        color: '#fff'
    }
})

export default SearchBar;