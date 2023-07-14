import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect } from "react";
import CustomListItem from "../components/CustomListItem";
import { StatusBar } from "expo-status-bar";
import { Avatar } from "react-native-elements";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const Signout = () => {
    signOut(auth)
      .then(() => navigation.replace("Login"))
      .catch((err) => console.log(err));
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerLeft: () => (
        <View className="">
          <TouchableOpacity activeOpacity={0.5} onPress={Signout}>
            <Avatar
              rounded
              source={{
                uri:
                  auth?.currentUser?.photoURL ||
                  "https://images7.alphacoders.com/714/714040.jpg",
              }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View className="flex-row gap-x-2">
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name="camerao" size={24} color={"white"} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("AddChat")}
            className="flex-row gap-x-2"
          >
            <SimpleLineIcons name="pencil" size={24} color={"white"} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);
  return (
    <SafeAreaView>
      <StatusBar style="light" />
      <ScrollView>
        <CustomListItem />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
