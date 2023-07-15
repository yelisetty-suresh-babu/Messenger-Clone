import { View, Text } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button, Input } from "react-native-elements";
import { Icon } from "react-native-vector-icons";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

const AddChat = ({ navigation }) => {
  const [name, setName] = useState({});

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new chat",
      headerBackTitle: "",
    });
  }, [navigation]);

  const createChat = async () => {
    try {
      const docRef = await addDoc(collection(db, "chats"), {
        chatName: name.value,
      }).then(() => {
        navigation.goBack();
        console.log(docRef);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      classname="p-[30px] m-[30px] "
      style={{ padding: 30, height: "100%", backgroundColor: "white" }}
    >
      <Input
        placeholder="Enter the chat Name"
        value={name.value}
        onChangeText={(e) => setName({ value: e })}
        onSubmitEditing={createChat}
        classname="w-[100px] "
      />

      <Button title="create a new chat" onPress={createChat} />
    </View>
  );
};

export default AddChat;
