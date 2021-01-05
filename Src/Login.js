import React, { Component } from 'react';
import {
  View, StatusBar, AsyncStorage,
  StyleSheet, Image, ScrollView, ToastAndroid, NetInfo,
  TextInput, Alert, BackHandler, BackAndroid, Button,
  Text, TouchableOpacity, ImageBackground,CheckBox,
} from 'react-native';
import axios from 'axios';
// import { strings } from '../Localization/Localization';
// import { SocialIcon } from 'react-native-elements'


class Login extends Component {

  constructor(props) {
    super(props);


    this.state = {
      userId: '',
      username: '',
      phone: '',
      textInput_email: '',
      textInput_password: '',
      loginData: '',
      locationEnabled: false,
      isUserOnline: false,
      hidePassword: true,
      checked: false,
      token :''
    };
  }

  CheckBoxtest(){
    this.setState({
      checked: !this.state.checked
    })
  }

  toCheckInternateConnectionForLogin=()=>{
    //   alert(this.state.textInput_email)
    axios.post('http://50.63.161.47:7003/adminlogin',{
        // email:this.state.textInput_email,
        // password :this.state.textInput_password
        email:'u1@gmail.com',
        password :'123'
    }) .then(async(response)=>{await this.persistData(response)}
      )
      .catch(function (error) {
          alert(error)
        console.log("Error"+error);
      });
  }

  persistData = async(response) =>{
    // console.log(response)
            // console.log(response.data[0]);
        let userInfo = response.data.UserInfo[0]
        // console.log(JSON.stringify (userInfo))
        // await AsyncStorage.setItem('username',userDetail.USER_NAME);
        if(JSON.stringify (userInfo.EMAIL)){
        try {
          // console.log("User F0und")
          await AsyncStorage.clear()
          await AsyncStorage.setItem('userInfo',JSON.stringify(userInfo))
          await AsyncStorage.setItem('email',userInfo.EMAIL);            
          // await AsyncStorage.setItem('password',PASSWORD);
          await AsyncStorage.setItem('userrole',userInfo.ROLE_NAME);
          await AsyncStorage.setItem('role_id)',userInfo.ROLE_ID.toString());
          await AsyncStorage.setItem('shop_id',userInfo.SHOP_ID.toString());
          await AsyncStorage.setItem('shopName',userInfo.USER_NAME);
          await AsyncStorage.setItem('token',response.data.accessToken);
          await this.props.navigation.navigate("App",{
           screen: 'Home',
          }) 
        } catch (error) {
          console.log('Error :'+ error)
        }
        }else{
          console.log("User not found")
        }
  }

  render() {
    return (
        <ImageBackground style={{ flex: 1,
            resizeMode: "cover",
            justifyContent: "center"}} source={require('../Images/img-3.jpg')}>
            <View>
                <Text style={{fontSize:30,color:'#323E4E',fontWeight:'bold',marginTop:'15%'}}>MERU INDUSTRIES LLP</Text>
          {/* <Image style={{ marginBottom: 30 }} source={require('../Images/meruLargeIcon.png')} /> */}
          </View>
          {/* <View><Text style={{fontSize:40,color:'#323E4E',fontWeight:'bold'}}>WELCOME</Text></View> */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* <Image style={{ tintColor: '#001a33', height: 20, width: 20 }} source={require('../Images/img-13.jpg')} /> */}
            {/* <MaterialCommunityIcons name='email' color='white' size={20} /> */}
            {/* <Text style={{flex:1,flexDirection:'row'}}>Email</Text> */}
            <TextInput style={styles.inputBox}
              underlineColorAndroid='transparent'
              placeholder="Email"
              // placeholder={strings.EMAIL}
              placeholderTextColor='silver'
              autoCapitalize='none'
              keyboardType="email-address"
              selectionColor={'#fff'}
              onSubmitEditing={() => this.password.focus()}
              onChangeText={TextInputValue => this.setState({ textInput_email: TextInputValue })} />
            {/* <Text style={{width:20}}/> */}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* <Image style={{ tintColor: '#001a33', height: 20, width: 20 }} source={require('../Images/password.png')} /> */}
            {/* <Text style={{flex:1,}}>Password</Text> */}
            <TextInput style={styles.inputBox}
              underlineColorAndroid='transparent'
              // placeholder="Password"
              placeholder="Password"
              secureTextEntry={this.state.hidePassword}
              placeholderTextColor='silver'
              selectionColor={'#fff'}
              ref={(input) => this.password = input}
              onChangeText={TextInputValue => this.setState({ textInput_password: TextInputValue })}
            />
          </View>
          <TouchableOpacity style={styles.button}
          onPress={this.toCheckInternateConnectionForLogin}
          // onPress={()=>this.props.navigation.navigate('Details')}    
          >
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
        </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //   marginTop:'%'
    // backgroundColor: '#fff'
  },
  inputBox: {
    width: 300,
    //   backgroundColor:'#7e7b9d',
    //   borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#fff',
    marginVertical: 10,
    borderBottomColor: 'rgb(59, 99, 59)',
    borderBottomWidth: 1,
  },
  button: {
    width: 300,
    backgroundColor: '#003366',
    // borderColor:'#fff',
    // borderWidth:1,
    borderRadius: 5,
    marginLeft: 10,
    marginVertical: 20,
    paddingVertical: 13,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
  },
  signupTextCont: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row'
  },
  signupText: {
    color: 'rgba(255,255,255,0.6)',
    // color:'black',
    fontSize: 16
  },
  signupButton: {
    color: '#ffffff',
    // color:'black',
    fontSize: 16,
    fontWeight: '500'
  },
  skipButton: {
    marginBottom: 10,
    marginRight: 1,
    marginLeft: 25,
    fontSize: 26,
    textDecorationLine: 'underline',
    color: "#086842"
  },
  ImageBack: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: '#fff'
  }
});

export default Login;