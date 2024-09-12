import { StyleSheet, View , Image} from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import {colors} from "../../themes/color";

const CircleAvatar = ({image,style}) => {
  return (
    <View style={[styles.CircleAvatarContainer,style]}>
        <Image style={styles.CircleAvatar} source={image}></Image> 
    </View>
  );
};

const styles = StyleSheet.create({
    CircleAvatarContainer:{
        borderColor:colors.blue,
        borderWidth:3,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:1000,
    },
    CircleAvatar:{
        height:"80%",
        width:"80%",
        resizeMode:"contain"
    }


});

export default CircleAvatar;
