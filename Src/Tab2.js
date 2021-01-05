import React, {Component} from 'react';
import {View,Text, StyleSheet,Image,ActivityIndicator} from 'react-native';

class Tab2 extends Component {
    constructor(props){
        super(props);
        this.state ={
        isLoading : true
        }
    }
    componentDidMount(){
        if(this.props.route.params.moviesData){
            this.setState({isLoading:false})
        }
        console.log('In tab2',this.props.route.params.moviesData)
    }
    render(){
        if(this.state.isLoading == true){
            return <ActivityIndicator size='large' />
        }
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text style={Styles.textStyle}>{this.props.route.params.moviesData.title}</Text>
                <View style={{flexDirection:'row'}}>
                <Image source={{uri:this.props.route.params.moviesData.image}} style={{height:100,width:100}}/>
                </View>
                <Text style={Styles.textStyle}>{this.props.route.params.moviesData.rating}</Text>
                <Text style={Styles.textStyle}>{this.props.route.params.moviesData.releaseYear}</Text>
                <Text style={Styles.textStyle}>
                {this.props.route.params.moviesData.genre[0]},
                {this.props.route.params.moviesData.genre[1]? this.props.route.params.moviesData.genre[1]:null},
                {this.props.route.params.moviesData.genre[2]? this.props.route.params.moviesData.genre[2]:null}
                </Text>
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

export default Tab2;