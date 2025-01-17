
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
  import { VerifyOtpScreenStyle } from '../Style/VerifyOtpScreenStyle';
import { connect } from 'react-redux';
import { verifyOTPRequest } from '../store/ducks/authSlice';

interface ForgotPasswordProps {
  verifyOTPRequest: (data:any) => void;
  verifyOTPData: any
  verifyOTPDataIsLoading:boolean
  route:any
}


  const VerifyOtpScreen :React.FC<ForgotPasswordProps> = (route,props) => {
    const screen = route?.route?.params?.screen ?? null;
    const email = route?.route?.params?.email ?? null;
    const signUpdata = route?.route?.params?.signUpdata ?? null;

    const navigation = useNavigation();
    const [otp, setOtp] = useState('');

    const [timer, setTimer] = useState(2 * 60 + 33);
    const [isTimerActive, setIsTimerActive] = useState(true);
    const[isPress,setIsPress] = useState(false)

    const otpInput = useRef(null);

    useEffect(()=>{
      if(isPress && props.verifyOTPData){
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
      }
      console.log(props.verifyOTPData,"props.verifyOTPData----")

    },[props.verifyOTPData])

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

      setIsPress(true)

      // props.verifyOTPRequest({})
      // console.log(props.verifyOTPRequest({}))

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
      <SafeAreaView style={VerifyOtpScreenStyle.container}>
        <CommonDualImage
          backgroundImage={require('../Assets/Png/BackgroundImage.png')}
          overlayImage={require('../Assets/Png/Forgot.png')}
        />
        <View style={VerifyOtpScreenStyle.loginContainer}>
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
              style={VerifyOtpScreenStyle.otpInput}
            />
          </View>

          <Text style={LoginScreenStyle.bottomTxt}>
            ({formatTime(timer)})
          </Text>

          <View style={VerifyOtpScreenStyle.bottomContainer}>
            <Text style={[VerifyOtpScreenStyle.bottomTxt, { paddingVertical: 5 }]}>Did not receive the code?  </Text>
            <CommonLinkText textStyle={{ alignSelf: "flex-start" }} text={'Resend Code'} onPress={() => handleresentOtp()} />
          </View>

          <CommonButton buttonStyle title="Verify" onPress={handleSubmit} />
        </View>
      </SafeAreaView>
    );
  };

const mapStateToProps = (state: any) => ({
    verifyOTPData: state.auth.verifyOTPData,
    verifyOTPDataIsLoading: state.auth.verifyOTPDataIsLoading,
    verifyOTPDataErrmsg: state.auth.verifyOTPDataErrmsg,
  })

const mapDispatchToProps = (dispatch: any) => ({
  verifyOTPRequest: (data: any) => dispatch(verifyOTPRequest(data)),
});

  export default connect(mapStateToProps, mapDispatchToProps)(VerifyOtpScreen);
