import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Alert
} from 'react-native';

const App = () => {
  const [data, setData] = useState([])
  const [description, setDescription] = useState('')
  const baseURL = 'http://192.168.0.112:3000/'

  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = () => {
    fetch(baseURL+'tasks')
      .then(response => response.json())
      .then(result => setData(result.data))
      .catch(error => console.log('ERROR => ', error))
  }

  const renderItem = item => {
    const { description, status } = item.item

    return (
      <TouchableOpacity
        style={[styles.button, { backgroundColor: status === 'PENDENTE' ? 'orange' : 'gray' }]}
        onPress={() => showAlert(item)}
        disabled={status === 'FINALIZADO'}
      >
        <Text style={styles.listText}>{description}</Text>
      </TouchableOpacity>
    )
  }

  const addTask = () => {
    if (!description) return

    fetch(baseURL+'task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ description: description })
    })
      .then(() => {
        setDescription('')

        loadTasks()
      })
  }

  const cancel = item => {
    fetch(`${baseURL}task/${item.item.id}`, { method: 'DELETE' })
      .then(() => {
        setDescription('')

        loadTasks()
      })
  }

  const finish = item => {
    fetch(`${baseURL}task/${item.item.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: 'FINALIZADO' })
    })
      .then(() => {
        setDescription('')

        loadTasks()
      })
  }

  const showAlert = item => {
    Alert.alert(
      item.item.description,
      'O que deseja?',
      [
        {
          text: "Fechar",
          onPress: () => {}
        },
        {
          text: "Cancelar",
          onPress: () => cancel(item),
          style: "cancel"
        },
        {
          text: "Finalizar",
          onPress: () => finish(item)
        }
      ]
    )
  }

  return (
    <View styles={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          value={description}
          onChangeText={text => setDescription(text)}
          style={styles.input}
        />

        <Button
          title='Inserir'
          onPress={addTask}
          disabled={!description}
        />
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={{ marginHorizontal: 20, paddingBottom: 100 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fcff'
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 20
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 3,
    marginRight: 10,
    borderRadius: 6
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 20,
    marginBottom: 16,
    borderRadius: 6
  },
  listText: {
    fontSize: 20,
    color: '#fff'
  },
});

export default App;
