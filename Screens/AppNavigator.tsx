import React, { useContext } from 'react';
import { ScrollView, Text, useColorScheme, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'
import AddEmployee from './AppScreens/AddEmployee';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EmployeeDeatilsStack from './AppScreens/EmployeeDetailsStack';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='AddEmployee' screenOptions={{headerShown: false}}>
        <Tab.Screen name="EmployeeDeatilsStack" component={EmployeeDeatilsStack}
          options={{ tabBarIcon: ({ color, size }) => (<Icon name="home" color={'#740eff'} size={30} />)}} />
        <Tab.Screen name="AddEmployee" component={AddEmployee}
          options={{ tabBarIcon: ({ color, size }) => (<Icon name="user-plus" color={'#740eff'} size={30} />)}} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator;

