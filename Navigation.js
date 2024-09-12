import { DrawerActions, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import GameMenuScreen from "./screens/GameMenuScreen";
import HomeScreen from "./screens/HomeScreen";
import GameScreen from "./screens/GameScreen";
import FelicitariPanda from "./screens/FelicitariPanda";
import LearnMenuScreen from "./screens/LearnMenuScreen";
import {colors} from "./themes/color";
import LearnScreen from "./screens/LearnScreen";
import LearnObjectScreen from "./screens/LearnObjectScreen";
import InitialScreen from "./screens/InitialScreen";
import AccountScreen from "./screens/AccountScreen";
import { MyUserProvider, useMyUserContext } from "./contexts/UserContext";
import { useEffect } from "react";
import { ScreenStack } from "react-native-screens";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SettingsScreen from "./screens/SettingsScreen";
import { getDimensions } from './utils/Dimensions';
const {vh,vw} = getDimensions();

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const HomeDrawer = () =>{

    return (
        <Drawer.Navigator initialRouteName="Main">
            <Drawer.Screen                
                name="Home Screen"
                component={HomeScreen}
                options={{...styles.header, ...{title: 'EduLearn'}}}/>
            
            <Drawer.Screen 
                name="Cont"
                component={AccountScreen}
                options={styles.header}/>

            <Drawer.Screen 
                name="Setari"
                component={SettingsScreen}
                options={styles.header}/>
              
        </Drawer.Navigator>
    )
}



const Navigation = () =>{
    const User = useMyUserContext();

    useEffect(()=>{
      console.log(User);
    },[User])

    if(User==undefined)
        return <Text>Loading</Text>


    return(
        <NavigationContainer>
        <Stack.Navigator initialRouteName={User=="no user"?"Initial Screen":"Main"}>
            <Stack.Screen
                name="Initial Screen"
                component={InitialScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Main"
                component={HomeDrawer}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Games Menu"
                component={GameMenuScreen}
                options={styles.header}
            />
            <Stack.Screen
                name="Game"
                component={GameScreen}
                options={styles.header}
            />
            <Stack.Screen
                name="Felicitari"
                component={FelicitariPanda}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Learn Menu"
                component={LearnMenuScreen}
                options={{...styles.header, ...{title: 'Învață'}}}
            />
            <Stack.Screen
                name="Learn"
                component={LearnScreen}
                options={styles.header}
            />    
            <Stack.Screen
                name="LearnObject"
                component={LearnObjectScreen}
                options={styles.header}
            />    
            </Stack.Navigator>
      </NavigationContainer>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      alignItems: "center",
      justifyContent: "center",
    },
    header: {
      headerStyle: { backgroundColor: colors.blue },
      headerTintColor: colors.white,
      headerTitleAlign: "center",
      headerTitleStyle: { fontSize: 3.8 * vh },
      fontSize: 1 * vh,
    },

  });

export default Navigation;