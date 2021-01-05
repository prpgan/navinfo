import 'react-native-gesture-handler';
import React,{Component,useState,useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  AsyncStorage
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Login from './Src/Login';
import PieChartScreen from './Src/PieChart';
import ShowItemsComp from './Src/ShowItemsComp'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import {SignIn,CreateAccount,Search,Home,Details,Search2,Profile,Splash} from './Screens';
import { AuthContext } from '/context';

const HomeScreen =()=> {
  <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PieChartScreen" component={PieChartScreen}/>
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Items" component={ShowItemsComp}  
         options={({ navigation, route }) => ({
           headerTitle:()=> <Text style={{fontSize:20}}>{route.params.Status}</Text>,
          headerRight: () => (<DetailsScreen {...navigation}/>)
        })}
      />
      </Stack.Navigator>
}

function DetailsScreen(navigation){
  return (
    <TouchableOpacity
    onPress={() => navigation.navigate("Login")}
    title="Logout"
    color="#000"
    style={{backgroundColor:'green'}}
  ><Text style={{padding:10}}>Logout</Text></TouchableOpacity>
  );
}

// const HomeStack = createStackNavigator();
const DetailStack = createStackNavigator();
// const Drawer =createDrawerNavigator();

// const HomeStackScreen =({navigation})=>(
//       <HomeStack.Navigator>
//         <HomeStack.Screen name="Login" component={Login} options={{headerShown:false}} />
//         <HomeStack.Screen name="Home" component={HomeScreen} />
//         <HomeStack.Screen name="PieChartScreen" component={PieChartScreen}/>
//         <HomeStack.Screen name="Details" component={DetailsScreen} />
//         <HomeStack.Screen name="Items" component={ShowItemsComp}  
//          options={({ navigation, route }) => ({
//            headerTitle:()=> <Text style={{fontSize:20}}>{route.params.Status}</Text>,
//           headerRight: () => (<DetailsScreen {...navigation}/>)
//         })}
//       />
//       </HomeStack.Navigator>
// )

const AuthStack = createStackNavigator();
const AuthStackScreen =()=>(
  <AuthStack.Navigator>
    <AuthStack.Screen name="SignIn" component={SignIn} options={{title:'Sign In'}}/>
    <AuthStack.Screen name="CreateAccount" component={CreateAccount} options={{title:'Create An Account'}}/>
  </AuthStack.Navigator>
)
const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const SearchStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const ProfileStackScreen = () =>(
  <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>
)

const HomeStackScreen =()=>(
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={Home}  />
    <HomeStack.Screen name="Details" component={Details} 
    options={({route})=>({
      title : route.params.name
    })}
     />
  </HomeStack.Navigator>
)

const SearchStackScreen =()=>(
  <SearchStack.Navigator>
    <SearchStack.Screen name="Search" component={Search}/>
    <SearchStack.Screen name="Search2" component={Search2}/>
  </SearchStack.Navigator>
)

const TabsScreen = () =>(
  <Tabs.Navigator>
  <Tabs.Screen name="Home" component={HomeStackScreen}/>
  <Tabs.Screen name="Search" component={SearchStackScreen}/>
  </Tabs.Navigator>
)

const Drawer = createDrawerNavigator();
const DrawerStackScreen =()=>(
<Drawer.Navigator initialRouteName="Profile">
  <Drawer.Screen name="Home" component={TabsScreen}/>
  <Drawer.Screen name="Profile" component={ProfileStackScreen}/>
</Drawer.Navigator>
)

const Root = createStackNavigator();
const RootStackScreen =({userToken})=>(
  <Root.Navigator headerMode='none'>
    {userToken?
    <Root.Screen name="App" component={DrawerStackScreen} options={{animationEnabled:false}} />
    :
    <Root.Screen name="Auth" component={AuthStackScreen} options={{animationEnabled:false}}/>
    }
      </Root.Navigator>
)

const App =()=> {
const  [isLoading, setIsLoading] =  useState(true);
const [userToken, setUserToken] =  useState(null);
const authContext = React.useMemo(()=>{
  return{
    signIn : () => {
      setIsLoading(false);
      setUserToken('asdf');
    },
    signUp : () => {
      setIsLoading(false);
      setUserToken('asdf');
    },
    signOut : () => {
      setIsLoading(false);
      setUserToken(null)
    },
  }
})

useEffect(()=>{
  setTimeout(()=>{
    setIsLoading(false)
},1000)
},[])

  if(isLoading){
    return <Splash />
  }
    return(
      <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen userToken ={userToken}/>
      </NavigationContainer>
      </AuthContext.Provider>
    )
    
  // return (
  //   <NavigationContainer>
  //     {/* <Stack.Navigator>
  //       <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
  //       <Stack.Screen name="Home" component={HomeScreen} />
  //       <Stack.Screen name="PieChartScreen" component={PieChartScreen}/>
  //       <Stack.Screen name="Details" component={DetailsScreen} />
  //       <Stack.Screen name="Items" component={ShowItemsComp}  
  //        options={({ navigation, route }) => ({
  //          headerTitle:()=> <Text style={{fontSize:20}}>{route.params.Status}</Text>,
  //         headerRight: () => (<DetailsScreen {...navigation}/>)
  //       })}
  //     />
  //     </Stack.Navigator> */}
  //           <Drawer.Navigator>
  //       <Drawer.Screen name="Login" component={HomeStackScreen}/>
  //       <Drawer.Screen name="Home" component={HomeScreen} />
  //       {/* <Drawer.Screen name="PieChartScreen" component={PieChartScreen}/>
  //       <Drawer.Screen name="Details" component={DetailsScreen} />
  //       <Drawer.Screen name="Items" component={ShowItemsComp}  
  //        options={({ navigation, route }) => ({
  //          headerTitle:()=> <Text style={{fontSize:20}}>{route.params.Status}</Text>,
  //         headerRight: () => (<DetailsScreen {...navigation}/>)
  //       })}
  //     /> */}
  //     </Drawer.Navigator>
  //   </NavigationContainer>
  // );
      
}


const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default NavInfo;
