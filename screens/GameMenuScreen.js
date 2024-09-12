import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import SimpleCard from "../components/cards/SimpleCard";
import RecunoastereGame from "../games/RecunoastereGame";
import FelicitariPanda from "../screens/FelicitariPanda";
import {colors} from "../themes/color";

const GameMenuScreen = ({ route, navigation }) => {
  const { title, games } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: title });
  }, []);

  return (
    <View style={styles.GameMenuScreen}>
      <ScrollView style={styles.GameListContainer}>
        {games.map((game, index) => {
          return (
            <SimpleCard
              key={index}
              text={game.name}
              color={game.color}
              image={game.image}
              onPress={() => {
                navigation.navigate("Game", {
                  title: game.name,
                  game: game.game,
                  game_xp: game.game_xp,
                  field: game.field,
                  progress_rate: game.progress_rate,
                });
              }}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  GameMenuScreen: {
    alignItems: "center",
  },
  GameListContainer: {
    width: "90%",
    paddingTop: 40,
    paddingBottom:40,
    paddingRight:20,
    height:"95%",
  },
});

export default GameMenuScreen;
