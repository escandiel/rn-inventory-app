import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function SignInScreen() {
  const [email, setEmail] = useState("demo@forfeet.com");
  const [password, setPassword] = useState("123456");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function submit() {
    setLoading(true);
    setErr("");
    try {
      if (mode === "signin")
        await signInWithEmailAndPassword(auth, email, password);
      else await createUserWithEmailAndPassword(auth, email, password);
    } catch (e: any) {
      setErr(e?.message ?? "Erro");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ flex: 1, padding: 24, gap: 12, justifyContent: "center" }}>
      <Text style={{ fontSize: 22, fontWeight: "600" }}>Forfeet Sneakers</Text>
      <TextInput
        style={s.in}
        placeholder="E-mail"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={s.in}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {err ? <Text style={{ color: "red" }}>{err}</Text> : null}
      <TouchableOpacity style={s.btn} onPress={submit} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text>{mode === "signin" ? "Entrar" : "Criar conta"}</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setMode(mode === "signin" ? "signup" : "signin")}
      >
        <Text style={{ textAlign: "center", textDecorationLine: "underline" }}>
          {mode === "signin" ? "Criar conta" : "Já tenho conta"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const s = {
  in: { borderWidth: 1, borderRadius: 8, padding: 12 },
  btn: { backgroundColor: "black", padding: 14, borderRadius: 10 },
  btnTxt: { color: "#fff", textAlign: "center", fontWeight: "600" },
};
