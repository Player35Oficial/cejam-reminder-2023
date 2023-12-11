import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";
import { useRouter, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Reminder() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [reminderTitle, setReminderTitle] = useState("");
  const [reminderContent, setReminderContent] = useState("");
  const [reminderCreatedAt, setReminderCreatedAt] = useState(new Date());

  function back() {
    router.back();
  }

  async function loadReminder() {
    var reminders = JSON.parse(await AsyncStorage.getItem("reminders"));

    console.log(params.reminderIndex);

    var reminder = reminders.filter((r, i) => {
      return i === Number(params.reminderIndex);
    })[0];

    setReminderTitle(reminder.title);
    setReminderContent(reminder.content);
  }

  async function saveReminder() {
    var reminders = JSON.parse(await AsyncStorage.getItem("reminders"));

    reminders[params.reminderIndex].title = reminderTitle;
    reminders[params.reminderIndex].content = reminderContent;

    await AsyncStorage.setItem("reminders", JSON.stringify(reminders));
    router.back();
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
        style={styles.title}
        placeholder="Digite o título do seu lembrete..."
        value={reminderTitle}
        onChangeText={(text) => setReminderTitle(text)}
      />

      <TextInput
        textAlignVertical="top"
        multiline={true}
        style={styles.input}
        placeholder="Digite o conteúdo do seu lembrete"
        value={reminderContent}
        onChangeText={(text) => setReminderContent(text)}
      />

      <Text style={styles.createdAt}>
        <Text>Criado em: </Text>
        {reminderCreatedAt.getUTCDate().toString().padStart(2, "0") +
          "/" +
          (Number(reminderCreatedAt.getMonth().toString().padStart(2, "0")) +
            1) +
          "/" +
          reminderCreatedAt.getUTCFullYear() +
          ", " +
          reminderCreatedAt.toLocaleTimeString()}
      </Text>

      <View style={styles.dateTimeContainer}>
        <TouchableOpacity style={styles.dateTimeButton}>
          <Text style={styles.dateTimeButtonText}>Adicionar data</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.dateTimeButton}>
          <Text style={styles.dateTimeButtonText}>Adicionar Horário</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={saveReminder}>
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
    marginTop: 42,
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
    // Android
    elevation: 4,
    // IOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 24,
    shadowOpacity: 0.5,
  },
  saveButtonText: {
    fontSize: 24,
    fontWeight: "700",
  },
  createdAt: {
    width: "50%",
    marginTop: 32,
    backgroundColor: "#D9D9D9",
    borderRadius: 24,
    padding: 16,
    fontSize: 12,
    textAlign: "center",
  },
  title: {
    backgroundColor: "#D9D9D9",
    borderRadius: 24,
    padding: 24,
    fontSize: 24,
    marginTop: 42,
    fontWeight: "700",
    textAlign: "center",
  },
  dateTimeContainer: {},
  dateTimeButton: {
    backgroundColor: "#D9D9D9",
    paddding: 16,
    borderRadius: 24,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  dateTimeButtonText: {},
});
