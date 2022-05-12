import React, { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity, ActivityIndicator } from "react-native";
import { Button, Text, Overlay } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";

import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Camera } from "expo-camera";

function SnapScreen(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isFlash, setIsFlash] = useState(Camera.Constants.FlashMode.off);
  const [visible, setVisible] = useState(false);

  // barCodeScannerSettings={{
  //   barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
  // }}

  var cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const cloudinaryUpload = async () => {
    setVisible(true);
    if (cameraRef) {
      let photo = await cameraRef.takePictureAsync({
        quality: 0.7,
        base64: true,
        exif: true,
      });
      console.log(photo.uri); // chemin physique vers la photo
      console.log(photo.width); // largeur
      console.log(photo.height); // hauteur
      console.log(photo.exif); // données exif
      console.log(photo.base64); // photo encodée en base64

      var data = new FormData(photo);
      data.append("avatar", {
        uri: photo.uri,
        type: "image/jpeg",
        name: "image.jpg",
      });

      const rawResponse = await fetch("http://192.168.10.117:3000/upload", {
        method: "post",
        body: data,
      });

      const response = await rawResponse.json();
      console.log(response);
      props.onSubmitPhotoList(response.photo.url);
      setVisible(false);
    }
  };

  // Focusing for maintain camera when go to other page
  const isFocused = useIsFocused();

  if (hasPermission && isFocused) {
    return (
      <View style={{ flex: 1 }}>
        {/* Camera page contents */}
        <Camera
          flashMode={isFlash}
          type={type}
          playSoundOnCapture={false}
          style={{ flex: 1 }}
          ref={(ref) => (cameraRef = ref)}
        >
          <View style={{ flex: 1, flexDirection: "row", alignItems: "flex-end" }}>
            {/* Flip camera on / off */}
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Ionicons name="camera-reverse-outline" size={30} color="white" />
              <Text style={{ color: "white" }}> Flip </Text>
            </TouchableOpacity>
            {/* Camera flash on / off */}
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => {
                setIsFlash(
                  isFlash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.torch
                    : Camera.Constants.FlashMode.off
                );
              }}
            >
              <Ionicons name="flash-outline" size={30} color="white" />
              <Text style={{ color: "white" }}> Flash </Text>
            </TouchableOpacity>
          </View>
        </Camera>
        {/* Overay for waiting until photo data saving */}
        <Overlay isVisible={visible}>
          <ActivityIndicator size="large" color="blue" />
          <Text>Loading...</Text>
        </Overlay>
        <Button
          buttonStyle={{ backgroundColor: "#009788" }}
          icon={<Ionicons name="save-outline" size={24} color="white" />}
          title=" snap"
          onPress={cloudinaryUpload}
        />
      </View>
    );
  } else {
    return <View style={{ flex: 1 }} />;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmitPhotoList: function (result) {
      dispatch({ type: "savePhoto", photo: result });
    },
  };
}

export default connect(null, mapDispatchToProps)(SnapScreen);
