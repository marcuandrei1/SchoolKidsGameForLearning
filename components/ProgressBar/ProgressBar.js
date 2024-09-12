import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, color,  backgroundColor, Animated } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import {colors} from "../../themes/color";
import { getDimensions } from '../../utils/Dimensions';
const {vh,vw} = getDimensions();

const ProgressBar = ({percentage,color,style}) => {
    const animated_width = useRef(new Animated.Value(0)).current;

    /*useEffect(()=>{
        if(percentage==null)
            return;
        Animated.timing(animated_width,{
            toValue:percentage,
            useNativeDriver:true,
            duration: 5000,
        }).start()
    },[])*/


  return (
    <View style={[styles.ProgressBarContainer, style]}>
        <View style={[styles.ProgressBar,{width: `${percentage}%`, backgroundColor: color}]}>
        
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    ProgressBarContainer:{
        alignItems: "flex-start",
        height: 4 * vh,
        width: "70%",
        backgroundColor:"#e3e3e3",
        borderRadius:5,
        overflow:"hidden",
    },
    ProgressBar: {
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        backgroundColor:colors.blue
  },

});

export default ProgressBar;
