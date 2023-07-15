import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { Avatar } from "react-native-elements";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import {} from "react-native-safe-area-context";

const ChatScreen = ({ navigation, route }) => {
  const { id, chatName } = route.params;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "chat",
      headerBackTitleVisible: false,
      headerTitleAlign: "left",
      headerLeft: () => (
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text className="text-white font-bold text-[25px]">←</Text>
          </TouchableOpacity>
        </View>
      ),
      headerTitle: () => (
        <View className="flex-row items-center w-full pl-2">
          <Avatar
            rounded
            source={{ uri: "https://images7.alphacoders.com/714/714040.jpg" }}
          />
          <Text className="text-white ml-[10px] font-[700] ">{chatName}</Text>
        </View>
      ),
      headerRight: () => (
        <View className="flex-row justify-between w-[80px] mr-[10px] ">
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name="videocamera" size={24} color={"white"} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            // onPress={() => navigation.navigate("AddChat")}
            className="flex-row gap-x-2"
          >
            <SimpleLineIcons name="call-out" size={24} color={"white"} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Text>{id + chatName}</Text>
      <KeyboardAvoidingView
        keyboardVerticalOffset={90}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <>
          <ScrollView></ScrollView>
        </>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
