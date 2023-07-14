import { View, Text } from "react-native";
import React from "react";
import { ListItem, Avatar } from "react-native-elements";
import { ListItemContent } from "@rneui/base/dist/ListItem/ListItem.Content";

const CustomListItem = ({id,chatName,enterChat}) => {
  return (
    <ListItem>
      <Avatar
        rounded
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/147/147144.png",
        }}
      />
      <ListItem.Content>
        <ListItem.Title className="font-[800]">Youtube</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail"  >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex nemo
          facilis ut, porro iure aliquid ipsa nostrum magnam nobis voluptate.
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;
