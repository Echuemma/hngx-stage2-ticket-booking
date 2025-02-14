import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  styled,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#14b8a6',
    },
    background: {
      default: '#042f2e',
      paper: '#134e4a',
    },
  },
});

const StyledTicketPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(19, 78, 74, 0.5)',
  border: '1px solid rgba(20, 184, 166, 0.3)',
  borderRadius: '24px',
  padding: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    borderRadius: '16px',
  },
}));

const ProfileImage = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '128px',
  height: '128px',
  margin: '0 auto',
  [theme.breakpoints.down('sm')]: {
    width: '96px',
    height: '96px',
  },
  '& img': {
    width: '100%',
    height: '100%',
    borderRadius: '16px',
    objectFit: 'cover',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to bottom, transparent, rgba(20, 184, 166, 0.3))',
    borderRadius: '16px',
  },
}));

const BarcodePaper = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(19, 78, 74, 0.5)',
  border: '1px solid rgba(20, 184, 166, 0.3)',
  borderRadius: '16px',
  padding: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
    borderRadius: '12px',
  },
}));

const TicketConfirmationStep = ({ ticketDetails, onDownload, onEmail, onReset }) => {
  const navigate = useNavigate();

  const handleBookAnother = () => {
    if (onReset) {
      onReset();
    }
    navigate('/');
  };

  if (!ticketDetails) return null;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        minHeight: 'vh',
        bgcolor: 'background.default',
        color: 'white',
        p: { xs: 2, sm: 3, md: 4 },
      }}>
        <Box sx={{ 
          maxWidth: { xs: '100%', sm: '40rem' }, 
          mx: 'auto',
          px: { xs: 1, sm: 2 }
        }}>
          <Box sx={{ textAlign: 'center', mb: { xs: 3, sm: 4 } }}>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: { xs: 'space-between', sm: 'center' },
              gap: { xs: 2, sm: 60 },
              p: { xs: 1, sm: 2 },
              marginBottom: { xs: 2, sm: 4 },
              borderRadius: 1
            }}>
              <Typography color="primary" 
                variant="body2" 
                sx={{ mb: 1 }}>
                Ready
              </Typography>
              <Typography color="primary" 
                variant="body2" 
                sx={{ mb: 1 }}>
                Step 3/3
              </Typography>
            </Box>
            <Typography variant="h4" 
              fontWeight="bold" 
              sx={{ 
                fontSize: { xs: '1.5rem', sm: '2rem' }
              }}>
              Your Ticket is Booked!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Check your email for a copy or you can download
            </Typography>
          </Box>

          <Box sx={{ 
            maxWidth: { xs: '100%', sm: '28rem' }, 
            mx: 'auto'
          }}
            role="article"
            aria-label="Event Ticket">
            <StyledTicketPaper>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, sm: 3 } }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" 
                    fontWeight="bold"
                    sx={{ 
                      fontSize: { xs: '1.25rem', sm: '1.5rem' }
                    }}>
                    {ticketDetails.eventName}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    [Event Name] at [Event Place]
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: 0.5, 
                    mt: 1 
                  }}>
                    <Box sx={{
                      width: 8,
                      height: 8,
                      bgcolor: 'primary.main',
                      borderRadius: '50%',
                    }} />
                    <Typography variant="caption">
                      {ticketDetails.eventDate} | {ticketDetails.eventTime}
                    </Typography>
                  </Box>
                </Box>

                <ProfileImage>
                  <img
                    src={ticketDetails.profilePhoto}
                    alt="Attendee profile"
                  />
                </ProfileImage>

                <Grid container spacing={0} sx={{ gap: { xs: 2, sm: 0 } }}>
                  <Grid item xs={12} sm={5.5}>
                    <Typography color="text.secondary" variant="body2">Event Attendee</Typography>
                    <Typography fontWeight="medium">{ticketDetails.attendee}</Typography>
                    <Typography color="text.secondary" variant="caption">Ticket Type</Typography>
                    <Typography fontWeight="medium">{ticketDetails.ticketType}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography color="text.secondary" variant="body2">Event Host Email</Typography>
                    <Typography fontWeight="medium">{ticketDetails.email}</Typography>
                    <Typography color="text.secondary" variant="caption">Tickets</Typography>
                    <Typography fontWeight="medium">{ticketDetails.ticketCount}</Typography>
                  </Grid>
                </Grid>

                <Typography variant="caption" color="text.secondary" align="center">
                  PS: We like to make everything easy with as few
                  steps as possible. Hope to see you!
                </Typography>
              </Box>
            </StyledTicketPaper>

            <BarcodePaper>
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
              }}>
                <Box sx={{
                  width: { xs: '160px', sm: '192px' },
                  height: { xs: '40px', sm: '48px' },
                  background: 'linear-gradient(to right, transparent, white, transparent)',
                  opacity: 0.7,
                }} />
              </Box>
              <Typography variant="caption" align="center" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                #25567 - #57529
              </Typography>
            </BarcodePaper>
          </Box>

          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'center', 
            gap: 2, 
            mt: 4,
            px: { xs: 2, sm: 0 }
          }}>
            <Button
              variant="contained"
              id="btn"
              onClick={handleBookAnother}
              color="primary"
              fullWidth={false}
              sx={{ 
                px: 3, 
                py: 1.5,
                width: { xs: '100%', sm: 'auto' }
              }}>
              Book Another Ticket
            </Button>
            <Button
              variant="contained"
              id="btn"
              onClick={onDownload}
              color="primary"
              fullWidth={false}
              sx={{ 
                px: 3, 
                py: 1.5,
                width: { xs: '100%', sm: 'auto' }
              }}>
              Download Ticket
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default TicketConfirmationStep;