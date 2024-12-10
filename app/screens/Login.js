import React, { useContext, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";
import app from "../config/Firebase";
import { AuthContext } from "../contexts/authContext";
import { db } from "../config/Firebase";
import { doc, getDoc } from "firebase/firestore";

const auth = getAuth(app);
// const provider = new GoogleAuthProvider();

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const authContext = useContext(AuthContext);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in 
        // const user = userCredential.user;
        // ...
        const user = userCredential.user;
        const docRef = doc(db, "users", user.uid);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          authContext.setUser(docSnapshot.data());
          navigation.navigate("BottomTabs");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  const handleSignInUsingGoogle = () => {
    // signInWithPopup(auth, provider)
    //   .then((result) => {
    //     // This gives you a Google Access Token. You can use it to access the Google API.
    //     const credential = GoogleAuthProvider.credentialFromResult(result);
    //     const token = credential.accessToken;
    //     // The signed-in user info.
    //     const user = result.user;
    //     // IdP data available using getAdditionalUserInfo(result)
    //     // ...
    //     navigation.navigate("BottomTabs");
    //   }).catch((error) => {
    //     // Handle Errors here.
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // The email of the user's account used.
    //     const email = error.customData.email;
    //     // The AuthCredential type that was used.
    //     const credential = GoogleAuthProvider.credentialFromError(error);
    //     // ...
    //   });
    // signInWithRedirect(auth, provider);
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../assets/images/login.png")}
      />
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcome}>Welcome!</Text>
      </View>
      <View style={styles.loginContainer}>
        <Text style={styles.loginMsg}>
          <Text style={styles.boldText}>Create a free account </Text>
          or log in to get started using CityWatch
        </Text>
      </View>
      <View style={styles.emailContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          inputMode="email"
          textContentType="emailAddress"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.passwordContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#B6B6B6"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Image
            source={require("../assets/images/off.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        {/* () => navigation.navigate("BottomTabs") */}
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleButton} onPress={handleSignInUsingGoogle}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.googleLogo}
        />
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    height: 200,
    width: 293,
    marginTop: -5,
  },
  welcomeContainer: {
    marginTop: 10,
  },
  welcome: {
    fontSize: 30,
    textAlign: "center",
    color: "#2E073F",
    fontWeight: "800",
  },
  loginContainer: {
    marginTop: 10,
  },
  loginMsg: {
    fontSize: 17,
    textAlign: "center",
    lineHeight: 25,
    color: "#433878",
  },
  boldText: {
    fontWeight: "700",
    textDecorationLine: "underline",
  },
  label: {
    color: "#433878",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#EFEFFF",
    height: 46,
    width: 302,
    borderRadius: 10,
    padding: 15,
  },
  emailContainer: {
    marginTop: 10,
  },
  passwordContainer: {
    marginTop: 15,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 28,
  },
  forgotPassword: {
    textAlign: "right",
    marginVertical: 10,
    marginLeft: 187,
    color: "#433878",
    fontWeight: "700",
    fontSize: 13,
  },
  loginButton: {
    backgroundColor: "#2E073F",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    height: 54,
    marginTop: 14,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
  googleButton: {
    flexDirection: "row",
    backgroundColor: "#131314",
    borderRadius: 50,
    paddingVertical: 7,
    alignItems: "center",
    justifyContent: "center",
    width: 230,
    height: 50,
  },
  googleLogo: {
    width: 34,
    height: 34,
    marginRight: 10,
  },
  googleButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#fff",
  },
});