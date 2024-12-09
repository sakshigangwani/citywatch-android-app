import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import GetStarted from './screens/GetStarted';
import Login from './screens/Login';
import Report from './screens/Report';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <GetStarted/> */}
      {/* <Login/> */}
      <Report/>
    </View>
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
