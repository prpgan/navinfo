import React, {Component} from 'react';
import {View,Text,FlatList,Button,StyleSheet,ActivityIndicator} from 'react-native';
import Axios from 'axios';


class Details extends Component {
    constructor(props){
        super(props);
        this.state ={
            moviesData : [],
            isLoading : true
        }
    }
    componentDidMount(){
        Axios.get('https://api.androidhive.info/json/movies.json')
        .then(async(response)=>{
            await this.setState({
                moviesData : response.data,
                isLoading :false
            })
            // console.log("Movie Data", response.data)
        })
        .catch((err) => { console.log(err) });
    }

    renderItems(items){
        // console.log("Items: ",items.item.title)
        return(
            <View style={{flex:1,paddingBottom:'3%'}}>
                <Button title={items.item.title} onPress={()=>this.props.navigation.navigate('Tab-2',{moviesData:items.item})}>
            <Text>
                {items.item.title}
            </Text>
            </Button>
            </View>
        )
    }

    render(){
        if(this.state.isLoading == true){
            return (
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size='large'/>
            </View>
            )
        }
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center',paddingVertical:'5%'}}>
                <FlatList 
                data = {this.state.moviesData}
                renderItem = {(items)=>this.renderItems(items)}
                keyExtractor={(item) => item.title}
                extraData = {this.state}
                />
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    container:{
        flex:1
    },
    textStyle:{
        fontSize:20
    }
})

export default Details;