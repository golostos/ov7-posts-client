import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios, { AxiosError } from 'axios';
import LinkContext from '../services/linkContext';
import useLoginForm from '../services/loginFormHook';
import { z, ZodError } from 'zod';
import { Snackbar, Alert } from '@mui/material';
import RevalidateContext from '../services/revalidateContext';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();
enum FormError {
  NONE,
  VALID,
  AUTH,
}
export default function SignIn() {
  const { email,
    setEmail,
    password,
    setPassword,
    isEmailError,
    isPasswordError,
    setIsEmailError,
    setIsPasswordError } = useLoginForm()
  const [formErrorMessages, setFormErrorMessages] = React.useState({
    email: '',
    password: ''
  })
  const revalidateRef = React.useContext(RevalidateContext)
  const [link, setLink] = React.useContext(LinkContext)
  console.log(link)
  const [submitError, setSubmitError] = React.useState<FormError>(FormError.NONE)
  function handleClose() {
    setSubmitError(FormError.NONE)
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    const credentials = {
      email,
      password,
      // email: data.get('email'),
      // password: data.get('password'),
    };
    try {
      const validCredentials = z.object({
        email: z.string().email(),
        password: z.string().min(3).max(20)
      }).parse(credentials)
      await axios.post('/api/login', validCredentials)
      if (revalidateRef.current) revalidateRef.current()
      setLink('/')
    } catch (error) {
      console.error(error)
      if (error instanceof ZodError) {
        setSubmitError(FormError.VALID)
        const emailErrorMessage = []
        const passwordErrorMessage = []
        for (const issue of error.issues) {
          if (issue.path.includes('email')) {
            emailErrorMessage.push(issue.message)
          }
          if (issue.path.includes('password')) {
            passwordErrorMessage.push(issue.message)
          }
        }
        if (error.issues.length) {
          setFormErrorMessages({
            email: emailErrorMessage.join('. '),
            password: passwordErrorMessage.join('. ')
          })
        }
        if (emailErrorMessage.length) setIsEmailError(true)
        if (passwordErrorMessage.length) setIsPasswordError(true)
      } else if (error instanceof AxiosError && error.response?.status === 401) {
        setSubmitError(FormError.AUTH)
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={e => setEmail(e.target.value)}
              error={isEmailError}
              helperText={isEmailError
                ? (formErrorMessages.email
                  ? formErrorMessages.email
                  : "Incorrect entry. Use only english letters, 0-9 digits, @, -, _, .")
                : null}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              error={isPasswordError}
              helperText={isPasswordError 
                ? (formErrorMessages.password
                  ? formErrorMessages.password
                  : "Incorrect entry. Use only english letters, 0-9 digits, @, -, _, .")
                : null}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      <Snackbar open={submitError !== FormError.NONE} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {
            submitError === FormError.VALID ? 'Incorrect email or password' : 'Wrong credentials'
          }
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}