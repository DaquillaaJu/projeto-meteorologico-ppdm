// import {View, Text} from 'react-native'

// export default function Relatorio(){
//     return(
//         <View>
//             <Text>Tela de Relatorio</Text>
//         </View>
//     )
// }




import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { cores, fontes, sombra, raio } from '../../constants/theme';

const REGISTROS = [
  { hora: '08:00', temp: 22, umidade: 80, vento: 12, chuva: 0.0 },
  { hora: '10:00', temp: 25, umidade: 75, vento: 15, chuva: 0.0 },
  { hora: '12:00', temp: 28, umidade: 70, vento: 18, chuva: 0.0 },
  { hora: '14:00', temp: 30, umidade: 65, vento: 22, chuva: 0.0 },
  { hora: '16:00', temp: 27, umidade: 72, vento: 14, chuva: 2.4 },
  { hora: '18:00', temp: 24, umidade: 82, vento: 10, chuva: 5.1 },
];

const PERIODOS = ['Hoje', 'Semana', 'Mês'];

export default function Relatorio() {
  const [periodoAtivo, setPeriodoAtivo] = useState(0);

  const mediaTemp    = Math.round(REGISTROS.reduce((a, r) => a + r.temp, 0) / REGISTROS.length);
  const mediaUmidade = Math.round(REGISTROS.reduce((a, r) => a + r.umidade, 0) / REGISTROS.length);
  const totalChuva   = REGISTROS.reduce((a, r) => a + r.chuva, 0).toFixed(1);
  const maxVento     = Math.max(...REGISTROS.map(r => r.vento));

  return (
    <ScrollView style={s.root} contentContainerStyle={s.conteudo} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" backgroundColor={cores.fundoPrimario} />

      <View style={[s.circulo, s.circulo1]} />
      <View style={[s.circulo, s.circulo2]} />

      {/* Seletor de período */}
      <View style={s.periodoRow}>
        {PERIODOS.map((p, i) => (
          <TouchableOpacity
            key={i}
            style={[s.periodoBtn, periodoAtivo === i && s.periodoBtnAtivo]}
            onPress={() => setPeriodoAtivo(i)}
          >
            <Text style={[s.periodoBtnText, periodoAtivo === i && s.periodoBtnTextAtivo]}>{p}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Cards de resumo */}
      <View style={s.resumoGrid}>
        <ResumoCard icone="thermometer"  label="Temp. média"  valor={`${mediaTemp}°C`}    cor="#F5C842" />
        <ResumoCard icone="water"        label="Umidade méd." valor={`${mediaUmidade}%`}  cor="#4A9FD4" />
        <ResumoCard icone="rainy"        label="Chuva total"  valor={`${totalChuva}mm`}   cor="#60A5FA" />
        <ResumoCard icone="speedometer"  label="Pico de vento" valor={`${maxVento}km/h`}  cor="#22C55E" />
      </View>

      {/* Tabela de registros */}
      <Text style={s.secaoTitulo}>Leituras do dia</Text>
      <View style={s.tabelaCard}>
        {/* Cabeçalho */}
        <View style={[s.tabelaRow, s.tabelaHeader]}>
          {['Hora', 'Temp', 'Umid', 'Vento', 'Chuva'].map(col => (
            <Text key={col} style={s.tabelaHeaderText}>{col}</Text>
          ))}
        </View>
        {/* Linhas */}
        {REGISTROS.map((r, i) => (
          <View key={i} style={[s.tabelaRow, i % 2 === 0 && s.tabelaRowPar]}>
            <Text style={s.tabelaCelula}>{r.hora}</Text>
            <Text style={[s.tabelaCelula, { color: r.temp >= 28 ? '#EF4444' : r.temp <= 22 ? '#4A9FD4' : cores.textoCard }]}>
              {r.temp}°C
            </Text>
            <Text style={s.tabelaCelula}>{r.umidade}%</Text>
            <Text style={s.tabelaCelula}>{r.vento}km/h</Text>
            <Text style={[s.tabelaCelula, r.chuva > 0 && { color: '#4A9FD4', fontWeight: '600' }]}>
              {r.chuva > 0 ? `${r.chuva}mm` : '—'}
            </Text>
          </View>
        ))}
      </View>

      {/* Botão exportar */}
      <TouchableOpacity style={s.btnExportar} activeOpacity={0.85}>
        <Ionicons name="download-outline" size={20} color="#FFF" />
        <Text style={s.btnExportarText}>EXPORTAR RELATÓRIO</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

function ResumoCard({ icone, label, valor, cor }) {
  return (
    <View style={s.resumoCard}>
      <View style={[s.resumoIcone, { backgroundColor: cor + '20' }]}>
        <Ionicons name={icone} size={22} color={cor} />
      </View>
      <Text style={s.resumoValor}>{valor}</Text>
      <Text style={s.resumoLabel}>{label}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: cores.fundoPrimario },
  conteudo: { paddingHorizontal: 18, paddingTop: 16, paddingBottom: 40 },

  circulo: { position: 'absolute', borderRadius: 9999, backgroundColor: '#FFFFFF', opacity: 0.05 },
  circulo1: { width: 260, height: 260, top: -60, right: -60 },
  circulo2: { width: 160, height: 160, bottom: 200, left: -40 },

  periodoRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: raio.pill,
    padding: 4,
    marginBottom: 20,
  },
  periodoBtn: { flex: 1, paddingVertical: 8, borderRadius: raio.pill, alignItems: 'center' },
  periodoBtnAtivo: { backgroundColor: cores.fundoSecundario },
  periodoBtnText: { fontSize: 14, color: cores.textoSecundario, fontFamily: fontes.sans, fontWeight: '600' },
  periodoBtnTextAtivo: { color: '#FFFFFF' },

  resumoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  resumoCard: {
    width: '47%', flexGrow: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: raio.lg, padding: 16, alignItems: 'center',
  },
  resumoIcone: {
    width: 44, height: 44, borderRadius: 22,
    alignItems: 'center', justifyContent: 'center', marginBottom: 8,
  },
  resumoValor: {
    fontSize: 20, fontWeight: '700', color: cores.textoPrimario,
    fontFamily: fontes.sans,
  },
  resumoLabel: {
    fontSize: 11, color: cores.textoSecundario,
    fontFamily: fontes.sans, marginTop: 2, textAlign: 'center',
  },

  secaoTitulo: {
    fontSize: 16, fontWeight: '600', color: cores.textoPrimario,
    fontFamily: fontes.sans, marginBottom: 12,
  },

  tabelaCard: {
    backgroundColor: cores.cardFundo,
    borderRadius: raio.xl,
    overflow: 'hidden',
    marginBottom: 24,
    ...sombra.card,
  },
  tabelaRow: {
    flexDirection: 'row', paddingVertical: 12, paddingHorizontal: 14,
    borderBottomWidth: 1, borderBottomColor: '#F1F5F9',
  },
  tabelaRowPar: { backgroundColor: '#F8FAFC' },
  tabelaHeader: { backgroundColor: cores.fundoPrimario },
  tabelaHeaderText: {
    flex: 1, fontSize: 11, fontWeight: '700',
    color: '#FFFFFF', letterSpacing: 1, fontFamily: fontes.sans, textAlign: 'center',
  },
  tabelaCelula: {
    flex: 1, fontSize: 13, color: cores.textoCard,
    fontFamily: fontes.sans, textAlign: 'center',
  },

  btnExportar: {
    backgroundColor: cores.fundoSecundario, height: 52, borderRadius: raio.md,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
  },
  btnExportarText: {
    color: '#FFFFFF', fontSize: 14, fontWeight: '700', letterSpacing: 1.5, fontFamily: fontes.sans,
  },
});
