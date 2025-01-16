
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import OTPTextInput from 'react-native-otp-textinput'; 
import CommonButton from '../Component/CommonButton';
import CommonDualImage from '../Component/CommonDualImage';
import CommonText from '../Component/CommanBoldTxt';
import { LoginScreenStyle } from '../Style/LoginScreenStyle';
import CommonLinkText from '../Component/CommonLinkText';
import { useNavigation } from '@react-navigation/native';
import { horizontalScale, moderateScale, verticalScale } from '../utils/scaling';
import colors from '../utils/Colors';
import { fontStyles } from '../utils/Fonts';
import { maskEmail } from '../utils/maskEmail';
import { formatTime } from '../utils/formatTime';

const VerifyOtpScreen = (route) => {
  const screen = route?.route?.params?.screen ?? null;
  const email = route?.route?.params?.email ?? null;
  const navigation = useNavigation();
  const [otp, setOtp] = useState('');
  console.log(otp,"otp----")

  const [timer, setTimer] = useState(2 * 60 + 33);
  const [isTimerActive, setIsTimerActive] = useState(true);

  const otpInput = useRef(null);

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

 
  const handleOtpChange = (newOtp: string) => {
    setOtp(newOtp);
  };

  const handleSubmit = () => {
    if (screen === "forgotPasswordVerifed") {
      navigation.navigate('ResetPasswordConfirm');
    } else if (screen === "signUpVerified") {
      if (otp == "1111") {
        console.log("match");
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
      } else if (otp != "11111") {
        navigation.navigate("CommanScreen", {
          overlayImage: require('../Assets/Png/OtpInvalid.png'),
          descriptionTxt: "Please enter valid data, code is incorrect.",
          navigateScreen: "",
          headerTxt: "OTP is incorrect",
          navigationbtntxt: " Try Again",
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
    }
  };

  const handleresentOtp = () => {
    setIsTimerActive(true); 
    setTimer(2 * 60 + 33); 
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
          Check your Email Inbox we have sent you the code at {maskEmail(email)}
        </Text>
        <View style={{ marginVertical: 30 }} >
          <OTPTextInput
            ref={otpInput}
            inputCount={4}
            keyboardType="numeric"
            tintColor="#000"
            offTintColor="#888"
            handleTextChange={handleOtpChange}
            style={styles.otpInput}
          />
        </View>

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
};

export default VerifyOtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: moderateScale(24),
    marginBottom: verticalScale(20),
    fontWeight: 'bold',
  },
  otpText: {
    marginTop: verticalScale(10),
    fontSize: moderateScale(18),
    color: colors.black,
  },
  loginContainer: {
    padding: 30,
    flex: 1,
  },
  inputContainer: {
    marginBottom: verticalScale(16),
  },
  bottomContainer: { justifyContent: "center", marginBottom: verticalScale(10) },
  bottomTxt: { fontSize: moderateScale(18), fontFamily: fontStyles.fontFamily },
  chekBoxWrapper: { flexDirection: "row", marginHorizontal: horizontalScale(10), marginTop: verticalScale(12) },
  otpInput: {
    width:horizontalScale(50),
    height:verticalScale(40),
    borderRadius: 8,
    borderColor: '#000',
    paddingHorizontal:horizontalScale(10),
    marginHorizontal:horizontalScale(5),
    textAlign: 'center',
    fontSize: moderateScale(20),
    textAlignVertical: 'center',
    backgroundColor:"#E2E9FF"
  },
});
