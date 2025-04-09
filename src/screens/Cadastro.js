import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
} from "react-native";

export default class Cadastro extends Component {
  state = {
    user: "",
    phone: "",
    cpf: "",
    email: "",
    curso: "",
    password: "",
    confirmedPassword: "",
    successVisible: false,
  };

  handleCadastro = async () => {
    const { user, email, phone, cpf, curso, password, confirmedPassword } = this.state;

    if (!user || !email || !phone || !cpf || !curso || !password || !confirmedPassword) {
      alert("Preencha todos os campos!");
      return;
    }

    if (password !== confirmedPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    const data = {
      user,
      phone,
      cpf,
      email,
      curso,
      password,
    };

    await AsyncStorage.setItem("user", JSON.stringify(data));

    this.setState({ successVisible: true });

    // Redireciona após 3 segundos
    setTimeout(() => {
      this.props.navigation.navigate("Login");
    }, 2000);
  };

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.title}>Cadastre-se</Text>
        <View style={styles.body}>
          <TextInput style={styles.input} placeholder="Nome" onChangeText={(user) => this.setState({ user })} placeholderTextColor="#888" />
          <TextInput style={styles.input} placeholder="Telefone" onChangeText={(phone) => this.setState({ phone })} placeholderTextColor="#888" />
          <TextInput style={styles.input} placeholder="CPF" onChangeText={(cpf) => this.setState({ cpf })} placeholderTextColor="#888" />
          <TextInput style={styles.input} placeholder="Email" onChangeText={(email) => this.setState({ email })} placeholderTextColor="#888" />
          <TextInput style={styles.input} placeholder="Curso" onChangeText={(curso) => this.setState({ curso })} placeholderTextColor="#888" />
          <TextInput style={styles.input} placeholder="Senha" secureTextEntry onChangeText={(password) => this.setState({ password })} placeholderTextColor="#888" />
          <TextInput style={styles.input} placeholder="Confirme a senha" secureTextEntry onChangeText={(confirmedPassword) => this.setState({ confirmedPassword })} placeholderTextColor="#888" />

          <TouchableOpacity style={styles.button} onPress={this.handleCadastro}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>

        {this.state.successVisible && (
          <View style={styles.successCard}>
            <Text style={styles.successText}>Cadastro realizado com sucesso! Redirecionando...</Text>
          </View>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181C1F",
  },
  title: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  body: {
    gap: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#474144",
    borderRadius: 10,
    padding: 15,
    backgroundColor: "#1c2432",
    color: "#fff",
    fontSize: 18,
  },
  button: {
    backgroundColor: "#e50914",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  successCard: {
    marginTop: 30,
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#28a745",
    alignItems: "center",
  },
  successText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
