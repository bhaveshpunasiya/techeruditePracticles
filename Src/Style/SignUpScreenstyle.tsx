import { StyleSheet } from "react-native";
import { fontStyles } from "../utils/Fonts";
import { verticalScale, moderateScale, horizontalScale } from "../utils/scaling";
import colors from "../utils/Colors";

export const SignUpScreenstyle = StyleSheet.create({
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
    bottomContainer:{justifyContent:"center",marginBottom:verticalScale(10)},
    bottomTxt:{fontSize:moderateScale(18),fontFamily:fontStyles.fontFamily },
    chekBoxWrapper:{ flexDirection: "row", marginHorizontal: horizontalScale(10), marginTop: verticalScale(12) }
   
  });