import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

// icons
import Ionicons from "@expo/vector-icons/Ionicons";

// navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// pages
import Home from "./pages/home";
import Search from "./pages/search";
import Sell from "./pages/sell";
import Profile from "./pages/profile";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [userToken, setUserToken] = useState<string>('');
  console.log("~ userToken", userToken)

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Accueil") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Rechercher") {
              iconName = focused ? "search" : "search-outline";
            } else if (route.name === "Vendre") {
              iconName = focused ? "add-circle" : "add-circle-outline";
            } else if (route.name === "Profil") {
              iconName = focused ? "person" : "person-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#09B1BA",
          tabBarInactiveTintColor: "gray",
        })}
      >
        {userToken === '' ? (
          <>
            <Tab.Screen name="Connexion">
              {() => (
                <SignIn userToken={userToken} setUserToken={setUserToken} />
              )}
            </Tab.Screen>
            <Tab.Screen name="S'enregistrer">
              {() => (
                <SignUp userToken={userToken} setUserToken={setUserToken} />
              )}
            </Tab.Screen>
          </>
        ) : (
          <>
            <Tab.Screen name="Accueil" component={Home} />
            <Tab.Screen name="Rechercher" component={Search} />
            <Tab.Screen name="Vendre" component={Sell} />
            <Tab.Screen name="Profil">
              {() => <Profile setUserToken={setUserToken} />}
            </Tab.Screen>
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
