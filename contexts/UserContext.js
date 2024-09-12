import React,{useContext,useEffect,useState} from "react";
import {database_names} from '../database/database_names.js';
import * as SQLite from 'expo-sqlite';

const MyUserContext  = React.createContext();
const MyUserUpdateContext  = React.createContext();


export function useMyUserContext(){
    return useContext(MyUserContext);
}

export function useMyUserUpdate(){
    return useContext(MyUserUpdateContext);
}


export function MyUserProvider({children}){
    const [User,setUser] = useState();

    const db = SQLite.openDatabase(database_names.database_name);

    useEffect(()=>{
        getAllUsersData(database_names.database_user_table)
    },[])


    const getAllUsersData = (tableName) =>{
        //setUser({name:"AAAA",avatar:"BBBB"});
        
        db.transaction(tx => {
          tx.executeSql(`SELECT * FROM ${tableName}`, null, 
          (txObj, ResultsSet) => {setUser(ResultsSet.rows._array[0]);console.log("ResultsSet.rows._array[0]");},
          (txObj, error) => {console.log('Error ', error);setUser("no user");}
          );
        }) // end transaction
      }

    const updateUser = (data)=>{
        setUser(data)
        console.log(User);
    }


    return(
        <MyUserContext.Provider value={User}>
            <MyUserUpdateContext.Provider value={updateUser}>
                {children}
            </MyUserUpdateContext.Provider>
        </MyUserContext.Provider>

    )
}