import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useState, useRef } from "react";
import { Link } from 'react-router-dom';

function CalendarTable({ numberOfDays }) {
  const [activeNumbers, setActiveNumbers] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(null);
  const [nextNumber, setNextNumber] = useState(1);
  const [currentRound, setCurrentRound] = useState(1);
  const [count, setCount] = useState(1);
  const [confirmationStep, setConfirmationStep] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);

  // Create refs for each number
  const numberRefs = useRef([]);

  // Create rows of 10 numbers each
  const rows = [];
  for (let i = 0; i < numberOfDays; i += 10) {
    rows.push(Array.from({ length: Math.min(10, numberOfDays - i) }, (_, index) => i + index + 1));
  }

  const handleActivateNumbers = (startNumber) => {
    if (startNumber <= numberOfDays) {
      const newActiveNumbers = [];
      for (let i = 0; i < 1 && (startNumber + i) <= numberOfDays; i++) {
        newActiveNumbers.push(startNumber + i);
      }
      setActiveNumbers([...activeNumbers, ...newActiveNumbers]);
      setCurrentNumber(startNumber);
      setNextNumber(startNumber + newActiveNumbers.length);

      // Check if a full cycle is completed
      if ((startNumber + newActiveNumbers.length - 1) % 10 === 0) {
        setCurrentRound(currentRound + 1);
      }
    }
  };

  const handleCellClick = (number) => {
    if (number === nextNumber) {
      handleActivateNumbers(number);
    }
  };

  const handleNext = () => {
    if (nextNumber <= numberOfDays) {
      setActiveNumbers([...activeNumbers, nextNumber]);
      setCurrentNumber(nextNumber);
      setNextNumber(nextNumber + 1);

      // Focus on the next number
      if (numberRefs.current[nextNumber]) {
        numberRefs.current[nextNumber].focus();
      }

      // Check if a full cycle is completed
      if (nextNumber % 10 === 0) {
        setCurrentRound(currentRound + 1);
      }
    }
  };

  const handleReset = () => {
    setActiveNumbers([]);
    setCurrentNumber(null);
    setNextNumber(1);
    setCurrentRound(1);
  };

  const handleNewTable = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = (confirm) => {
    if (confirm) {
      if (confirmationStep === 0) {
        setConfirmationStep(1);
      } else {
        // Reset the table or perform the new table action
        handleReset();
        setConfirmationStep(0);
        setOpenDialog(false);
      }
    } else {
      setConfirmationStep(0);
      setOpenDialog(false);
    }
  };

  return (
    <div className="space-y-4 p-4">

      <TableContainer 
        component={Paper} 
        sx={{
          width: '100%',
          maxHeight: '60vh',
          overflowY: 'auto',
          borderRadius: 2,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          '& .MuiTableCell-root': {
            borderColor: 'rgba(224, 224, 224, 1)',
            py: 2,
            fontSize: '0.9rem'
          }
        }}
      >
        <Table>
          <TableBody>
            {rows.map((row) => (
              <TableRow 
                key={row[0]}
                sx={{
                  '&:nth-of-type(odd)': {
                    backgroundColor: 'rgba(0, 0, 0, 0.02)',
                  },
                }}
              >
                {[...Array(10)].map((_, index) => {
                  const number = row[index];
                  const isActive = activeNumbers.includes(number);
                  const isNext = number === nextNumber;
                  return (
                    <TableCell 
                      key={index} 
                      align="center"
                      onClick={() => number && handleCellClick(number)}
                      ref={(el) => (numberRefs.current[number] = el)}
                      tabIndex={isNext ? 0 : -1}
                      sx={{
                        fontWeight: number ? 'normal' : 'light',
                        color: isActive ? 'white' : (number ? 'text.primary' : 'text.disabled'),
                        backgroundColor: isActive ? 'primary.main' : 'inherit',
                        cursor: isNext ? 'pointer' : 'default',
                        transition: 'all 0.2s ease',
                        position: 'relative',
                        '&:hover': isNext ? {
                          backgroundColor: 'primary.light',
                          color: 'white'
                        } : {},
                        ...(isNext && {
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            top: '2px',
                            right: '2px',
                            width: '8px',
                            height: '8px',
                            backgroundColor: '#2196f3',
                            borderRadius: '50%',
                            animation: 'pulse 1.5s infinite'
                          }
                        })
                      }}
                    >
                      {number || ""}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br/>
      <div className="bg-blue-100 p-2 rounded text-center">
        Current number: <span className="font-bold">{currentNumber !== null ? currentNumber : "None"}</span>
      </div>
      <div className="bg-green-100 p-2 rounded text-center mt-2">
        Current round: <span className="font-bold">{currentRound}</span>
      </div>
      <br/>
      <div className="flex justify-center mt-4">
        <Button 
          variant="contained" 
          sx={{ 
            minWidth: '150px',
            py: 2,
            backgroundColor: '#2196f3',
            color: 'white',
            fontSize: '1.2rem',
            '&:hover': {
              backgroundColor: '#1976d2'
            },
            '&:disabled': {
              backgroundColor: '#90caf9'
            }
          }}
          onClick={handleNext}
          disabled={nextNumber > numberOfDays}
        >
          Next
        </Button>
      </div>
    <br/><br/><br/>
    <br/><br/><br/>

      <Button 
        variant="contained" 
        color="error" 
        onClick={handleNewTable}
        fullWidth
        size="large"
        sx={{ 
          py: 1.5,
          flex: 1,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          }
        }}
      >
        New Table
      </Button>

      <Dialog
        open={openDialog}
        onClose={() => handleDialogClose(false)}
      >
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {confirmationStep === 0 ? "Are you sure you want to create a new table?" : "Please confirm again to create a new table."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDialogClose(true)} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <br/>
      <div className="flex justify-center gap-4 mt-4">
        <Button 
          variant="contained" 
          color="primary"
          component={Link}
          to="/"
          size="large"
          sx={{ 
            minWidth: '120px',
            py: 1.5,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            '&:hover': {
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            }
          }}
        >
          Go To Start Screen
        </Button>
      </div>
      <style global="true">{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
        @media (max-width: 640px) {
          .MuiTableCell-root {
            font-size: 0.8rem;
            padding: 8px;
          }
          .MuiButton-root {
            font-size: 1rem;
            min-width: 120px;
          }
        }
      `}</style>
    </div>
  );
}

export default CalendarTable;
