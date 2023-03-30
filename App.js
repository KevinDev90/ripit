import Navigator from "@navigation";
import store from "@redux/store";
import { Provider } from "react-redux";
// import { collection, getDocs } from "firebase/firestore/lite";
// import { db } from "@services/firebaseConfig";

// async function getCities() {
//   const citiesCol = collection(db, "cities");
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map((doc) => doc.data());
//   return cityList;
// }

export default function App() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
