import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Avatar } from "react-native-elements";
import {
  AntDesign,
  SimpleLineIcons,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";
import { db, auth } from "../firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

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
            source={{
              uri:
                messages[0]?.data.photoURL ||
                "https://images7.alphacoders.com/714/714040.jpg",
            }}
          />
          <Text className="text-white ml-[10px] font-[700] ">{chatName}</Text>
        </View>
      ),
      headerRight: () => (
        <View className="flex-row justify-between w-[80px] mr-[10px] ">
          <TouchableOpacity activeOpacity={0.5}>
            <FontAwesome name="video-camera" size={24} color={"white"} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            // onPress={() => navigation.navigate("AddChat")}
            className="flex-row gap-x-2"
          >
            <Ionicons name="call" size={24} color={"white"} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, messages]);
  const sendMessage = async () => {
    Keyboard.dismiss();

    await addDoc(collection(db, "chats", id, "messages"), {
      timestamp: serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoUrl: auth.currentUser.photoURL,
    });

    setInput("");
  };

  useLayoutEffect(() => {
    const unsub = onSnapshot(
      query(
        collection(db, "chats", id, "messages"),
        orderBy("timestamp", "asc")
      ),
      (snap) => {
        setMessages(
          snap.docs.map((data) => ({
            id: data.id,
            data: data.data(),
          }))
        );
      }
    );

    return unsub;
  }, [route]);

  return (
    <SafeAreaView className="flex-1 bg-white ">
      <KeyboardAvoidingView
        keyboardVerticalOffset={90}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView
              className=""
              contentContainerStyle={{
                paddingTop: 15,
                paddingLeft: 10,
                paddingBottom: 15,
              }}
              ref={(ref) => {
                this.scrollView = ref;
              }}
              onContentSizeChange={() =>
                this.scrollView.scrollToEnd({ animated: true })
              }
            >
              {messages.map(({ id, data }) =>
                data.email === auth.currentUser.email ? (
                  <View key={id} style={styles.reciever} className="m-2">
                    <Avatar
                      source={{
                        uri:
                          data.photoURL ||
                          "https://pbs.twimg.com/media/FE6-Y6JUUAgpjpW?format=jpg&name=4096x4096",
                      }}
                      rounded
                      size={30}
                      position="absolute"
                      bottom={-15}
                      right={-10}
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        right: -10,
                      }}
                    />

                    <Text style={styles.recieverText}>{data.message}</Text>
                  </View>
                ) : (
                  <View key={id} style={styles.sender}>
                    <Avatar
                      rounded
                      size={30}
                      position="absolute"
                      bottom={-15}
                      left={-5}
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        left: -5,
                      }}
                    />
                    <Text style={styles.senderText}>{data.message}</Text>
                    <Text style={styles.senderName}>{data.displayName}</Text>
                  </View>
                )
              )}
            </ScrollView>
            <View className="flex-row px-4 py-2 items-center gap-x-2 ">
              <TextInput
                placeholder="enter the message"
                value={input}
                onChangeText={(e) => setInput(e)}
                onSubmitEditing={sendMessage}
                className="flex-1 bg-gray-200 p-4 rounded-2xl mb-2 text-start font-bold"
              />
              <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
                <Ionicons
                  name="send"
                  size={30}
                  color={"#2B68E6"}
                  className=""
                />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  reciever: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 20,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  sender: {
    padding: 15,
    backgroundColor: "#2B68E6",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  senderName: {
    left: 10,
    // padding: 10,
    fontSize: 10,
    color: "white",
  },
  senderText: {
    color: "white",
    fontWeight: "500",
    marginLeft: 10,
    marginBottom: 15,
  },
  recieverText: {
    color: "black",
    fontWeight: "500",
    marginLeft: 10,
  },
});

export default ChatScreen;
