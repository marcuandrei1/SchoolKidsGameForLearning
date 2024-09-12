import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View , Image, ScrollView} from "react-native";
import { useEffect ,useState} from "react";
import AccountCard from "../components/cards/AccountCard";
import AccountCard2 from "../components/cards/AccountCard2";
import useSound from "../hooks/useSound";
import RoundButton from "../components/buttons/RoundButton";
import CircleAvatar from "../components/cards/CircleAvatar";
import { ImageService } from "../utils/ImageService";
import { useMyUserContext } from "../contexts/UserContext";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import { colors } from "../themes/color";
import { nextLevelProgressPercentage, xpToLevel } from "../utils/xpToLevel";

const AccountScreen =({route , navigation})=>{
    const [MistakeLevel,setMistakeLevel] = useState(0);
    const [TimeLevel,setTimeLevel] = useState(0);

    const User = useMyUserContext();
    const user_avatar = ImageService.GetImage(User.avatar);

    const noMistakeGamesArray=[0,3,5,10,20,50];
    const timeArray=[240,120,60,30,20,10,5,3];

    useEffect(()=>{
        if(User!=undefined){
            CalculateMistakeAchievementLevel();
            CalculateTimeAchievementLevel();
        }

    },[User])


    const CalculateMistakeAchievementLevel = () =>{
        let level = 1;

        while(User.longest_perfect_streak>=noMistakeGamesArray[level])
            level++;
        setMistakeLevel(level);
    }

    const CalculateTimeAchievementLevel = () =>{
        let level = 1;
        while(User.fastest_time<timeArray[level] && User.fastest_time!=0)
            level++;
        setTimeLevel(level);
    }
    

return ( 
    <View style={styles.screen}>
    <ScrollView scrollIndicatorInsets={{ right: 1 }}>
            <View style={styles.AccountTopBar}>
                <CircleAvatar image={user_avatar} style={styles.CircleAvatar}/>
                <View style={styles.containerFaraAvatar}>
                    <Text style={styles.textNume}>{User.name}</Text>
                    <View style={styles.progressView} >   
                        <ProgressBar style={styles.progressBar} percentage={nextLevelProgressPercentage(User.xp)} color={colors.green}/>
                        <Text style={styles.TextNivel}>Nivel: {xpToLevel(User.xp)}</Text>
                    </View>
                </View>
            </View>
        <View style={styles.container1}>
            <View style={styles.cards}>
                <AccountCard image={require("../assets/IconStreak.png")} text={"Zile in serie"} number="5"/>
            </View>
            <View style={styles.cards}>
                <AccountCard image={require("../assets/IconXp.png")}  text={"XP total"} number={User.xp}/>
            </View>    
        </View>
        <Text style={styles.Realizari}>Achievements</Text>
        <View style={styles.container2}>
            <View style={styles.container3}>
                <View style={styles.cards2}>
                <AccountCard2  image={require("../assets/fire.png")} levelnumber="1" title={"În flăcări"} text={"Menține o serie de 7 zile consecutive\ncu minim un joc rezolvat"} color="#FF5151" percentage={40}/>
                </View>
            </View>
            <View style={styles.container3}>
                <View style={styles.cards2}>
                    <AccountCard2 image={require("../assets/graduate.png")} levelnumber="2" title={"Înțelept"} text={"Rezolvă corect toate nivelele de la 3\nmini jocuri."} color="#772096" percentage={40}/>
                </View>
            </View>
            <View style={styles.container3}>
                <View style={styles.cards2}>
                    <AccountCard2 image={require("../assets/timer.png")} levelnumber={TimeLevel} title={"Gândește rapid"} text={`Rezolvă o serie de nivele în sub ${timeArray[TimeLevel]}\n de secunde per joc.`} color="#EAB62F" percentage={User.fastest_time==0?0:(timeArray[TimeLevel]/User.fastest_time)*100}/>
                </View>
            </View>
            <View style={styles.container3}>
                <View style={styles.cards2}>
                    <AccountCard2 image={require("../assets/target.png")} levelnumber={MistakeLevel} title={"Fără greșeală"} text={`Răspunde corect la ${noMistakeGamesArray[MistakeLevel]} joculețe la\nrand, fără nicio greșeală.`} color="#2FEA63" percentage={(User.longest_perfect_streak/noMistakeGamesArray[MistakeLevel])*100}/>
                </View> 
            </View>
        </View>
    </ScrollView>
    </View> 
    );
};

const styles = StyleSheet.create({
    container1:{
        width:"100%",
        flexDirection:"row",
        justifyContent:"center",
    },
    cards:{
        padding:10,
        paddingTop:30,
    },
    Realizari:{
        padding:30,
        fontSize:30,
        paddingBottom:10,    
    },
    
    container2:{
        paddingLeft:10,
        paddingBottom:20,
        width:"100%",
        flexDirection:"column",
        justifyContent:"center",
    },

    container3:{
        
        flexDirection:"row",
    },

    cards2:{
        width:"100%",
        padding:10,
        flexDirection:"row",
        
    },

   AccountTopBar:{
    flex:1,
    flexDirection:"row",
    
   },

   CircleAvatar:{
    width:100,
    height:100,
    marginTop:20,
    marginLeft:20,
   },

   progressView:{
    flex:1,
    flexDirection:"row",
    paddingTop:10,
    paddingLeft:10,
   },

   progressBar:{
    marginLeft:0,
    height:15,
    width:120,
   },

   TextNivel:{
    marginLeft:20,
    fontWeight:'bold',
   },

   textNume:{
    paddingLeft:10,
    fontSize:30,
    fontWeight:'bold',
   },

   containerFaraAvatar:{
    paddingTop:40,
   },
   });
   

export default AccountScreen;