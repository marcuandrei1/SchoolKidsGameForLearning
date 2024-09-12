import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import SimpleButton from "../components/buttons/SimpleButton";
import {colors} from "../themes/color";
import { getDimensions } from '../utils/Dimensions';
const {vh,vw} = getDimensions();

const FelicitariPanda = ({ route, navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.containerInterior}
        source={require("../assets/PozaBackgroundFelicitariVerde.png")}
      >
        <Text style={styles.PrimaLinieText}>Felicitări</Text>
        <Text style={styles.ADouaLinieText}>Ai reușit !</Text>
        <Image
          style={styles.image}
          source={require("../assets/PozaPandaFelicitari.png")}
        />

        <SimpleButton onPress={() => navigation.pop(2)} color={colors.darkgreen}>
          Continuă!
        </SimpleButton>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.green,
    justifyContent: "center",
  },

  containerInterior: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  PrimaLinieText: {
    fontSize: 4 * vh,
    color: colors.white,
  },

  ADouaLinieText: {
    fontSize: 4 * vh,
    color: colors.white,
    marginBottom: 3 * vh,
  },

  image: {
    width: 63 * vw,
    height: 55 * vh,
    margin: 6 * vh,
  },
});

export default FelicitariPanda;
