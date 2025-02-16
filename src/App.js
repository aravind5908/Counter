import { useState } from "react";
import { Button, TextField } from "@mui/material";
import './App.css';
import CalendarTable from './components/table';

function App() {
  const [number, setNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!isNaN(number) && number > 0) {
      setSubmitted(true);
    }
  };

  return (
    <div className="flex flex-col items-center p-8 min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        {!submitted ? (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
              Temple Counter
            </h1>
            <TextField
              fullWidth
              type="number"
              label="Enter number of days"
              variant="outlined"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleSubmit}
              fullWidth
              size="large"
              sx={{ py: 1.5 }}
            >
              Generate Table
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
               {number}- rounds are selected
            </h2>
            <CalendarTable numberOfDays={number} />
            
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
