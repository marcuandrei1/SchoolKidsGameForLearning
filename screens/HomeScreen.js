import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import SimpleCard from "../components/cards/SimpleCard";
import SimpleCard2 from "../components/cards/SimpleCard2";
import { app_structure_data } from "../database/app_structure_data";
import {colors} from "../themes/color";
import {database_names} from '../database/database_names.js';
import { useMyUserContext } from "../contexts/UserContext";
import { nextLevelProgressPercentage, xpToLevel } from "../utils/xpToLevel";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import CircleAvatar from "../components/cards/CircleAvatar";
import { ImageService } from "../utils/ImageService";
import { getDimensions } from '../utils/Dimensions';
const {vh,vw} = getDimensions();
import { Platform } from 'react-native';

const OsVer = Platform.constants['Release'];

const HomeScreen = ({ navigation }) => {
  const [GamesData, setGameData] = useState([]);
  const User = useMyUserContext();

  const user_avatar = ImageService.GetImage(User.avatar);


  useEffect(() => {
    setGameData(app_structure_data);
    //createTable(db,database_names.database_words_table);
    console.log(database_names.database_name);
    console.log("OsVer: "+ OsVer);
  }, []);

  const openGameOfTheDay = () =>{
    const nr_of_categories = app_structure_data.length;
    let date = new Date().getDate();
    let category_id = date%nr_of_categories;
    const nr_of_games = app_structure_data[category_id].games.length;
    let game_id = date%nr_of_games;

    let game = app_structure_data[category_id].games[game_id];

    navigation.navigate("Game", {
      title: game.name,
      game: game.game,
      field: game.field,
      game_xp: 20,
      progress_rate: game.progress_rate,
    });

  }

  return (
    <View style={styles.HomeScreen}>
      <ScrollView style={styles.HomeScreenScroll}>

        <View style={styles.HomeTopBar}>
          <CircleAvatar image={user_avatar} style={styles.CircleAvatar}/>
          <View>
            <Text style={styles.Text}>Nivel: {xpToLevel(User.xp)}</Text>
            <ProgressBar style={styles.LevelProgressBar} percentage={nextLevelProgressPercentage(User.xp)} color={colors.green}></ProgressBar>
          </View>
        </View>
        <View style={styles.Card2}>
        <SimpleCard2
          style={{marginRight: 10,}}
          text="Învață"
          color={colors.blue}
          onPress={() => {
          navigation.navigate("Learn Menu", {
          });
        }}
        />
        <SimpleCard2
          style={{marginLeft: 10,}}
          text="Jocul zilei"
          color={colors.purple}
          onPress={()=>openGameOfTheDay()}
        />
        </View>
      <View style={styles.GameListContainer}>
        {GamesData.map((game_category, index) => {
          return (
            <SimpleCard
              text={game_category.title}
              color={game_category.color}
              image={game_category.image}
              key={index}
              onPress={() => {
                navigation.navigate("Games Menu", {
                  title: game_category.title,
                  games: game_category.games,
                });
              }}
            />
          );
        })}
      </View>
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
  HomeScreen: {
    alignItems: "center",
    width:"100%",
  },
  HomeScreenScroll:{
    width:"100%",
    paddingLeft:20,
  },

  GameListContainer: {
    width: "90%",
    paddingTop: 20,
  },
  Card2: {
    display: "flex",
    flexDirection: "row",
    width: "90%",
    paddingTop: 20,
    justifyContent: "space-between",
  },
  HomeTopBar:{
    paddingTop:30,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"flex-start",
    width:"100%",
  },
  LevelProgressBar:{
    height:1.5 * vh,
    width:25 * vw,
  },
  CircleAvatar:{
    width:7 * vh,
    height:7 * vh,
    marginRight:10,
    borderWidth:2,
},
  Text:{
    fontSize:2 * vh,
  },


});

export default HomeScreen;
