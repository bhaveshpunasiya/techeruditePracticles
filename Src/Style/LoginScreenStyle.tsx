import { StyleSheet } from "react-native";
import { fontStyles } from "../utils/Fonts";
import { verticalScale, moderateScale } from "../utils/scaling";
import colors from "../utils/Colors";

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
    bottomContainer:{flexDirection:"row",justifyContent:"center",alignItems:"center",marginBottom:verticalScale(10)},
    bottomTxt:{fontSize:moderateScale(18),fontFamily:fontStyles.fontFamily }
   
  });