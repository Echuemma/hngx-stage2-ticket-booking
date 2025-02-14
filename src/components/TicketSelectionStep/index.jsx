import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Radio,
  FormControl,
  Select,
  MenuItem,
  Button,
  styled
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1b9999',
    },
    background: {
      default: '#0A1A1A',
      paper: '#102424',
    },
    text: {
      primary: '#ffffff',
      secondary: '#9e9e9e',
    },
  },
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  height: 'vh',
  width: '60%',
  margin: 'auto',
  padding: theme.spacing(4),
  backgroundColor: 'rgba(16, 36, 36, 0.9)',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('md')]: {
    width: '80%',
  },
  [theme.breakpoints.down('sm')]: {
    width: '95%',
    padding: theme.spacing(2),
  },
}));

const TicketCard = styled(Paper)(({ theme, selected }) => ({
  padding: theme.spacing(2),
  backgroundColor: 'rgba(10, 26, 26, 0.8)',
  cursor: 'pointer',
  transition: 'all 0.2s',
  border: selected ? `1px solid ${theme.palette.primary.main}` : '1px solid transparent',
  '&:hover': {
    backgroundColor: 'rgba(27, 153, 153, 0.2)',
  },
}));

const TicketSelectionStep = ({ onNext, initialData }) => {
  const [selectedTicket, setSelectedTicket] = useState(initialData?.selectedTicket || null);
  const [ticketCount, setTicketCount] = useState(initialData?.ticketCount || "1");
  const [error, setError] = useState("");

  const tickets = [
    { type: "REGULAR ACCESS", price: "Free", id: "20/30" },
    { type: "VIP ACCESS", price: "$150", id: "20/30" },
    { type: "VVIP ACCESS", price: "$150", id: "20/30" },
  ];

  const handleNext = () => {
    if (!selectedTicket) {
      setError("Please select a ticket type");
      return;
    }
    onNext({ selectedTicket, ticketCount });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          width: '100%',
          bgcolor: 'background.default',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <StyledPaper elevation={3} sx={{borderRadius: '12px' }} >
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center',  borderRadius: '12px' }}>
            <Typography variant="h6" color="text.primary">
              Ticket Selection
            </Typography>
            <Typography variant="body2" color="primary">
              Step 1/3
            </Typography>
          </Box>

          <Paper
            sx={{
              bgcolor: 'rgba(10, 26, 26, 0.6)',
              p: 3,
              mb: 4,
              textAlign: 'center'
            }}
          >
            <Typography variant="h4" gutterBottom>
              Techember Fest '25
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Join us for an unforgettable experience at<br />
              [Event Name]! Secure your spot now.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              * [Event Location] | March 15, 2025 | 7:00 PM
            </Typography>
          </Paper>

          <Typography variant="body2" sx={{ mb: 2 }}>
            Select Ticket Type:
          </Typography>

          <Grid container spacing={2} sx={{ mb: 4 }}>
            {tickets.map((ticket) => (
              <Grid item xs={12} sm={6} md={4} key={ticket.type}>
                <TicketCard
                  selected={selectedTicket?.type === ticket.type}
                  onClick={() => setSelectedTicket(ticket)}
                >
                  <Typography variant="h6">{ticket.price}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {ticket.type}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block">
                    {ticket.id}
                  </Typography>
                  <Radio
                    checked={selectedTicket?.type === ticket.type}
                    sx={{ display: 'none' }}
                  />
                </TicketCard>
              </Grid>
            ))}
          </Grid>

          {error && (
            <Typography color="error" variant="body2" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <FormControl fullWidth sx={{ mb: 4 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Number of Tickets
            </Typography>
            <Select
              value={ticketCount}
              onChange={(e) => setTicketCount(e.target.value)}
              sx={{ bgcolor: 'rgba(10, 26, 26, 0.8)' }}
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 2,
              mt: 'auto'
            }}
          >
            <Button
             id="btn"
              variant="contained"
              color="inherit"
              onClick={() => console.log("Cancel clicked")}
              sx={{ bgcolor: 'rgba(97, 97, 97, 0.5)', py: 1.5 }}
            >
              Cancel
            </Button>
            <Button
             id="btn"
              variant="contained"
              color="primary"
              onClick={handleNext}
              sx={{ py: 1.5 }}
            >
              Next
            </Button>
          </Box>
        </StyledPaper>
      </Box>
    </ThemeProvider>
  );
};

export default TicketSelectionStep;