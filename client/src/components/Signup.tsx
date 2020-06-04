import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { signup } from "../api/auth";
import { validateSignupForm } from "../validations/auth";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { authStyles } from "../styles";

export default function Signup({ history}: any) {
  const classes = authStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = () => {
    signup({ email, password })
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
    if (validateSignupForm(email, password, confirmPassword, setErrorMessage)) {
      handleSignup();
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
          Create New Account
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
          <TextField
            error={error}
            fullWidth
            placeholder="Confirm Password"
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            label="Confirm Password"
            type="password"
            id="confirm-password"
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link href="login" variant="body2">
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </form>
        {error && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
    </Container>
  );
}