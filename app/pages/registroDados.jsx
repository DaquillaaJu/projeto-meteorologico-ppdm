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

export default function RegistroDados({ navigation }) {
  const [dia, setDia] = useState('Seg');
  const [max, setMax] = useState('');
  const [min, setMin] = useState('');
  const [condicao, setCondicao] = useState('sunny');
  const [umidade, setUmidade] = useState('');
  const [vento, setVento] = useState('');

  const diasDisponiveis = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
  const condicoesDisponiveis = [
    { id: 'sunny', label: 'Ensolarado', icone: 'sunny' },
    { id: 'partly-sunny', label: 'Misto', icone: 'partly-sunny' },
    { id: 'rainy', label: 'Chuvoso', icone: 'rainy' },
    { id: 'thunderstorm', label: 'Tempestade', icone: 'thunderstorm' },
    { id: 'cloudy', label: 'Nublado', icone: 'cloudy' },
  ];

  const handleSalvarMetricas = () => {
    console.log({ dia, max, min, condicao, umidade, vento });
    alert('Dados registrados com sucesso para o dashboard! 🌤️');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={s.root}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={s.bgPattern} />

      <ScrollView
        contentContainerStyle={s.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={s.card}>
          {/* Decorative Terminal Badge Header */}
          <View style={s.terminalHeader}>
            <Ionicons name="terminal" size={16} color="#ffffff" />
            <Text style={s.terminalHeaderText}>COLETA DE DADOS // PROTOCOLO V2.4</Text>
          </View>

          <Text style={s.subtitulo}>
            Alimente os gráficos do painel principal inserindo as novas medições climáticas da estação abaixo.
          </Text>

          {/* Seletor de Dia (Neobrutalist Chips com Sombra) */}
          <Text style={s.label}>DIA DA SEMANA</Text>
          <View style={s.diasRow}>
            {diasDisponiveis.map((d) => (
              <TouchableOpacity
                key={d}
                style={[s.diaChip, dia === d && s.diaChipAtivo]}
                onPress={() => setDia(d)}
                activeOpacity={0.9}
              >
                <Text style={[s.diaChipText, dia === d && s.diaChipTextAtivo]}>{d}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Temperaturas Máxima e Mínima em linha */}
          <View style={s.linha}>
            <View style={{ flex: 1 }}>
              <Campo
                label="Temp. Máxima"
                placeholder="Ex: 31°C"
                valor={max}
                onChange={setMax}
                tipo="numeric"
                icone="thermometer-outline"
              />
            </View>
            <View style={{ width: 14 }} />
            <View style={{ flex: 1 }}>
              <Campo
                label="Temp. Mínima"
                placeholder="Ex: 22°C"
                valor={min}
                onChange={setMin}
                tipo="numeric"
                icone="thermometer"
              />
            </View>
          </View>

          {/* Outras Métricas */}
          <View style={s.linha}>
            <View style={{ flex: 1 }}>
              <Campo
                label="Umidade"
                placeholder="Ex: 74%"
                valor={umidade}
                onChange={setUmidade}
                tipo="numeric"
                icone="water-outline"
              />
            </View>
            <View style={{ width: 14 }} />
            <View style={{ flex: 1 }}>
              <Campo
                label="Vento"
                placeholder="Ex: 18 km/h"
                valor={vento}
                onChange={setVento}
                tipo="numeric"
                icone="speedometer-outline"
              />
            </View>
          </View>

          {/* Seletor de Condição Climática */}
          <Text style={[s.label, { marginTop: 4 }]}>CONDIÇÃO ATUAL</Text>
          <View style={s.condicoesGrid}>
            {condicoesDisponiveis.map((c) => (
              <TouchableOpacity
                key={c.id}
                style={[s.condicaoCard, condicao === c.id && s.condicaoCardAtivo]}
                onPress={() => setCondicao(c.id)}
                activeOpacity={0.9}
              >
                <Ionicons
                  name={c.icone}
                  size={16}
                  color={condicao === c.id ? '#ffffff' : '#8B2244'}
                />
                <Text style={[s.condicaoText, condicao === c.id && s.condicaoTextAtivo]}>
                  {c.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Botão de Registro */}
          <TouchableOpacity style={s.btnSalvar} activeOpacity={0.85} onPress={handleSalvarMetricas}>
            <Text style={s.btnSalvarText}>REGISTRAR ENTRADA</Text>
            <Ionicons name="cloud-upload-outline" size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Campo({ label, placeholder, valor, onChange, icone, tipo = 'default' }) {
  const [foco, setFoco] = useState(false);
  return (
    <View style={estilosCampo.wrapper}>
      <View style={estilosCampo.labelWrapper}>
        <Text style={estilosCampo.label}>{label.toUpperCase()}</Text>
        {icone && <Ionicons name={icone} size={12} color="#8B2244" />}
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
    borderBottomWidth: 1.5,
    borderBottomColor: 'rgba(139, 34, 68, 0.25)',
    paddingBottom: 4,
    marginBottom: 6,
  },
  label: {
    fontSize: 9,
    fontWeight: '900',
    color: '#8B2244',
    letterSpacing: 1,
    fontFamily: fontes.mono,
  },
  input: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#8B2244',
    backgroundColor: '#FDFDFD',
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
  },
  scroll: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#ffffff',
    borderWidth: 3,
    borderColor: '#8B2244',
    padding: 20,
    // Sombra Neobrutalista "Hard"
    shadowColor: '#8B2244',
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
  },
  terminalHeader: {
    backgroundColor: '#8B2244',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 14,
  },
  terminalHeaderText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '900',
    fontFamily: fontes.mono,
    letterSpacing: 1,
  },
  subtitulo: {
    fontSize: 13,
    color: '#5a1a30',
    fontFamily: fontes.sans,
    marginBottom: 20,
    lineHeight: 18,
  },
  label: {
    fontSize: 10,
    fontWeight: '900',
    color: '#8B2244',
    letterSpacing: 1.5,
    marginBottom: 8,
    fontFamily: fontes.mono,
  },
  diasRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 16,
  },
  diaChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: '#8B2244',
    backgroundColor: '#ffffff',
    // mini hard shadow
    shadowColor: '#8B2244',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
  },
  diaChipAtivo: {
    backgroundColor: '#c9567a',
    shadowOffset: { width: 0, height: 0 },
  },
  diaChipText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#8B2244',
    fontFamily: fontes.sans,
  },
  diaChipTextAtivo: {
    color: '#ffffff',
  },
  linha: {
    flexDirection: 'row',
  },
  condicoesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 24,
  },
  condicaoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: '#8B2244',
    backgroundColor: '#ffffff',
    // mini hard shadow
    shadowColor: '#8B2244',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
  },
  condicaoCardAtivo: {
    backgroundColor: '#8B2244',
    shadowOffset: { width: 0, height: 0 },
  },
  condicaoText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#8B2244',
    fontFamily: fontes.sans,
  },
  condicaoTextAtivo: {
    color: '#ffffff',
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
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 2,
    fontFamily: fontes.sans,
  },
});
