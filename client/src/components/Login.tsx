import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { login } from "../api/auth";
import { validateLoginForm } from "../validations/auth";
import { authStyles } from "../styles";

export default function Login({ history }: any) {
  const classes = authStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    login({ email, password })
      .then(({ data: { accessToken}} ) => {
        localStorage.setItem('token', accessToken);
        history.push('/main');
      })
      .catch(e => {
        const { response: { data: { errors } } } = e;
        setError(true);
        setErrorMessage(errors[0].message);
      });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validateLoginForm(email, password, setErrorMessage)) {
      handleLogin();
    } else {
      setError(true);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
          <TextField
            error={error}
            fullWidth
            id="email"
            type="email"
            label="Email"
            placeholder="Email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            error={error}
            fullWidth
            placeholder="Password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            type="password"
            id="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
        {error && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
    </Container>
  );
}