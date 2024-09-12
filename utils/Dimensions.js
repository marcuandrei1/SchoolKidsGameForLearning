import {Dimensions} from "react-native"


export const getDimensions = () =>{
    const width = Dimensions.get("window").width/100;
    const height = Dimensions.get("window").height/100;

    const units = {
    vw: width
    , vh: height
    };

    units.vmin = Math.min(units.vw, units.vh);
    units.vmax = Math.max(units.vw, units.vh);

    return units;
}

