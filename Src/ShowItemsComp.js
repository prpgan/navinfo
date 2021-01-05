import React, { Component } from 'react';
import { View, StyleSheet, Text, Picker,Button, 
    TouchableOpacity, FlatList, AsyncStorage,processColor,ActivityIndicator 
} from 'react-native';
// import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// import {Fab,Icon,Button} from 'native-base';
import axios from 'axios';
import URL from '../Config/ip';


export default class ShowItemsComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            proj_code: '',
            isLoading: true,
            pickerSelectedValue: ''
        }
    }

    componentDidMount() {
        console.log('Props'+JSON.stringify(this.props))
        this.getData();
        // this.getPickerData();
    }

    getData =async() => {
        let shop_id = await AsyncStorage.getItem('shop_id');
        let shopName = await AsyncStorage.getItem('shopName')
        let Status = this.props.route.params.Status
        if(Status== "Unassigned"){
            axios.post(`${URL}/listUnassignedShops`, { PROJ_CODE: this.props.route.params.proj_code, SHOP: shopName })
            .then(async (response) => { await this.setState({ data: response.data, isLoading:false })
                // console.log("Inside :" + this.state.data[0].EQUIP_NAME)
            })
            .catch((err) => { console.log("Error :" + err) })
        }else{
            axios.post(`${URL}/listassignShops`, { SHOP_ID: shop_id, PROJ_CODE: this.props.route.params.proj_code, shopName: shopName })
            .then(async (response) => { await this.setState({ data: response.data, isLoading:false })
                // console.log("Inside :" + this.state.data[0].EQUIP_NAME)
            })
            .catch((err) => { console.log("Error :" + err) })
        }
     
    }

    getDataFromPicker =async(proj_code) => {
        this.setState({pickerSelectedValue:proj_code})
        let shop_id = await AsyncStorage.getItem('shop_id');
        let shopName = await AsyncStorage.getItem('shopName')
        let Status = this.props.route.params.Status

        if(Status== "Unassigned"){
            axios.post(`${URL}/listUnassignedShops`, { PROJ_CODE: proj_code, SHOP: shopName })
            .then(async (response) => { await this.setState({ data: response.data, isLoading:false })
                // console.log("Inside :" + this.state.data[0].EQUIP_NAME)
            })
            .catch((err) => { console.log("Error :" + err) })
        }else{
            axios.post(`${URL}/listassignShops`, { SHOP_ID: shop_id, PROJ_CODE: proj_code, shopName: shopName })
            .then(async (response) => { await this.setState({ data: response.data, isLoading:false })
                // console.log("Inside :" + this.state.data[0].EQUIP_NAME)
            })
            .catch((err) => { console.log("Error :" + err) })
        }
        // console.log("Items comp:" + JSON.stringify(shop_id), shopName)

    }

    // getPickerData = () =>{
    //     axios.post('http://50.63.161.47:7003/listProject',{userRole:''})
    //     .then((response)=>console.log("Get Picker Data:" +JSON.stringify (response.data)) )
    //     .catch((error)=>console.log(error))
    // } 

    renderItems(item) {
        const { container, viewStyles, upperContainer, containerTextstyle, simpleTextStyle } = styles;
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <View style={[containerTextstyle, { width: '40%' }]}><Text style={simpleTextStyle}>{(item.item.EQUIP_NAME)}</Text></View>
                <View style={containerTextstyle}><Text style={simpleTextStyle}>{(item.item.MTO_STATUS)}</Text></View>
                <View style={containerTextstyle}><Text style={simpleTextStyle}>{(item.item.NAME)}</Text></View>
            </View>
        )
    }
    render() {
        if (this.state.isLoading == true) {
            return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><ActivityIndicator size="large" color="red"/></View>
            )
        }
        const { container, viewStyles, upperContainer, containerTextstyle, simpleTextStyle } = styles;
        return (
            <View style={container}>
                <View style={viewStyles}>
                    <View style={upperContainer}>
                        <Picker
                            selectedValue= {this.state.pickerSelectedValue}
                            mode="dropdown"
                            style={{ paddingRight:120,height: 20, width: 100 }}
                            onValueChange={(itemValue, itemIndex) =>this.getDataFromPicker(itemValue)}
                        >
                            <Picker.Item label="2001S" value="2001S" />
                            <Picker.Item label="2002S" value="2002S" />
                            <Picker.Item label="2003S" value="2003S" />
                        </Picker>
                    </View>
                    <View style={{ flexDirection: 'row', borderBottomColor: '#d6d3d3', borderBottomWidth: 1, backgroundColor: '#f8f6f4' }}>
                        <View style={[containerTextstyle, { width: '40%' }]}><Text style={[simpleTextStyle,{fontWeight:'bold'}]}>Equipment</Text></View>
                        <View style={containerTextstyle}><Text style={[simpleTextStyle,{fontWeight:'bold'}]}>Status</Text></View>
                        <View style={containerTextstyle}><Text style={[simpleTextStyle,{fontWeight:'bold'}]}>Contractor</Text></View>
                        {/* <View style={{ width: '25%', alignItems: 'center', padding: '5%' }}><View style={{ flexDirection: 'row' }}><Text>10</Text><Text> cm</Text></View><Text>Height</Text></View> */}
                    </View>
                    <FlatList
                        data={this.state.data}
                        keyExtractor={(item, index) => item.ID + "A"}
                        renderItem={(item) => this.renderItems(item)
                            // console.log("Inside FLatlist:"+JSON.stringify(item.item.EQUIP_NAME)) 
                        }
                    />
                </View>
                {/* <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: 'red' }}
            position="bottomRight"
            onPress={() => alert('Pressed')}>
            <Icon name="md-pulse" />
          </Fab> */}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: '3%'
    },
    viewStyles: {
        shadowOpacity: 2,
        elevation: 1,
        borderColor: '#ddd',
        borderWidth: 1,
        shadowColor: '#000',
        shadowRadius: 2,
        marginBottom: '3%'
    },
    containerTextstyle: {
        borderRightWidth: 1,
        borderRightColor: '#d6d3d3',
        width: '30%',
        // alignItems: 'flex-start',
        padding: '3%',
        borderBottomColor: '#d6d3d3',
        borderBottomWidth: 1
    },
    simpleTextStyle: {
        fontSize: 12, fontWeight: '500'
    },
    upperContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomColor: '#d6d3d3',
        borderBottomWidth: 1,
        backgroundColor: '#f8f6f4',
        paddingBottom: '5%',
        alignItems: 'center'
    }

})