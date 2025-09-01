import { ThemeProvider } from '@/shared/model/context/ThemeProvider';
import { Layout } from './layout/Layout';

function App() {
  return (
    <ThemeProvider>
      <Layout />
    </ThemeProvider>
  );
}

export default App;
