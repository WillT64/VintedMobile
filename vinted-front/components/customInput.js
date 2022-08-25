import { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Image,
  StyleSheet,
} from "react-native";

const CustomInput = ({ placeholder, setState, value, password }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      onChangeText={(text) => setState(text)}
      value={value}
      secureTextEntry={password ? true : false}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderBottomColor: "#09B1BA",
    borderBottomWidth: 1,
    marginTop: 16,
  },
});

export default CustomInput;
