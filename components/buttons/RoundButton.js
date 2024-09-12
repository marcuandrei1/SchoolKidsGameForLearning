import { StyleSheet, Text, View, color,  Image } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import {colors} from "../../themes/color";
import { getDimensions } from '../../utils/Dimensions';
const {vh,vw} = getDimensions();

const RoundButton = ({ icon, onPress, style }) => {
  return (
    <Pressable style={[styles.RoundButton,style]} onPress={onPress}>
      <Image style={styles.RoundButtonIcon} source={icon}></Image>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  RoundButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:colors.blue,
    borderRadius: 1000,
    width:8 * vh,
    height:8 * vh,
  },
  RoundButtonIcon: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 20,
    width:"40%",
    height:"40%",
    resizeMode:"contain"
  },
});

export default RoundButton;
