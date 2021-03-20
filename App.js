import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import Clipboard from 'expo-clipboard';

const CHARSET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%.*-_:';

const App = () => {
  const [password, setPassword] = useState('');
  const [size, setSize] = useState(10);

  const generatePress = useCallback(() => {
    const n = CHARSET.length;
    let pass = '';

    for (let i = 0; i < size; i++) {
      pass += CHARSET.charAt(Math.floor(Math.random() * n));
    }

    setPassword(pass);
  }, [size]);

  const copyPress = useCallback(() => {
    Clipboard.setString(password);
    alert('Senha copiada com sucesso!');
  }, [password]);

  return (
    <View style={styles.container}>
      <Image
        source={require('./src/assets/logo.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>{size} Caracteres</Text>

      <View style={styles.area}>
        <Slider
          style={{ height: 50 }}
          minimumValue={5}
          maximumValue={15}
          minimumTrackTintColor="#FF0000"
          maximumTrackTintColor="#000"
          value={size}
          onValueChange={value => setSize(value.toFixed(0))}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={generatePress}>
        <Text style={styles.buttonText}>Gerar Senha</Text>
      </TouchableOpacity>

      {password !== '' && (
        <View style={styles.area}>
          <Text style={styles.password} onLongPress={copyPress}>{password}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F3FF',
  },
  logo: {
    marginBottom: 60,
    resizeMode: 'cover'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  area: {
    marginTop: 16,
    marginBottom: 16,
    backgroundColor: '#FFF',
    width: '90%'
  },
  button: {
    backgroundColor: '#FFA200',
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    marginBottom: 24,
  },
  buttonText: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
  },
  password: {
    padding: 8,
    textAlign: 'center',
    fontSize: 20,
  },
});

export default App;