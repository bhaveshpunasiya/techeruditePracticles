import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainNavigation from './Src/Navigation/MainNavigation'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const App = () => {

  return (
  <GestureHandlerRootView>
    <MainNavigation/>
  </GestureHandlerRootView>
  )
}

export default App

const styles = StyleSheet.create({})