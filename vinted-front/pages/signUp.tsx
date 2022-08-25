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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import axios from "axios";

import CustomInput from "../components/customInput";

const SignUp = (props: { userToken: string, setUserToken: Function }) => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async () => {
    if (email === '' || password === '' || username === '') {
      setError("Tous les champs sont obligatoires");
    } else {
      setIsLoading(true);
      fetchData();
      setIsLoading(false);
    }
  };


  const fetchData = async () => {
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup", {
        username,
        email,
        password,
        newsletter: true,
      }
      );

      props.setUserToken(response.data.token);
      console.log(response.data);

    } catch (error) {
      console.log(error);
      if (error.response.status === 409) {
        setError("user existe deja");
      } else {
        setError("Erreur de connexion");
      }
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        {isLoading ? (
          <>
            <ActivityIndicator
              size="large"
              color="#09B1BA"
              style={{ marginTop: 100 }}
            />
          </>
        ) : (
          <>
            <Text>Inscris-toi</Text>
            <CustomInput placeholder="Nom d'utilisateur" setState={setUsername} value={username} password={undefined} />
            <CustomInput placeholder="Email" setState={setEmail} value={email} password={undefined} />
            <CustomInput placeholder="Password" setState={setPassword} value={password} password={true} />
            {error && <Text style={{ color: "red" }}>{error}</Text>}
            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={styles.submitTxt}>Sign in {props.userToken}</Text>
            </TouchableOpacity>
          </>
        )
        }
      </View >
    </KeyboardAwareScrollView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    padding: 20,
  },
  submitBtn: {
    width: "100%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#09B1BA",
    borderRadius: 4,
    marginTop: 16,
  },
  submitTxt: {
    color: "#fff",
  },
});

export default SignUp;