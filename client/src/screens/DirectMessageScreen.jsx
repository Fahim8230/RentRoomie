import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";

const DirectMessageScreen = () => {
  const route = useRoute();
  const { userName } = route.params;

  const [conversations, setConversations] = useState({
    Alice: [{ sender: "Alice", text: "Hey there!" }, { sender: "You", text: "Hi!" }],
    Bob: [{ sender: "Bob", text: "How's it going?" }, { sender: "You", text: "Good, thanks!" }],
  });

  const [text, setText] = useState("");

  const handleSendMessage = () => {
    if (!text.trim()) return;

    setConversations({
      ...conversations,
      [userName]: [
        ...(conversations[userName] || []),
        { sender: "You", text },
      ],
    });
    setText("");
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.message,
        item.sender === "You" ? styles.messageSent : styles.messageReceived,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{userName}</Text>
      <FlatList
        data={conversations[userName] || []}
        renderItem={renderMessage}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.messages}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={text}
          onChangeText={setText}
          placeholder="Type a message"
          placeholderTextColor={colors.secondary}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 32,
    color: colors.primary,
    fontFamily: fonts.SemiBold,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
  },
  messages: {
    flexGrow: 1,
    padding: 20,
  },
  message: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 20,
    maxWidth: "70%",
  },
  messageSent: {
    alignSelf: "flex-end",
    backgroundColor: colors.primary,
  },
  messageReceived: {
    alignSelf: "flex-start",
    backgroundColor: colors.secondary,
  },
  messageText: {
    fontFamily: fonts.Regular,
    color: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: colors.secondary,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 50,
    fontFamily: fonts.Light,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: colors.primary,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sendButtonText: {
    color: colors.white,
    fontFamily: fonts.SemiBold,
  },
});

export default DirectMessageScreen;
