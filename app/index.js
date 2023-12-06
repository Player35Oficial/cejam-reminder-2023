import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Icons from "react-native-vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [reminders, setReminders] = useState([]);

  var router = useRouter();

  function goToReminder() {
    router.push("/reminder");
  }

  function updateText(text) {
    setInputText(text);
  }

  async function addReminder() {
    var reminders = JSON.parse(await AsyncStorage.getItem("reminders")) || [];

    reminders.push({
      content: inputText,
      createdAt: new Date(),
    });

    await AsyncStorage.setItem("reminders", JSON.stringify(reminders));
    setReminders(reminders);
  }

  async function loadReminders() {
    const savedReminders =
      (await JSON.parse(await AsyncStorage.getItem("reminders"))) || [];

    setReminders(savedReminders);
  }

  async function removeReminder(index) {
    var reminders = JSON.parse(await AsyncStorage.getItem("reminders")) || [];

    reminders.splice(index, 1);

    await AsyncStorage.setItem("reminders", JSON.stringify(reminders));
    setReminders(reminders);
  }

  function Lembrete({ item }) {
    return (
      <TouchableOpacity style={styles.reminder} onPress={goToReminder}>
        <Text style={styles.lembreteTexto}>{item.content}</Text>
        <TouchableOpacity style={styles.lembreteButton}>
          <Icons name="trash" size={32} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  useEffect(() => {
    loadReminders();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cejam - Reminder</Text>
      <FlatList
        inverted
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        data={reminders}
        renderItem={({ item, index }) => {
          return <Lembrete item={item} index={index} />;
        }}
        ListEmptyComponent={<Text>Lista Vazia....</Text>}
      />
      <View style={styles.bottomBar}>
        <TextInput
          placeholder="Digite seu Lembrete"
          style={styles.input}
          value={inputText}
          onChangeText={updateText}
        />
        <TouchableOpacity style={styles.addButton} onPress={addReminder}>
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
    marginTop: 24,
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
