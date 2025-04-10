import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import LaunchCard from "../components/LaunchCard";
import { Ionicons } from "@expo/vector-icons";

const Home = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [launches, setLaunches] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const fetchLaunches = async () => {
      try {
        const response = await axios.get("https://api.spacexdata.com/v4/launches");
        setLaunches(response.data);
        setFiltered(response.data);
      } catch (error) {
        console.error("Erro ao buscar lançamentos:", error);
      }
    };

    fetchLaunches();
  }, []);

  const handleSearch = (text) => {
    setSearch(text);
    const filteredData = launches.filter((launch) =>
      launch.name.toLowerCase().includes(text.toLowerCase())
    );
    setFiltered(filteredData);
  };

  const handleAddToMyList = async (launch) => {
    try {
      const stored = await AsyncStorage.getItem("savedLaunches");
      const current = stored ? JSON.parse(stored) : [];

      const exists = current.some(item => item.id === launch.id);
      if (exists) {
        Alert.alert("Aviso", "Essa missão já está na sua lista.");
        return;
      }

      const updated = [...current, launch];
      await AsyncStorage.setItem("savedLaunches", JSON.stringify(updated));
      Alert.alert("Sucesso", "Missão adicionada à lista!");
    } catch (error) {
      console.error("Erro ao salvar missão:", error);
    }
  };

  const handleDetails = (launch) => {
    navigation.navigate("Details", { launch });
  };

  const goToSaved = () => {
    navigation.navigate("Saved");
  };

  return (
    <View style={styles.container}>
      {/* Top bar com ícone de lista */}
      <View style={styles.topBar}>
        <Text style={styles.title}>Pesquisar Missões 🚀</Text>
        <TouchableOpacity onPress={goToSaved} >
          <Ionicons name="bookmark-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Input de pesquisa */}
      <TextInput
        style={styles.input}
        placeholder="Buscar missão pelo nome..."
        placeholderTextColor="#aaa"
        value={search}
        onChangeText={handleSearch}
        keyboardType="web-search"
      />

      {/* Cards da API */}
      <ScrollView contentContainerStyle={styles.cardContainer}>
        {filtered.map((launch) => (
          <LaunchCard
            key={launch.id}
            launch={launch}
            onAdd={() => handleAddToMyList(launch)}
            onDetails={() => handleDetails(launch)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#1c1c1e",
    color: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  cardContainer: {
    paddingBottom: 100,
    gap: 20,
  },
});

export default Home;
