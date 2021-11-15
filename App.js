import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import { API_KEY } from './utils/WeatherAPIKey';

import Weather from './components/Weather';

export default class App extends React.Component {

  state = {
    city: "Toronto",
    postal: null,
    isLoading: true,
    forecast: null
  };

  zipOrCity(data){
    if (data.includes(',')){
      //zip
      this.changeCity(data,true)
    }
    else{
      //city
      this.changeCity(data,false)
    }
  }

  changeCity(data,zip){
    let entry = ""
    if (zip){
      entry = "zip=" + data
    }
    else{
      entry = "q=" + data
    }
    this.fetchWeather(entry)
  }

  componentDidMount(){
    this.zipOrCity(this.state.city)
  }

  fetchWeather(entry) {
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?${entry}&cnt=7&lang=en&appid=${API_KEY}&units=metric`
      )
      .then(res => res.json())
      .then(json => {
        let newforecast = []
        for(let i = 0; i < 7; i++){
          newforecast[i] = {
            desc: json.list[i].weather[0].main,
            current: json.list[i].main.temp,
            min: json.list[i].main.temp_min,
            max: json.list[i].main.temp_max,
            wind: json.list[i].wind.speed,
            precip: json.list[i].pop,
            humid: json.list[i].main.humidity
          }
        }
        if(newforecast != null){
          this.setState({
            forecast: newforecast,
            isLoading: false,
            city: json.city.name
          });
        }
      });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.state.isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Fetching The Weather</Text>
          </View>
        ) : (
          <Weather weather={this.state.forecast} city={this.state.city} func={this.zipOrCity.bind(this)}/>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    flexGrow: 1,
    flex: 1,
    backgroundColor: '#fff'
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFDE4'
  },
  loadingText: {
    fontSize: 30
  }
});