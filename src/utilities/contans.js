import Toast from "react-native-simple-toast";

export const COLORS = {
  BLUE: "#116ef0",
  PURPLE: "#6d03f5",
  GREEN: "#2ebe90",
  RED: "#ff0101",
  GREY: "#f2f2f2",
  GREYBLACK: "#A5A5A5",
};

export const ToastAlert = (text) => Toast.show(text, Toast.SHORT);
