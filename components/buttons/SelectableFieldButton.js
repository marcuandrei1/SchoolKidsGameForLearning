import { useState } from "react";
import { StyleSheet, Text, View, color,  backgroundColor } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { colors } from "../../themes/color";
import { getDimensions } from '../../utils/Dimensions';
const {vh,vw} = getDimensions();


const SelectableFieldButton = ({ children, onPress, more_styles , button_state , color}) => {
  return (
    <Pressable style={button_state?styles.SelectableFieldButton:[styles.SelectableFieldButton,{borderColor:color,borderBottomWidth:5}]} onPress={()=>onPress()}>
      <Text style={button_state?[styles.SelectableFieldButtonText,styles.SelectableFieldButtonTextSelected,{backgroundColor:color}]:styles.SelectableFieldButtonText}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
    SelectableFieldButton: {
    alignItems: "center",
    justifyContent:"center",
    flexDirection:"row",
  },
  SelectableFieldButtonText:{
    color:colors.black,
    fontSize:2.5 * vh,
    paddingVertical:5,
    paddingHorizontal:10,
    borderRadius:5,
  },
  SelectableFieldButtonTextSelected:{
    color:"#fff",
  },
  SelectableColor:{
    height:20,
    width:20,
  }
});

export default SelectableFieldButton;
