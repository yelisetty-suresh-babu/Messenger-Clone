import { View, Text } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Input, Button } from "react-native-elements";
import { Icon } from "react-native-vector-icons";

const AddChat = ({ navigation }) => {
  const [input, setInput] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new chat",
      headerBackTitle: "",
    });
  }, [navigation]);

  const createChat = async () => {
    
  };

  return (
    <View>
      <Input
        placeholder="Enter the chat Name"
        value={input}
        onChange={(text) => setInput(text)}
      />
      <Button title="create a new chat" onPress={createChat} />
    </View>
  );
};

export default AddChat;
