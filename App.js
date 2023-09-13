import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import {useState, useEffect} from "react";

import api from "./services/api";

import AsyncStorage from "@react-native-community/async-storage"

export default function App() {
  const [alert, setAlert] = useState("")
  const [texto, setTexto] = useState("")
  const [nomeDoRepositorio, setNomeDoRepositorio] = useState("")

  useEffect(() =>{
    getStorage()
  })

  submit = async () => {
    try{
      if(texto === ""){
        setAlert("Digite um nome de um repositorio")
      }else {
        const result = await api.get(`/repos/${texto}`)
        console.log(result.data.full_name)
        saveStorage(result.data.full_name)
        setAlert("")
      }
    }catch(error){
      setAlert("Projeto não encontrado")
    }
  }

  saveStorage = async (nome) => {
    AsyncStorage.setItem("nome_repositorio", nome)
    getStorage()
  }

  getStorage = async () => {
    await AsyncStorage.getItem("nome_repositorio")
    .then(
      (value) => setNomeDoRepositorio(value)
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Repositiórios</Text>
      <View style={styles.containerBuscar}>
        <TextInput 
         style={styles.input} 
         placeholder="digite um repositorio..."
         onChangeText={novoTexto => setTexto(novoTexto)}
         defaultValue={texto}
        />
        <TouchableOpacity 
         onPress={submit}
         style={styles.btn}
        >
          <Icon color="#fff" name="plus"/>
        </TouchableOpacity>
      </View>
      <Text style={styles.textError}>{alert}</Text>
      <Text> {nomeDoRepositorio} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center"
  },
  title: {
    fontSize: 24, 
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderColor: "black",
    borderRadius: 7,
    borderWidth: 1,
    height: 40,
    paddingHorizontal: 10,
    outline: 'none',
    marginRight: 10
  },
  containerBuscar: {
    flexDirection: 'row',
    alignItems: "center",
  },
  btn: {
    backgroundColor: '#162932',
    padding: 13,
    borderRadius: 8,
  },
  textError: {
    color: "red",
    marginTop: 5
  }
});
