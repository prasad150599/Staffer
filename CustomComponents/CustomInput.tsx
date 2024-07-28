import * as React from 'react';
import { useEffect, useState  } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, Alert, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';



export type Props = {
    style?: {
        backgroundColor?: "red" | "green" | "blue" | String;
        width?: String | Number;
        height?: String | Number;
    }
    placeholderText: String;
    placeholderTextColor: string | '#000000';
    typing: Function;
    keyboardType: String;
    textLength: 20 | number ;
    value : string;
}

const CustomInput = (props: Props) => {
   
    // const [show, setShow] = useState(props?.secureText)

    // useEffect(() => {
    //     setShow(props?.secureText)
    // }, [props?.secureText]);



    return (
        <View style={{justifyContent: 'center', alignItems: 'center', marginTop:10,marginBottom:10,  }}>

            <View style={{ flexDirection: 'row', width: props.style?.width || '80%', backgroundColor: props.style?.backgroundColor || '#ffffff', height: 50, borderRadius: 30, }}>
               
                <TextInput
                    style={{
                        width: '80%', height: '100%', paddingLeft: 20, fontSize: 18,
                        borderTopRightRadius: 30, borderBottomRightRadius: 30,color:'#000000'
                    }}
                    placeholder={props.placeholderText}
                    onChangeText={props?.typing}
                    keyboardType={props?.keyboardType || "default"}
                    maxLength={props?.textLength || 20}
                     value={ props?.value } placeholderTextColor={props?.placeholderTextColor}
                />
            </View>

        </View>
    );
}

export default CustomInput;
