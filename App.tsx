import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainNavigation from './Src/Navigation/MainNavigation'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import store from './Src/store/configureStore'
import {PersistGate} from 'redux-persist/lib/integration/react';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
const persistor = persistStore(store);

const App = () => {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView>
          <MainNavigation />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})