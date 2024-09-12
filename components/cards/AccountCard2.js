import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { colors } from "../../themes/color";
import useSound from "../../hooks/useSound";
import RoundButton from "../buttons/RoundButton";
import ProgressBar from "../ProgressBar/ProgressBar";
import CircleAvatar from "./CircleAvatar";



const speak =()=>{
    Speech.speak("xvau" ,{language:"ro"});
  };

const AccountCard2 =({image, levelnumber, title, text, color, percentage})=>{
   
    return (
        <View style={styles.card}> 
            
            <View style={styles.icon} backgroundColor={color}>
                <Image source={image}/>
                <Text style={styles.nivelText}>Nivel {levelnumber}</Text>
            </View>
            <View>
                <Text style={styles.titlu}>{title}</Text>
                <Text style={styles.text}>{text}</Text>
                <ProgressBar style={styles.progressBar} color={colors.green} percentage={percentage}/>   
                
            </View>
        </View>
    );
};

    
const styles = StyleSheet.create({
   card:{
        flexDirection:"row",
    },
    
    icon:{
        width:100,
        height:100,
        alignItems:"center",
        justifyContent:"center",
        paddingTop:10,
        borderRadius:15,
        },

    nivelText:{
        padding:10,
        color:"white",
        
    },

    titlu:{
        marginLeft:10,
        marginTop:5,
        fontSize:25,
        color:colors.black,
        fontWeight:"bold",  
    },

    text:{
        color:colors.gray,
        marginLeft:10,
        fontSize:13,
    },

    progressBar:{
        height:10,
        marginLeft:10,
        marginTop:10,
    },
});
    
export default AccountCard2;