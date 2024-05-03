import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function Formulario({ agregarCita }) {

    const [paciente, setPaciente] = useState('');
    const [propietario, setPropietario] = useState('');
    const [telefono, setTelefono] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [fecha, setFecha] = useState(null);
    const [hora, setHora] = useState(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const confirmarFecha = date => {
        setFecha(date);
        hideDatePicker();
    };

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const confirmarHora = date => {
        setHora(date);
        hideTimePicker();
    };

    const agregarNuevaCita = () => {
        const nuevaCita = {
            id: Math.random().toString(),
            paciente,
            propietario,
            telefono,
            sintomas,
            fecha,
            hora
        };
        agregarCita(nuevaCita);
        
        setPaciente('');
        setPropietario('');
        setTelefono('');
        setSintomas('');
        setFecha(null);
        setHora(null);
    }

    return (
        <>
            <View style={styles.formulario}>
                <Text style={styles.label}>Nombre del paciente: </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={texto => setPaciente(texto)}
                    value={paciente}
                />
            </View>
            <View style={styles.formulario}>
                <Text style={styles.label}>Nombre del propietario: </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={texto => setPropietario(texto)}
                    value={propietario}
                />
            </View>
            <View style={styles.formulario}>
                <Text style={styles.label}>Teléfono de contacto: </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={texto => setTelefono(texto)}
                    value={telefono}
                    keyboardType='phone-pad'
                />
            </View>
            <View style={styles.formulario}>
                <Text style={styles.label}>Síntomas: </Text>
                <TextInput
                    multiline
                    style={styles.input}
                    onChangeText={texto => setSintomas(texto)}
                    value={sintomas}
                />
            </View>
            <View style={styles.row}>
                <TouchableOpacity style={styles.button} onPress={showDatePicker}>
                    <Text style={styles.textoBoton}>Seleccionar fecha</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={showTimePicker}>
                    <Text style={styles.textoBoton}>Seleccionar hora</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.buttonAgregar} onPress={agregarNuevaCita}>
                <Text style={styles.textoBoton}>Agregar cita</Text>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={confirmarFecha}
                onCancel={hideDatePicker}
            />
            <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={confirmarHora}
                onCancel={hideTimePicker}
            />
        </>
    );
}

const styles = StyleSheet.create({
    formulario: {
      marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    label: {
      fontWeight: 'bold',
      fontSize: 18,
      marginBottom: 5,
      color: '#333',
    },
    input: {
        marginTop: 10,
        height: 50,
        borderColor: '#e1e1e1',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    button: {
      backgroundColor: '#519EE7',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      flex: 1,
      marginRight: 10,
    },
    buttonAgregar: {
      backgroundColor: '#519EE7',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginBottom: 5,
    },
    textoBoton: {
      color: '#F9F5F5',
      fontWeight: 'bold',
      fontSize: 18,
    },
});
