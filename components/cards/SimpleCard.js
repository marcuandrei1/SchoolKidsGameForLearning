import { StyleSheet, Text, Touchable, View, Image } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import {colors} from "../../themes/color";
import { getDimensions } from '../../utils/Dimensions';
const {vh,vw} = getDimensions();


const SimpleCard = ({ text, image, color, onPress }) => {
  return (
    <Pressable
      style={[
        styles.SimpleCard,
        { borderColor: color, backgroundColor: color },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.SimpleCardText, { color: colors.white }]}>{text}</Text>
      <Image style={styles.SimpleCardImage} source={image} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  SimpleCard: {
    width: "100%",
    borderWidth: 2,
    borderRadius: 10,
    paddingLeft: 25,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    overflow: "hidden",
  },
  SimpleCardText: {
    fontSize: 3 * vh,
    marginBottom: 15,
  },
  SimpleCardImage: {
    resizeMode:"contain",
    height: 10 * vh,
    width: 10 * vh,
    backgroundColor: colors.white,
  },
});

export default SimpleCard;
