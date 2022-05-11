import React, { useState, useEffect } from "react";

import { StyleSheet, ImageBackground, Text } from "react-native";

import { Button, Input } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

function HomeScreen(props) {
  const [pseudo, setPseudo] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("pseudo", function (error, data) {
      setPseudo(data);
      props.onSubmitPseudo(data);
    });
  }, []);

  return (
    <ImageBackground source={require("../assets/home.jpg")} style={styles.container}>
      {/* Input for user nickname */}
      {props.pseudo ? (
        <Text style={styles.text}>Welcome back {props.pseudo} !</Text>
      ) : (
        <Input
          containerStyle={{ marginBottom: 25, width: "70%" }}
          inputStyle={{ marginLeft: 10 }}
          placeholder="Your Nickname"
          leftIcon={{ type: "ion-icons", name: "person", color: "#009788" }}
          onChangeText={(val) => setPseudo(val)}
        />
      )}
      {/* Button to go to Gallery */}
      <Button
        icon={<Ionicons name="arrow-forward" size={24} color="#eb4d4b" />}
        buttonStyle={{ backgroundColor: "#009788", marginTop: 10 }}
        title=" Go to Gallery"
        type="solid"
        onPress={() => {
          props.onSubmitPseudo(pseudo);
          AsyncStorage.setItem("pseudo", pseudo);
          props.navigation.navigate("BottomMenuTabs", { screen: "Gallery" });
        }}
      />
      {/* Button to Logout(temp, delete user info) */}
      <Button
        buttonStyle={{ backgroundColor: "#eb4d4b", marginTop: 10 }}
        title=" Log out"
        type="solid"
        onPress={() => {
          AsyncStorage.clear();
          setPseudo("");
          props.onSubmitPseudo("");
        }}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
  },
});

function mapStateToProps(state) {
  return { pseudo: state.pseudo };
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmitPseudo: function (pseudo) {
      dispatch({ type: "savePseudo", pseudo: pseudo });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
