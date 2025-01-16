import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, ImageBackground, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import CommanFlotingTextInput from '../Component/CommanFlotingTextInput';
import CommonButton from '../Component/CommonButton';
import colors from '../utils/Colors';
import { moderateScale, verticalScale } from '../utils/scaling';
import { fontStyles } from '../utils/Fonts';
import CommonDualImage from '../Component/CommonDualImage';
import CommonText from '../Component/CommanBoldTxt';
import CommonLinkText from '../Component/CommonLinkText';
import { useNavigation } from '@react-navigation/native';

const LoginScreen: React.FC = (props) => {
    const data = props.route?.params?? null
    console.log(data,"data---")
  const navigation= useNavigation()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }
    // Add login logic here
    Alert.alert('Login Successful', `Email: ${email}`);
  };


  const handleNavigation = () =>{
    navigation.navigate(data?.navigateScreen)
    if(data?.navigateScreen){
      navigation.reset({
          index: 0,
          routes: [
            {
              name: data?.navigateScreen, 
            }
          ]
        });
    }
    else{
      navigation.goBack("")
    }
  }

  return (
    <SafeAreaView style={LoginScreenStyle.container}>
       <CommonDualImage
       backgroundStyle={{
        height: verticalScale(290),}}
        backgroundImage={require('../Assets/Png/BackgroundImage.png')}
        overlayImage={data?.overlayImage}
      />
      <View style={[LoginScreenStyle.loginContainer,{flex:0}]}>
        <CommonText text={data?.headerTxt}/>
        <View style={LoginScreenStyle.bottomContainer}>
      <Text style={LoginScreenStyle.bottomTxt}>{data?.descriptionTxt} </Text>
      <CommonLinkText textStyle={{alignSelf:"flex-start",marginBottom:0}} text={data?.navigationbtntxt} onPress={handleNavigation}/>
      </View>
      </View>
      

    </SafeAreaView>
  );
};

export default LoginScreen;

export const LoginScreenStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    inputContainer: {
      marginBottom:verticalScale(16),
    },
    loginContainer: {
      padding: 30,
      flex:1
    },
    bottomContainer:{marginBottom:verticalScale(10),marginTop:verticalScale(20)},
    bottomTxt:{fontSize:moderateScale(18),fontFamily:fontStyles.fontFamily }
   
  });

