import { Text, View } from "react-native";

export default function Home() {
  // const user = useSelector((state) => state.user);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
      {/* <Text>name {user.name}</Text>
      <Text>email {user.email}</Text> */}
    </View>
  );
}
