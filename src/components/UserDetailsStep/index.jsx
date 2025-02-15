import { useState, useRef, useEffect } from "react";
import { Upload, Mail } from "lucide-react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  InputAdornment,
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
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(19, 78, 74, 0.3)',
            '&:hover': {
              backgroundColor: 'rgba(19, 78, 74, 0.4)',
            },
          },
        },
      },
    },
  },
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  height: 'vh',
  width: '95%', 
  margin: 'auto',
  padding: theme.spacing(4),
  backgroundColor: 'rgba(16, 36, 36, 0.9)',
  [theme.breakpoints.up('sm')]: {
    width: '80%',
  },
  [theme.breakpoints.up('md')]: {
    width: '70%',
  },
  [theme.breakpoints.up('lg')]: {
    width: '60%',
  },
}));

const USER_DETAILS_STORAGE_KEY = "userDetailsFormData";

const UserDetailsStep = ({ onNext, onBack, initialData }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    avatarUrl: "",
    specialRequest: "",
  });

  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);


  useEffect(() => {
    const savedData = localStorage.getItem(USER_DETAILS_STORAGE_KEY);
    if (savedData) {
      setFormData(JSON.parse(savedData));
    } else if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

 
  useEffect(() => {
    if (Object.values(formData).some(value => value !== "")) {
      localStorage.setItem(USER_DETAILS_STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData]);


  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    
    if (!formData.avatarUrl) {
      newErrors.avatarUrl = "Profile photo is required";
    } else if (!isValidImageUrl(formData.avatarUrl)) {
      newErrors.avatarUrl = "Please provide a valid image URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidImageUrl = (url) => {
    return url.match(/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      localStorage.removeItem(USER_DETAILS_STORAGE_KEY);
      onNext({ ...formData });
    }
  };

  const handleBack = () => {
    localStorage.setItem(USER_DETAILS_STORAGE_KEY, JSON.stringify(formData));
    onBack();
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setFormData(prev => ({ ...prev, avatarUrl: url }));
    if (url && !isValidImageUrl(url)) {
      setErrors(prev => ({ ...prev, avatarUrl: "Please provide a valid image URL" }));
    } else {
      setErrors(prev => ({ ...prev, avatarUrl: null }));
    }
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
        <StyledPaper elevation={3} sx={{borderRadius: '12px'}} >
          <Box sx={{ 
            mb: 4, 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' }, 
            gap: { xs: 1, sm: 0 }
          }}>
            <Typography variant="h6" color="text.primary">
              User Details
            </Typography>
            <Typography variant="body2" color="primary">
              Step 2/3
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                id="avatarUrl"
                label="Profile Photo URL (Cloudinary or similar)"
                value={formData.avatarUrl}
                onChange={handleImageUrlChange}
                error={!!errors.avatarUrl}
                helperText={errors.avatarUrl}
                placeholder="https://your-image-url.jpg"
                sx={{ mb: 3 }}
              />

              <TextField
                fullWidth
                id="fullName"
                label="Enter your name"
                value={formData.fullName}
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                error={!!errors.fullName}
                helperText={errors.fullName}
                sx={{ mb: 3 }}
              />

              <TextField
                fullWidth
                id="email"
                label="Enter your email *"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                error={!!errors.email}
                helperText={errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail size={20} />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 3 }}
              />

              <TextField
                fullWidth
                id="specialRequest"
                label="Special request?"
                multiline
                rows={4}
                value={formData.specialRequest}
                onChange={(e) => setFormData(prev => ({ ...prev, specialRequest: e.target.value }))}
              />
            </Box>

            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, 
              gap: 2, 
              mt: 4 
            }}>
              <Button
                variant="contained"
                id="btn"
                onClick={onBack}
                sx={{ 
                  bgcolor: 'rgba(19, 78, 74, 0.3)',
                  '&:hover': {
                    bgcolor: 'rgba(19, 78, 74, 0.5)',
                  },
                  py: 1.5
                }}
              >
                Back
              </Button>
              <Button
                type="submit"
                id="btn"
                variant="contained"
                color="primary"
                sx={{ py: 1.5 }}
              >
                Next
              </Button>
            </Box>
          </Box>
        </StyledPaper>
      </Box>
    </ThemeProvider>
  );
};

export default UserDetailsStep;