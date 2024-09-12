import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SimpleCard from "../components/cards/SimpleCard";
import SimpleButton from "../components/buttons/SimpleButton";
import LitereMariMiciGame from "../games/LitereMariMiciGame";
import SelectareVocaleGame from "../games/SelectareVocaleGame";
import RecunoastereGame from "../games/RecunoastereGame";
import GasesteCategoriaGame from "../games/GasesteCategoriaGame";
import {colors} from "../themes/color";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import SorteazaCategoriiGame from "../games/SorteazaCategoriiGame";
import ScriereImagine from "../games/ScriereImagine";
import { KeyboardAvoidingView } from "react-native";
import { updateUserAfterGame, updateUserXP } from "../database/database";
import { useMyUserContext, useMyUserUpdate } from "../contexts/UserContext";
import * as SQLite from 'expo-sqlite';
import {database_names} from '../database/database_names.js';
import { getDimensions } from '../utils/Dimensions';
const {vh,vw} = getDimensions();

const GameScreen = ({ route, navigation }) => {
  const [Verifica,setVerifica] = useState(0);
  const [GameProgressPercentage,setGameProgressPercentage] = useState(0);
  const [Timer,setTimer] = useState(0);
  const [ProgressRate,setProgressRate] = useState(20);
  const { title , game_xp } = route.params;
  const User = useMyUserContext();
  const updateUser = useMyUserUpdate();
  
  const db = SQLite.openDatabase(database_names.database_name);

    useEffect(() => {
      navigation.setOptions({ title: title });
      //console.log(route.params.progress_rate);
      setProgressRate(route.params.progress_rate);

      const interval = setInterval(()=>setTimer(timer=>timer+1),1000);

      return () => clearInterval(interval);
    }, []);

    const SetareJoc = ()=>{
        switch(route.params.game){
            case "Recunoastere":
                return <RecunoastereGame field={route.params.field} onVerify={Verifica} onComplete={(NoMistakeState)=>rezultatCorect(NoMistakeState)}/>;
            case "LitereMariMici":
                return <LitereMariMiciGame onVerify={Verifica} onComplete={(NoMistakeState)=>rezultatCorect(NoMistakeState)}/>
            case "SorteazaCategorii":
              return <SorteazaCategoriiGame onVerify={Verifica} onComplete={(NoMistakeState)=>rezultatCorect(NoMistakeState)}/>
            case "GasesteCategoria":
              return <GasesteCategoriaGame field={route.params.field} onVerify={Verifica} onComplete={(NoMistakeState)=>rezultatCorect(NoMistakeState)}/>
            case "SelectareVocale":
                return <SelectareVocaleGame onVerify={Verifica} onComplete={(NoMistakeState)=>rezultatCorect(NoMistakeState)}/>   ///cand jocul e gata (onComplete) apeleaza functia rezultatCorect
            case "ScriereImagine":
                return <ScriereImagine field={route.params.field} onVerify={Verifica} onComplete={(NoMistakeState)=>rezultatCorect(NoMistakeState)}/>;
        }

    }
 
    const updateUserXp = (NoMistakeState) =>{
      const user_data = User;
      //console.log(User);
      if(NoMistakeState){
        user_data.current_perfect_streak = user_data.current_perfect_streak + 1; 
        if(user_data.current_perfect_streak>user_data.longest_perfect_streak)
            user_data.longest_perfect_streak = user_data.current_perfect_streak;
      }
      if(user_data.fastest_time==0 || user_data.fastest_time>Timer)
        user_data.fastest_time = Timer;

      else user_data.current_perfect_streak = 0;
      user_data.xp += game_xp;
      updateUser({...user_data});
      updateUserAfterGame(db,database_names.database_user_table,user_data.id,game_xp,user_data.fastest_time,user_data.longest_perfect_streak,user_data.current_perfect_streak);
    }

    const rezultatCorect = (NoMistakeState) =>{
        if(GameProgressPercentage+ProgressRate==100){
          updateUserXp(NoMistakeState);
          navigation.navigate("Felicitari", { title: "Felicitari" })
        }
        else{
          setGameProgressPercentage(current=>current+ProgressRate);
        }

    }

  return (
    <View style={styles.GameScreen}>
      <View style={styles.TopProgressContainer}>
        <ProgressBar percentage={GameProgressPercentage} color={colors.blue}></ProgressBar>
      </View>

      <View>{SetareJoc()}</View>

      <View style={styles.SimpleButtonContainer}>
        <SimpleButton
          color={colors.blue}
          onPress={() =>setVerifica(verifica=>verifica+1)
          }
        >
          Verifica
        </SimpleButton>
      </View>
      <Text style={styles.TimeCounter}>Time: {Timer}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  GameScreen:{
    height:"100%",
  },
  SimpleButtonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  TopProgressContainer:{
    width: "100%",
    alignItems:"center",
    marginTop: 20,
  },
  TimeCounter:{
      position:"absolute",
      left:0,
      bottom:0,
      padding:7,
      color: colors.white,
      backgroundColor:colors.blue,
      borderTopRightRadius:10,
      fontSize:22,
      marginTop: 50,
  }
});


export default GameScreen;
