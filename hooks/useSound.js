import { useState,useEffect } from 'react';
import { Audio } from 'expo-av';

const useSound =()=>{

    const [sound, setSound] = useState();
    //const [sound_adress,setSoundAdress] = useState(null);

    const playSound = async (sound_type) =>{
      //if(sound_adress==null)return;
      //console.log('Loading Sound:');
      if(sound_type=="corect"){
         const {sound} = await Audio.Sound.createAsync(require('../components/sounds/corect_sound.mp3'));
         setSound(sound);
         await sound.playAsync();
      }
      else{
        const {sound} = await Audio.Sound.createAsync(require('../components/sounds/wrong_sound.mp3'));
        setSound(sound);
        await sound.playAsync();
      }
      //require('../components/sounds/corect_sound.mp3')


      //console.log('Playing Sound');
      
    }

    /*useEffect(()=>{                                                    ///de fiecare data cand se schimba al doilea parametru, se apeleaza functia (primul parametru)
      playSound();
      console.log("am ajuns in hook");
    },[sound_adress])*/

  
    useEffect(() => {
      return sound
        ? () => {
            console.log('Unloading Sound');
            sound.unloadAsync();
          }
        : undefined;
    }, [sound]);

    return playSound;
}

export default useSound;