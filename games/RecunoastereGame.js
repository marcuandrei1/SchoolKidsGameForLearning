import { StyleSheet, Text, View, Image } from "react-native";
import { useEffect, useState } from "react";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import SelectableButton from "../components/buttons/SelectableButton";
import RoundButton from "../components/buttons/RoundButton";
import {colors} from "../themes/color";
import * as SQLite from 'expo-sqlite';
import { ImageService } from "../utils/ImageService";
import useSound from "../hooks/useSound";
import * as Speech from 'expo-speech';
import { getDimensions } from '../utils/Dimensions';
const {vh,vw} = getDimensions();
import {database_names} from '../database/database_names.js';


const RecunoastereGame = ({field, onVerify,onComplete}) => {
    const [butoane,setbutoane]=useState([false,false,false,false])
    const [Variante,setVariante]=useState(null)
    const [GameImage,setGameImage] = useState(null);
    const db = SQLite.openDatabase(database_names.database_name);
    const [Solution,setSolution]=useState(0);
    const [SpecialMode,setSpecialMode] = useState(false);
    const [NoMistake, setNoMistake] = useState(true);

    const playSound = useSound();

    useEffect(() => {
      //se apeleaza cand apesi butonul de verificare
      Verify();
    }, [onVerify]);

    useEffect (()=>{
      getVarinte();
    },[]);

    //aduce 4 elemente din baza de date la intanpm audit fix --forcemplare
    const getVarinte = () =>{
      db.transaction(tx => {
        tx.executeSql(`SELECT * FROM ${database_names.database_words_table} WHERE type= "${field}" ORDER BY random() LIMIT 4`, null, 
        (txObj, ResultsSet) =>{console.log(ResultsSet); setData(ResultsSet.rows._array)},
        (txObj, error) => console.log('Error ', error)
        );
      }) // end transaction
    }

    const setData = async (data) =>{
      setVariante(data);
      const solution = Math.floor(Math.random() * 4) 
      setSolution(solution);
      console.log(solution);
      const gameImage = await ImageService.GetImage(data[solution].image);
      setGameImage(gameImage);
    }


    const Verify=()=>{
      if(Variante==null)
        return;
      let ArrayButoane = [...butoane];
      for (let i=0;i<=3;i++)
      {
        if (i==Solution){
          if (ArrayButoane[i]==1){
            ArrayButoane[i]=2;
            setTimeout(()=>{setbutoane([false,false,false,false]);onComplete(NoMistake);getVarinte();},500);
            playSound("corect");
          }
        }
        else if (ArrayButoane[i]==1){
          ArrayButoane[i]=3;
          setNoMistake(false);
          setTimeout(()=>setbutoane([false,false,false,false]),700);
          playSound("wrong");
        }
        
      }
      console.log(ArrayButoane);
      setbutoane(ArrayButoane);
    }

    const speak = async()=>{
      Speech.speak(`Ce ${field} este`, {language:"ro-Ro",});
    };
    

    if(Variante==null)
      return <Text>Loading</Text>

      
  

  return (
    <View style={styles.RecunoastereGame} >
      <Text style={styles.text}>Ce {field} este ?</Text>
      <RoundButton icon={require("../assets/sound_icon.png")} onPress={speak}></RoundButton>
      <Image style={styles.imagine} source={GameImage}></Image>
      <View style={styles.poz_butoane}>
      <SelectableButton button_state={butoane[0]} onPress={()=>setbutoane([true,false,false,false])} more_styles={styles.buton}>{Variante[0].name}</SelectableButton>
      <SelectableButton button_state={butoane[1]} onPress={()=>setbutoane([false,true,false,false])} more_styles={styles.buton}>{Variante[1].name}</SelectableButton>
      </View>
      <View style={styles.poz_butoane}>
      <SelectableButton button_state={butoane[2]} onPress={()=>setbutoane([false,false,true,false])} more_styles={styles.buton}>{Variante[2].name}</SelectableButton>
      <SelectableButton button_state={butoane[3]} onPress={()=>setbutoane([false,false,false,true])} more_styles={styles.buton}>{Variante[3].name}</SelectableButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  RecunoastereGame: {
    alignItems: "center",
    paddingTop: 10,
    marginBottom: 25,
  },
  text: {
    fontSize: 5 * vh,
    fontWeight: "bold",
  },
  buton: {
    width: 40 * vw,
    height: 7 * vh,
    margin: 10,
  },
  poz_butoane: {
    flexDirection: "row",
  },
  imagine: {
    marginTop: 30,
    marginBottom: 30,
    height: 30 * vh,
    width:"90%",
    resizeMode:"contain",
  },
  ColorView:{
    width:"70%",
    height:200,
    borderRadius:40,
    marginVertical:10,
    backgroundColor:"#f3ee22"
  },
  NumberText:{
    fontSize:50,
    color:colors.black,
    marginVertical:10,
  }
});

export default RecunoastereGame;
