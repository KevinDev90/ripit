import Button, { ButtonIcon } from "@components/Button";
import ModalBlur from "@components/ModalBlur";
import ModernModal from "@components/modal";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { deletePaquet } from "@redux/reducers/paquetSlice";
import FormNewPaquet from "@screens/Home/formPaquet";
import { COLORS } from "@utilities/contans";
import { filterPackDoc, packRefUpdate } from "@utilities/references";
import { deleteDoc, getDocs } from "firebase/firestore";
import { useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useDispatch } from "react-redux";

function ActionsModal({ visibleOptions, setVisibleOptions, item }) {
  const dispatch = useDispatch();

  const [modalVisibleDelete, setModalVisibleDelete] = useState(false);
  const [modalVisibleView, setModalVisibleView] = useState(false);
  const [modalVisibleEdit, setModalVisibleEdit] = useState(false);

  const [loading, setLoading] = useState(false);

  const deleteCard = async () => {
    setLoading(true);
    let idDoc;

    const filter = filterPackDoc(item.userID, item.id);
    const docSnap = await getDocs(filter);
    docSnap.forEach((doc) => (idDoc = doc.id));

    if (!docSnap.empty) await deleteDoc(packRefUpdate(idDoc));

    dispatch(deletePaquet(item.id));
    setModalVisibleDelete(false);
    setLoading(false);
  };

  return (
    <>
      <ModalBlur
        visible={visibleOptions}
        ownStyles={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}
        onClose={() => {
          setVisibleOptions(false);
          setModalVisibleDelete(false);
          setModalVisibleView(false);
        }}
      >
        <View style={styles.modalContent}>
          <ButtonIcon
            onPress={() => {
              setVisibleOptions(false);
              setModalVisibleDelete(false);
              setModalVisibleView(false);
              setModalVisibleEdit(true);
            }}
            ownStyle={styles.icon}
            color={COLORS.GREEN}
            icon={<MaterialIcons name="edit" size={26} color="#fff" />}
          />
          <ButtonIcon
            onPress={() => {
              setModalVisibleView(false);
              setModalVisibleDelete(true);
            }}
            color={COLORS.RED}
            ownStyle={styles.icon}
            icon={<MaterialIcons name="delete" size={26} color="#fff" />}
          />
          <ButtonIcon
            onPress={() => {
              setModalVisibleDelete(false);
              setModalVisibleView(true);
            }}
            color={COLORS.BLUE}
            ownStyle={styles.icon}
            icon={<Entypo name="eye" size={26} color="#fff" />}
          />
        </View>

        {modalVisibleDelete && (
          <View style={styles.containerActions}>
            <Text
              style={{
                fontFamily: "Inter_300Light",
                fontSize: 15,
                textAlign: "center",
              }}
            >
              Quieres eliminar tu baraja?
            </Text>
            <Button
              title={
                loading ? (
                  <ActivityIndicator size={22} color={"#fff"} />
                ) : (
                  "Eliminar"
                )
              }
              onPress={() => deleteCard()}
              color={COLORS.RED}
              ownStyle={styles.button}
            />
          </View>
        )}

        {modalVisibleView && (
          <View style={styles.containerActions}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Inter_400Regular",
                textAlign: "center",
              }}
            >
              {item.title}
            </Text>
            <View style={{ width: "100%", height: hp(20) }}>
              <ScrollView>
                <View>
                  <Text
                    style={{
                      fontFamily: "Inter_300Light",
                      fontSize: 15,
                      marginTop: hp(1),
                    }}
                  >
                    {item.words.map((e, i) => `${e.word} \n`).sort()}
                  </Text>
                </View>
              </ScrollView>
            </View>
          </View>
        )}
      </ModalBlur>

      <ModernModal
        visible={modalVisibleEdit}
        onClose={() => setModalVisibleEdit(false)}
        color={COLORS.PURPLE}
      >
        <FormNewPaquet
          onClose={() => setModalVisibleEdit(false)}
          edit={true}
          fields={item}
        />
      </ModernModal>
    </>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: wp(12),
    height: hp(6),
    marginHorizontal: wp(2),
  },
  button: {
    width: wp(40),
    borderRadius: 10,
    height: hp(5),
    elevation: 0,
    marginTop: hp(1),
  },
  modalContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  containerActions: {
    marginTop: hp(2),
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 15,
    borderRadius: 15,
  },
});

export default ActionsModal;
