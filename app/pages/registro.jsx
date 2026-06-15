// import {View, Text} from 'react-native'

// export default function Registro(){
//     return(
//         <View>
//             <Text>Tela de Registro</Text>
//         </View>
//     )
// }

import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { cores, fontes, sombra, raio } from '../../constants/theme';

export default function Registro({ navigation }) {
  const [nome, setNome]         = useState('');
  const [email, setEmail]       = useState('');
  const [senha, setSenha]       = useState('');
  const [confirma, setConfirma] = useState('');
  const [verSenha, setVerSenha] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={s.root}
    >
      <StatusBar barStyle="light-content" backgroundColor={cores.fundoPrimario} />

      <View style={[s.circulo, s.circulo1]} />
      <View style={[s.circulo, s.circulo2]} />

      <ScrollView
        contentContainerStyle={s.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={s.iconeTopo}>
          <Ionicons name="person-add" size={32} color={cores.fundoSecundario} />
        </View>

        <Text style={s.titulo}>Criar Conta</Text>
        <Text style={s.subtitulo}>Registre-se para acessar o sistema</Text>

        <View style={s.card}>
          <Campo label="NOME COMPLETO" placeholder="João Silva" valor={nome} onChange={setNome} icone="person-outline" />
          <Campo label="E-MAIL" placeholder="joao@email.com" valor={email} onChange={setEmail} icone="mail-outline" tipo="email-address" />

          {/* Campo senha com toggle de visibilidade */}
          <View style={{ marginBottom: 14 }}>
            <Text style={s.label}>SENHA</Text>
            <View style={[s.inputBox]}>
              <Ionicons name="lock-closed-outline" size={18} color={cores.textoMuted} style={{ marginRight: 8 }} />
              <TextInput
                style={s.input}
                placeholder="Mínimo 8 caracteres"
                placeholderTextColor={cores.textoMuted}
                value={senha}
                onChangeText={setSenha}
                secureTextEntry={!verSenha}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setVerSenha(v => !v)}>
                <Ionicons name={verSenha ? 'eye-off-outline' : 'eye-outline'} size={20} color={cores.textoMuted} />
              </TouchableOpacity>
            </View>
          </View>

          <Campo label="CONFIRMAR SENHA" placeholder="Repita a senha" valor={confirma} onChange={setConfirma} icone="lock-closed-outline" seguro />

          {/* Indicador de força de senha */}
          {senha.length > 0 && (
            <View style={s.forcaWrapper}>
              <View style={[s.forcaBarra, { flex: 1, backgroundColor: senha.length >= 4 ? '#22C55E' : '#E2E8F0' }]} />
              <View style={[s.forcaBarra, { flex: 1, backgroundColor: senha.length >= 8 ? '#22C55E' : '#E2E8F0' }]} />
              <View style={[s.forcaBarra, { flex: 1, backgroundColor: senha.length >= 12 ? '#F5C842' : '#E2E8F0' }]} />
              <Text style={s.forcaTexto}>
                {senha.length < 4 ? 'Fraca' : senha.length < 8 ? 'Razoável' : senha.length < 12 ? 'Boa' : 'Forte'}
              </Text>
            </View>
          )}

          <TouchableOpacity style={s.btnRegistrar} activeOpacity={0.85}>
            <Ionicons name="checkmark-circle" size={20} color="#FFF" />
            <Text style={s.btnRegistrarText}>CRIAR CONTA</Text>
          </TouchableOpacity>

          <View style={s.loginRow}>
            <Text style={s.loginTexto}>Já tem conta? </Text>
            <TouchableOpacity onPress={() => navigation?.goBack()}>
              <Text style={s.loginLink}>Fazer login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Campo({ label, placeholder, valor, onChange, icone, tipo = 'default', seguro = false }) {
  const [foco, setFoco] = useState(false);
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={estilosCampo.label}>{label}</Text>
      <View style={[estilosCampo.box, foco && estilosCampo.boxFoco]}>
        {icone && <Ionicons name={icone} size={18} color={foco ? cores.fundoSecundario : cores.textoMuted} style={{ marginRight: 8 }} />}
        <TextInput
          style={estilosCampo.input}
          placeholder={placeholder}
          placeholderTextColor={cores.textoMuted}
          value={valor}
          onChangeText={onChange}
          onFocus={() => setFoco(true)}
          onBlur={() => setFoco(false)}
          keyboardType={tipo}
          secureTextEntry={seguro}
          autoCapitalize="none"
        />
      </View>
    </View>
  );
}

const estilosCampo = StyleSheet.create({
  label: {
    fontSize: 11, fontWeight: '700', color: cores.fundoSecundario,
    letterSpacing: 1.5, marginBottom: 6, fontFamily: fontes.sans,
  },
  box: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1.5, borderColor: '#E2E8F0',
    borderRadius: raio.md, backgroundColor: '#F8FAFC',
    paddingHorizontal: 12, height: 50,
  },
  boxFoco: { borderColor: cores.fundoSecundario, backgroundColor: '#FFFFFF' },
  input: { flex: 1, fontSize: 15, color: cores.textoCard, fontFamily: fontes.sans },
});

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: cores.fundoPrimario },
  scroll: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 40 },

  circulo: { position: 'absolute', borderRadius: 9999, backgroundColor: '#FFFFFF', opacity: 0.05 },
  circulo1: { width: 260, height: 260, top: -60, right: -60 },
  circulo2: { width: 160, height: 160, bottom: 100, left: -40 },

  iconeTopo: {
    alignSelf: 'center', width: 64, height: 64, borderRadius: 32,
    backgroundColor: cores.superficie, alignItems: 'center', justifyContent: 'center', marginBottom: 12,
  },
  titulo: {
    fontSize: 22, fontWeight: '700', color: cores.textoPrimario,
    textAlign: 'center', fontFamily: fontes.sans, marginBottom: 6,
  },
  subtitulo: {
    fontSize: 13, color: cores.textoSecundario,
    textAlign: 'center', fontFamily: fontes.sans, marginBottom: 24, lineHeight: 20,
  },
  card: { backgroundColor: cores.cardFundo, borderRadius: raio.xl, padding: 24, ...sombra.card },

  label: {
    fontSize: 11, fontWeight: '700', color: cores.fundoSecundario,
    letterSpacing: 1.5, marginBottom: 6, fontFamily: fontes.sans,
  },
  inputBox: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1.5, borderColor: '#E2E8F0',
    borderRadius: raio.md, backgroundColor: '#F8FAFC',
    paddingHorizontal: 12, height: 50,
  },
  input: { flex: 1, fontSize: 15, color: cores.textoCard, fontFamily: fontes.sans },

  forcaWrapper: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 14 },
  forcaBarra: { height: 4, borderRadius: 2 },
  forcaTexto: { fontSize: 11, color: cores.textoMuted, fontFamily: fontes.sans, marginLeft: 4 },

  btnRegistrar: {
    backgroundColor: cores.fundoSecundario, height: 52, borderRadius: raio.md,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, marginTop: 8, marginBottom: 16,
  },
  btnRegistrarText: {
    color: '#FFFFFF', fontSize: 14, fontWeight: '700', letterSpacing: 1.5, fontFamily: fontes.sans,
  },
  loginRow: { flexDirection: 'row', justifyContent: 'center' },
  loginTexto: { fontSize: 13, color: cores.textoMuted, fontFamily: fontes.sans },
  loginLink: { fontSize: 13, color: cores.fundoSecundario, fontWeight: '600', fontFamily: fontes.sans },
});
