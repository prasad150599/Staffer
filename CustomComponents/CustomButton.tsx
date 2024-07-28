import * as React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, Alert, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
// import LinearGradient from 'react-native-linear-gradient';

export type Props = {
    title: String | Number;
    style?: {
        backgroundColor?: "red" | "green" | "blue" | String;
        width?: String | Number;
        height?: String | Number;
        TextColor?: String;
    }
    onp?: Function;
    color1: string;
    color2: string;
}



const CustomButton = (props: Props) => {
    // const backgroundColor = props?.style?.backgroundColor || "#008b91";
    const { color1 = '#8DF3ED', color2 = '#34D9D1', title = 'Click Here' } = props;
    return (

        <LinearGradient colors={[color1, color2]}
            style={{
                alignSelf: "center", justifyContent: 'center', alignItems: 'center', margin: 10,
                borderRadius: 30, height: props.style?.height || 60, width: props.style?.width || '80%'
            }}>
            <TouchableOpacity style={{ height: 50, width: '90%', justifyContent: 'center', alignItems: 'center', }}
                onPress={props?.onp}>
                <Text style={{ color: props?.style?.TextColor || "#ffffff", fontSize: 20, fontWeight: 'bold' }}>{title || "Click Here"}</Text>

            </TouchableOpacity>


        </LinearGradient>
    );
}


export default CustomButton;
