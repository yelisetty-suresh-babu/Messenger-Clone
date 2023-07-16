import { View, KeyboardAvoidingView } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Text } from "react-native-elements";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

// https://images7.alphacoders.com/714/714040.jpg

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const register = async (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(auth.currentUser, {
          displayName: name,
          photoUrl:
            imageUrl || "https://images7.alphacoders.com/714/714040.jpg",
        });
      })
      .catch((err) => alert(err));
    // .then(() => console.log(auth.currentUser.photoURL));
    // })
  };

  // const register = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const userCredential = await createUserWithEmailAndPassword(
  //       auth,
  //       email,
  //       password
  //     );
  //     await updateProfile(auth.currentUser, {
  //       displayName: name,
  //       photoURL: imageUrl,
  //     });
  //     console.log(auth.currentUser.photoURL);
  //   } catch (err) {
  //     alert(err);
  //   }
  // };

  return (
    <KeyboardAvoidingView
      // behavior="padding"
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
          onChangeText={(e) => setName(e)}
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
          onChangeText={(e) => setImageUrl(e)}
          value={imageUrl}
          onSubmitEditing={register}
        />
        <Button
          title="Register"
          onPress={register}
          className="bg-white w-[200px] self-center  "
        />
      </View>
      <View className="h-[100px]" />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
