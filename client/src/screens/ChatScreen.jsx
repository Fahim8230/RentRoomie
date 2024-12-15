import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";

const users = [
  { id: 1, name: "Alice", avatar: "https://wallpapers.com/images/hd/profile-picture-f67r1m9y562wdtin.jpg" },
  { id: 2, name: "Bob", avatar: "https://imgv3.fotor.com/images/blog-cover-image/10-profile-picture-ideas-to-make-you-stand-out.jpg" },
  { id: 3, name: "Charlie", avatar: "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
];

const ChatScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chats</Text>
      {users.map((user, index) => (
        <React.Fragment key={user.id}>
          <TouchableOpacity
            style={styles.chatListItem}
            onPress={() => navigation.navigate("DM", { userName: user.name })}
          >
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <View style={styles.chatDetails}>
              <Text style={styles.chatName}>{user.name}</Text>
              <Text style={styles.chatPreview}>Tap to message {user.name}</Text>
            </View>
          </TouchableOpacity>
          {index < users.length - 1 && <View style={styles.separator} />}
        </React.Fragment>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 32,
    color: colors.primary,
    fontFamily: fonts.SemiBold,
    marginBottom: 20,
  },
  chatListItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  chatDetails: {
    flex: 1,
  },
  chatName: {
    fontSize: 18,
    fontFamily: fonts.SemiBold,
    color: colors.primary,
  },
  chatPreview: {
    fontSize: 14,
    fontFamily: fonts.Light,
    color: colors.secondary,
  },
  separator: {
    height: 1,
    backgroundColor: colors.secondary,
    opacity: 0.3,
    marginVertical: 10,
  },
});

export default ChatScreen;
