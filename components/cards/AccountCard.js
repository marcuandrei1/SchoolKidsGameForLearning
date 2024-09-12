import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { colors } from "../../themes/color";

const AccountCard =({image, number, text})=>{
return (
    <View style={styles.container}>
         <View style={styles.container2}>
            <Image style={styles.imagine} source={image}/>
            <Text style={styles.numar}>{number}</Text>
         </View>
      <Text style={styles.textul}>{text}</Text>
    </View>
);
};

const styles = StyleSheet.create({
   container:{
    borderColor:"blue",
    borderRadius:10,
    width:150,
    height:80,
    borderWidth:2,
    justifyContent:"flex-start",
    paddingLeft:10,
 },

   imagine:{
    marginTop:10,
    marginLeft:5,
 },
 
   textul:{
    color:"blue",
    fontSize:20,
    paddingTop:5,
 },

   container2:{
   flexDirection:"row",  
}, 
   numar:{
   paddingTop:10,
   marginLeft:10,
   fontSize:22,
   color:"blue",
 },
});

export default AccountCard;