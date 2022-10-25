import React, { useEffect, useState, } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, AsyncStorage, TextInput, Button} from 'react-native';
import  Navigation from './components/Navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from './screens/OnboardingScreen';
import Home from './screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createKeyboardAwareNavigator } from 'react-navigation';




const AppStack = createNativeStackNavigator();

const App = () =>{
  const [isFirstLaunch, setFirstLaunch] = React.useState(true);
  const [phoneNumber,setphoneNumber] = React.useState(false); 
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  //edit in the line

   if (isFirstLaunch == true){
return(
  <OnboardingScreen setFirstLaunch={setFirstLaunch}/>
 
);
  }else if(isLoggedIn){ //start here
    return <Navigation/>
  }
   else {
 return(
     <View> 
      
       <TextInput
       value={phoneNumber}
       onChangeText={phoneNumber}
       style={styles.input}
       placeholderTextColor= '#4251f5'
       placeholder='Cell phone'>
      </TextInput>
      <Button
      title='Send'
      style={styles.button}
      onPress={async()=>{
        console.log(phoneNumber +'Button was pressed')
        await fetch(
          'https://dev.stedi.me/twofactorlogin/8013862433',
          {
            method: 'POST',
            headers:{
            "content-type":'application/text'
            }
          })

      }}
      />
      </View>
)// send edit here

}
}
export default App;
      
const styles = StyleSheet.create({
  container:{
      flex:1, 
      alignItems:'center',
      justifyContent: 'center'
  },
  input: {
    marginTop: 100,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  margin:{
    marginTop:100 //add manually
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  }    
})


