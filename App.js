import { StyleSheet, } from "react-native";
import {colors} from "./themes/color";
import { MyUserProvider } from "./contexts/UserContext";
import Navigation from "./Navigation";

export default function App() {


  return (
    <MyUserProvider>
      <Navigation/>
    </MyUserProvider>
  );
}

