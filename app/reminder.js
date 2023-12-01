import { useRouter } from "expo-router";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";

export default function Reminder() {
  const router = useRouter();

  function back() {
    router.back();
  }
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
      />

      <TouchableOpacity style={styles.saveButton}>
        <Text>Salvar</Text>
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
    fontWeight: 700,
  },
});
