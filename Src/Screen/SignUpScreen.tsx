import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, ImageBackground, Image, TouchableOpacity, SafeAreaView, ToastAndroid, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import CommanFlotingTextInput from '../Component/CommanFlotingTextInput';
import CommonButton from '../Component/CommonButton';
import colors from '../utils/Colors';
import { horizontalScale, moderateScale, verticalScale } from '../utils/scaling';
import { fontStyles } from '../utils/Fonts';
import CommonDualImage from '../Component/CommonDualImage';
import CommonText from '../Component/CommanBoldTxt';
import CommonLinkText from '../Component/CommonLinkText';
import { SignUpScreenstyle } from '../Style/SignUpScreenstyle';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { validateEmail } from '../utils/validateEmail';


const SignUpScreen: React.FC = () => {
  const navigation = useNavigation()
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);



  const handleSignup = () => {
    if (!firstName || !lastName) {
      ToastAndroid.show('Please enter your first and last name.', ToastAndroid.SHORT);
      return;
    }
    if (!email || !validateEmail(email)) {
      ToastAndroid.show('Please enter a valid email address.', ToastAndroid.SHORT);
      return;
    }
    if (!password || password.length < 6) {
      ToastAndroid.show('Password must be at least 6 characters long.', ToastAndroid.SHORT);
      return;
    }
    if (!isChecked) {
      ToastAndroid.show('You must agree to the Terms & Conditions.', ToastAndroid.SHORT);
      return;
    }

    ToastAndroid.show('Sign-up Successful!', ToastAndroid.SHORT);
    navigation.navigate('VerifyOtpScreen',{
      screen:"signUpVerified",
      email:email

    });
  };
  const handleTeamAndCondition = ()=>{
    ToastAndroid.show("in Progress",100)
  }

  return (
    <SafeAreaView style={SignUpScreenstyle.container}>
       <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <CommonDualImage
        backgroundImage={require('../Assets/Png/BackgroundImage.png')}
        overlayImage={require('../Assets/Png/person.png')}
      />
      <View style={SignUpScreenstyle.loginContainer}>
        <CommonText text={'Sign up'} />
        <CommanFlotingTextInput
          label="First Name"
          value={firstName}
          onChangeText={setFirstName}
          placeholder=""
          keyboardType="default"
          containerStyle={SignUpScreenstyle.inputContainer}
          borderBottomColor={colors.primaryGrayColor}
        />
        <CommanFlotingTextInput
          label="Last Name"
          value={lastName}
          onChangeText={setLastName}
          placeholder=""
          keyboardType="default"
          containerStyle={SignUpScreenstyle.inputContainer}
          borderBottomColor={colors.primaryGrayColor}
        />
        <CommanFlotingTextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder=""
          keyboardType="email-address"
          containerStyle={SignUpScreenstyle.inputContainer}
          borderBottomColor={colors.primaryGrayColor}
        />
        <CommanFlotingTextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder=""
          secureTextEntry
          containerStyle={SignUpScreenstyle.inputContainer}
          borderBottomColor={colors.primaryGrayColor}
        />
        <View style={{ flexDirection: "row", }}>

          <TouchableOpacity onPress={() => setIsChecked(!isChecked)} style={SignUpScreenstyle.chekBoxWrapper}>
            <Ionicons
              name={isChecked ? 'checkbox' : 'square-outline'}
              size={25}
              color={colors.primaryGrayColor}
            />
          </TouchableOpacity>
          <View style={SignUpScreenstyle.bottomContainer}>
            <Text style={SignUpScreenstyle.bottomTxt}>By clicking here you are agreed to   </Text>
            <View style={[SignUpScreenstyle.bottomContainer, { flexDirection: "row", justifyContent: "flex-start" }]}>
              <Text style={SignUpScreenstyle.bottomTxt}>our </Text>
              <CommonLinkText textStyle={{ alignSelf: "flex-start", marginBottom: 0 }} text={'Terms & Condition'} onPress={() => handleTeamAndCondition} />
            </View>
          </View>
        </View>
        <CommonButton title={'Sign up'} onPress={handleSignup} />
      </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

