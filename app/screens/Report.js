import * as React from "react";
import { View, Text, StyleSheet, ScrollView, Image, FlatList } from "react-native";
import { SegmentedButtons, TextInput, Button, Snackbar, Portal } from "react-native-paper";
import * as Location from "expo-location";
import * as ImagePicker from 'expo-image-picker';
import { Video } from "expo-av";

function Report() {
  const [value, setValue] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [location, setLocation] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);

  const [photos, setPhotos] = React.useState([]);
  const [videos, setVideos] = React.useState([]);

  const [snackbarContent, setSnackbarContent] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      allowsMultipleSelection: true,
      selectionLimit: 5,
      quality: 1,
    });

    if (!result.canceled) {
      setPhotos(result.assets);
      setSnackbarContent(`You have selected ${result.assets.length} images`);
      setVisible(true);
    } else {
      alert('You did not select any image.');
    }
  };

  const pickVideoAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['videos'],
      allowsEditing: false,
      allowsMultipleSelection: true,
      selectionLimit: 5,
      quality: 1,
    });

    if (!result.canceled) {
      setVideos(result.assets);
      setSnackbarContent(`You have selected ${result.assets.length} videos`);
      setVisible(true);
    } else {
      alert('You did not select any video.');
    }
  };

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
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.container}>
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
          label="Enter your address"
          value={address}
          onChangeText={(text) => setAddress(text)}
          style={styles.input}
          right={<TextInput.Icon icon="crosshairs-gps" />}
        />
        <TextInput
          label="Incident Description"
          value={description}
          onChangeText={(text) => setDescription(text)}
          style={styles.largeInput}
          right={<TextInput.Icon icon="pen" />}
          multiline={true}
        />
        <Button mode="contained" onPress={pickImageAsync} style={styles.button}>Upload Photo Evidence</Button>
        <FlatList horizontal data={photos} renderItem={({ item }) => { return <Image style={styles.preview} source={{ uri: item.uri }} /> }} />
        <Button mode="contained" onPress={pickVideoAsync} style={styles.button}>Upload Video Evidence</Button>
        {videos.length > 0 && (
          <FlatList
            horizontal
            data={videos}
            keyExtractor={(item) => item.uri}
            renderItem={({ item }) => (
              <Video
                style={styles.preview}
                source={{ uri: item.uri }}
                useNativeControls
                resizeMode="contain"
                isLooping
              />
            )}
          />
        )}
        <Portal>
          <Snackbar
            visible={visible}
            onDismiss={onDismissSnackBar}
            duration={2669}
          >
            {snackbarContent}
          </Snackbar>
        </Portal>
        <Button mode="elevated" style={styles.submitButton}>Submit</Button>
      </View>
    </ScrollView>
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
    marginTop: 70,
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
  largeInput: {
    width: "100%", // Set a specific width for the input
    marginTop: 20,
    height: 90,
    marginBottom: 16,
  },
  details: {
    width: "90%", // Ensures TextInput takes full width of the screen's padding
    alignItems: "center", // Center the input horizontally
  },
  preview: {
    height: 200,
    width: 200,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 10,
  },
  button: {
    marginBottom: 10,
  },
  submitButton: {
    marginTop: 5,
  }
});