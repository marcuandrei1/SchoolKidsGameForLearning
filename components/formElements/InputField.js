import { StyleSheet, TextInput} from "react-native";
import {colors} from "../../themes/color";

const InputField = ({ value ,setValue , placeholder , style }) => {
  return (
    <TextInput style={[styles.InputField,style]} value={value} onChangeText={setValue} placeholder={placeholder} >

    </TextInput>
  );
};

const styles = StyleSheet.create({
    InputField: {
    width:200,
    height:50,
    borderBottomWidth:5,
    borderColor:colors.gray,
    color:colors.gray,
    paddingHorizontal:10,
  },
});

export default InputField;
