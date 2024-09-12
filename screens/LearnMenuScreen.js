import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import SimpleButton from "../components/buttons/SimpleButton";
import {colors} from "../themes/color";
import SimpleCard2 from "../components/cards/SimpleCard2";
import LearnScreen from "./LearnScreen";

const LearnMenuScreen = ({ route, navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.Card2}>
      <SimpleCard2
        style={{marginRight: 10,}}
        text="Animale"
        color={colors.orange}
        onPress={() => {
        navigation.navigate("Learn", {
          type:"animal"
        });
      }}
      />
      <SimpleCard2
        style={{marginLeft: 10,}}
        text="Vehicule"
        color={colors.blue}
        onPress={() => {
        navigation.navigate("Learn", {
          type:"vehicul"
        });
        }}
      />
      </View>
      <View style={styles.Card2}>
      <SimpleCard2
        style={{marginRight: 10,}}
        text="Fructe"
        color={colors.purple}
        onPress={() => {
        navigation.navigate("Learn", {
          type:"fruct"
        });
      }}
      />
      <SimpleCard2
        style={{marginLeft: 10,}}
        text="Legume"
        color={colors.green}
        onPress={() => {
        navigation.navigate("Learn", {
          type:"leguma"
        });
        }}
      />
      </View>
      <View style={styles.Card3}>
      <SimpleCard2
        style={{marginRight: 10,}}
        text="Cifre"
        color={colors.red}
        onPress={() => {
            navigation.navigate("Learn", {
              type:"cifra"
            });
        }}
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  Card2: {
    display: "flex",
    flexDirection: "row",
    width: "90%",
    paddingTop: 20,
    justifyContent: "space-between",
    
  },
  Card3: {
    display: "flex",
    flexDirection: "row",
    width: "45%",
    paddingTop: 20,
    justifyContent: "flex-start",
    
  },
});

export default LearnMenuScreen;
