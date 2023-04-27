import PopoverCustom from "@components/Popover";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@utilities/contans";
import { StyleSheet, Text, View } from "react-native";

function SectionHelp({ visible, setVisible }) {
  return (
    <View style={styles.containerHelp}>
      <PopoverCustom
        text={
          <Text style={{ fontSize: 14 }}>
            <Text style={{ fontFamily: "Inter_800ExtraBold", lineHeight: 20 }}>
              Que es RIPIT {"\n"}
              <Text style={{ fontFamily: "Inter_200ExtraLight" }}>
                Aquí podrás fortalecer tus habilidades en el idioma Inglés
                {"\n"}
                <Text style={{ fontFamily: "Inter_800ExtraBold" }}>
                  RIPIT
                </Text>{" "}
                usa la repetición espaciada como método para aprender y
                memorizar
                {"\n"}
              </Text>
            </Text>
            <Text style={{ fontFamily: "Inter_800ExtraBold", lineHeight: 20 }}>
              ¿Cómo usar la app? {"\n"}
              <Ionicons
                name={"home-outline"}
                size={14}
                color={COLORS.BLUE}
              />{" "}
              <Text style={{ fontFamily: "Inter_200ExtraLight" }}>
                Aquí podrás crear tus barajas, guardar tus palabras y empezar a
                practicar
                {"\n"}
              </Text>
              <Ionicons
                name={"chatbox-outline"}
                size={14}
                color={COLORS.BLUE}
              />{" "}
              <Text style={{ fontFamily: "Inter_200ExtraLight" }}>
                Chatea con una IA y practica tu Writing{"\n"}
              </Text>
              <Ionicons name={"person-outline"} size={14} color={COLORS.BLUE} />{" "}
              <Text style={{ fontFamily: "Inter_200ExtraLight" }}>
                Edita tu perfil{"\n"}
              </Text>
            </Text>
            <Text style={{ fontFamily: "Inter_800ExtraBold", lineHeight: 20 }}>
              Recomendaciones{"\n"}
              <Text style={{ fontFamily: "Inter_200ExtraLight" }}>
                Practica al menos 4 veces al dia, dedicando 10 minutos por
                sesion{"\n"}Cuando practiques una palabra deja pasar un tiempo
                prolongado y vuelve a practicar {"\n"}
                No valides una palabra hasta que conozcas su{" "}
                <Text style={{ fontFamily: "Inter_800ExtraBold" }}>
                  Writing - Speaking - Listening - Reading {"\n"}
                </Text>
                Practica una palabra en una frase
              </Text>
            </Text>
          </Text>
        }
        visible={visible}
        onPress={() => setVisible(true)}
        onClose={() => setVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerHelp: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    bottom: 25,
    right: 10,
    padding: 10,
    borderRadius: 50,
  },
});

export default SectionHelp;
