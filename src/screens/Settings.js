import { Text, View } from "react-native";

export default function Settings() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/users/1")
  //     .then((res) => res.json())
  //     .then((data) => dispatch(addUser(data)));
  // }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}
