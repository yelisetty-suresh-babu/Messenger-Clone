import { View, Text } from "react-native";
import React from "react";
import { Button, Input, Image } from "react-native-elements";
import { StatusBar } from "expo-status-bar";

const Login = () => {
  return (
    <View>
      <StatusBar style="light" />
      <Text className="text-[100px]">This is the login screen</Text>
    </View>
  );
};

export default Login;
