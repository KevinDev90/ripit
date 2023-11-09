import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@utilities/contans";
import React from "react";
import { View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

function HeaderRow({ navigation }) {
  return (
    <View style={{ position: "absolute", top: hp(5), left: wp(5) }}>
      <Ionicons
        name="arrow-back"
        size={24}
        color={COLORS.BLUE}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

export default HeaderRow;
