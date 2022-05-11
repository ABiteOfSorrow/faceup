import React, { useEffect, useState } from "react";

import { StyleSheet, View, Modal, Pressable, ScrollView } from "react-native";
import { Button, Input, Card, Badge, withBadge, Text } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

function GalleryScreen(props) {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        {/* Header of page  */}
        <Text h3 style={{ marginTop: 10, textAlign: "center" }}>
          {props.pseudo}'s Gallery
        </Text>
        {/* Contents area  */}
        <Card>
          <Card.Image
            style={{ width: "100%", height: 170, marginBottom: 10 }}
            source={require("../assets/picture-1.jpg")}
          />

          <Badge value="Homme" status="success" />
          <Badge value="70ans" status="success" />
          <Badge value="barbe" status="success" />
          <Badge value="joyeux!" status="success" />
          <Badge value="cheveux gris" status="success" />
        </Card>

        <Card>
          <Card.Image
            style={{ width: "100%", height: 170, marginBottom: 10 }}
            source={require("../assets/picture-2.jpg")}
          />
          <Badge status="success" value="femme" />
          <Badge status="success" value="lunettes" />
          <Badge status="success" value="31 ans" />
          <Badge status="success" value="joyeuse" />
          <Badge status="success" value="cheuveux chatain" />
        </Card>

        <Card>
          <Card.Image
            style={{ width: "100%", height: 170, marginBottom: 10 }}
            source={require("../assets/picture-3.jpg")}
          />
          <Badge status="success" value="homme" />
          <Badge status="success" value="lunette" />
          <Badge status="success" value="27 ans" />
          <Badge status="success" value="cheuveux noir" />
        </Card>

        <Card>
          <Card.Image
            style={{ width: "100%", height: 170, marginBottom: 10 }}
            source={require("../assets/picture-4.jpg")}
          />
          <Badge status="success" value="femme" />
          <Badge status="success" value="lunette" />
          <Badge status="success" value="68 ans" />
          <Badge status="success" value="cheuveux gris" />
        </Card>
      </ScrollView>
    </View>
  );
}

// set state POI to props for use
function mapStateTtoProps(state) {
  return { pseudo: state.pseudo };
}

export default connect(mapStateTtoProps, null)(GalleryScreen);
