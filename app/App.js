import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Account from './screens/Account';
import Home from './screens/Home';
import Login from './screens/Login';
import Report from './screens/Report';
import GetStarted from './screens/GetStarted';
import BottomNavigation from './components/BottomNavigation';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="GetStarted">
        <Stack.Screen name='GetStarted' component={GetStarted}/>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Report' component={Report}/>
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='Account' component={Account}/>
        <Stack.Screen name='BottomTabs' component={BottomNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});