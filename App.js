import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import Details from './Src/Details';
import Splash from './Src/Splash';
import Tab2 from './Src/Tab2';

const AuthStack = createStackNavigator();

const Tabs = createBottomTabNavigator();

const AuthScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name='Details' component={TabsScreen} />
  </AuthStack.Navigator>
)

const TabsScreen = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="Tab-1" component={Details} />
    <Tabs.Screen name="Tab-2" component={Tab2} />
  </Tabs.Navigator>
)


const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }, [])

  if (isLoading) {
    return <Splash />
  }
  return (
    <NavigationContainer>
      <AuthScreen />
    </NavigationContainer>
  )
}

export default App;
