import React, { useEffect, useState, } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Button, Alert} from 'react-native';
import  Navigation from './components/Navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from './screens/OnboardingScreen';
import Home from './screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createKeyboardAwareNavigator } from 'react-navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { asin } from 'react-native-reanimated';




const AppStack = createNativeStackNavigator();

const App = () =>{
  const [isFirstLaunch, setFirstLaunch] = React.useState(true);
  const [phoneNumber,setPhoneNumber] = React.useState ("")
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const[homeTodayScore,setHomeTodayScore] = React.useState(0);
const [tempoCode, sentTempCode] = React.useState(null);

useEffect(()=>{
  const getSesionToken = async() => {
    const sessionToken = await AsyncStorage.getItem('sessionToken');
    console.log('token from storage', sessionToken);
    const validateResponse = await fetch('https://dev.stedi.me/validate/'+sessionToken);
    
    if(validateResponse.status == 200){
      const userEmail = await validateResponse.text();
      console.log('userEmail', userEmail);
      setIsLoggedIn(true);
    }
  }
   getSessionToken();
 },[])
if(isFirstLaunch == true&&! isFirstLaunch){
 return(
  <OnboardingScreen setFirstLaunch={setFirstLaunch}/>
 
);
  }else if(isLoggedIn){ 
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
       placeholder='Cell Phone'>
      </TextInput>
      <Button
      title='Send'
      style={styles.button}
      onPress={async()=>{
        console.log(phoneNumber +'Button was pressed')
        await fetch(
          'https://dev.stedi.me/twofactorlogin/'+phoneNumber,
          {
            
            method: 'POST',
            headers:{
            "content-type":'application/text'
            }
          }
        )
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
        loginResponse = await fetch(
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
          await AsyncStorage.setItem('sessionToken', sessionToken)
          console.log('session token', sessionToken);
        
          setIsLoggedIn(true);
          
        }

        else{

        }
      }}
      />
      </View>
 )
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
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    marginTop: 200,
  },
  input2: {
    marginTop: 300,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  margin:{
    marginTop:100,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  }    
})

