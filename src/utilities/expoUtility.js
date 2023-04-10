import * as ImagePicker from "expo-image-picker";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// IMAGEPICKER
export const pickImage = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    alert("Sorry, we need camera roll permissions to make this work!");
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: false,
    base64: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    return result.assets;
  }

  return status;
};

export const takePhoto = async () => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();

  console.log(status);
  if (status !== "granted") {
    alert("Sorry, we need camera permissions to make this work!");
    return;
  }

  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: false,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    return result.assets;
  }

  return status;
};

// NOTIFICATIONS

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     sound: Platform.OS === "ios" ? "default" : "default",
//     shouldPlaySound: true,
//     shouldSetBadge: true,
//     shouldShowAlert: true,
//   }),
// });

// Notifications.requestPermissionsAsync().then((status) => {
//   if (status.granted) {
//     console.log("Permission to receive notifications has been granted!");
//     // Use the token below to send notifications to this device later
//     Notifications.getExpoPushTokenAsync().then((token) => {
//       console.log(token);
//     });
//   } else {
//     console.log("Permission to receive notifications has not been granted");
//   }
// });

// export const scheduleHourlyNotification = (hour) => {
//   const trigger = {
//     hour, // Hora en la que se enviará la notificación (en formato de 24 horas)
//     // minute: 0, // Minuto en el que se enviará la notificación
//     repeats: true, // Indica que la notificación se repetirá todos los días a la misma hora
//   };

//   Notifications.scheduleNotificationAsync({
//     content: {
//       title: "Ya practicaste??",
//       body: "Practica ahora y cumple tus metas",
//     },
//     trigger,
//     repeat: { daily: true },
//   });
// };
