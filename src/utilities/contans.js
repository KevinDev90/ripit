import Toast from "react-native-toast-message";

export const COLORS = {
  BLUE: "#116ef0",
  PURPLE: "#6d03f5",
  GREEN: "#2ebe90",
  RED: "#ff0101",
  GREY: "#f2f2f2",
  GREYBLACK: "#A5A5A5",
};

export const ToastAlert = (text, error = false) =>
  Toast.show({
    type: error ? "error" : "success",
    text1: error ? "¡Error!" : "¡Éxito!",
    text2: text,
    visibilityTime: 2000,
    autoHide: true,
    topOffset: 50,
  });

export const imagesProfile = [
  {
    id: 1,
    uri: "https://principia.io/media/uploads/images/ilustracion-animal/landy-5-portada.jpg",
  },
  {
    id: 2,
    uri: "https://thumbs.dreamstime.com/b/mechanical-menagerie-steampunk-animals-bear-step-world-where-steam-powered-gears-clockwork-mechanisms-merge-272111155.jpg",
  },
  {
    id: 3,
    uri: "https://cdn.oldskull.net/wp-content/uploads/2020/09/perro-max-shkret.png",
  },
  {
    id: 4,
    uri: "https://pbs.twimg.com/profile_images/729358132544155649/F6Amvd_1_400x400.jpg",
  },
  {
    id: 5,
    uri: "https://storage.googleapis.com/dream-machines-output/d9a540a9-0b79-4add-8c8d-8ad161601f20/0_3.png",
  },
  {
    id: 6,
    uri: "https://thumbs.dreamstime.com/b/step-world-where-steam-powered-gears-clockwork-mechanisms-merge-natural-creating-unique-menagerie-steampunk-272112472.jpg",
  },
];
