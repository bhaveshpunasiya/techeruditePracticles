import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ToastAndroid, SafeAreaView } from 'react-native';
import CommanFlotingTextInput from '../Component/CommanFlotingTextInput';
import CommonButton from '../Component/CommonButton';
import colors from '../utils/Colors';
import { moderateScale, verticalScale } from '../utils/scaling';
import { fontStyles } from '../utils/Fonts';
import CommonDualImage from '../Component/CommonDualImage';
import CommonText from '../Component/CommanBoldTxt';
import { LoginScreenStyle } from '../Style/LoginScreenStyle';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { createNewPasswordRequest } from '../store/ducks/authSlice';


interface ResetPasswordProps {
  createNewPasswordRequest: (data: any) => void;
  createNewPasswordData: any
  createNewPasswordIsLoading: boolean
  route: any
}


const ResetPasswordConfirm: React.FC<ResetPasswordProps> = (props) => {
  const navigation = useNavigation();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  console.log(confirmPassword, "confirmPassword")
  const [showErrore, setShowErrore] = useState(false)

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const [isPress, setIsPress] = useState(false);

  useEffect(() => {
    console.log(props.createNewPasswordData, "createNewPasswordData")
    if (isPress && props.createNewPasswordData) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "CommanScreen",
            params: {
              overlayImage: require('../Assets/Png/passwordSet.png'),
              descriptionTxt: "Reset password is done, login with new password to continue using the app.",
              navigateScreen: "LoginScreen",
              headerTxt: "Password is set",
              navigationbtntxt: "Continue To Login"
            }
          }
        ]
      });
    }

  }, [props.createNewPasswordData])

  const handleSubmit = () => {

    if (newPassword == confirmPassword) {
      props.createNewPasswordRequest({ email: '', password: confirmPassword })
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "CommanScreen",
            params: {
              overlayImage: require('../Assets/Png/passwordSet.png'),
              descriptionTxt: "Reset password is done, login with new password to continue using the app.",
              navigateScreen: "LoginScreen",
              headerTxt: "Password is set",
              navigationbtntxt: "Continue To Login"
            }
          }
        ]
      });

      return
    }
    else {
      setShowErrore(true)
    }
    setIsPress(true);

    if (!newPassword || !confirmPassword) {
      ToastAndroid.show("Please fill in both fields.", ToastAndroid.SHORT);
      return;
    }

    ToastAndroid.show("Password has been reset successfully.", ToastAndroid.SHORT);
    navigation.navigate("CommanScreen");
  };

  const handleInputChnage = (text, setState) => {
    setIsPress(false);
    setState(text)
    setShowErrore(false)
  }

  return (
    <SafeAreaView style={LoginScreenStyle.container}>
      <CommonDualImage
        backgroundImage={require('../Assets/Png/BackgroundImage.png')}
        overlayImage={require('../Assets/Png/Forgot.png')}
      />
      <View style={LoginScreenStyle.loginContainer}>
        <CommonText text={'Reset Password?'} />
        <Text style={[LoginScreenStyle.bottomTxt, { fontSize: 16 }]}>
          Your new password must be different from the previous used password, and contain at least 8 characters.
        </Text>

        <CommanFlotingTextInput
          label="New Password"
          value={newPassword}
          onChangeText={(text) => handleInputChnage(text, setNewPassword)}
          placeholder=""
          secureTextEntry
          containerStyle={LoginScreenStyle.inputContainer}
          borderBottomColor={colors.primaryGrayColor}
        />

        <CommanFlotingTextInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => handleInputChnage(text, setConfirmPassword)}
          placeholder=""
          secureTextEntry
          containerStyle={[LoginScreenStyle.inputContainer, { marginBottom: 5 }]}
          borderBottomColor={colors.primaryGrayColor}
        />

        {showErrore && (
          <Text style={{ color: "red", fontSize: moderateScale(16) }}>Passwords do not match. Please try again.</Text>
        )}

        <CommonButton buttonStyle={{ marginTop: verticalScale(30) }} title={'Submit'} onPress={handleSubmit} />
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state: any) => ({
  createNewPasswordData: state.auth.createNewPasswordData,
  createNewPasswordIsLoading: state.auth.createNewPasswordIsLoading,
  createNewPasswordErrmsg: state.auth.createNewPasswordErrmsg,
})

const mapDispatchToProps = (dispatch: any) => ({
  createNewPasswordRequest: (data: any) => dispatch(createNewPasswordRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordConfirm);
