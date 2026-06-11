import Rotas from './routes/index';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Rotas />
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}
