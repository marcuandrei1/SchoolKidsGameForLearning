import { useState } from "react";
import { StyleSheet, Text, View, Image, ImageBackground, Slider } from "react-native";
import RoundButton from "../components/buttons/RoundButton";
import SimpleButton from "../components/buttons/SimpleButton";
import CircleAvatar from "../components/cards/CircleAvatar";
import InputField from "../components/formElements/InputField";
import {colors} from "../themes/color";
import {database_names} from '../database/database_names.js';
import { addUser, createTable , addItem } from "../database/database";
import { inital_data } from "../database/initial_data";
import * as SQLite from 'expo-sqlite';
import { useMyUserContext, useMyUserUpdate } from "../contexts/UserContext";
import { getDimensions } from '../utils/Dimensions';
const {vh,vw} = getDimensions();

const InitialScreen = ({navigation}) => {
  const updateUser = useMyUserUpdate();


  const [SliderState,setSliderState] = useState(0);
  const PossibleAvatars =[require("../assets/avatar_fox_1.png"),require("../assets/avatar_dog_1.png"),require("../assets/avatar_panda_1.png")];
  const [SelectedAvatar,setSelectedAvatar] = useState(0);
  const [NameInput,setNameInput] = useState("");
  const AvatarArray = ["avatar_fox_1","avatar_dog_1","avatar_panda_1"]

  
  const db = SQLite.openDatabase(database_names.database_name);


  const CreateUserDatabase = () => {
    AddInitialData();
    createTable(db,database_names.database_user_table,database_names.database_user_parameters);
    const user_data = {
      name:NameInput,
      avatar:AvatarArray[SelectedAvatar],
      xp:0,
      max_day_streak:0,
      current_day_streak:0,
      fastest_time:0,
      longest_perfect_streak:0,
      current_perfect_streak :0,
    }
    addUser(db,database_names.database_user_table,user_data);
    updateUser(user_data);
  }

  const nextSlider = ()=>{
    if(SliderState==1)
      CreateUserDatabase();

    if(SliderState>=2)
      navigation.navigate("Main");

    setSliderState(SliderState+1);
    console.log(SliderState);
  }

  const AddInitialData = () => {
    createTable(
      db,
      database_names.database_words_table,
      database_names.database_words_parameters
    );
    inital_data.forEach((item) => {
      //console.log(item);
      addItem(db, database_names.database_words_table, item);
    });
    //getAllItems(database_names.database_words_table);
  };


  const changeAvatar = (direction) =>{
      let newAvatar = SelectedAvatar + direction;
      if(newAvatar==-1)
        newAvatar = PossibleAvatars.length-1;
      else if(newAvatar == PossibleAvatars.length)
        newAvatar = 0;

      setSelectedAvatar(newAvatar);
  }

  return (
    <View style={styles.container}>

        {SliderState==0?

        <View style={styles.data_container}>{/** Prima pagina **/}
          <Text style={styles.Title}>Bine ai venit în <Text style={styles.accent}>EduPlay</Text></Text>
          <View style={styles.FirstPageContent}>
            <Image style={styles.FirstImage}  source={require("../assets/panda-se-uita.png")}></Image>
            <Text style={styles.Text}>O aplicație <Text style={styles.accent}>interactivă</Text> și <Text style={styles.accent}>educativă</Text> care ajută copiii să își dezvolte abilitățile de vorbire, scriere și vocabularul.</Text>
          </View>
        </View>

        :(SliderState==1?
        <View style={styles.data_container}>{/** A doua pagina **/}
          <Text style={[styles.Title,styles.Title2]}>Pentru a începe alegeți un <Text style={styles.accent}>avatar</Text> și un <Text style={styles.accent}>nume</Text></Text>
          <View style={styles.avatar_container}>
            <RoundButton icon={require("../assets/arrow_icon_.png")} style={styles.rotate} onPress={()=>changeAvatar(-1)}></RoundButton>
            <CircleAvatar image={PossibleAvatars[SelectedAvatar]} style={styles.CircleAvatar}/>
            <RoundButton icon={require("../assets/arrow_icon_.png")} onPress={()=>changeAvatar(1)}></RoundButton>
          </View>
          <InputField style={styles.Input} placeholder="Numele tău" value={NameInput} setValue={setNameInput}/>
        </View>
        :
        <View style={styles.data_container}>{/** A treia pagina **/}
          <Text style={[styles.Title,styles.Title2]}> Panda iți urează <Text style={styles.accent}>succes</Text> în calatoria ta spre cunoaștere</Text>
          <Image
            style={styles.BaftaPandaImage}
            source={require("../assets/PozaPandaFelicitari.png")}/>

        </View>)}


        <SimpleButton onPress={()=>nextSlider()} color={colors.blue}>{SliderState==2?"Incepe":"Continua"}</SimpleButton>

        <View style={styles.slider_container}>
            <View style={SliderState==0?[styles.slider_indicator,styles.slider_selected]: styles.slider_indicator}/>
            <View style={SliderState==1?[styles.slider_indicator,styles.slider_selected]: styles.slider_indicator}/>
            <View style={SliderState==2?[styles.slider_indicator,styles.slider_selected]: styles.slider_indicator}/>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems:"center",
    height:"100%",
    backgroundColor:colors.white,
  },
  data_container:{
    flex: 1,
    justifyContent: "center",
    alignItems:"center",
    width:"100%",
  },
  Title:{
    fontSize:5 * vh,
    textAlign:"center",
    width:"80%",
    fontWeight:"bold",
    marginBottom:30,
  },
  Title2:{
    fontSize:3.5 * vh,
  },
  accent:{
    color:colors.blue,
  },
  slider_container:{
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    marginTop:20,
  },
  slider_indicator:{
      width:14 * vw,
      height:1.5 * vh,
      marginHorizontal:10,
      borderRadius:50,
      marginBottom:40,
      backgroundColor:colors.gray,

  },
  slider_selected:{
    backgroundColor:colors.blue,
  },

  FirstPageContent:{
    flexDirection:"row",
    width:"90%",
  },

  Text:{
    fontSize:2 * vh,
    textAlign:"center",
    color:colors.gray,
    flex:1,
  },
  FirstImage:{
    marginTop:30,
    height:"300%",
    resizeMode:"contain",
    flex:1,
  },
  avatar_container:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    marginBottom:40,
  },
  rotate:{
    transform:[{rotate: '180deg'}]
  },

  CircleAvatar:{
      width:160,
      height:160,
      marginHorizontal:20,
  },

  BaftaPandaImage:{
    height:55 * vh,
    resizeMode:"contain",
    width:"100%",
  },
  Input:{
    width:50 * vw,
    fontSize:3 * vh,
},
});

export default InitialScreen;
