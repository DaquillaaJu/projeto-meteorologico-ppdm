import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
  Dimensions,
} from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';
import Ionicons from '@expo/vector-icons/Ionicons';
import { cores, fontes, sombra, raio } from '../../constants/theme';

const PREVISAO = [
  { dia: 'Seg', icone: 'sunny',         max: 31, min: 22 },
  { dia: 'Ter', icone: 'partly-sunny',  max: 28, min: 21 },
  { dia: 'Qua', icone: 'rainy',         max: 24, min: 19 },
  { dia: 'Qui', icone: 'thunderstorm',  max: 22, min: 18 },
  { dia: 'Sex', icone: 'cloudy',        max: 25, min: 20 },
  { dia: 'Sáb', icone: 'partly-sunny', max: 27, min: 21 },
  { dia: 'Dom', icone: 'sunny',         max: 30, min: 23 },
];

const ICONE_COR = {
  'sunny':         '#F5C842',
  'partly-sunny':  '#F5C842',
  'rainy':         '#4A9FD4',
  'thunderstorm':  '#94A3B8',
  'cloudy':        '#94A3B8',
};

export default function Dashboard() {
  const [diaAtivo, setDiaAtivo] = useState(0);
  const screenWidth = Dimensions.get('window').width - 36; // Margem lateral de 18 * 2

  // Dados para o Gráfico de Linhas (Temperaturas Máximas e Mínimas)
  const lineChartData = {
    labels: PREVISAO.map((p) => p.dia),
    datasets: [
      {
        data: PREVISAO.map((p) => p.max),
        color: (opacity = 1) => `rgba(139, 34, 68, ${opacity})`, // Burgundy
        strokeWidth: 3,
      },
      {
        data: PREVISAO.map((p) => p.min),
        color: (opacity = 1) => `rgba(201, 86, 122, ${opacity})`, // Pink
        strokeWidth: 2,
      },
    ],
    legend: ['Máx (°C)', 'Mín (°C)'],
  };

  // Dados para o Gráfico de Setores (Distribuição das Condições Climáticas)
  const pieChartData = [
    {
      name: 'Ensolarado',
      population: 2,
      color: '#8b2244',
      legendFontColor: '#8b2244',
      legendFontSize: 12,
    },
    {
      name: 'Parc. Nublado',
      population: 2,
      color: '#c9567a',
      legendFontColor: '#8b2244',
      legendFontSize: 12,
    },
    {
      name: 'Chuvoso',
      population: 2,
      color: '#4A9FD4',
      legendFontColor: '#8b2244',
      legendFontSize: 12,
    },
    {
      name: 'Nublado',
      population: 1,
      color: '#94A3B8',
      legendFontColor: '#8b2244',
      legendFontSize: 12,
    },
  ];

  return (
    <ScrollView
      style={s.root}
      contentContainerStyle={s.conteudo}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar barStyle="light-content" backgroundColor={cores.fundoPrimario} />

      {/* Círculos decorativos */}
      <View style={[s.circulo, s.circulo1]} />
      <View style={[s.circulo, s.circulo2]} />

      {/* Header de localização */}
      <View style={s.header}>
        <View>
          <Text style={s.headerCidade}>São Paulo, SP</Text>
          <Text style={s.headerData}>Quinta-feira, 11 de junho</Text>
        </View>
        <View style={s.headerBadge}>
          <Ionicons name="location" size={14} color={cores.destaque} />
          <Text style={s.headerBadgeText}>Ao vivo</Text>
        </View>
      </View>

      {/* Card principal — temperatura */}
      <View style={s.cardTemp}>
        <View style={s.cardTempEsq}>
          <Text style={s.tempNumero}>28°</Text>
          <Text style={s.tempDescricao}>Parcialmente nublado</Text>
          <Text style={s.tempSensacao}>Sensação: 30°C</Text>
        </View>
        <View style={s.cardTempDir}>
          <Ionicons name="partly-sunny" size={90} color={cores.destaque} />
        </View>
      </View>

      {/* Faixa de métricas */}
      <View style={s.metricasRow}>
        <MetricaCard icone="water"      label="Umidade"   valor="74%"      cor="#4A9FD4" />
        <MetricaCard icone="speedometer" label="Vento"    valor="18 km/h"  cor="#22C55E" />
        <MetricaCard icone="eye"         label="Visib."   valor="10 km"    cor="#A78BFA" />
        <MetricaCard icone="sunny"       label="UV"       valor="Índice 3" cor="#F5C842" />
      </View>

      {/* Seção de Gráficos e Estatísticas */}
      <View style={s.secaoHeader}>
        <Text style={s.secaoTitulo}>Análise Climática</Text>
      </View>
      
      <View style={s.chartContainer}>
        <Text style={s.chartTitle}>Tendência de Temperatura (°C)</Text>
        <LineChart
          data={lineChartData}
          width={screenWidth - 24}
          height={200}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(139, 34, 68, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(139, 34, 68, ${opacity})`,
            propsForDots: {
              r: '4',
              strokeWidth: '2',
              stroke: '#8b2244',
            },
          }}
          bezier
          style={s.chartStyle}
        />
      </View>

      <View style={s.chartContainer}>
        <Text style={s.chartTitle}>Distribuição das Condições</Text>
        <PieChart
          data={pieChartData}
          width={screenWidth - 24}
          height={160}
          chartConfig={{
            color: (opacity = 1) => `rgba(139, 34, 68, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
          style={s.chartStyle}
        />
      </View>

      {/* Previsão 7 dias */}
      <View style={s.secaoHeader}>
        <Text style={s.secaoTitulo}>Próximos 7 dias</Text>
        <TouchableOpacity>
          <Text style={s.secaoLink}>Ver mais</Text>
        </TouchableOpacity>
      </View>

      <View style={s.previsaoCard}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {PREVISAO.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={[s.diaItem, diaAtivo === i && s.diaItemAtivo]}
              onPress={() => setDiaAtivo(i)}
              activeOpacity={0.8}
            >
              <Text style={[s.diaNome, diaAtivo === i && s.diaTextoAtivo]}>{item.dia}</Text>
              <Ionicons
                name={item.icone}
                size={24}
                color={diaAtivo === i ? '#FFFFFF' : ICONE_COR[item.icone]}
                style={{ marginVertical: 8 }}
              />
              <Text style={[s.diaMax, diaAtivo === i && s.diaTextoAtivo]}>{item.max}°</Text>
              <Text style={[s.diaMin, diaAtivo === i && { color: 'rgba(255,255,255,0.7)' }]}>{item.min}°</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Card detalhe extra */}
      <View style={s.secaoHeader}>
        <Text style={s.secaoTitulo}>Detalhes de hoje</Text>
      </View>
      <View style={s.detalhesGrid}>
        <DetalheItem icone="thermometer"    label="Máxima"      valor="31°C" />
        <DetalheItem icone="thermometer-outline" label="Mínima" valor="22°C" />
        <DetalheItem icone="cloud"          label="Chuva"        valor="20%" />
        <DetalheItem icone="compass"        label="Direção vento" valor="NE" />
        <DetalheItem icone="sunny-outline"  label="Nascer do sol" valor="06:22" />
        <DetalheItem icone="moon"           label="Pôr do sol"    valor="17:48" />
      </View>

    </ScrollView>
  );
}

function MetricaCard({ icone, label, valor, cor }) {
  return (
    <View style={s.metricaCard}>
      <View style={[s.metricaIcone, { backgroundColor: cor + '20' }]}>
        <Ionicons name={icone} size={20} color={cor} />
      </View>
      <Text style={s.metricaValor}>{valor}</Text>
      <Text style={s.metricaLabel}>{label}</Text>
    </View>
  );
}

function DetalheItem({ icone, label, valor }) {
  return (
    <View style={s.detalheItem}>
      <Ionicons name={icone} size={20} color={cores.acento} />
      <Text style={s.detalheLabel}>{label}</Text>
      <Text style={s.detalheValor}>{valor}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: cores.fundoPrimario,
  },
  conteudo: {
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 32,
  },

  circulo: {
    position: 'absolute',
    borderRadius: 9999,
    backgroundColor: '#FFFFFF',
    opacity: 0.05,
  },
  circulo1: { width: 300, height: 300, top: -60, right: -80 },
  circulo2: { width: 180, height: 180, top: 200, left: -60 },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerCidade: {
    fontSize: 20,
    fontWeight: '700',
    color: cores.textoPrimario,
    fontFamily: fontes.sans,
  },
  headerData: {
    fontSize: 13,
    color: cores.textoSecundario,
    fontFamily: fontes.sans,
    marginTop: 2,
  },
  headerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: raio.pill,
  },
  headerBadgeText: {
    fontSize: 12,
    color: cores.destaque,
    fontFamily: fontes.sans,
    fontWeight: '600',
  },

  cardTemp: {
    backgroundColor: cores.fundoSecundario,
    borderRadius: raio.xl,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    ...sombra.card,
  },
  cardTempEsq: { flex: 1 },
  cardTempDir: { marginLeft: 8 },
  tempNumero: {
    fontSize: 72,
    fontWeight: '700',
    color: cores.textoPrimario,
    fontFamily: fontes.sans,
    lineHeight: 80,
  },
  tempDescricao: {
    fontSize: 16,
    color: cores.textoSecundario,
    fontFamily: fontes.sans,
    marginTop: 4,
  },
  tempSensacao: {
    fontSize: 13,
    color: cores.textoSecundario,
    fontFamily: fontes.sans,
    marginTop: 4,
    opacity: 0.8,
  },

  metricasRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  metricaCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: raio.lg,
    padding: 12,
    alignItems: 'center',
  },
  metricaIcone: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  metricaValor: {
    fontSize: 13,
    fontWeight: '700',
    color: cores.textoPrimario,
    fontFamily: fontes.sans,
    textAlign: 'center',
  },
  metricaLabel: {
    fontSize: 11,
    color: cores.textoSecundario,
    fontFamily: fontes.sans,
    marginTop: 2,
    textAlign: 'center',
  },

  secaoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 8,
  },
  secaoTitulo: {
    fontSize: 16,
    fontWeight: '600',
    color: cores.textoPrimario,
    fontFamily: fontes.sans,
  },
  secaoLink: {
    fontSize: 13,
    color: cores.acento,
    fontFamily: fontes.sans,
  },

  chartContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#8b2244',
    padding: 12,
    marginBottom: 16,
    borderRadius: 0,
  },
  chartTitle: {
    fontFamily: fontes.sans,
    fontSize: 14,
    fontWeight: '700',
    color: '#8b2244',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  chartStyle: {
    marginVertical: 4,
  },

  previsaoCard: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: raio.xl,
    padding: 16,
    marginBottom: 24,
  },
  diaItem: {
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: raio.lg,
    marginRight: 6,
    minWidth: 60,
  },
  diaItemAtivo: {
    backgroundColor: cores.fundoSecundario,
    ...sombra.leve,
  },
  diaNome: {
    fontSize: 12,
    color: cores.textoSecundario,
    fontFamily: fontes.sans,
    fontWeight: '600',
  },
  diaTextoAtivo: { color: '#FFFFFF' },
  diaMax: {
    fontSize: 14,
    fontWeight: '700',
    color: cores.textoPrimario,
    fontFamily: fontes.sans,
  },
  diaMin: {
    fontSize: 12,
    color: cores.textoSecundario,
    fontFamily: fontes.sans,
  },

  detalhesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  detalheItem: {
    width: '30%',
    flexGrow: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: raio.lg,
    padding: 14,
    alignItems: 'center',
    gap: 4,
  },
  detalheLabel: {
    fontSize: 11,
    color: cores.textoSecundario,
    fontFamily: fontes.sans,
    textAlign: 'center',
    marginTop: 2,
  },
  detalheValor: {
    fontSize: 14,
    fontWeight: '700',
    color: cores.textoPrimario,
    fontFamily: fontes.sans,
  },
});
