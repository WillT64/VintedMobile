import { Text, View, TouchableOpacity } from "react-native";

const History = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>This is the History component</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Scanner")}>
        <Text>Go to product !</Text>
      </TouchableOpacity>
    </View>
  );
};

export default History;
