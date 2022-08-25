import { useState, useEffect } from "react";
import { Text, View, ScrollView, Image, ActivityIndicator } from "react-native";

import axios from "axios";

const Home = () => {
  const [data, setData] = useState();
  const [isloading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
      );
      setData(response.data);
      // console.log("responseOK", response.data);
      setIsLoading(false);
    } catch (error) {
      console.log("requesterror", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {isloading ? (
        <>
          <Text>This is the Home page</Text>
          <ActivityIndicator
            size="large"
            color="#09B1BA"
            style={{ marginTop: 100 }}
          />
        </>
      ) : (
        // <Text>{data.offers[0].product_name}</Text>
        <ScrollView>
          {data.offers.map((item, index) => (
            <View key={index} style={{ flexDirection: "row", margin: 10 }}>
              <Image
                source={{ uri: item.product_image.url }}
                style={{ width: 100, height: 100 }}
              />
              <View style={{ flexDirection: "column", marginLeft: 10 }}>
                <Text>{item.product_name}</Text>
                <Text>{item.product_price}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Home;
