import NoImage from "@assets/img/no-image.jpg";
import Button from "@components/Button";
import { ListImages } from "@components/List";
import ProfilePicture from "@components/ProfileComponents/image";
import {
  InputCustom,
  InputPicker,
  InputSchedule,
} from "@components/ProfileComponents/input";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { authLogoutAction } from "@redux/actions/authActions";
import { updateUser } from "@redux/reducers/authSlice";
import { COLORS, ToastAlert, imagesProfile } from "@utilities/contans";
import { userRef } from "@utilities/references";
import { setDoc } from "firebase/firestore";
import { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Modal from "react-native-modal";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";

const dateToday = new Date();

export default function Profile() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth);
  const user = data.user;

  const [username, setUsername] = useState(user.username || "");
  const [email, setEmail] = useState(user.email || "");
  const [bio, setBio] = useState(user.bio || "");
  const [imageForm, setImageForm] = useState(user.photoURL || "");
  const [level, setLevel] = useState(user.level || "basico");
  const [selectedTime, setSelectedTime] = useState(user.hours || []);

  const [isVisiblePopover, setIsVisiblePopover] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const [modalImage, setModalImage] = useState(false);

  const save = async () => {
    if (email) {
      setLoading(true);
      const data = {
        ...user,
        username,
        email,
        bio,
        photoURL: imageForm,
        hours: selectedTime,
        level,
      };

      await setDoc(userRef(user.uid), data)
        .then((res) => {
          setLoading(false);
          ToastAlert("Usuario editado");
          dispatch(updateUser(data));
        })
        .catch((err) => {
          setLoading(false);
          ToastAlert("Error al editar el usuario");
        });
    }
  };

  const handleTimeChange = (event, time) => {
    setShowPicker(false);
    if (time && selectedTime.length < 4 && event.type !== "dismissed") {
      const hour = time.getHours();
      const minute = time.getMinutes();
      const amPM = time
        .toLocaleString("en-US", { hour: "numeric", hour12: true })
        .slice(-2);
      const timeFormat = hour;

      setSelectedTime([...selectedTime, timeFormat]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.text}>Editar Perfil</Text>

        <ProfilePicture
          imageSource={imageForm || NoImage}
          onPress={() => setModalImage(true)}
        />

        <Modal
          isVisible={modalImage}
          animationIn={"bounceIn"}
          animationOut={"bounceOut"}
          onBackButtonPress={() => setModalImage(false)}
        >
          <View
            style={{ backgroundColor: "#fff", borderRadius: 10, padding: 20 }}
          >
            <ListImages
              images={imagesProfile}
              onPress={(uri) => {
                setImageForm(uri);
                setModalImage(false);
              }}
            />
          </View>
        </Modal>
      </View>

      <ScrollView
        style={{ width: wp(100) }}
        contentContainerStyle={{ alignItems: "center" }}
        showsVerticalScrollIndicator={false}
      >
        <InputCustom
          title={"Nombre"}
          value={username}
          onChangeText={(v) => setUsername(v)}
        />

        <InputCustom
          title={"Email"}
          value={email}
          onChangeText={(v) => setEmail(v)}
        />

        <InputCustom
          title={"Biografia"}
          value={bio}
          onChangeText={(v) => setBio(v)}
          numberOfLines={4}
          multiline={true}
        />

        {showPicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dateToday}
            mode="time"
            is24Hour={false}
            display="default"
            onChange={handleTimeChange}
          />
        )}

        <InputSchedule
          openPicker={() => setShowPicker(true)}
          visiblePopover={isVisiblePopover}
          closePopover={() => setIsVisiblePopover(false)}
          openPopover={() => setIsVisiblePopover(true)}
          words={selectedTime}
        />

        <InputPicker
          title={"Nivel de ingles"}
          value={level}
          onChange={(v) => setLevel(v)}
        >
          <Picker.Item label="Basico" value="basico" />
          <Picker.Item label="Intermedio" value="intermedio" />
          <Picker.Item label="Avanzado" value="avanzado" />
        </InputPicker>

        <View style={{ marginTop: hp(5), flexDirection: "row" }}>
          <Button
            title={loading ? <ActivityIndicator color={"#fff"} /> : "Guardar"}
            color={COLORS.BLUE}
            ownStyle={styles.button}
            onPress={() => save()}
          />
          <Button
            title={"Cerrar sesion"}
            color={COLORS.RED}
            ownStyle={styles.button}
            onPress={() => authLogoutAction(dispatch)}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 40,
    paddingBottom: hp(10),
  },
  section: {
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
  arrow: {
    borderTopColor: "#fff",
    borderTopWidth: 10,
    borderRightWidth: 10,
    borderRightColor: "transparent",
    borderBottomWidth: 0,
    borderLeftWidth: 10,
    borderLeftColor: "transparent",
  },
  popover: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
});
