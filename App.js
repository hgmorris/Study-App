import React, { useEffect, useState, } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, AsyncStorage, TextInput, Button, Alert} from 'react-native';
import  Navigation from './components/Navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from './screens/OnboardingScreen';
import Home from './screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createKeyboardAwareNavigator } from 'react-navigation';




const AppStack = createNativeStackNavigator();

const App = () =>{
  const [isFirstLaunch, setFirstLaunch] = React.useState(true);
  const [phoneNumber,setPhoneNumber] = React.useState ("")
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const[homeTodayScore,setHomeTodayScore] = React.useState(0);
  //edit in the line
const [tempoCode, sentTempCode] = React.useState(null);
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
       onChangeText={setPhoneNumber}
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
      <TextInput
       value={tempoCode}
       onChangeText={sentTempCode}
       style={styles.input2}
       placeholderTextColor= '#4251f5'
       placeholder='Enter Code'>
      </TextInput>
      <Button
      title='Verify'
      style={styles.button}
      onPress={async()=>{
        console.log('Button 2 was pressed')
        await fetch(
          'https://dev.stedi.me/twofactorlogin',
          {
            method: 'POST',
            headers:{
            "content-type":'application/text'
            },
            body:JSON.stringify({
              phoneNumber,
              oneTimePassword:tempoCode
          })
        }
        )
        console.log(loginResponse.status)

        if(loginResponse.status == 200){
          const sessionToken = await loginResponse.text();
          console.log('Session Token', sessionToken)
          setIsLoggedIn(true)
        
          }

        else{


      }}}
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
  input2: {
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


