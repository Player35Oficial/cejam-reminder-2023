import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Reminder() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [reminderContent, setReminderContent] = useState("");

  function back() {
    router.back();
  }

  async function loadReminder() {
    var reminders = JSON.parse(await AsyncStorage.getItem("reminders"));

    console.log(params.reminderIndex);

    var reminder = reminders.filter((r, i) => {
      return i === Number(params.reminderIndex);
    })[0];

    setReminderContent(reminder.content);
  }

  useEffect(() => {
    loadReminder();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={back}>
        <SimpleLineIcon name="arrow-left" size={32} />
      </TouchableOpacity>

      <TextInput
        textAlignVertical="top"
        multiline={true}
        style={styles.input}
        placeholder="Digite o conteúdo do seu lembrete"
        value={reminderContent}
      />

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  input: {
    backgroundColor: "#D9D9D9",
    padding: 24,
    fontSize: 18,
    borderRadius: 24,
    minHeight: 250,
    marginTop: 56,
  },
  saveButton: {
    width: "100%",
    backgroundColor: "#D9D9D9",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 24,
    marginLeft: 24,
  },
  saveButtonText: {
    fontSize: 24,
    fontWeight: "700",
  },
});
