import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { ListItem, Avatar } from "react-native-elements";
import { auth, db } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

const CustomListItem = ({ id, chatName, enterChat }, navigation) => {
  const [message, setMessages] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      query(
        collection(db, "chats", id, "messages"),
        orderBy("timestamp", "desc")
      ),
      (snap) => {
        setMessages(snap.docs.map((doc) => doc.data()));
      }
    );

    return unsub;
  }, [navigation]);

  return (
    <ListItem onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
      <Avatar
        rounded
        source={{
          uri:
            message[0]?.photoURL ||
            "https://cdn-icons-png.flaticon.com/512/147/147144.png",
        }}
      />

      <ListItem.Content>
        <ListItem.Title className="font-[800]">
          {chatName || "Youtube"}
        </ListItem.Title>
        <ListItem.Subtitle
          numberOfLines={1}
          ellipsizeMode="tail"
          className="font-semibold"
        >
          {message?.[0]?.displayName + " : "}
          {message?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;
