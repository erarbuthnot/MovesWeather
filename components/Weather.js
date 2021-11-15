import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { weatherConditions } from '../utils/WeatherConditions';
import SearchBar from './SearchBar';

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

const Weather = ({weather, city, func}) => {
  if (weather != null) {
    return (
      <View style={styles.weatherContainer} backgroundColor={weatherConditions[weather[0].desc].color}>
        <View style={styles.navBar}>
            <Text style={styles.cityStyle}>{city} 7-Day Forecast</Text>
            <View flexDirection="row">
                <MaterialCommunityIcons name="magnify" size={20} color={"#fff"}></MaterialCommunityIcons>
                <SearchBar func={func}/>
            </View>
        </View>
        <View>
            {days.map((day,index)=>{
                return(
                    <View key={index} style={styles.weatherEntry}>
                        <View style={styles.weatherHeader}>
                            <Text style={styles.weatherHeader}>{days[(new Date().getDay()+index)%7]}: {weather[index].current}°C </Text>
                            <MaterialCommunityIcons style={styles.weatherHeader} name={weatherConditions[weather[index].desc].icon}/>
                        </View>
                        <View style={styles.weatherData}>
                        <Text style={styles.weatherData}>
                            <MaterialCommunityIcons name="thermometer-low" size={20}>
                              </MaterialCommunityIcons>{weather[index].min}°C,{" "}
                            <MaterialCommunityIcons name="thermometer-high" size={20}>
                              </MaterialCommunityIcons>{weather[index].max}°C,{" "}
                            <MaterialCommunityIcons name="weather-windy" size={20}>
                              </MaterialCommunityIcons>{weather[index].wind}km/h,{" "}
                            <MaterialCommunityIcons name="water" size={20}>
                              </MaterialCommunityIcons>{weather[index].precip}mL,{" "}
                            <MaterialCommunityIcons name="water-percent" size={20}>
                              </MaterialCommunityIcons>{weather[index].humid}%,{" "}
                        </Text>
                        </View>
                    </View>
                )
            })}
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <Text>Oh no, something went wrong</Text>
      </View>
    )
  };
};

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
  },
  navBar: {
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingHorizontal: 5,
  },
  weatherEntry: {
    elevation: 1,
    paddingVertical: 15,
    paddingHorizontal: 5,
    color: '#fff',
  },
  weatherHeader:{
    color: '#fff',
    fontSize: 25,
    flexDirection: 'row'
  },
  weatherData: {
    color: '#DEDEDE',
    fontSize: 15,
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  cityStyle: {
    fontSize: 30,
    color: '#fff',
    paddingBottom: 15
  },
});

export default Weather;
