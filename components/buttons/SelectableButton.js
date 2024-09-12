import { useState } from "react";
import { StyleSheet, Text, View, color,  backgroundColor } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { colors } from "../../themes/color";
import { getDimensions } from '../../utils/Dimensions';
const {vh,vw} = getDimensions();


const SelectableButton = ({ children, onPress, more_styles , button_state, color}) => {
    
    //const [ButtonState,setButtonState] = useState(false);
        

  return (
    <Pressable style={
      button_state==3?
      [styles.SelectableButton,styles.SelectableButtonWrong,more_styles]:
      (button_state==2?
      [styles.SelectableButton,styles.SelectableButtonCorrect,more_styles]:
      (button_state?
      (color==null?[styles.SelectableButton,styles.SelectableButtonSelected,more_styles]:
      [styles.SelectableButton,{borderColor:color,backgroundColor:color,borderWidth:0,},more_styles]):
      [styles.SelectableButton,more_styles]))} 
      onPress={()=>onPress()}>
      <Text style={button_state?[styles.SelectableButtonText,{color:"#fff"}]:styles.SelectableButtonText}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
    SelectableButton: {
    borderColor:colors.blue,
    borderWidth:2,
    alignItems: "center",
    justifyContent: "center",
    height:6 * vh,
    width:6 * vh,
    borderRadius: 10,
  },
  SelectableButtonWrong:{
    borderColor:colors.red,
    backgroundColor:colors.red,    
    borderWidth:0,
  },
  SelectableButtonCorrect:{
    borderColor:colors.green,
    backgroundColor:colors.green,    
    borderWidth:0,
  },
  SelectableButtonSelected:{
    backgroundColor:colors.blue,
    borderWidth:0,
  },
  SelectableButtonText: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: 2.5 * vh,
  },
});

export default SelectableButton;
