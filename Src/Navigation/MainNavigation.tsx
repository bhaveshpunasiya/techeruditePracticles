import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../Screen/LoginScreen'
import ForgotPassword from '../Screen/ForgotPassword'
import VerifyOtpScreen from '../Screen/VerifyOtpScreen'
import SignUpScreen from '../Screen/SignUpScreen'
import ResetPasswordConfirm from '../Screen/ResetPasswordConfirm'
import CommanScreen from '../Screen/CommanScreen'
import HomeScreen from '../Screen/HomeScreen'
import { useSelector } from 'react-redux'

const Stack = createStackNavigator()

const MainNavigation = () => {

  const data = useSelector((state:any)=>state.auth.loginReqData)

  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{
            headerShown:false
        }} initialRouteName= {data?.data?.token ?"HomeScreen":'LoginScreen'} >
            <Stack.Screen name='LoginScreen' component={LoginScreen}></Stack.Screen>
            <Stack.Screen name='HomeScreen' component={HomeScreen}></Stack.Screen>
            <Stack.Screen name='ResetPasswordConfirm' component={ResetPasswordConfirm}></Stack.Screen>
            <Stack.Screen name='VerifyOtpScreen' component={VerifyOtpScreen}></Stack.Screen>
            <Stack.Screen name='CommanScreen' component={CommanScreen}></Stack.Screen>
            <Stack.Screen name='ForgotPassword' component={ForgotPassword}></Stack.Screen>
            <Stack.Screen name='SignUpScreen' component={SignUpScreen}></Stack.Screen>
            
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigation

const styles = StyleSheet.create({})