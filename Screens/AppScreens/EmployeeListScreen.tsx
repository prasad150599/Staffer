import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, FlatList, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { NavigationContainer, useIsFocused, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome'
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../CustomComponents/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomInput from '../../CustomComponents/CustomInput';

const EmployeeList = () => {

    const isFocused = useIsFocused();
    const [employees, setEmployees] = useState([]);
    const navigation: any = useNavigation();
    const [searchInput,setSearchInput] = useState('');

    const renderItem = ({ item }: any) => {
        return (
            <View style={styles.EmpCard}>
                <View style={styles.CardUserImag}>
                    <Icon name='user' size={50} color={'#ffffff'} />
                </View >
                <View style={{ flex: 3}}>
                    <Text style={{ fontSize: 16, color: '#ffffff' }}>Emp Id: {item.id}</Text>
                    <Text style={{ fontSize: 16, color: '#ffffff' }}>Name: {item.name}</Text>
                    <Text style={{ fontSize: 16, color: '#ffffff' }}>Position: {item.position}</Text>
                    <Text style={{ fontSize: 16, color: '#ffffff' }}>Dept: {item.department}</Text>
                </View>
                <View style={styles.CardOptnContainer}>
                    <View style={ styles.CardOptions}>
                        <TouchableOpacity onPress={() => { navigation.navigate('EditEmployee', { item }) }}>
                            <Icon name='edit' size={25} color={'#ffffff'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { deleteEmployee(item.id) }}>
                            <Icon name='user-times' size={25} color={'#ffffff'} />
                        </TouchableOpacity>
                    </View>
                </View >
            </View>
        )
    }

    const renderEmptyComponent = () => {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 20, }}> No Data found.</Text>
            </View>
        );
    };

    const getData = async () => {
        try {
            const storedEmployees = await AsyncStorage.getItem('employees');
            if (storedEmployees) {
                setEmployees(JSON.parse(storedEmployees));
            }
        } catch (error) {
            console.error('Error fetching data from AsyncStorage:', error);
        }
    };

    const deleteEmployee = async (id: any) => {
        try {
            // console.log(employees.filter(employee => employee.id !== id));
            setEmployees(employees.filter(employee => employee.id !== id));
            await AsyncStorage.setItem('employees', JSON.stringify(employees.filter(employee => employee.id !== id)));
        } catch (error) {
            console.error('Error deleting employee from AsyncStorage:', error);
        }
    };

    const clearAllEmployees = async () => {
        try {
            await AsyncStorage.removeItem('employees');
            setEmployees([]);
            Alert.alert('All employee data has been cleared.');
        } catch (error) {
            console.error('Error clearing employee data from AsyncStorage:', error);
        }
    };

    const searchEmployee = (str:any) =>{
        
        let data = employees.filter((item:any)=>{
        return item.name.includes(str) || item.department.includes(str)
        })
        setEmployees(data)
    }

    useEffect(() => {
        getData();
    }, [isFocused])

    useEffect(()=>{
        if(searchInput.length <= 2){
            getData();
        }
        else{
            searchEmployee(searchInput);
        }
    },[searchInput])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ backgroundColor: '#740eff' }}>
                <Text
                    style={styles.headerText}>
                    Employees List
                </Text>
                <CustomInput placeholderText={'Search'} typing={(val: any) => { setSearchInput(val); } } keyboardType={'default'} textLength={20} value={searchInput} style={{ backgroundColor: '#ffffff' }} placeholderTextColor={'#000000'}/>
            </View>
            <View style={{ flex: 10, marginTop: 20 }}>
                <FlatList
                    data={employees}
                    keyExtractor={(item: any) => item.id}
                    renderItem={renderItem}
                    ListEmptyComponent={renderEmptyComponent}
                />
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({

    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        margin: 20,
    },
    EmpCard: {
        height: 110,
        width: '94%',
        margin: 10,
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: '#740eff',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    CardUserImag: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    CardOptnContainer : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    CardOptions: {
        flex: 1,
        marginRight: 10,
        justifyContent: 'space-around',
        alignItems: 'flex-end',
    }
})

export default EmployeeList;