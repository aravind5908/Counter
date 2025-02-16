import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';

function StartScreen() {
  const [numberOfDays, setNumberOfDays] = useState('');
  const navigate = useNavigate();

  const handleStart = () => {
    if (numberOfDays) {
      navigate(`/calendar?days=${numberOfDays}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
          Temple Counter
        </h1>
        
        <div className="space-y-6">
        <br/>
        <br/>
          <TextField
            label="Enter number of days"
            type="number"
            value={numberOfDays}
            onChange={(e) => setNumberOfDays(e.target.value)}
            variant="outlined"
            fullWidth
            inputProps={{ 
              min: 1,
              style: { fontSize: '1.1rem', padding: '12px' }
            }}
            InputLabelProps={{
              style: { fontSize: '1.1rem' }
            }}
            sx={{ 
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'white',
                borderRadius: '8px',
                '&:hover fieldset': {
                  borderColor: '#90caf9',
                },
              }
            }}
          />
          <br/>
          <br/>
          <br/>
          <br/>
          <Button 
            onClick={handleStart}
            variant="contained" 
            color="primary"
            size="large"
            fullWidth
            disabled={!numberOfDays}
            sx={{ 
              py: 1.5,
              fontSize: { xs: '1.1rem', sm: '1.2rem' },
              borderRadius: '8px',
              textTransform: 'none',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              '&:hover': {
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                backgroundColor: '#1976d2'
              },
              '&:disabled': {
                backgroundColor: '#90caf9',
                color: 'white'
              }
            }}
          >
            Start Counter
          </Button>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .MuiTextField-root {
            font-size: 16px;
          }
          input[type="number"] {
            font-size: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default StartScreen; 