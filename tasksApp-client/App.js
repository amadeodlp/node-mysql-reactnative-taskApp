import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from './screens/HomeScreen';
import TaskFormScreen from "./screens/TaskFormScreen";
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen 
      name="HomeScreen" 
      component={HomeScreen}
      options={({navigation}) => ({
        title: 'Tasks App',
        headerStyle: { backgroundColor: '#222f3e'},
        headerTitleStyle: {color: '#fff'},
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate("TaskFormScreen")}>
          <Text style={{color: '#fff', marginRight: 20, fontSize: 15}}>New</Text>
          </TouchableOpacity>
        ),
      })}
      />
      <Stack.Screen 
      name="TaskFormScreen" 
      component={TaskFormScreen} 
      options={{
        title: 'Create a Task', 
        headerStyle: {backgroundColor: '#222f3e'}, 
        headerTitleStyle: {color: '#fff'},
        headerTintColor: '#fff'
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
