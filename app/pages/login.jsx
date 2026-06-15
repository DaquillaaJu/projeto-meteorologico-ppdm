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
  Image,
  ScrollView,
} from 'react-native';
import { cores, fontes } from '../../constants/theme';

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
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Decorative Grid Background */}
      <View style={s.bgPattern} />

      <ScrollView
        contentContainerStyle={s.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View 
          style={[
            s.card,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
          ]}
        >
          {/* Top Illustration Frame (Imagem Acima) */}
          <View style={s.imageFrame}>
            <Image 
              source={require('../../assets/images/estacoes.png')}
              style={s.illustration}
              resizeMode="cover"
            />
            <View style={s.badgeOverlay}>
              <Text style={s.badgeText}>ESTAÇÃO METEOROLÓGICA</Text>
            </View>
          </View>

          {/* Form Content */}
          <View style={s.formContent}>
            <Text style={s.titulo}>Olá! Bem-vindo(a)</Text>
            <Text style={s.subtitulo}>Ficamos felizes em te ver por aqui 🌤️</Text>

            {/* Campo E-mail */}
            <Text style={s.label}>E-MAIL</Text>
            <TextInput
              style={[s.input, focusEmail && s.inputFocus]}
              placeholder="seu@email.com"
              placeholderTextColor="#c9849a"
              value={usuario}
              onChangeText={setUsuario}
              onFocus={() => setFocusEmail(true)}
              onBlur={() => setFocusEmail(false)}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {/* Campo Senha */}
            <Text style={[s.label, { marginTop: 14 }]}>SENHA</Text>
            <TextInput
              style={[s.input, focusSenha && s.inputFocus]}
              placeholder="••••••••"
              placeholderTextColor="#c9849a"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
              onFocus={() => setFocusSenha(true)}
              onBlur={() => setFocusSenha(false)}
            />

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
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f5d0dc',
  },
  bgPattern: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.05,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  card: {
    backgroundColor: '#ffffff',
    borderWidth: 3,
    borderColor: '#8B2244',
    // Hard neobrutalist shadow
    shadowColor: '#8B2244',
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
    overflow: 'hidden',
  },
  imageFrame: {
    width: '100%',
    height: 180,
    borderBottomWidth: 3,
    borderColor: '#8B2244',
    position: 'relative',
  },
  illustration: {
    width: '100%',
    height: '100%',
  },
  badgeOverlay: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#c9567a',
    borderWidth: 2,
    borderColor: '#8B2244',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: '900',
    fontFamily: fontes.mono,
    letterSpacing: 1,
  },
  formContent: {
    padding: 24,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '900',
    color: '#8B2244',
    fontFamily: fontes.sans,
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 13,
    color: '#c9849a',
    fontFamily: fontes.sans,
    marginBottom: 24,
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    color: '#8B2244',
    letterSpacing: 1.5,
    marginBottom: 6,
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
    marginBottom: 12,
  },
  inputFocus: {
    borderWidth: 3,
    backgroundColor: '#fdf0f4',
  },
  esqueciBtn: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  esqueciText: {
    fontSize: 12,
    color: '#8B2244',
    fontFamily: fontes.sans,
  },
  btnEntrar: {
    backgroundColor: '#c9567a',
    borderWidth: 3,
    borderColor: '#8B2244',
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    // Sombra do botão
    shadowColor: '#8B2244',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
    marginBottom: 20,
  },
  btnEntrarText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 2,
    fontFamily: fontes.sans,
  },
  divisorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  divisorLinha: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(139, 34, 68, 0.2)',
  },
  divisorTexto: {
    marginHorizontal: 12,
    color: '#c9849a',
    fontSize: 13,
    fontFamily: fontes.sans,
  },
  btnCriar: {
    height: 52,
    borderWidth: 2,
    borderColor: '#8B2244',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCriarText: {
    color: '#8B2244',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 2,
    fontFamily: fontes.sans,
  },
});
