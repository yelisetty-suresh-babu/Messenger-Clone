import { View, KeyboardAvoidingView } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Text } from "react-native-elements";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

// https://images7.alphacoders.com/714/714040.jpg

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("1@2.com");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const register = async (e) => {
    e.preventDefault();

    // try {
    //   const res = await createUserWithEmailAndPassword(
    //     auth,
    //     email,
    //     password,
    //     imageUrl
    //   );
    //   console.log(res);
    // } catch (error) {
    //   alert(error.message);
    // }
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        authUser.user.update({
          displayName: name,
          photoUrl:
            imageUrl ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH41aGz2eaeJbKuRNAawocn9ummGUZovlfGg&usqp=CAU",
        });
        console.log(authUser)
      })
      .catch((err) => alert(err));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back to Login",
      //   headerTitle: "login",
    });
  }, [navigation]);
  return (
    <KeyboardAvoidingView
      behavior="padding"
      className="flex-1 items-center justify-center p-[10px] bg-white "
    >
      <StatusBar style="light" />
      <Text h3 className="mb-[50px] ">
        Create a Messenger account
      </Text>
      <View className="w-[300px]">
        <Input
          placeholder="FullName"
          type="text"
          autoFocus
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <Input
          placeholder="Email"
          type="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <Input
          placeholder="Password"
          type="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <Input
          placeholder="Profile Picture Url (optional)"
          type="text"
          onChangeText={(text) => setImageUrl(text)}
          value={imageUrl}
          onSubmitEditing={register}
        />
        <Button
          title="Register"
          //   raised
          onPress={register}
          className="bg-white w-[200px] self-center  "
        />
      </View>
      <View className="h-[100px]" />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
