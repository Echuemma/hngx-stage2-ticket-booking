import React from "react";
import { Mail, Download } from "lucide-react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  styled,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Custom theme
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

// Styled components
const StyledTicketPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(19, 78, 74, 0.5)',
  border: '1px solid rgba(20, 184, 166, 0.3)',
  borderRadius: '24px',
  padding: theme.spacing(3),
}));

const ProfileImage = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '128px',
  height: '128px',
  margin: '0 auto',
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
  // marginTop: theme.spacing(2),
}));

const TicketConfirmationStep = ({ ticketDetails, onDownload, onEmail }) => {
  if (!ticketDetails) return null;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        minHeight: 'vh',
        bgcolor: 'background.default',
        color: 'white',
        p: 4,
      }}>
        <Box sx={{ maxWidth: '40rem', mx: 'auto' }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 60,
        p: 2,
        marginBottom:4,
        // border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1
      }}
    >
      <Typography  color="primary" 
        variant="body2" 
        sx={{ mb: 1 }} 
        aria-label="Step 3 of 3">
        Ready
      </Typography>
      <Typography 
        color="primary" 
        variant="body2" 
        sx={{ mb: 1 }} 
        aria-label="Step 3 of 3"
      >
        Step 3/3
      </Typography>
      
    </Box>
            <Typography variant="h4" fontWeight="bold" tabIndex={0}>
              Your Ticket is Booked!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Check your email for a copy or you can download
            </Typography>
          </Box>

          <Box sx={{ maxWidth: '28rem', mx: 'auto' }}
            role="article"
            aria-label="Event Ticket"
            tabIndex={0}
          >
            <StyledTicketPaper>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Event Header */}
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" fontWeight="bold">
                    {ticketDetails.eventName}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    [Event Name] at [Event Place]
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mt: 1 }}>
                    <Box sx={{
                      width: 8,
                      height: 8,
                      bgcolor: 'primary.main',
                      borderRadius: '50%',
                    }} aria-hidden="true" />
                    <Typography variant="caption">
                      {ticketDetails.eventDate} | {ticketDetails.eventTime}
                    </Typography>
                  </Box>
                </Box>

                {/* Profile Image */}
                <ProfileImage>
                  <img
                    src={ticketDetails.profilePhoto}
                    alt="Attendee profile"
                  />
                </ProfileImage>

                {/* Ticket Details */}
                <Grid container spacing={0}>
                  <Grid item xs={5.5}>
                    <Typography color="text.secondary" variant="body2">Event Attendee</Typography>
                    <Typography fontWeight="medium">{ticketDetails.attendee}</Typography>
                    <Typography color="text.secondary" variant="caption">Ticket Type</Typography>
                    <Typography fontWeight="medium">{ticketDetails.ticketType}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography color="text.secondary" variant="body2">Event Host Email</Typography>
                    <Typography fontWeight="medium">{ticketDetails.email}</Typography>
                    <Typography color="text.secondary" variant="caption">Tickets</Typography>
                    <Typography fontWeight="medium">{ticketDetails.ticketCount}</Typography>
                  </Grid>
                </Grid>

                {/* Note */}
                <Typography variant="caption" color="text.secondary" align="center">
                  PS: We like to make everything easy with as few
                  steps as possible. Hope to see you!
                </Typography>
              </Box>
            </StyledTicketPaper>

            {/* Barcode Section */}
            <BarcodePaper>
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
              }} aria-label="Ticket barcode">
                <Box sx={{
                  width: 192,
                  height: 48,
                  background: 'linear-gradient(to right, transparent, white, transparent)',
                  opacity: 0.7,
                }} />
              </Box>
              <Typography variant="caption" align="center" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                #25567 - #57529
              </Typography>
            </BarcodePaper>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
            <Button
            id="btn"
              variant="contained"
              onClick={onEmail}
              color="primary"
              sx={{ px: 3, py: 1.5 }}
              aria-label="Download ticket"
            >
              Book Another Ticket
            </Button>
            <Button
  id="btn"
  variant="contained"
  onClick={onDownload}
  color="primary"
  sx={{ px: 3, py: 1.5 }}
  aria-label="Download ticket"
>
  Download Ticket
</Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default TicketConfirmationStep;