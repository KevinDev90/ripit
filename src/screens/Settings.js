import { StyleSheet, Text, View } from "react-native";

export default function Settings() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/users/1")
  //     .then((res) => res.json())
  //     .then((data) => dispatch(addUser(data)));
  // }, []);

  return (
    <View style={styles.container}>
      <Text>Settings!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
});
