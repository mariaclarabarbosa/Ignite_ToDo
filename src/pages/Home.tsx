import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const task = tasks.find(task => 
      task.title.toLocaleLowerCase() === newTaskTitle.toLocaleLowerCase()
    );
    if (task) {
      return Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome');
    }
    setTasks([...tasks, {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }]);
  }

  function handleToggleTaskDone(id: number) {
    const modifiedList = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          done: !task.done,
        }
      }
      return task;
    });
    setTasks(modifiedList);
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const modifiedList = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          title: taskNewTitle,
        }
      }
      return task;
    });
    setTasks(modifiedList);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Sim",
          onPress: () => {
            const newTasksList = tasks.filter((task) => task.id !== id);
            setTasks(newTasksList)
          },
          style: "default",
        },
        {
          text: 'Não',
          style: 'cancel',
        }
      ],
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})