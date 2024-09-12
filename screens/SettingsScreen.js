import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import SimpleButton from "../components/buttons/SimpleButton";
import { inital_data } from "../database/initial_data";
import { database_names } from "../database/database_names.js";
import { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";
import { colors } from "../themes/color";
import { ScrollView } from "react-native-gesture-handler";
import { createTable, addItem, dropTable } from "../database/database";
import { useMyUserUpdate } from "../contexts/UserContext";

const SettingsScreen = ({ route, navigation }) => {
  const [Data, setData] = useState(null);
  const db = SQLite.openDatabase(database_names.database_name);

  const updateUser = useMyUserUpdate();

  useEffect(() => {
    if (Data == null) getAllItems(database_names.database_words_table);
  }, [Data]);

  const getAllItems = (tableName) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM ${tableName}`,
        null,
        (txObj, ResultsSet) => {
          setData(
            ResultsSet.rows._array
          ); /*console.log(ResultsSet.rows._array);*/
        },
        (txObj, error) => console.log("Error ", error)
      );
    }); // end transaction
  };

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
    getAllItems(database_names.database_words_table);
  };

  return (
    <View style={styles.SettingsScreen}>
      <ScrollView scrollIndicatorInsets={{ right: 1 }}>
        <SimpleButton
          onPress={() => {
            dropTable(db, database_names.database_user_table);
            updateUser("no user");
          }}
          color={colors.red}
        >
          Sterge useri
        </SimpleButton>
        
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
  },
  cards: {
    padding: 10,
    paddingTop: 60,
  },

  Texte: {
    fontWeight: "bold",
    fontSize: 30,
    paddingRight: 120,

    paddingBottom: 30,
  },

  portiuni: {
    flex: 1,
    flexDirection: "row",
    padding: 30,
    paddingBottom: 80,
  },
});

export default SettingsScreen;
