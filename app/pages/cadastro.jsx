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
import { cores, fontes } from '../../constants/theme';

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [estacao, setEstacao] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleSalvar = () => {
    // Ação de salvar futura
    console.log({ nome, email, estacao, senha, confirmarSenha });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={s.root}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Decorative Grid Pattern (represented as border/background styles) */}
      <View style={s.bgPattern} />

      {/* Header */}
      <View style={s.header}>
        <Text style={s.headerTitle}>
          NOVA{'\n'}ESTAÇÃO
        </Text>
        <TouchableOpacity 
          style={s.headerIconContainer}
          onPress={() => navigation?.goBack()}
          activeOpacity={0.8}
        >
          <Ionicons name="radio-outline" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={s.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Card do formulário */}
        <View style={s.card}>
          <Campo
            label="Responsável"
            placeholder="EX: JOÃO DA SILVA"
            valor={nome}
            onChange={setNome}
            icone="person-outline"
          />

          <Campo
            label="E-mail Corporativo"
            placeholder="CONTATO@ESTACAO.COM"
            valor={email}
            onChange={setEmail}
            icone="mail-outline"
            tipo="email-address"
          />

          <Campo
            label="Identificador da Estação"
            placeholder="EX: CENTRAL-OESTE-01"
            valor={estacao}
            onChange={setEstacao}
            icone="business-outline"
          />

          <Campo
            label="Senha"
            placeholder="••••••••"
            valor={senha}
            onChange={setSenha}
            icone="lock-closed-outline"
            seguro={true}
          />

          <Campo
            label="Confirmação"
            placeholder="••••••••"
            valor={confirmarSenha}
            onChange={setConfirmarSenha}
            icone="shield-checkmark-outline"
            seguro={true}
          />

          <View style={s.btnContainer}>
            <TouchableOpacity style={s.btnSalvar} activeOpacity={0.85} onPress={handleSalvar}>
              <Text style={s.btnSalvarText}>SALVAR</Text>
              <Ionicons name="checkmark-sharp" size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={s.footer}>
          <Text style={s.footerText}>Terminal v1.0 // Protocolo Registro</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Campo({ label, placeholder, valor, onChange, icone, tipo = 'default', seguro = false }) {
  const [foco, setFoco] = useState(false);
  return (
    <View style={estilosCampo.wrapper}>
      <View style={estilosCampo.labelWrapper}>
        <Text style={estilosCampo.label}>{label.toUpperCase()}</Text>
        {icone && <Ionicons name={icone} size={14} color="#8B2244" />}
      </View>
      <TextInput
        style={[
          estilosCampo.input,
          foco && estilosCampo.inputFoco,
        ]}
        placeholder={placeholder}
        placeholderTextColor="#c9849a"
        value={valor}
        onChangeText={onChange}
        onFocus={() => setFoco(true)}
        onBlur={() => setFoco(false)}
        keyboardType={tipo}
        autoCapitalize="none"
        secureTextEntry={seguro}
      />
    </View>
  );
}

const estilosCampo = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  labelWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(139, 34, 68, 0.2)',
    paddingBottom: 4,
    marginBottom: 6,
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    color: '#8B2244',
    letterSpacing: 1.5,
    fontFamily: fontes.mono,
  },
  input: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#8B2244',
    backgroundColor: 'transparent',
    padding: 12,
    fontSize: 14,
    fontWeight: '700',
    color: '#5a1a30',
    fontFamily: fontes.sans,
  },
  inputFoco: {
    borderWidth: 3,
    backgroundColor: '#fdf0f4',
  },
});

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f5d0dc',
  },
  bgPattern: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.05,
    // Em React Native, padrões de grade complexos são difíceis sem SVGs ou imagens.
    // Usaremos a cor sólida com opacidade conforme definido no background.
  },
  header: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 4,
    borderColor: '#8B2244',
    paddingHorizontal: 24,
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  headerTitle: {
    fontFamily: fontes.sans,
    fontSize: 24,
    fontWeight: '900',
    color: '#8B2244',
    letterSpacing: -1,
    lineHeight: 24,
  },
  headerIconContainer: {
    backgroundColor: '#c9567a',
    borderWidth: 3,
    borderColor: '#8B2244',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#ffffff',
    borderWidth: 3,
    borderColor: '#8B2244',
    padding: 24,
    // Sombra Neobrutalista "Hard"
    shadowColor: '#8B2244',
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
  },
  btnContainer: {
    paddingTop: 16,
  },
  btnSalvar: {
    backgroundColor: '#c9567a',
    borderWidth: 3,
    borderColor: '#8B2244',
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    // Sombra do botão
    shadowColor: '#8B2244',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
  },
  btnSalvarText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 2,
    fontFamily: fontes.sans,
  },
  footer: {
    marginTop: 24,
    alignItems: 'center',
    opacity: 0.4,
  },
  footerText: {
    fontFamily: fontes.mono,
    fontSize: 10,
    color: '#8B2244',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
});
