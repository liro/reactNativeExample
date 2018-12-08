import React from "react";
import {Location, Permissions} from "expo";
import MapView from "react-native-maps";
import {Text, View, StyleSheet} from "react-native";

export default class MyMap extends React.Component {
    state = {
        location: null,
        errorMessage: null
    }

    componentWillMount() {
        this._getLocationAsync();
    }

    _getLocationAsync = async () => {
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({location});
    };

    getMap() {
        if (this.state.location) {
            let {latitude, longitude} = this.state.location.coords;
            return this.state.location && <MapView
                style={{alignSelf: 'stretch', flex: 1}}
                region={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                }}
            />
        }
    }
    // latitude: 37.78825,
    // longitude: -122.4324,
    // latitudeDelta: 0.0922,
    // longitudeDelta: 0.0421,
    render() {
        let text = 'Waiting..';
        let lat = 'none';
        if (this.state.errorMessage) {
            text = this.state.errorMessage;
        } else if (this.state.location) {
            text = JSON.stringify(this.state.location);
            lat = Object.keys(this.state.location).join(' ');
        }
        return (
            <View style={styles.container}>
                <Text style={styles.paragraph}>{text} lat: {lat}</Text>
                {this.getMap()}
            </View>
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
    viewPager: {
        flex: 1
    },
    pageStyle: {
        alignItems: 'center',
        padding: 20,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});
