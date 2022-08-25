import { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Image,
} from "react-native";

const Profile = ({ setUserToken }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>This is the Profile page</Text>
      <TouchableOpacity
        style={{
          justifyContent: "start",
          alignItems: "center",
          flexDirection: "row",
          marginLeft: 4,
          borderRadius: 20,
          borderWidth: 1,
          padding: 10,
        }}
        onPress={() => {
          setUserToken("");
        }}
      >
        <Text>Se déconnecter</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
