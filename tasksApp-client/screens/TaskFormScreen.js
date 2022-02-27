import { Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import Layout from "../components/Layout"
import {saveTask, getTask, editTask} from '../api';

const TaskFormScreen = ({navigation, route}) => {
  const [editing, setEditing] = useState(false)
  const [task, setTask] = useState({
    title: '',
    description: ''
  })
  const handleChange = (name, value) => setTask({...task, [name]: value})

  const handleSubmit = async () => {
    try {
    if (editing) {
      await editTask(route.params.id, task)
    } else {
      await saveTask(task);
    }
    } catch (e) {
      return Promise.reject(e)
    } finally {
    navigation.navigate('HomeScreen')
    }
  }

  useEffect(() => {
    if (route.params && route.params.id) {
      setEditing(true)
      navigation.setOptions({headerTitle: 'Editing task'});
      (async () => {
        try {
          const task = await getTask(route.params.id)
          setTask({title: task.title, description: task.description})
        } catch (e) {
          return Promise.reject(e);
        }
      })();
    }
  }, [])
  
  return (
    <Layout>
      <TextInput
      style={styles.input}
      placeholder='Write a title'
      placeholderTextColor='#fff'
      onChangeText={(text)=> handleChange('title', text)}
      value={task.title}
      />
      <TextInput
      style={styles.input}
      placeholder='Write a description'
      placeholderTextColor='#fff'
      onChangeText={(text)=> handleChange('description', text)}
      value={task.description}
      />
      <TouchableOpacity style={styles.buttonSave} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Save task</Text>
        </TouchableOpacity>
    </Layout>
  )
}

const styles = StyleSheet.create({
  input: {
    width: '90%',
    marginBottom: 7,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#10ac84',
    height: 35,
    color: '#fff',
    padding: 4,
    textAlign: 'center',
    borderRadius: 5
  },
  buttonSave: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#10ac84',
    width: '90%'
  },
  buttonText: {
    textAlign: "center",
    color: '#fff'
  }
})

export default TaskFormScreen