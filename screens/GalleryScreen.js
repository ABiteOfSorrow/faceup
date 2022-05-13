import React, { useEffect, useState } from "react";

import { StyleSheet, View, Modal, Pressable, ScrollView } from "react-native";
import { Button, Input, Card, Badge, withBadge, Text } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

import { connect } from "react-redux";

function GalleryScreen(props) {
  var photos = props.photo.map((photo, i) => {
    if (props.photo) {
      return (
        <Card key={i}>
          <Card.Image
            style={{ width: "100%", height: 170, marginBottom: 10 }}
            source={{ uri: photo.uri }}
          />
          <Badge value={photo.gender} status="success" />
          <Badge value={photo.age} status="success" />
        </Card>
      );
    }
  });

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        {/* Header of page  */}
        <Text h3 style={{ marginTop: 10, textAlign: "center" }}>
          {props.pseudo}'s Gallery
        </Text>
        {/* Contents area  */}
        {photos}
      </ScrollView>
    </View>
  );
}

// set state POI to props for use
function mapStateTtoProps(state) {
  return { pseudo: state.pseudo, photo: state.photo };
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmitPhoto: function (photo) {
      dispatch({ type: "deletePhoto", photo: photo });
    },
  };
}

export default connect(mapStateTtoProps, mapDispatchToProps)(GalleryScreen);
