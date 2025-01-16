import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, ImageBackground, Image, TouchableOpacity, ToastAndroid, SafeAreaView } from 'react-native';
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
import { sendOTPRequest } from '../store/ducks/authSlice';
import { connect } from 'react-redux';

interface ForgotPasswordProps {
  sendOTPRequest: (data:any) => void;
  sendOTPData: any
  sendOTPDataIsLoading:boolean
}

const ForgotPassword: React.FC<ForgotPasswordProps> = (props) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSubmit = () => {
    if (!email) {
      ToastAndroid.show("Please enter your email.", ToastAndroid.SHORT);
      return;
    }

    if (!emailRegex.test(email)) {
      ToastAndroid.show("Please enter a valid email address.", ToastAndroid.SHORT);
      return;
    }
    ToastAndroid.show("Verification code sent to your email.", ToastAndroid.SHORT);
    navigation.navigate("VerifyOtpScreen",{
      screen:"forgotPasswordVerifed",
      email:email
    })
  };

  return (
    <SafeAreaView style={LoginScreenStyle.container}>
      <CommonDualImage
        backgroundImage={require('../Assets/Png/BackgroundImage.png')}
        overlayImage={require('../Assets/Png/Forgot.png')}
      />
      <View style={LoginScreenStyle.loginContainer}>
        <CommonText text={'Forgot Password?'} />
        <Text style={[LoginScreenStyle.bottomTxt, { fontSize: 16 }]}>
          Enter your registered email id, we will share verification code.
        </Text>
        <CommanFlotingTextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder=""
          keyboardType="email-address"
          containerStyle={LoginScreenStyle.inputContainer}
          borderBottomColor={colors.primaryGrayColor}
        />
        <CommonButton title={'Submit'} onPress={handleSubmit} />
      </View>
      <View style={LoginScreenStyle.bottomContainer}>
        <Text style={LoginScreenStyle.bottomTxt}>Remember Password? </Text>
        <CommonLinkText
          textStyle={{ alignSelf: "flex-start", marginBottom: 0 }}
          text={'Login'}
          onPress={() => navigation.goBack()}
        />
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state: any) => ({
    sendOTPData: state.auth.sendOTPData,
    sendOTPDataIsLoading: state.auth.sendOTPDataIsLoading,
    sendOTPDataErrmsg: state.auth.sendOTPDataErrmsg,
  })

const mapDispatchToProps = (dispatch: any) => ({
  sendOTPRequest: (data: any) => dispatch(sendOTPRequest(data)),
});

export default  connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
