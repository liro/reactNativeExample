import React from 'react';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import HomeScreen from "./components/Home";
import MyMap from "./components/Map";

const AppNavigator = createStackNavigator({
    Home: {screen: HomeScreen},
    Profile: {screen: MyMap},
});
const AppContainer = createAppContainer(AppNavigator);


export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}