import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EmployeeList from './EmployeeListScreen';
import EditEmployeeDetails from './EditEmployeeDetails';

const Stack = createNativeStackNavigator();

const EmployeeDeatilsStack = () => {

    return (
        <Stack.Navigator initialRouteName='EmployeeList' screenOptions={{ headerShown: false }}>
            <Stack.Screen name='EmployeeList' component={EmployeeList} />
            <Stack.Screen name='EditEmployee' component={EditEmployeeDetails} />
        </Stack.Navigator>
    )
}

export default EmployeeDeatilsStack;