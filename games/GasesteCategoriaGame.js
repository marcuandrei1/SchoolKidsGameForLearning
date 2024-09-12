import { StyleSheet, Text, View, Image } from "react-native";
import { useEffect, useState } from "react";
import SelectableButton from "../components/buttons/SelectableButton";
import SelectableFieldButton from "../components/buttons/SelectableFieldButton";
import { colors } from "../themes/color";
import * as SQLite from 'expo-sqlite';
import useSound from "../hooks/useSound";
import * as Speech from 'expo-speech';
import RoundButton from "../components/buttons/RoundButton";
import {database_names} from '../database/database_names.js';
import { getDimensions } from '../utils/Dimensions';
const {vh,vw} = getDimensions();

const GasesteCategoriaGame = ({field, onVerify,onComplete}) => {
  const [ButtonValueMatrix,setButtonValueMatrix] = useState([]);
  const [AnswerMatrix,setAnswerMatrix] = useState([]);
  const [Cuvinte,setCuvinte] = useState([]);
  const [SolutionAdress,setSolutionAdress] = useState();
  const [NoMistake, setNoMistake] = useState(true);
  const db = SQLite.openDatabase(database_names.database_name);
  const playSound = useSound();

 
  useEffect(()=>{//se apeleaza cand se creeaza jocul
    getCuvinte();
  },[])

  useEffect(()=>{//se apeleaza cand apesi butonul de verificare
      Verify();
  },[onVerify])

  const resetMatrix = () =>{
    const Matrix = [...ButtonValueMatrix];

    for(let i=0;i<Matrix.length;i++){
      for(let j=0;j<Matrix[i].length;j++){
          Matrix[i][j].state=false;
      }
    } 
    setButtonValueMatrix(Matrix)
    console.log("reseted MAtrix");
  }

  const Verify = () =>{
    if(Cuvinte.length == 0)
      return;
    const Matrix = [...ButtonValueMatrix];
    console.log(AnswerMatrix);
    let ok = true;
    let solution = SolutionAdress;
    console.log(SolutionAdress);
    for(let i=0;i<Matrix.length;i++){
      for(let j=0;j<Matrix[i].length;j++){
          if(Matrix[i][j].state==true && AnswerMatrix[i][j].state==true){
            console.log("corect")
            Matrix[i][j].state=2;
            continue;
          }
          if(AnswerMatrix[i][j].state==true && Matrix[i][j].state==false){
            ok=false;
            continue;
          }
          if(Matrix[i][j].state!=AnswerMatrix[i][j].state && AnswerMatrix[i][j].state!=true){
            console.log("gresit")
            ok=false;
            Matrix[i][j].state=3;
          }
      }
    }/*
    for(let i=0;i<Cuvinte[0].name.length;i++){
      let x,y;
      if(solution.direction){
        x = solution.x;
        y = i+solution.y;
      }
      else{
        x = i+solution.y;
        y = solution.x;
      }
      if(!Matrix[y][x].state)
        ok=false;
      //console.log(Matrix[i+solution.y][solution.x]);
    }*/
    console.log(Matrix);
    setButtonValueMatrix(Matrix);

    if(ok){
      playSound("corect");
      onComplete(NoMistake);
      getCuvinte();
    }
    else{
      playSound("wrong");
      setNoMistake(false);
      setTimeout(()=>resetMatrix(),500);
    }
  }

  const getCuvinte = () =>{
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM ${database_names.database_words_table} WHERE type= "${field}" AND LENGTH(name) <= 5 ORDER BY random() LIMIT 3`, null, 
      (txObj, ResultsSet) => createMatrix(ResultsSet.rows._array),  ///declar variabila setCuvant care ia valoarea primului element din vectorul care e sortat random 
      (txObj, error) => console.log('Error ', error)
      );
    }) 
  }

  const createMatrix = (cuvinte_array) =>{
    setCuvinte(cuvinte_array)

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZĂÎȘȚÂ";
    let n = 5;
    let Matrix = new Array();
    let answerMatrix  = new Array();
    for(let i=0;i<n;i++){
      Matrix[i] = new Array();
      answerMatrix[i] = new Array();
      for(let j=0;j<n;j++){
        let x = Math.floor(Math.random() * 31);
        Matrix[i][j] = {value:characters.charAt(x),state:false};
        answerMatrix[i][j] = {value:characters.charAt(x),state:false};
      }
    }
    let direction = Math.floor(Math.random() * 2);
    let x = Math.floor(Math.random() * 5);
    console.log(cuvinte_array[0].name);
    let y = Math.floor(Math.random() * (5-cuvinte_array[0].name.length));
    console.log(y);

    
    for(let i=0;i<cuvinte_array[0].name.length;i++){
      if(direction){
        Matrix[i+y][x]={value:cuvinte_array[0].name[i],state:false};
        answerMatrix[i+y][x]={value:cuvinte_array[0].name[i],state:true};
      }
      else{
        Matrix[x][i+y]={value:cuvinte_array[0].name[i],state:false};
        answerMatrix[x][i+y]={value:cuvinte_array[0].name[i],state:true};
      }

      //console.log(cuvinte_array[0].name[i]);
    }
    console.log(answerMatrix);
    setAnswerMatrix(answerMatrix)
    setButtonValueMatrix(Matrix);
    setCuvinte(cuvinte_array)
    setSolutionAdress({x:x,y:y,direction:direction});
  }

  const ChangeState = (i,j) =>{
    let newMatrix = [...ButtonValueMatrix];
    newMatrix[i][j].state = !newMatrix[i][j].state;
    setButtonValueMatrix(newMatrix);
}

const speak = async()=>{
  Speech.speak(`Găsește ce ${field} este ascuns`, {language:"ro-Ro",});
};

  return (
    <View style={styles.GasesteCategoriaGame} >
      <View style={styles.CerintaContainer}>
        <Text style={styles.cerinta}>Gaseste ce {field} este ascuns</Text>
        <RoundButton icon={require("../assets/sound_icon.png")} onPress={speak}></RoundButton>
      </View>
      <View style={styles.LitereContainer}>
        {ButtonValueMatrix.map((button_row,indexR)=>{
              return(
                  <View style={styles.LitereRowContainer} key={indexR}>
                      {button_row.map((button,indexC)=>{
                          return <SelectableButton button_state={button.state} onPress={()=>ChangeState(indexR,indexC)} key={indexC}>{button.value}</SelectableButton>
                      })}
                  </View>
              )
          })}
        </View>

    </View>
  );
};

const styles = StyleSheet.create({
    GasesteCategoriaGame: {
    alignItems: "center",
    justifyContent:"center",
    paddingTop: 2 * vh,
    marginBottom: 6 * vh,
  },
  cerinta: {
    fontSize: 3 * vh,
    textAlign:"center",
    fontWeight: "bold",
    marginRight:2 * vw,
    flex:1,
  },
  LitereContainer:{
      width:65 * vw,
  },
  LitereRowContainer:{
      flexDirection:"row",
      justifyContent:"space-between",
      width:"100%",
      marginBottom:1 * vh,
  },
  CerintaContainer:{
    width:"80%",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    marginBottom:5 * vh,
  }
});

export default GasesteCategoriaGame;
