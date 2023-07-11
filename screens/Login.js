import { View, Text, KeyboardAvoidingView } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Input, Image } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => {};
  const navigation = useNavigation();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace("Home");
      } else {
      }
    });
    return unsub;
  }, []);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      className="flex-1 items-center justify-center p-3 "
    >
      <StatusBar style="light" />
      <Image
        source={{
          uri: "https://4.bp.blogspot.com/-HbbdUL3LpX4/XufdAx4OmNI/AAAAAAAAPGI/UbkoFCI2tW4I0ZqqAiTyS_F9ERVw71bpgCLcBGAsYHQ/s1600/image2.png",
        }}
        className="h-[200px] w-[200px]"
      />

      <View className="w-2/3">
        <Input
          placeholder="Email"
          autoFocus
          type="Email"
          value={email}
          onChange={(text) => setEmail(text)}
          className=""
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="Password"
          value={password}
          onChange={(text) => setPassword(text)}
          className=""
        />
        <Button
          title="Login"
          onPress={signIn}
          className="m-[10px] w-[200px] self-center"
        />
        <Button
          title="Register"
          type="outline"
          className="m-[10px] w-[200px] self-center"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
      <View className="h-[100px]" />
    </KeyboardAvoidingView>
  );
};

export default Login;
