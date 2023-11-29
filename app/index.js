import { View, StyleSheet, Text, TextInput } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import Icons from "react-native-vector-icons/FontAwesome";

function Lembrete() {
  return (
    <View style={styles.reminder}>
      <Text style={styles.lembreteTexto}>Texto</Text>
      <TouchableOpacity style={styles.lembreteButton}>
        <Icons name="trash" size={32} />
      </TouchableOpacity>
    </View>
  );
}

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cejam - Reminder</Text>
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        data={[1, 2, 3, 4, 5, 6, 7]}
        renderItem={Lembrete}
      />
      <View style={styles.bottomBar}>
        <TextInput value="Lembrete 1" style={styles.input} />
        <TouchableOpacity style={styles.addButton}>
          <Icons name="plus" size={32} color={"gray"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
  },
  bottomBar: {
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 16,
  },
  content: {
    padding: 24,
    gap: 16,
  },
  input: {
    height: 55,
    backgroundColor: "#ECECEC",
    borderRadius: 32,
    paddingHorizontal: 24,
    fontSize: 18,
    flex: 1,
  },
  addButton: {
    backgroundColor: "#D9D9D9",
    width: 55,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 27.5,
  },
  reminder: {
    backgroundColor: "#D9D9D9",
    flexDirection: "row",
    height: 100,
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  lembreteTexto: {
    fontSize: 24,
    flex: 1,
  },
  lembreteButton: {
    fontSize: 32,
    backgroundColor: "#BEBEBE",
    padding: 8,
    borderRadius: 8,
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
});
