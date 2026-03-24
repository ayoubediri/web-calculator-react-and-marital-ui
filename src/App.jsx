import { Box, Button, CssBaseline, Typography } from '@mui/material';
import { keyframes } from '@mui/system';
import './index.css'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const shakeAnimation = keyframes`
    0% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(8px); }
    60% { transform: translateX(-8px); }
    80% { transform: translateX(8px); }
    100% { transform: translateX(0); }
  `;

function App() {

  const [display, setDisplay] = useState('0');
  const op = "-+/*"
  

  useEffect(() => {
    if (display === 'Error') {
      const timer = setTimeout(() => setDisplay('0'), 1000);
      return () => clearTimeout(timer);
    }
  }, [display]);

  const handleCalculate = useCallback(() =>
  {
    setDisplay(prev =>
    {
      if (prev === 'Error') return prev;
      try
      {
        const calculateNode = new Function('return ' + prev);
        const result = calculateNode();
       return result.toString();
      }
      catch (error)
      {
        return 'Error';
      }
    });
  }, []);
  const handleReturn = useCallback(() =>
  {
    setDisplay(prev =>
    {
      if (prev === 'Error') return prev;
      if (prev === 'Infinity' || prev === '-Infinity') return '0';
      return prev.slice(0, -1) || '0';
    });
  }, [op]);


  const handleCancel = useCallback(() =>
  {
    setDisplay(prev => {
      if (prev === 'Error') return prev;
      return '0';
    });
  }, []);

  const handleOperators = useCallback((operator) =>
  {
    setDisplay(prev => {
      if (prev === 'Error') return prev;
      if (op.includes(prev.slice(-1)))
        return prev.slice(0,-1) + operator;
      return prev + operator;
    });
  }, []);

  const handleNumber = useCallback((value) =>
  {
    setDisplay(prev => {
      if (prev === 'Error') return prev;
      if (prev === '0' || prev === '')
        return value;
      else
        return prev + value;
    });
  }, []);

  useEffect(() =>
  {
    const keyDownHandler = (event) =>
    {
      const { key } = event;
      if (key === 'Escape') handleCancel();
      else if (key === 'Backspace') handleReturn();
      else if (key === 'Enter' || key === '=') handleCalculate();
      else if (key === '.') handleNumber('.');
      else if (key >= '0' && key <= '9') handleNumber(key);
      else if (op.includes(key)) handleOperators(key);
    };

    window.addEventListener('keydown', keyDownHandler);
    return () => {
      window.removeEventListener('keydown', keyDownHandler);
    };
  }, [handleCalculate, handleCancel, handleReturn, handleNumber, handleOperators]);

  const renderedButtons = useMemo(() => {
    const calcuBtn = [
      { key: 'cancel', label: 'C', action: handleCancel },
      { key: 'return', label: '←', action: handleReturn },
      { key: 'number0', label: '0', action: () => handleNumber('0') },
      { key: 'number1', label: '1', action: () => handleNumber('1') },
      { key: 'number2', label: '2', action: () => handleNumber('2') },
      { key: 'number3', label: '3', action: () => handleNumber('3') },
      { key: 'number4', label: '4', action: () => handleNumber('4') },
      { key: 'number5', label: '5', action: () => handleNumber('5') },
      { key: 'number6', label: '6', action: () => handleNumber('6') },
      { key: 'number7', label: '7', action: () => handleNumber('7') },
      { key: 'number8', label: '8', action: () => handleNumber('8') },
      { key: 'number9', label: '9', action: () => handleNumber('9') },
      { key: 'point', label: '.', action: () => handleNumber('.') },
      { key: 'operator_add', label: '+', action: () => handleOperators('+') },
      { key: 'operator_sub', label: '-', action: () => handleOperators('-') },
      { key: 'operator_div', label: '/', action: () => handleOperators('/') },
      { key: 'operator_mul', label: '*', action: () => handleOperators('*') },
      { key: 'operator_eq', label: '=', action: handleCalculate }
    ];

    return calcuBtn.map((btn) => (
      <Button
        key={btn.key}
        sx={{ gridArea: btn.key }}
        variant="contained"
        onClick={btn.action}
      >
        {btn.label}
      </Button>
    ));
  }, [handleCancel, handleReturn, handleNumber, handleOperators, handleCalculate]);
  return (
    <>
      <CssBaseline />
      <Box sx={{ width: '100vw',
                 height: '100vh',
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
                 bgcolor: '#f5f5f5'}}>
        <Box sx={{  bgcolor: `var(--backGroundColor)`,
                    width: 'min(80vw, 600px)',
                    height:'min(80vh, 800px)',
                    borderRadius: '20px',
                    boxShadow: '0 16px 32px rgba(0, 10, 10, 0.4)',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gridTemplateRows: 'repeat(6, 1fr)',

                    gap: '10px',
                    padding: '20px',
                    gridTemplateAreas:`
                    'screen screen screen screen'
                    'cancel cancel return return'
                    'number7 number8 number9 operator_div'
                    'number4 number5 number6 operator_mul'
                    'number1 number2 number3 operator_sub'
                    'number0 point operator_eq operator_add'
                    `,
                    '& .MuiButton-root': {
                      width: '100%',
                      height: '100%',
                      borderRadius: '12px',
                      fontSize: '3rem'
                    },                      
                    }}>
            <Box sx={{  gridArea: 'screen',
                        overflow: 'hidden',
                        whiteSpace:'nowrap',
                        textOverflow: 'ellipsis',
                        bgcolor: display === 'Error' ? '#ff6b6b' : '#222',
                        color: '#ffffff',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        padding: '10px',
                        animation: display === 'Error' ? `${shakeAnimation} 0.5s ease-in-out` : 'none',
                        transition: 'background-color 0.5s ease'
             }}>
              <Typography sx={{fontSize: '2.5rem'}}>
                {display}
              </Typography>
            </Box>
            {renderedButtons}
        </Box>
      </Box>
    </>
  );
}

export default App
