import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const LaunchCard = ({ launch, onAdd, onDetails }) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => setShowActions(!showActions)}
      style={styles.card}
    >
      <Image
        source={{ uri: launch?.links?.patch?.small || "https://via.placeholder.com/150" }}
        style={styles.image}
      />
      <Text style={styles.name}>{launch.name}</Text>
      <Text style={styles.status}>
        {launch.upcoming ? "🔵 A lançar" : "🟢 Lançado"}
      </Text>
      <Text style={styles.date}>
        Data: {new Date(launch.date_utc).toLocaleDateString()}
      </Text>

      {showActions && (
        <View style={styles.actions}>
          <TouchableOpacity style={styles.button} onPress={onAdd}>
            <Text style={styles.buttonText}>ADD</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onDetails}>
            <Text style={styles.buttonText}>VER MAIS DETALHES</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1c2432",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    alignItems: "center"
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 10
  },
  name: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold"
  },
  status: {
    color: "#ccc",
    marginTop: 5
  },
  date: {
    color: "#aaa",
    marginBottom: 10
  },
  actions: {
    marginTop: 10,
    flexDirection: "column",
    gap: 10
  },
  button: {
    backgroundColor: "#e50914",
    padding: 10,
    borderRadius: 5
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  }
});

export default LaunchCard;
