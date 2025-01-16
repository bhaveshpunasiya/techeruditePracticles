import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, ImageBackground, Image, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
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

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }
    Alert.alert('Login Successful', `Email: ${email}`);
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
            <CommonButton title={'Login'} onPress={handleLogin} />
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

export default LoginScreen;
