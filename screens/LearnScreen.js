import { StyleSheet, Text, View, Image, ImageBackgroundn, ScrollView } from "react-native";
import SimpleButton from "../components/buttons/SimpleButton";
import {colors} from "../themes/color";
import SimpleCard from "../components/cards/SimpleCard";
import { useEffect , useState} from "react";
import * as SQLite from 'expo-sqlite';
import { ImageService } from "../utils/ImageService";
import {database_names} from '../database/database_names.js';


const LearnScreen = ({ route, navigation }) => {
  
  const db = SQLite.openDatabase(database_names.database_name);

  const {type}=route.params;

  const [Data,setData]=useState([])
  const [Color,setColor]=useState([colors.blue, colors.green, colors.orange, colors.red, colors.purple, colors.yellow, colors.brown])
  const getData = (type) =>{
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM ${database_names.database_words_table} WHERE type= "${type}"`, null, 
      (txObj, ResultsSet) =>{console.log(ResultsSet); setData(ResultsSet.rows._array)},
      (txObj, error) => console.log('Error ', error)
      );
    }) // end transaction
  }
  useEffect(()=>{
    getData(type)
  },[]) 

  return (
    <View style={styles.LearnScreen}>
    <ScrollView style={styles.LearnListContainer}>
      {Data.map((type_object,index)=>{
        return (
          <SimpleCard
            text={type_object.name}
            color={Color[index%7]}
            image={ImageService.GetImage(type_object.image)}
            onPress={() => {
              navigation.navigate("LearnObject", {
                name: type_object.name,
                imagine: type_object.image,
                descriere: type_object.description,
              });
            }}
          />
        )
      })}
    </ScrollView>
  </View>
  );
};

const styles = StyleSheet.create({
  LearnScreen: {
    alignItems: "center",
  },
  LearnListContainer: {
    width: "90%",
    paddingTop: 40,
    paddingBottom:40,
    paddingRight:20,
    height:"95%",
  },

});

export default LearnScreen;
