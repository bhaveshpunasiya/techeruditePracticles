import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, ImageBackground, Image, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, ScrollView, Platform, ToastAndroid } from 'react-native';
import CommanFlotingTextInput from '../Component/CommanFlotingTextInput';
import CommonButton from '../Component/CommonButton';
import colors from '../utils/Colors';
import { moderateScale, verticalScale } from '../utils/scaling';
import { fontStyles } from '../utils/Fonts';
import CommonDualImage from '../Component/CommonDualImage';
import CommonText from '../Component/CommanBoldTxt';
import CommonLinkText from '../Component/CommonLinkText';
import { LoginScreenStyle } from '../Style/LoginScreenStyle';
import { useNavigation } from '@react-navigation/native';
import { connect, useDispatch } from 'react-redux';
import { loginReq } from '../store/ducks/authSlice';

interface LoginProps {
  loginReq: (data:any) => void;
  loginReqData: any
  loginReqIsLoading:boolean
}

const LoginScreen: React.FC<LoginProps> = (props) => {
  const navigation = useNavigation();
  const[isPress,setIsPress] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(()=>{
    if(isPress && props.loginReqData?.success){
      ToastAndroid.show(props.loginReqData?.message,10)
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "HomeScreen"
          }
        ]
      });
    }
    else if(isPress && props.loginReqData?.success == false){
      ToastAndroid.show(props.loginReqData?.message,10)

    }
  },[props.loginReqData])

  const handleLogin = () => {
    setIsPress(true)
    if (!email || !password) {
      ToastAndroid.show("Please enter both email and password.",10)
      return;
    }
    else{
      props.loginReq({email:email,password:password})
    }
  };

  return (
    <SafeAreaView style={LoginScreenStyle.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <CommonDualImage
            backgroundImage={require('../Assets/Png/BackgroundImage.png')}
            overlayImage={require('../Assets/Png/person.png')}
          />
          <View style={LoginScreenStyle.loginContainer}>
            <CommonText text={'Login'} />
            <CommanFlotingTextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder=""
              keyboardType="email-address"
              containerStyle={LoginScreenStyle.inputContainer}
              borderBottomColor={colors.primaryGrayColor}
            />
            <CommanFlotingTextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder=""
              secureTextEntry
              containerStyle={LoginScreenStyle.inputContainer}
              borderBottomColor={colors.primaryGrayColor}
            />
            <CommonLinkText text={'Forgot password?'} onPress={() => navigation.navigate("ForgotPassword")} />
            <CommonButton loading={props.loginReqIsLoading} title={'Login'} onPress={handleLogin} />
          </View>
          <View style={LoginScreenStyle.bottomContainer}>
            <Text style={LoginScreenStyle.bottomTxt}>Don’t have an account? </Text>
            <CommonLinkText
              textStyle={{ alignSelf: "flex-start", marginBottom: 0 }}
              text={'Signup'}
              onPress={() => navigation.navigate("SignUpScreen")}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state: any) => {
  return {
    loginReqData: state.auth.loginReqData,
    loginReqIsLoading: state.auth.loginReqIsLoading,
    loginReqDataErrmsg: state.auth.loginReqDataErrmsg,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  loginReq: (data: any) => dispatch(loginReq(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)( LoginScreen);
