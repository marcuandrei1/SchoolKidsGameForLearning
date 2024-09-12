import { StyleSheet, Text, View, Image, TextInput, ScrollView, SafeAreaView } from "react-native";
import { useEffect, useState } from "react";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import SelectableButton from "../components/buttons/SelectableButton";
import RoundButton from "../components/buttons/RoundButton";
import {colors} from "../themes/color";
import * as SQLite from 'expo-sqlite';
import { ImageService } from "../utils/ImageService";
import useSound from "../hooks/useSound";
import * as Speech from 'expo-speech';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard} from "react-native";
import {database_names} from '../database/database_names.js';
import { getDimensions } from '../utils/Dimensions';
const {vh,vw} = getDimensions();

const ScriereImagine = ({field,onVerify,onComplete})=>{
  const [Mesaj,setMesaj] = useState("");
  const [GameImage,setGameImage] = useState(null);
  const [GameName,setGameName]=useState(null);
  const db = SQLite.openDatabase(database_names.database_name);
  const [Solution,setSolution]=useState(0);
  const playSound = useSound();
  const [ statusColor, setStatusColor ] = useState(colors.black);
  const [SpecialMode,setSpecialMode] = useState(false);
  const [NoMistake, setNoMistake] = useState(true);


  useEffect (()=>{
    getPoza();
  },[]);


  useEffect(() => {
    Verify();
  }, [onVerify]);

  const getPoza = () =>{
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM ${database_names.database_words_table} WHERE type= "${field}" ORDER BY random() LIMIT 1`, null, 
      (txObj, ResultsSet) => setData(ResultsSet.rows._array),  ///declar variabila setCuvant care ia valoarea primului element din vectorul care e sortat random 
      (txObj, error) => console.log('Error ', error)
      );
    }) 
  }

      
  const setData = async (data) =>{
    console.log(data);
    let gameImage;
    if(SpecialMode) gameImage=data[0].image;
    else gameImage = await ImageService.GetImage(data[0].image);
    setGameName(data[0].name);
    setGameImage(gameImage);
  }

  const ResetCuvant = () => {
    
  };

  const Verify=()=>{
    const CuvantulIntrodus=Mesaj;
    console.log(GameName);
    if(CuvantulIntrodus.toUpperCase()==GameName)  
    {
      playSound("corect");
      setStatusColor(colors.green);
      setTimeout(() => {
        onComplete(NoMistake);
        getPoza();
        setMesaj("");
        setStatusColor(colors.black);
      },500);
    }
    else if(GameName!=null)
    {
      playSound("gresit");
      setNoMistake(false);
      setStatusColor(colors.red);
      setTimeout(()=>setStatusColor(colors.black),500);
    }
  };

  const speak = async()=>{
    Speech.speak(`Scrie ce ${field} apare în imagine`, {language:"ro-Ro",});
  }; 

  return (
    <KeyboardAvoidingView  behavior="position" keyboardVerticalOffset="100">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.ScriereImagine}>
          <View style={styles.cerinta_audio}>
          <View style={styles.cerinta}>
          <Text style={styles.Text}>Scrie ce</Text>
            <Text style={styles.Text}>{field} apare</Text>
            </View>
            <View>
            <RoundButton icon={require("../assets/sound_icon.png")} onPress={speak}></RoundButton>
            </View>
            </View>
                <Image resizeMode="contain" style={styles.imagine} source={GameImage}></Image>
                <View style={styles.TextBar}>
                  <TextInput
                    style={[styles.searchBar , {color:statusColor}, styles.multilineInput, styles.largeMultilineInput]}
            
                    placeholder="Scrie aici"
                    placeholderTextColor={"#EB6440"}
                    value={Mesaj}
                    onChangeText={setMesaj}
                  ></TextInput>
                </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    ScriereImagine:{
        alignItems:"center",
        padding:50,
        overflow:"hidden",
    },
    Text:{
        fontWeight:"700",
        fontSize:4 * vh,
        paddingBottom:10,
    },
    imagine:{
      margin:2 * vh,
      width: 85 * vw,
      height: 35 * vh
    },
    TextBar:{
      padding:10,
      borderWidth:1,
      borderTopWidth:0,
      borderLeftWidth:0,
      borderRightWidth:0,
      borderBottomWidth:4,
      borderColor:"#D9D9D9",
      alignItems:"center",
      width:50 * vw,
    },
    searchBar:{
      width:"100%",
      alignContent:"center",
      alignItems:"center",
      fontSize:3 * vh,
      fontWeight:'500',
      textAlign:"center",
    },
    cerinta:{
      alignItems:"center",
    },
    cerinta_audio:{
      flexDirection:"row",
    },
    NumberText:{
      fontSize: 10 * vh,
      fontWeight: "bold",
    },
    ColorView:{
    width:"100%",
    height:200,
    borderRadius:40,
    marginVertical:10,
    backgroundColor:"#f3ee22"
    },
  });

export default ScriereImagine;