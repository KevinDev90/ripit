import Button from "@components/Button";
import {
  InputCustom,
  InputPicker,
  InputSchedule,
} from "@components/ProfileComponents/input";
import { Picker } from "@react-native-picker/picker";
import { authLogoutAction } from "@redux/actions/authActions";
import { COLORS } from "@utilities/contans";
import { useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useDispatch } from "react-redux";

const dateToday = new Date();

function FormProfile({ user, loading, save }) {
  const dispatch = useDispatch();

  const [username, setUsername] = useState(user.username || "");
  const [email, setEmail] = useState(user.email || "");
  const [bio, setBio] = useState(user.bio || "");
  const [level, setLevel] = useState(user.level || "basico");
  const [hours, setHours] = useState(user.hours || []);

  const [showPicker, setShowPicker] = useState(false);
  const [isVisiblePopover, setIsVisiblePopover] = useState(false);

  const handleTimeChange = (event, time) => {
    setShowPicker(false);
    if (time && hours.length < 4 && event.type !== "dismissed") {
      const hour = time.getHours();
      // const minute = time.getMinutes();
      // const amPM = time
      //   .toLocaleString("en-US", { hour: "numeric", hour12: true })
      //   .slice(-2);
      const timeFormat = hour;

      setHours([...hours, timeFormat]);
    }
  };

  return (
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
        words={hours}
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
          onPress={() => {
            const data = {
              username,
              email,
              bio,
              hours,
              level,
            };
            if (email) save(data);
          }}
        />
        <Button
          title={"Cerrar sesion"}
          color={COLORS.RED}
          ownStyle={styles.button}
          onPress={() => authLogoutAction(dispatch)}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    width: wp(45),
    borderRadius: 10,
    elevation: 0,
  },
});

export default FormProfile;
