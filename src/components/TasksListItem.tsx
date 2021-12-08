import React, { useState } from 'react';
import { FlatList, Image, TouchableOpacity, View, Text, StyleSheet, FlatListProps, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { ItemWrapper } from './ItemWrapper';

import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/edit.png'
import cancelIcon from '../assets/icons/cancel/cancel.png'

import { Task } from './TasksList';


interface TasksListProps {
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, newTitle: string) => void;
}

export function TasksListItem({ task, toggleTaskDone, removeTask, editTask }: TasksListProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(task.title)

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${task.id}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            testID={`marker-${task.id}`}
            style={!task.done ? styles.taskMarker : styles.taskMarkerDone}
          >
            {task.done && (
              <Icon
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          {isEditing
            ? (<TextInput
              value={text}
              onChangeText={setText}
              onSubmitEditing={() => {
                setIsEditing(false)
                editTask(task.id, text)
              }}
            />)
            : (<Text
              style={!task.done ? styles.taskText : styles.taskTextDone}
            >
              {task.title}
            </Text>)}

        </TouchableOpacity>
      </View>

      <TouchableOpacity
        testID={`trash-edit-${task.id}`}
        style={{ paddingHorizontal: 24 }}
        onPress={() => setIsEditing(!isEditing)}
      >
        <Image source={isEditing ? cancelIcon : editIcon} />
      </TouchableOpacity>

      <TouchableOpacity
        testID={`trash-${task.id}`}
        style={{ paddingHorizontal: 24 }}
        onPress={() => removeTask(task.id)}
      >
        <Image source={trashIcon} />
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  }
})