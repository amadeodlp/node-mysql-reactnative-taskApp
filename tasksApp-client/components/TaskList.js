import { Text, FlatList, RefreshControl } from 'react-native'
import React, {useState, useEffect} from 'react'
import TaskItem from "./TaskItem"
import { getTasks, deleteTasks } from "../api"
import { useIsFocused } from "@react-navigation/native"

const TaskList = () => {

  const [tasks, setTasks] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const focus = useIsFocused();
  const loadTasks = async () => {
  const data = await getTasks();
  setTasks(data);
  }
  useEffect(() => {
    loadTasks();
  }, [focus])

  const handleDelete = async (id) => {
    try {
      await deleteTasks(id);
      await loadTasks();
    } catch (e) {
      return Promise.reject(e)
    }
  }

  const renderItem = ({item}) => {
    return <TaskItem task={item} handleDelete={handleDelete}/>;
  }
  
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true)
    await loadTasks();
    setRefreshing(false)
  })
  
  return (
    <FlatList
        style={{width: '100%'}}
        data={tasks}
        keyExtractor={(item)=>item.id.toString()}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
          refreshing={refreshing}
            colors={["#78e08f"]}
            onRefresh={onRefresh}
            progressBackgroundColor="#0a3d62"
          />
        }
    />
  )
}

export default TaskList;
