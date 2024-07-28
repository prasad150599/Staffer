import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, FlatList, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { NavigationContainer, useIsFocused, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

const SplashScreen = ()=>{
    return(
        <SafeAreaView style={{flex:1,backgroundColor:'#740eff',justifyContent:'center',alignItems:'center'}}>

            <Text style={{fontSize:60,color:'#ffffff'}}> Staffer </Text>

        </SafeAreaView>

    )
}

export default SplashScreen;