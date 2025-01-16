import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { verticalScale } from '../utils/scaling'
import colors from '../utils/Colors'
import { useDispatch } from 'react-redux'
import { loginReqclear } from '../store/ducks/authSlice'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
    const navigation = useNavigation();
  const dispatch = useDispatch()
const logout = ()=>{
  dispatch(loginReqclear())
  navigation.reset({
    index: 0,
    routes: [
      {
        name: "LoginScreen"
      }
    ]
  });
  
}

  return (
    <View style={styles.container}>
      <Text style={{color:"black"}}>Login SuccessFull</Text>
      <TouchableOpacity onPress={logout}>

      <Text style={styles.logoutbtn}>LogOut</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container:{flex:1,justifyContent:"center",alignItems:"center"},
  logoutbtn:{color:"black",marginTop:verticalScale(30),color:colors.blue,fontSize:18,fontWeight:"bold"}
})