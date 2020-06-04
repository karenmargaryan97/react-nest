import React, { lazy } from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { mainPageStyles } from "../styles";

const NavBar = lazy(() => import("./NavBar"));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Main({history}: any) {
  const classes = mainPageStyles();

  return (
    <div>
      <NavBar history={history} />
      <div className={classes.root}>
        <CssBaseline />
        <Container component="main" className={classes.main} maxWidth="sm">
          <Typography variant="h2" component="h1" gutterBottom>
            Main Page
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            {'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'}
            {'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.'}
          </Typography>
          <Typography variant="body1">There are many variations of passages of Lorem Ipsum available.</Typography>
        </Container>
        <footer className={classes.footer}>
          <Container maxWidth="sm">
            <Copyright />
          </Container>
        </footer>
      </div>
    </div>
  );
}