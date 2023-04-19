import NoImage from "@assets/img/no-image.jpg";
import Button from "@components/Button";
import { ListImages } from "@components/List";
import ModalBlur from "@components/ModalBlur";
import ProfilePicture from "@components/ProfileComponents/image";
import { COLORS, imagesProfile } from "@utilities/contans";
import { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Modal from "react-native-modal";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

function SectionImage({ loadingImage, imageForm, setImageForm, createImage }) {
  const [modalImage, setModalImage] = useState(false);
  const [modalImage2, setModalImage2] = useState(false);

  const [customImage, setCustomImage] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Editar Perfil</Text>

      {loadingImage ? (
        <View style={{ padding: 20 }}>
          <ActivityIndicator color={COLORS.GREEN} size={30} />
        </View>
      ) : (
        <ProfilePicture
          imageSource={imageForm || NoImage}
          onPress={() => setModalImage(true)}
        />
      )}

      <ModalBlur
        visible={modalImage}
        onClose={() => setModalImage(false)}
        ownStyles={{ backgroundColor: "#fff" }}
      >
        <Text
          style={{
            fontSize: 18,
            fontFamily: "Inter_800ExtraBold",
            padding: 10,
          }}
        >
          Crea tu propia imagen
        </Text>
        <Text
          style={{ fontStyle: "italic", fontSize: 12, textAlign: "center" }}
        >
          Que que te gustaria{"\n"}(Ejemplo: Buho con 4 alas animado)
        </Text>

        <TextInput
          value={customImage}
          onChangeText={(v) => setCustomImage(v)}
          placeholder="Escribe aqui..."
          style={styles.input}
          multiline={true}
        />

        <Text
          style={{ fontStyle: "italic", fontSize: 12, textAlign: "center" }}
        >
          O elige alguno de los{" "}
          <Text
            onPress={() => {
              setModalImage(false);
              setModalImage2(true);
            }}
            style={{ color: COLORS.BLUE, fontStyle: "italic" }}
          >
            Predeterminados
          </Text>
        </Text>

        <Button
          title={"Crear"}
          color={COLORS.BLUE}
          ownStyle={styles.button}
          onPress={() => {
            setModalImage(false);
            createImage(customImage);
          }}
        />
      </ModalBlur>

      <Modal
        isVisible={modalImage2}
        animationIn={"bounceIn"}
        animationOut={"bounceOut"}
        onBackButtonPress={() => setModalImage2(false)}
      >
        <View
          style={{ backgroundColor: "#fff", borderRadius: 10, padding: 20 }}
        >
          <ListImages
            images={imagesProfile}
            onPress={(uri) => {
              setImageForm(uri);
              setModalImage2(false);
            }}
          />
        </View>
      </Modal>
    </View>
  );
}

export default SectionImage;

const styles = StyleSheet.create({
  container: {
    width: wp(100),
    backgroundColor: COLORS.PURPLE,
    height: hp(35),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: hp(3),
  },
  text: {
    color: "#fff",
    fontSize: 22,
    fontFamily: "Inter_900Black",
  },
  button: {
    width: wp(45),
    borderRadius: 10,
    elevation: 0,
  },
  input: {
    backgroundColor: "#fff",
    width: "100%",
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GREYBLACK,
  },
});
