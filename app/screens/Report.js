import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SegmentedButtons, TextInput } from "react-native-paper";

import * as Location from "expo-location";

function Report() {
  const [value, setValue] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [location, setLocation] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Report Details</Text>
      <View style={styles.choose}>
        <Text style={styles.subtitle}>Are you a Victim or a Witness?</Text>
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          style={styles.segmentedButtonContainer}
          buttons={[
            {
              value: "victim",
              label: "Victim",
              style: styles.button,
            },
            {
              value: "witness",
              label: "Witness",
              style: styles.button,
            },
          ]}
        />
      </View>
      <View style={styles.details}>
        <TextInput
          label="Enter your name"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          label="Enter your phone number"
          value={phone}
          onChangeText={(text) => setPhone(text)}
          style={styles.input}
          keyboardType="phone-pad"
        />
      </View>
    </View>
  );
}

export default Report;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 43,
    fontWeight: "bold",
    letterSpacing: 1,
    color: "#2E073F",
    textAlign: "left",
  },
  segmentedButtonContainer: {
    width: "80%", // Set a fixed width for the entire segmented buttons group
    justifyContent: "center", // Center the buttons
  },
  button: {
    width: 100, // Set the desired width for each button
  },
  choose: {
    marginTop: 20,
  },
  subtitle: {
    marginBottom: 5,
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "bold",
    color: "#2E073F",
    textAlign: "center",
  },
  input: {
    width: "100%", // Set a specific width for the input
    marginTop: 20, // Add spacing from buttons
  },
  details: {
    width: "90%", // Ensures TextInput takes full width of the screen's padding
    alignItems: "center", // Center the input horizontally
  },
});