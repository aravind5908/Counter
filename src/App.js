import { BrowserRouter as Router, Routes, Route, Navigate, useSearchParams } from 'react-router-dom';
import CalendarTable from './components/table';
import StartScreen from './components/StartScreen';

function CalendarWrapper() {
  const [searchParams] = useSearchParams();
  const days = parseInt(searchParams.get('days')) || 30;
  return <CalendarTable numberOfDays={days} />;
}

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Routes>
          <Route path="/" element={<StartScreen />} />
          <Route path="/calendar" element={<CalendarWrapper />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
