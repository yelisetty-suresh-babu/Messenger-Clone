import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import CustomListItem from "../components/CustomListItem";
import { StatusBar } from "expo-status-bar";
import { Avatar } from "react-native-elements";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const Signout = () => {
    signOut(auth)
      .then(() => navigation.replace("Login"))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, "chats"), orderBy("chatName")),
      (doc) => {
        const temp = [];
        doc.forEach((data) => temp.push({ ...data.data(), id: data.id }));
        setChats(temp);
        console.log(chats);
      }
    );
    return unsub;
    // db.collections("chats").onSnapshot((doc) => console.log(doc));
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerLeft: () => (
        <View className="">
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={Signout}
            className="hover:cursor-pointer"
          >
            <Avatar
              rounded
              source={{
                uri:
                  // auth.currentUser.photoURL,
                  // ||
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

  const enterChat = (id, chatName) => {
    // console.log("enter chat")
    navigation.navigate("Chat", {
      id: id,
      chatName: chatName,
    });
  };
  return (
    <SafeAreaView className="h-full">
      <StatusBar style="light" />
      <ScrollView>
        {chats.map(({ id, chatName }) => {
          return (
            <CustomListItem
              chatName={chatName}
              enterChat={enterChat}
              key={id}
              id={id}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
