import { StatusBar } from "expo-status-bar";
import { Text, View, TextInput } from "react-native";

export default function Home() {
  return (
    <View
      style={{
        backgroundColor: "orange",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: 48 }}>Olá, Mundo!</Text>
      <StatusBar style="auto" />
      <TextInput
        style={{
          backgroundColor: "#fff",
          width: 200,
          height: 50,
          borderRadius: 4,
          fontSize: 24,
        }}
      />
    </View>
  );
}

/* 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "darkblue",
  },
  participants: {
    fontSize: 20,
    paddingBottom: 16,
  },
  left: {
    textAlign: "left",
  },
  bold: {
    fontWeight: "bold",
  },
});
 */
