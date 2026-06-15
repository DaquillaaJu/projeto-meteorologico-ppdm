import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';

// import das telas
import Login from '../pages/login';
import Dashboard from '../pages/dashboard';
import Registro from '../pages/registro';
import Relatorio from '../pages/relatorio';
import Cadastro from '../pages/cadastro';
import RegistroDados from '../pages/registroDados';

// import do tema
import { cores } from '../../constants/theme';

const Stack = createStackNavigator();
const Draw = createDrawerNavigator();

function MenuSuperior() {
  return (
    <Draw.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: cores.fundoPrimario,
        },
        headerTintColor: cores.textoEscuro,
        headerTitleAlign: 'center',
        drawerActiveTintColor: cores.fundoSecundario,
        drawerInactiveTintColor: cores.textoMuted,
        drawerStyle: {
          backgroundColor: cores.cardFundo,
        },
        drawerIcon: ({ color, size, focused }) => {
          let nomeIcone = 'menu-outline';

          if (route.name === 'Estação Meteorológica') {
            nomeIcone = focused ? 'cloud-sunny' : 'cloud-sunny-outline';
          }
          if (route.name === 'Registrar Clima') {
            nomeIcone = focused ? 'create' : 'create-outline';
          }
          if (route.name === 'Cadastro') {
            nomeIcone = focused ? 'add-circle' : 'add-circle-outline';
          }
          if (route.name === 'Relatório') {
            nomeIcone = focused ? 'document-text' : 'document-text-outline';
          }
          
          return <Ionicons name={nomeIcone} size={size} color={color} />;
        },
      })}
    > 
      <Draw.Screen name='Estação Meteorológica' component={Dashboard} />
      <Draw.Screen name='Registrar Clima' component={RegistroDados} />
      <Draw.Screen name='Cadastro' component={Cadastro} />
      <Draw.Screen name='Relatório' component={Relatorio} />
    </Draw.Navigator>
  );
}

export default function Rotas() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Registro' component={Registro} options={{ headerShown: false }} />
      <Stack.Screen name='Inicio' component={MenuSuperior} />
    </Stack.Navigator>
  );
}
