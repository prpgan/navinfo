import React, {Component} from 'react';
import {View,Text} from 'react-native';

class Splash extends Component {
    render(){
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:20}}>Splash Screen</Text>
            </View>
        )
    }
}

export default (Splash);