import NoImage from "@assets/img/no-photo-available.png";
import Button from "@components/Button";
import ProfilePicture from "@components/ProfileComponents/image";
import {
  InputCustom,
  InputSchedule,
} from "@components/ProfileComponents/input";
import ModalCamera from "@components/ProfileComponents/modalCamera";
import DateTimePicker from "@react-native-community/datetimepicker";
import { authLogoutAction } from "@redux/actions/authActions";
import { db } from "@services/firebaseConfig";
import { COLORS } from "@utilities/contans";
import { pickImage, takePhoto } from "@utilities/expoUtility";
import { doc, setDoc } from "firebase/firestore/lite";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";

const dateToday = new Date();

export default function Profile() {
  const data = useSelector((state) => state.auth);
  const user = data.user;
  const userDocRef = doc(db, "users", user.uid);
  const dispatch = useDispatch();

  const [username, setUsername] = useState(user.username || "");
  const [email, setEmail] = useState(user.email || "");
  const [bio, setBio] = useState(user.bio || "");
  const [imageForm, setImageForm] = useState(user.photoURL || "");

  const [modalVisible, setModalVisible] = useState(false);
  const [isVisiblePopover, setIsVisiblePopover] = useState(false);

  const [showPicker, setShowPicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState([]);

  const updateUser = async () => {
    const data = {
      username,
      email,
      bio,
      photoURL: imageForm,
      selectedTime,
    };

    console.log(data);

    // setDoc(userDocRef, data).then((res) => {
    //   console.log(res);
    // });
  };

  const image = async () => {
    await pickImage().then((res) => {
      setImageForm(res[0].uri);
      setModalVisible(false);
    });
  };

  const photo = async () => {
    await takePhoto().then((res) => {
      setImageForm(res.uri);
      setModalVisible(false);
    });
  };

  const handleTimeChange = (event, time) => {
    setShowPicker(false);
    if (time && selectedTime.length < 4 && event.type !== "dismissed") {
      const hour = time.getHours();
      const minute = time.getMinutes();
      const amPM = time
        .toLocaleString("en-US", { hour: "numeric", hour12: true })
        .slice(-2);
      const timeFormat = `${hour}: ${minute} ${amPM}`;

      setSelectedTime([...selectedTime, timeFormat]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.text}>Editar Perfil</Text>

        <ProfilePicture
          imageSource={imageForm || NoImage}
          onPress={() => setModalVisible(true)}
        />

        <ModalCamera
          modalVisible={modalVisible}
          onClose={() => setModalVisible(false)}
          image={() => image()}
          photo={() => photo()}
        />
      </View>

      <ScrollView
        style={{ width: wp(100) }}
        contentContainerStyle={{ alignItems: "center", paddingBottom: hp(5) }}
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

        <View style={{ marginTop: hp(5), flexDirection: "row" }}>
          <Button
            title={"Guardar"}
            color={COLORS.BLUE}
            ownStyle={styles.button}
            onPress={() => updateUser()}
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
    elevation: 5,
  },
  arrow: {
    borderTopColor: "white",
    borderTopWidth: 10,
    borderRightWidth: 10,
    borderRightColor: "transparent",
    borderBottomWidth: 0,
    borderLeftWidth: 10,
    borderLeftColor: "transparent",
  },
  popover: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
});
