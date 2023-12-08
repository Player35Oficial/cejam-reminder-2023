import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icons from "react-native-vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [reminders, setReminders] = useState([]);

  var router = useRouter();

  function goToReminder(index) {
    router.push({
      pathname: "/reminder",
      params: {
        reminderIndex: index,
      },
    });
  }

  function updateText(text) {
    setInputText(text);
  }

  async function addReminder() {
    if (!inputText) {
      Alert.alert("Aviso", "Campo vazio... digite antes de adicionar");
      return;
    }

    var reminders = JSON.parse(await AsyncStorage.getItem("reminders")) || [];

    reminders.push({
      title: inputText,
      content: "",
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

  function Lembrete({ item, index }) {
    return (
      <TouchableOpacity
        style={styles.reminder}
        onPress={() => {
          goToReminder(index);
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <Text style={styles.lembreteTexto}>{item.title}</Text>
          <Text style={styles.lembreteTextoConteudo}>{item.content}</Text>
        </View>
        <TouchableOpacity
          style={styles.lembreteButton}
          onPress={() => {
            removeReminder(index);
          }}
        >
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
    maxHeight: 100,
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  lembreteTexto: {
    fontSize: 24,
    fontWeight: "500",
  },
  lembreteButton: {
    fontSize: 32,
    padding: 8,
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 24,
    justifyContent: "center",
    backgroundColor: "#BEBEBE",
  },
  lembreteTextoConteudo: {
    opacity: 0.5,
  },
});
