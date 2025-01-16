import { StyleSheet, Text, View, ToastAndroid, SafeAreaView, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import OTPInput from '../Component/OtpVerifyBox'
import CommonButton from '../Component/CommonButton';
import CommonDualImage from '../Component/CommonDualImage';
import CommonText from '../Component/CommanBoldTxt';
import { LoginScreenStyle } from '../Style/LoginScreenStyle';
import CommonLinkText from '../Component/CommonLinkText';
import { useNavigation } from '@react-navigation/native';
import { horizontalScale, moderateScale, verticalScale } from '../utils/scaling';
import colors from '../utils/Colors';
import { fontStyles } from '../utils/Fonts';

const VerifyOtpScreen = (route) => {
  const screen = route?.route?.params?.screen ?? null
  const navigation = useNavigation()
  const [otp, setOtp] = useState('');
  const mail = "johndoe@gmail.com";

  const [timer, setTimer] = useState(2 * 60 + 33); 
  const [isTimerActive, setIsTimerActive] = useState(true);

  useEffect(() => {
    if (isTimerActive) {
      const interval = setInterval(() => {
        setTimer((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(interval);
            setIsTimerActive(false);
            return 0;
          }
        });
      }, 1000);

      return () => clearInterval(interval); 
    }
  }, [isTimerActive]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const maskEmail = (email) => {
    const [username, domain] = email.split('@');
    const maskedUsername = username.slice(0, 4) + '******';
    return `${maskedUsername}@${domain}`;
  };

  const handleOtpChange = (newOtp: string) => {
    setOtp(newOtp);
  };

  const handleSubmit = () => {
    if (screen === "forgotPasswordVerifed") {
      navigation.navigate('ResetPasswordConfirm')
    } else if (screen === "signUpVerified") {
      if (otp == "1,1,1,1") {
        console.log("match")
        navigation.reset({
          index: 0,
          routes: [
            {
              name: "CommanScreen",
              params: {
                overlayImage: require('../Assets/Png/passwordSet.png'),
                descriptionTxt: "Happy to say everything went smoothly. Start with Tradesmen for great experience...",
                navigateScreen: "LoginScreen",
                headerTxt: "OTP is verified...",
                navigationbtntxt: "Continue to App"
              }
            }
          ]
        });
      } else if (otp != "1,1,1,1") {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: "CommanScreen",
              params: {
                overlayImage: require('../Assets/Png/OtpInvalid.png'),
                descriptionTxt: "Please enter valid data, code is incorrect.",
                navigateScreen: "SignUpScreen",
                headerTxt: "OTP is incorrect",
                navigationbtntxt: "Try Again"
              }
            }
          ]
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: "CommanScreen",
              params: {
                overlayImage: require('../Assets/Png/SomethingWrong.png'),
                descriptionTxt: "Taking too much time, Please check your internet connection.",
                navigateScreen: "SignUpScreen",
                headerTxt: "Something went wrong!",
                navigationbtntxt: " Try Again"
              }
            }
          ]
        });
      }
      console.log(otp?.toString(), "otp---")
    }
  };

  const handleresentOtp = () => {
    setIsTimerActive(true); // Restart the timer
    setTimer(2 * 60 + 33); // Reset to 2:33
  };

  return (
    <SafeAreaView style={styles.container}>
      <CommonDualImage
        backgroundImage={require('../Assets/Png/BackgroundImage.png')}
        overlayImage={require('../Assets/Png/Forgot.png')}
      />
      <View style={styles.loginContainer}>
        <CommonText text={'Verify Code'} />
        
        <Text style={LoginScreenStyle.bottomTxt}>
          Check your Email Inbox we have sent you the code at {maskEmail(mail)}
        </Text>

        <OTPInput length={4} onChange={handleOtpChange} />

        <Text style={LoginScreenStyle.bottomTxt}>
          ({formatTime(timer)})
        </Text>

        <View style={styles.bottomContainer}>
          <Text style={[styles.bottomTxt, { paddingVertical: 5 }]}>Did not receive the code?  </Text>
          <CommonLinkText textStyle={{ alignSelf: "flex-start" }} text={'Resend Code'} onPress={() => handleresentOtp()} />
        </View>

        <CommonButton title="Verify" onPress={handleSubmit} />
      </View>
    </SafeAreaView>
  );
}

export default VerifyOtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.white
  },
  title: {
    fontSize:moderateScale( 24),
    marginBottom:verticalScale( 20),
    fontWeight: 'bold',
  },
  otpText: {
    marginTop:verticalScale(10),
    fontSize:moderateScale(18),
    color:colors.black,
  },
  loginContainer: {
    padding: 30,
    flex: 1
  },
  inputContainer: {
    marginBottom:verticalScale(16),
  },
  bottomContainer:{justifyContent:"center",marginBottom:verticalScale(10)},
  bottomTxt:{fontSize:moderateScale(18),fontFamily:fontStyles.fontFamily },
  chekBoxWrapper:{ flexDirection: "row", marginHorizontal: horizontalScale(10), marginTop: verticalScale(12) }
});
