import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { cores, fontes, sombra, raio } from '../../constants/theme';

export default function Login({ navigation }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusSenha, setFocusSenha] = useState(false);

  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1, duration: 700,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0, duration: 700,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const btnScale = useRef(new Animated.Value(1)).current;
  const onPressIn  = () => Animated.spring(btnScale, { toValue: 0.97, useNativeDriver: true }).start();
  const onPressOut = () => Animated.spring(btnScale, { toValue: 1,    useNativeDriver: true }).start();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={s.root}
    >
      <StatusBar barStyle="light-content" backgroundColor={cores.fundoPrimario} />

      {/* Círculos decorativos de fundo */}
      <View style={[s.circulo, s.circulo1]} />
      <View style={[s.circulo, s.circulo2]} />
      <View style={[s.circulo, s.circulo3]} />

      <Animated.View style={[s.card, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>

        {/* Ícone do topo */}
        <View style={s.iconeTopo}>
          <Text style={s.iconeEmoji}>🌤️</Text>
        </View>

        <Text style={s.titulo}>Estação Meteorológica</Text>
        <Text style={s.subtitulo}>Faça login para continuar</Text>

        {/* Campo E-mail */}
        <Text style={s.label}>E-MAIL</Text>
        <View style={[s.inputBox, focusEmail && s.inputFocus]}>
          <TextInput
            style={s.input}
            placeholder="seu@email.com"
            placeholderTextColor={cores.textoMuted}
            value={usuario}
            onChangeText={setUsuario}
            onFocus={() => setFocusEmail(true)}
            onBlur={() => setFocusEmail(false)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Campo Senha */}
        <Text style={[s.label, { marginTop: 14 }]}>SENHA</Text>
        <View style={[s.inputBox, focusSenha && s.inputFocus]}>
          <TextInput
            style={s.input}
            placeholder="••••••••"
            placeholderTextColor={cores.textoMuted}
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
            onFocus={() => setFocusSenha(true)}
            onBlur={() => setFocusSenha(false)}
          />
        </View>

        <TouchableOpacity style={s.esqueciBtn}>
          <Text style={s.esqueciText}>Esqueceu a senha?</Text>
        </TouchableOpacity>

        {/* Botão Entrar */}
        <Animated.View style={{ transform: [{ scale: btnScale }] }}>
          <TouchableOpacity
            style={s.btnEntrar}
            onPress={() => navigation.replace('Inicio')}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            activeOpacity={1}
          >
            <Text style={s.btnEntrarText}>ENTRAR</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Divisor */}
        <View style={s.divisorRow}>
          <View style={s.divisorLinha} />
          <Text style={s.divisorTexto}>ou</Text>
          <View style={s.divisorLinha} />
        </View>

        {/* Botão Criar Conta */}
        <TouchableOpacity
          style={s.btnCriar}
          onPress={() => navigation.navigate('Cadastro')}
          activeOpacity={0.8}
        >
          <Text style={s.btnCriarText}>CRIAR CONTA</Text>
        </TouchableOpacity>

      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: cores.fundoPrimario,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  // Círculos decorativos
  circulo: {
    position: 'absolute',
    borderRadius: 9999,
    backgroundColor: '#FFFFFF',
    opacity: 0.06,
  },
  circulo1: { width: 320, height: 320, top: -100, right: -80 },
  circulo2: { width: 220, height: 220, bottom: 60, left: -60 },
  circulo3: { width: 140, height: 140, bottom: 200, right: -30 },

  card: {
    width: '88%',
    backgroundColor: cores.cardFundo,
    borderRadius: raio.xl,
    paddingVertical: 36,
    paddingHorizontal: 28,
    ...sombra.card,
  },

  iconeTopo: {
    alignSelf: 'center',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: cores.superficie,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  iconeEmoji: { fontSize: 30 },

  titulo: {
    fontSize: 20,
    fontWeight: '700',
    color: cores.textoEscuro,
    textAlign: 'center',
    fontFamily: fontes.sans,
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 13,
    color: cores.textoMuted,
    textAlign: 'center',
    fontFamily: fontes.sans,
    marginBottom: 28,
  },

  label: {
    fontSize: 11,
    fontWeight: '700',
    color: cores.fundoSecundario,
    letterSpacing: 1.5,
    marginBottom: 6,
    fontFamily: fontes.sans,
  },
  inputBox: {
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: raio.md,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 14,
    height: 50,
    justifyContent: 'center',
  },
  inputFocus: {
    borderColor: cores.fundoSecundario,
    backgroundColor: '#FFFFFF',
  },
  input: {
    fontSize: 15,
    color: cores.textoCard,
    fontFamily: fontes.sans,
  },

  esqueciBtn: { alignSelf: 'flex-end', marginTop: 8, marginBottom: 22 },
  esqueciText: {
    fontSize: 12,
    color: cores.acento,
    fontFamily: fontes.sans,
  },

  btnEntrar: {
    backgroundColor: cores.fundoSecundario,
    height: 52,
    borderRadius: raio.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  btnEntrarText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 2,
    fontFamily: fontes.sans,
  },

  divisorRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  divisorLinha: { flex: 1, height: 1, backgroundColor: '#E2E8F0' },
  divisorTexto: {
    marginHorizontal: 12,
    color: cores.textoMuted,
    fontSize: 13,
    fontFamily: fontes.sans,
  },

  btnCriar: {
    height: 52,
    borderRadius: raio.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: cores.fundoSecundario,
  },
  btnCriarText: {
    color: cores.fundoSecundario,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 2,
    fontFamily: fontes.sans,
  },
});
