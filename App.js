import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Cita from './components/Cita';
import Formulario from './components/Formulario';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    cargarCitas();
  }, []);

  const cargarCitas = async () => {
    try {
      const citasGuardadas = await AsyncStorage.getItem('citas');
      if (citasGuardadas !== null) {
        setCitas(JSON.parse(citasGuardadas));
      }
    } catch (error) {
      console.error('Error al cargar citas:', error);
    }
  };

  const guardarCitas = async (nuevasCitas) => {
    try {
      await AsyncStorage.setItem('citas', JSON.stringify(nuevasCitas));
    } catch (error) {
      console.error('Error al guardar citas:', error);
    }
  };

  const agregarCita = nuevaCita => {
    const nuevasCitas = [...citas, nuevaCita];
    setCitas(nuevasCitas);
    guardarCitas(nuevasCitas); 
  }

  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    setCitas(nuevasCitas);
    guardarCitas(nuevasCitas); 
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Administrador de Citas</Text>
      <View style={styles.card}>
        <Formulario agregarCita={agregarCita} />
      </View>
      <Text style={styles.subtitulo}>{citas.length > 0 ? 'Administra tus citas' : 'No hay citas, agrega una'}</Text>
      {citas.map(item => (
        <View style={styles.card} key={item.id}>
          <Cita item={item} eliminarCita={eliminarCita} />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  titulo: {
    color: '#000',
    marginBottom: 20,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subtitulo: {
    color: '#000',
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  boton: {
    backgroundColor: '#8A6FF8',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
