import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getInspectorDataForInstance } from "react-native/Libraries/Renderer/implementations/ReactNativeRenderer-dev";
import SelectableButton from "../components/buttons/SelectableButton";
import useSound from "../hooks/useSound";
import {colors} from "../themes/color";
import * as SQLite from 'expo-sqlite';
import RoundButton from '../components/buttons/RoundButton';
import * as Speech from 'expo-speech'
import {database_names} from '../database/database_names.js';
import { getDimensions } from '../utils/Dimensions';
import { TextInput } from "react-native-gesture-handler";
const {vh,vw} = getDimensions();


const SelectareVocaleGame = ({ onVerify ,onComplete}) => {
  const [ArrayButoane, setArrayButoane] = useState([]);
  const [ButtonState, setButtonState] = useState(false);
  const [Cuvant, setCuvant]=useState(null);
  const db = SQLite.openDatabase(database_names.database_name);
  const [IsHintVisible,setIsHintVisible] = useState(false);
  const [Solution,setSolution]=useState(0);
  const [NoMistake, setNoMistake] = useState(true);
  const playSound = useSound();

  useEffect(() => {
    //se apeleaza cand apesi butonul de verificare
    Verify();
  }, [onVerify]);
 
  useEffect (()=>{
    getCuvant();
  },[]);

  const getCuvant = () =>{
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM ${database_names.database_words_table} 
      WHERE LENGTH(name) <= 5 ORDER BY random() LIMIT 1`, null, 
      (txObj, ResultsSet) => setCuvant(ResultsSet.rows._array[0].name),  ///declar variabila setCuvant care ia valoarea primului element din vectorul care e sortat random 
      (txObj, error) => console.log('Error ', error)
      );
    }) 
  }

  

  function isVowel(x) {
    var result;

    result =
      x == "A" ||
      x == "E" ||
      x == "I" ||
      x == "O" ||
      x == "U" ||
      x == "a" ||
      x == "e" ||
      x == "i" ||
      x == "o" ||
      x == "u" || 
      x == "Ă" || 
      x == "Î" || 
      x == "ă" || 
      x == "â" ||
      x == "Â" || 
      x == "î";
    return result;
  }

  const ResetCuvant=()=>{
    
    for(let i=0;i<ArrayButoane.length;i++)
    ArrayButoane[i].state=0;
    setArrayButoane(ArrayButoane);
  };

  const Verify = () => {
    let c=null;
    
    console.log(c);

    const ArrayButoaneCopie = [...ArrayButoane];

    let something_selected = false;

    for (let i = 0; i < ArrayButoaneCopie.length; i++) {
      if(c == null)c=0;
      if(ArrayButoaneCopie[i].state != 0)
        something_selected = true;

      if (isVowel(ArrayButoaneCopie[i].litera) && ArrayButoaneCopie[i].state == 1) ///ArrayButoane[i].state inseamna ca e apasat butonul
          ArrayButoaneCopie[i].state = 2;
      if (isVowel(ArrayButoaneCopie[i].litera) == false && ArrayButoaneCopie[i].state == 1){
        ArrayButoaneCopie[i].state = 3;
        c++;
      }
      if (ArrayButoaneCopie[i].state==0 && isVowel(ArrayButoaneCopie[i].litera)==true )
        c++;
      if (ArrayButoaneCopie[i].state==3 && isVowel(ArrayButoaneCopie[i].litera)==false )
        c++;

      console.log(c);
    }

    setArrayButoane(ArrayButoaneCopie);


    if(c==0)
    {
      playSound("corect");
      setTimeout(()=>{
      onComplete(NoMistake);                      ///daca jocul e gata apeleaza onComplete din GameScreen
      getCuvant();},300);
    }
    else if(something_selected)
    {
        playSound("wrong");
        setNoMistake(false);
        setTimeout(()=>ResetCuvant(),300);
    }
  };

  useEffect(() => {
    creareCuvant();
  }, [Cuvant]); ///se apeleaza functia asta de fiecare data cand se schimba o variabila din []

  

  const creareCuvant = () => {
    if(Cuvant==null)
      return
    if(Cuvant.length>5)
      getCuvant();
    console.log(Cuvant);
    const array = new Array(Cuvant.length);
    for (let i = 0; i < Cuvant.length; i++) {
      array[i] = { litera: Cuvant[i], state: false };
    }console.log(array);
    setArrayButoane(array);
  };

  const ApasareButon = (index) => {
    let newVector = [...ArrayButoane]; ///ia toate valorile din vectorul ArrayButoane
    newVector[index].state = !newVector[index].state;
    setArrayButoane(newVector);
  };

  if (ArrayButoane == undefined) return <View></View>;


  const speak =()=>{
    Speech.speak("Selectează vocalele", {language:"ro"});
  };

 
  return (
    <View style={styles.SelectareVocaleGame}>
      <Text style={styles.text}>Selectează</Text>
      <Text style={styles.text}>Vocalele</Text>
      <RoundButton icon={require("../assets/sound_icon.png")} onPress={speak}></RoundButton>
      <View style={styles.container}>
        {ArrayButoane.map((button, index) => {
          return (
            <SelectableButton
              button_state={button.state}
              more_styles={{ margin: 1 * vw }}
              onPress={() => ApasareButon(index)}
            >
              {button.litera}
            </SelectableButton> //e o functie pentru fiecare element din vector care trebuie sa returneze cv
          );
        })}
      </View>

        <Text style={{fontSize:25}}>
          Apasa aici pentru ajutor!
        </Text>
      <View style={styles.hintButton}>
        <RoundButton icon={require("../assets/Vector.png")}  onPress={()=>{setIsHintVisible(!IsHintVisible);console.log(IsHintVisible);}} ></RoundButton>

        {IsHintVisible==true &&  <Text style={styles.texthint} >Vocalele sunt{`\n`}A E I O U Ă Â Î </Text > }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  SelectareVocaleGame: {
    width: "100%",
    alignItems: "center",
    paddingTop: 5 * vh,
  },
  text: {
    fontSize: 5* vh,
    color: colors.black,
  },
  container: {
    flexDirection: "row",
    padding: 4 * vh,
  },
  
  hintButton:{
    paddingTop:20,
    alignItems:"center",
    paddingBottom:20,
  },

  texthint:{
    fontSize:30,
    paddingTop:20,
    paddingBottom:20,
    borderRadius:15,
    color:'#F7C04A',
    fontWeight:'bold',
  },
});

export default SelectareVocaleGame;
