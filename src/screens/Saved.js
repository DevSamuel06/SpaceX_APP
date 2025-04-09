import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const Saved = () => {
  const [savedCards, setSavedCards] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchSavedCards = async () => {
      try {
        const stored = await AsyncStorage.getItem("savedLaunches");
        if (stored) {
          const parsed = JSON.parse(stored);
          setSavedCards(parsed);
        }
      } catch (error) {
        console.error("Erro ao buscar cards salvos:", error);
      }
    };

    const unsubscribe = navigation.addListener("focus", fetchSavedCards);
    return unsubscribe;
  }, [navigation]);

  const deleteCard = async (id) => {
    console.log("Remover card com ID:", id); // Verificar se está chegando aqui
    const updatedCards = savedCards.filter((item) => item.id !== id);
    setSavedCards(updatedCards);
    await AsyncStorage.setItem("savedLaunches", JSON.stringify(updatedCards));
  };
  


  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.cardContent}
        onPress={() => navigation.navigate("Details", { launch: item })}
      >
        {item.links?.patch?.small && (
          <Image source={{ uri: item.links.patch.small }} style={styles.image} />
        )}
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.status}>
            {item.upcoming ? "Aguardando lançamento" : "Lançado"}
          </Text>
          <Text style={styles.date}>
            {new Date(item.date_utc).toLocaleDateString()}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Botão de excluir */}
      <TouchableOpacity onPress={() => deleteCard(item.id)} style={styles.deleteButton}>
        <Ionicons name="trash-outline" size={24} color="#e50914" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Botão de voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Meus Lançamentos Salvos</Text>

      {savedCards.length === 0 ? (
        <Text style={styles.empty}>Nenhum card salvo.</Text>
      ) : (
        <FlatList
          data={savedCards}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 16,
    paddingTop: 50,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 26,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    marginTop:15,
  },
  empty: {
    color: "#aaa",
    fontSize: 18,
    textAlign: "center",
    marginTop: 40,
  },
  card: {
    backgroundColor: "#1c2432",
    borderRadius: 10,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  cardContent: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 12,
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  status: {
    color: "#ccc",
    marginTop: 4,
  },
  date: {
    color: "#bbb",
    marginTop: 2,
  },
  deleteButton: {
    paddingLeft: 10,
    paddingVertical: 5,
  },
});

export default Saved;
