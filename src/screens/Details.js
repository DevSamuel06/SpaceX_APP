import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const Details = ({ route }) => {
  const navigation = useNavigation();
  const { launch } = route.params;

  return (
    <ScrollView style={styles.container}>
      
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{launch.name}</Text>

      {launch.links?.patch?.large && (
        <Image source={{ uri: launch.links.patch.large }} style={styles.image} />
      )}

      <Text style={styles.label}>Data de lançamento:</Text>
      <Text style={styles.text}>{new Date(launch.date_utc).toLocaleDateString()}</Text>

      <Text style={styles.label}>Status:</Text>
      <Text style={styles.text}>{launch.upcoming ? "Aguardando lançamento" : "Lançado"}</Text>

      <Text style={styles.label}>Detalhes:</Text>
      <Text style={styles.text}>{launch.details || "Sem detalhes disponíveis."}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  label: {
    color: "#bbb",
    marginTop: 15,
    fontSize: 16,
  },
  text: {
    color: "#fff",
    fontSize: 18,
  },
  image: {
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
});

export default Details;
