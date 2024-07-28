import React, { useContext, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomInput from '../../CustomComponents/CustomInput';
import CustomButton from '../../CustomComponents/CustomButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EmployeeList from './EmployeeListScreen';

const AddEmployee = () => {

    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [department, setDepartment] = useState('');

    const handleSave = async () => {
        
        if (name.trim() && position.trim() && department.trim()) {
            try {
                const storedEmployees = await AsyncStorage.getItem('employees');
                let employees = storedEmployees ? JSON.parse(storedEmployees) : [];

                const lastId = employees.length > 0 ? Math.max(...employees.map((emp: any) => { return emp.id })) : 0;
                const newEmployee = {
                    id: (lastId + 1),
                    name,
                    position,
                    department,
                };
                employees.push(newEmployee);
                await AsyncStorage.setItem('employees', JSON.stringify(employees));
                Alert.alert('Employee Added Successfully');

                // Optionally, clear the input fields or navigate to another screen
                setName('');
                setPosition('');
                setDepartment('');
            } catch (error) {
                console.error('Error saving employee:', error);
                Alert.alert('Error saving employee. Please try again.');
            }
        } else {
            Alert.alert('Please fill all the details');
        }
    };

    return (
        <SafeAreaView style={{ justifyContent: 'center', }}>
            <ScrollView>
                <View style={styles.inputContainer}>
                    <View style={{ backgroundColor: '#740eff' }}>
                        <Text style={styles.headerText}>
                            Add New Employee
                        </Text>
                    </View>
                    <View style={{ alignSelf: 'center', margin: 20 }}>
                        <Icon name='user-plus' size={60} color={'#740eff'} />
                    </View>
                    <Text style={styles.InputNameText}>Name</Text>
                    <CustomInput placeholderText={'Name'} typing={(val: any) => { setName(val); } } keyboardType={'default'} textLength={30} style={{ backgroundColor: '#cccccc' }} value={name} placeholderTextColor={'#000000'} />
                    <Text style={styles.InputNameText}>Position</Text>
                    <CustomInput placeholderText={'Position'} typing={(val: any) => { setPosition(val); } } keyboardType={'default'} textLength={30} style={{ backgroundColor: '#cccccc' }} value={position} placeholderTextColor={'#000000'} />
                    <Text style={styles.InputNameText}>Department</Text>
                    <CustomInput placeholderText={'Department'} typing={(val: any) => { setDepartment(val); } } keyboardType={'default'} textLength={30} style={{ backgroundColor: '#cccccc' }} value={department} placeholderTextColor={'#000000'} />
                    <View style={{ marginTop: 20 }}>
                        <CustomButton title={'Save Details'} color1='#740eff' color2='#740eff' onp={handleSave} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
    },
    InputNameText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
        marginLeft: '14%',
    },
    InputNameTextDark: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        marginLeft: '14%',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        margin: 20,
    }
});

export default AddEmployee;
