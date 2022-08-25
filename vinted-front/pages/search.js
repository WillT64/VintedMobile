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

import axios from "axios";

const Search = () => {
  const [data, setData] = useState();
  const [isloading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState();
  const [search, setSearch] = useState();
  console.log("searcj", search);
  const [sort, setSort] = useState("dateUp");
  console.log("sort", sort);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers?title=" + search
      );
      setData(response.data);
      // console.log("responseOK", response.data);
      setIsLoading(false);
    } catch (error) {
      console.log("requesterror", error);
    }
  };

  useEffect(() => {
    if (search) {
      fetchData();
    }
  }, [search]);

  useEffect(() => {
    if (sort && data) {
      setIsLoading(true);
      if (sort === "priceUp") {
        const newData = data.offers.sort((a, b) => {
          return a.product_price - b.product_price;
        });
        setData({ ...data, offers: newData });
      } else if (sort === "priceDown") {
        const newData = data.offers
          .sort((a, b) => {
            return a.product_price - b.product_price;
          })
          .reverse();
        setData({ ...data, offers: newData });
      } else if (sort === "dateUp") {
        const newData = data.offers
          .sort((a, b) => {
            return Date(b.product_date) - Date(a.product_date);
          })
          .reverse();
        setData({ ...data, offers: newData });
      } else if (sort === "dateDown") {
        const newData = data.offers
          .sort((a, b) => {
            return Date(a.product_date) - Date(b.product_date);
          })
          .reverse();
        setData({ ...data, offers: newData });
      }
      setIsLoading(false);
    }
  }, [sort]);

  return (
    <View style={{ flex: 1, justifyContent: "start", alignItems: "center" }}>
      {/* searchBar */}
      <View
        style={{
          height: 24,
          width: "80%",
          backgroundColor: "white",
          justifyContent: "start",
          alignItems: "center",
          borderRadius: 10,
          borderWidth: 1,
          marginBottom: 6,
          marginTop: 12,
        }}
      >
        <TextInput
          style={{
            flex: 1,
            width: "95%",
            justifyContent: "center",
            alignItems: "center",
          }}
          placeholder="Rechercher ..."
          onChangeText={(e) => {
            setSearch(e);
          }}
          value={search}
        />
      </View>

      {/* filters */}
      <View
        style={{
          height: 24,
          width: "82%",
          // backgroundColor: "red",
          justifyContent: "start",
          alignItems: "center",
          flexDirection: "row",
          marginBottom: 12,
          // marginTop: 12,
        }}
      >
        <Text>Classer par : </Text>
        <TouchableOpacity
          style={
            sort === "priceUp"
              ? {
                  backgroundColor: "#09B1BA",
                  height: 24,
                  justifyContent: "start",
                  alignItems: "center",
                  flexDirection: "row",
                  marginLeft: 4,
                  borderRadius: 5,
                  borderWidth: 1,
                }
              : {
                  height: 24,
                  // backgroundColor: "yellow",
                  justifyContent: "start",
                  alignItems: "center",
                  flexDirection: "row",
                  // marginLeft: 4,
                  borderRadius: 5,
                  borderWidth: 1,
                }
          }
          onPress={() => {
            setSort("priceUp");
          }}
        >
          <Text>Prix Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={
            sort === "priceDown"
              ? {
                  backgroundColor: "#09B1BA",
                  height: 24,
                  justifyContent: "start",
                  alignItems: "center",
                  flexDirection: "row",
                  marginLeft: 4,
                  borderRadius: 5,
                  borderWidth: 1,
                }
              : {
                  height: 24,
                  // backgroundColor: "yellow",
                  justifyContent: "start",
                  alignItems: "center",
                  flexDirection: "row",
                  marginLeft: 4,
                  borderRadius: 5,
                  borderWidth: 1,
                }
          }
          onPress={() => {
            setSort("priceDown");
          }}
        >
          <Text>Prix Down</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={
            sort === "dateUp"
              ? {
                  backgroundColor: "#09B1BA",
                  height: 24,
                  justifyContent: "start",
                  alignItems: "center",
                  flexDirection: "row",
                  marginLeft: 4,
                  borderRadius: 5,
                  borderWidth: 1,
                }
              : {
                  height: 24,
                  // backgroundColor: "yellow",
                  justifyContent: "start",
                  alignItems: "center",
                  flexDirection: "row",
                  marginLeft: 4,
                  borderRadius: 5,
                  borderWidth: 1,
                }
          }
          onPress={() => {
            setSort("dateUp");
          }}
        >
          <Text>Ancien</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={
            sort === "dateDown"
              ? {
                  backgroundColor: "#09B1BA",
                  height: 24,
                  justifyContent: "start",
                  alignItems: "center",
                  flexDirection: "row",
                  marginLeft: 4,
                  borderRadius: 5,
                  borderWidth: 1,
                }
              : {
                  height: 24,
                  // backgroundColor: "yellow",
                  justifyContent: "start",
                  alignItems: "center",
                  flexDirection: "row",
                  marginLeft: 4,
                  borderRadius: 5,
                  borderWidth: 1,
                }
          }
          onPress={() => {
            setSort("dateDown");
          }}
        >
          <Text>Recent</Text>
        </TouchableOpacity>
      </View>

      {isloading ? (
        <>
          <Text>This is the Search component</Text>
          <ActivityIndicator
            size="large"
            color="#09B1BA"
            style={{ marginTop: 100 }}
          />
        </>
      ) : (
        <ScrollView>
          {data.offers.map((item, index) => (
            <View key={index} style={{ flexDirection: "row", margin: 10 }}>
              <View style={{ flexDirection: "column", marginLeft: 10 }}>
                <TouchableOpacity onPress={() => {}}>
                  <Image
                    source={{ uri: item.product_image.url }}
                    style={{ width: 100, height: 100 }}
                  />
                  <Text>{item.product_name}</Text>
                  <Text>{item.product_price}€</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Search;
