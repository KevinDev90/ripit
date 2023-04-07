import { StyleSheet, Text, TextInput, View } from "react-native";

export function InputCustom({ title, value, onChangeText }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    flex: 1,
    marginRight: 10,
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  input: {
    flex: 2,
    height: 40,
    fontSize: 16,
    color: "#666",
  },
});
