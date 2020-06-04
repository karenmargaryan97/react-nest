import React from "react";
import { Paper, Tab, Tabs } from "@material-ui/core";

const handleLogout = (history: any) => {
  localStorage.removeItem("token");
  history.push("/login")
}

export default function NavBar({ history }: any) {
  return (
    <Paper square className="aria-label">
      <Tabs
        value="any"
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        aria-label="icon tabs example"
      >
        <Tab label="Home" value={false} aria-label="home" />
        <Tab label="Logout" value={false} aria-label="exit-to-app" onClick={() => handleLogout(history)} />
      </Tabs>
    </Paper>
  );
}