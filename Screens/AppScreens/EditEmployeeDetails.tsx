import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, Button, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomInput from '../../CustomComponents/CustomInput';
import CustomButton from '../../CustomComponents/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditEmployeeDetails = ({ navigation, route }: any) => {
    
    const data = route?.params?.item;
    const [name, setName] = useState(data.name);
    const [position, setPosition] = useState(data.position);
    const [department, setDepartment] = useState(data.department);

    const editEmployee = async () => {
        try {
            const storedEmployees = await AsyncStorage.getItem('employees');
            if (storedEmployees) {
                let employeeData = JSON.parse(storedEmployees);
                let updatedData = employeeData.map((item: any) => {
                    if (item.id == data.id) {
                        item.id = data.id;
                        item.name = name;
                        item.position = position;
                        item.department = department;
                    }

                    return item;
                })
                await AsyncStorage.setItem('employees', JSON.stringify(updatedData));
                navigation.goBack();
            }
        } catch (error) {
            console.error('Error fetching data from AsyncStorage:', error);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.container}>
                        <View style={{ backgroundColor: '#740eff' }}>
                        <Text style={styles.headerText}>Edit Employee Details</Text>
                        </View>
                        <View style={styles.profileContainer}>
                            <View style={styles.profileIconContainer}>
                                <View style={styles.profileIcon}>
                                    <Icon name='user' size={60} color='#000000' />
                                </View>
                            </View>
                            <View style={styles.profileDetails}>
                                <Text style={styles.profileText}>Id: {data.id}</Text>
                                <Text style={styles.profileText}>Name: {data.name}</Text>
                                <Text style={styles.profileText}>Position: {data.position}</Text>
                                <Text style={styles.profileText}>Department: {data.department}</Text>
                            </View>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={{ fontSize: 20, color: '#000000', fontWeight: 'bold', textAlign: 'center', margin: 20 }}>
                                Edit Details</Text>
                            <Text style={styles.InputNameText}>Name</Text>
                            <CustomInput placeholderText={'Name'} typing={(val: any) => { setName(val); } } keyboardType={'default'} textLength={22} style={{ backgroundColor: '#cccccc' }} value={name} placeholderTextColor={'#000000'} />
                            <Text style={styles.InputNameText}>Position</Text>
                            <CustomInput placeholderText={'Position'} typing={(val: any) => { setPosition(val); } } keyboardType={'default'} textLength={20} style={{ backgroundColor: '#cccccc' }} value={position} placeholderTextColor={'#000000'} />
                            <Text style={styles.InputNameText}>Department</Text>
                            <CustomInput placeholderText={'Department'} typing={(val: any) => { setDepartment(val); } } keyboardType={'default'} textLength={20} style={{ backgroundColor: '#cccccc' }} value={department} placeholderTextColor={'#000000'} />
                            <View style={{marginTop:20}}>
                                <CustomButton title={'Save Details'} color1='#740eff' color2='#740eff' onp={editEmployee} />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        margin: 20,
    },
    profileContainer: {
        flexDirection: 'row',
        backgroundColor: '#740eff',
        padding: 10,
        alignItems: 'center',
        borderRadius: 10,
        margin: 20,
    },
    profileIconContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileIcon: {
        height: 80,
        width: 80,
        backgroundColor: '#ffffff',
        borderRadius: 40,
        borderWidth: 4,
        borderColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileDetails: {
        flex: 2,
        justifyContent: 'center',
        marginLeft: 10,
    },
    profileText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 5,
    },
    inputContainer: {
        flex: 1,
    },
    InputNameText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
        marginLeft: '14%'
    }

});

export default EditEmployeeDetails;

