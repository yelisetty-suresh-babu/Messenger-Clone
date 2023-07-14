import { View, KeyboardAvoidingView } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Text } from "react-native-elements";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

// https://images7.alphacoders.com/714/714040.jpg

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

  const register = async (e) => {
    e.preventDefault();

    function update(authUser) {
      updateProfile(auth.currentUser, {
        displayName: name,
        photoUrl:
          imageUrl ||
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH41aGz2eaeJbKuRNAawocn9ummGUZovlfGg&usqp=CAU",
      }).then(() => console.log(auth.currentUser));
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(auth.currentUser, {
          displayName: name,
          photoUrl: imageUrl,
        }).then(() => console.log(auth.currentUser));
      })
      .catch((err) => alert(err));
  };

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
