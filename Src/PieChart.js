import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    processColor, SafeAreaView, FlatList,SectionList, AsyncStorage
} from 'react-native';
import {URL} from '../Config/ip';
import { createStackNavigator } from '@react-navigation/stack';
import Swiper from 'react-native-swiper';

import { PieChart } from 'react-native-charts-wrapper';
import Axios from 'axios';
import showItemsComp from './ShowItemsComp';
import { ScrollView } from 'react-native-gesture-handler';
class PieChartScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedEntry:'',
            legend: {
                enabled: true,
                textSize: 10,
                form: 'CIRCLE',

                horizontalAlignment: "RIGHT",
                verticalAlignment: "CENTER",
                orientation: "VERTICAL",
                wordWrapEnabled: true
            },
            data : []
            // data: [{
            //     proj_code :'2001S',
            //     dataSets: [{
            //         values: [
            //         { value: 45, label: 'Sandwiches' },
            //         { value: 21, label: 'Salads' },
            //         { value: 15, label: 'Soup' },
            //         { value: 9, label: 'Beverages' },
            //         { value: 15, label: 'Desserts' }],
            //         label: 'Inquries',
            //         config: {
            //             colors: [processColor('#C0FF8C'), processColor('#FFF78C'), processColor('#FFD08C'), processColor('#8CEAFF'), processColor('#FF8C9D')],
            //             valueTextSize: 10,
            //             valueTextColor: processColor('green'),
            //             // valueTextColor: 'green',
            //             sliceSpace: 5,
            //             selectionShift: 13,
            //             // xValuePosition: "OUTSIDE_SLICE",
            //             // yValuePosition: "OUTSIDE_SLICE",
            //             valueFormatter: "#",
            //             valueLineColor: processColor('green'),
            //             // valueLineColor: 'green',
            //             valueLinePart1Length: 0.5
            //         }
            //     }],
            // },{ 
            //     proj_code:'2002S',
            //     dataSets: [{
            //         values: [
            //         { value: 45, label: 'Cullet' },
            //         { value: 21, label: 'GulabJ' },
            //         { value: 15, label: 'Khir' },
            //         { value: 9, label: 'rasmalai' },
            //         { value: 15, label: 'GJ' }],
            //         label: 'Inquries',
            //         config: {
            //             // colors: [processColor('#C0FF8C'), processColor('#FFF78C'), processColor('#FFD08C'), processColor('#8CEAFF'), processColor('#FF8C9D')],
            //             colors: [-4128884, -4128884, -12148, -7542017, -29539],
            //             valueTextSize: 10,
            //             // valueTextColor: processColor('green'),
            //             valueTextColor:-16744448,
            //             // valueTextColor: 'green',
            //             sliceSpace: 5,
            //             selectionShift: 13,
            //             // xValuePosition: "OUTSIDE_SLICE",
            //             // yValuePosition: "OUTSIDE_SLICE",
            //             valueFormatter: "#",
            //             // valueLineColor: processColor('green'),
            //             valueLineColor:-16744448,
            //             // valueLineColor: 'green',
            //             valueLinePart1Length: 0.5
            //         }
            //     }],
            // }]
            //   highlights: [{x:2}],
            //   description: {
            //     text: 'This is Pie chart description',
            //     textSize: 10,
            //     textColor: processColor('darkgray'),
            //   }
        };
    }
    componentDidMount() {
        this.getData();
    }
    // componentWillUpdate(nextProps, nextState) {
    //     console.log(nextState.selectedEntry); //will show the new state
    //     console.log(this.state.selectedEntry); //will show the previous state
    //   }

    getData=async()=>{
            let SHOP = await AsyncStorage.getItem("shopName")
            Axios.post('http://50.63.161.47:7003/testShopDashboard',{shopname:"UNIT_1" })
            .then(async(response)=>{await this.persistData(response.data)})
            .catch((err) => { console.log(err) });
    }

    persistData = async(response) => {
        // console.log("Data Inside :"+JSON.stringify(response))
        this.setState({data:response})
    }

    handleSelect(event,proj_code) {
        console.log("Onn select :",event.nativeEvent.label)
        let entry = event.nativeEvent
        if (entry == null) {
            console.log(this.state.selectedEntry)
            this.setState({ ...this.state, selectedEntry: null })
        } else {
            console.log(this.state.selectedEntry)
            this.setState({ ...this.state, selectedEntry: JSON.stringify(entry) })
            this.props.navigation.navigate('Items',{"proj_code":proj_code,"Status":event.nativeEvent.label=="Unassigned"?"Unassigned":"Assigned"})
            // console.log("Onn select :",proj_code)
        }
    }

 renderItems(){
        return(
        //   alert("Something"+JSON.stringify (item))
        this.state.data.map((element,index)=>
        <View key={index} style={{flex:1}}>
        <Text style={{ backgroundColor: 'pink' }}>{element.proj_code}</Text>
        <PieChart
            style={styles.chart}
            logEnabled={true}
            chartBackgroundColor={processColor('pink')}
            // chartDescription={this.state.description}
            // data={this.state.data}
            data= {element}
            legend={this.state.legend}
            highlights={this.state.highlights}

            entryLabelColor={processColor('green')}
            entryLabelTextSize={15}
            drawEntryLabels={true}

            rotationEnabled={false}
            rotationAngle={45}
            usePercentValues={false}
            styledCenterText={{ text: element.proj_code, color: processColor('#000'), size: 15 }}
            centerTextRadiusPercent={100}
            holeRadius={40}
            holeColor={processColor('#f0f0f0')}
            transparentCircleRadius={45}
            transparentCircleColor={processColor('#f0f0f088')}
            maxAngle={350}
            onSelect={(event)=>this.handleSelect(event, element.proj_code)}
            onChange={(event) => console.log("Event :"+event.nativeEvent)}
        />
        </View>
    ))
    }

    render() {        
        return (
            <View style={{ flex:1 }}>
                <Swiper showsPagination={false} showsButtons={true}>
                {this.renderItems()}
                </Swiper>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderBottomColor: '#000',
        borderBottomWidth: 1
    },
    chart: {
        flex: 1
        // height:'100%',
        // width:'100%'
    }
});

export default PieChartScreen;