import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CardHolder from "./CardHolder";
import LeadForm from "./LeadForm";
import NavBar from "./NavBar.js";
import LeadSpec from "./LeadSpec";

export default function NewDashboard(props) {
  const [leads, setLeads] = useState({
    haventHeardBack: [],
    heardBack: [],
    interviewed: [],
  });
  const [clicked, setClicked] = useState(false);
  const [clickedLead, setClickedLead] = useState(null);
  const API = "http://localhost:3000/myleads";

  useEffect(() => {
    fetch(API)
      .then((r) => r.json())
      .then((data) => setLeads(data));
  }, []);

  let handleCardClick = (lead) => {
    setClicked(!clicked);
    setClickedLead(lead);
  };

  let addNewLead = (newLead) => {
    const status = newLead.status;
    let obj = {
      "Haven't Heard Back": "haventHeardBack",
      "Heard Back": "heardBack",
      Interviewed: "interviewed",
    };
    let newStatus = obj[status];
    setLeads({
      ...leads,
      [newStatus]: [...leads[`${newStatus}`], newLead],
    });
  };

  let handleHomeClick = () => {
    setClicked(false);
  };

  let handleStatusChange = (modifiedLead) => {
    let id = modifiedLead.id;
    let newLeads = { haventHeardBack: [], heardBack: [], interviewed: [] };
    let obj = {
      "Haven't Heard Back": "haventHeardBack",
      "Heard Back": "heardBack",
      Interviewed: "interviewed",
    };
    let newStatus = obj[modifiedLead.status];
    for (let [key, value] of Object.entries(leads)) {
      for (let i = 0; i < value.length; i++) {
        if (value[i].id !== id) {
          newLeads[key].push(value[i]);
        }
      }
    }
    newLeads[newStatus].push(modifiedLead);
    setLeads(newLeads);
  };

  return clicked === false ? (
    <div>
      <NavBar
        handleCardClick={handleHomeClick}
        handleLogout={props.handleLogout}
        loggedIn={true}
        currentName={props.currentName}
      />
      <LeadForm currentId={props.currentId} addNewLead={addNewLead}></LeadForm>
      <Typography variant="heading2" component="h2" align="center">
        Your Job Leads
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Container>
            <Typography variant="heading3" component="h3">
              Haven't Heard Back
            </Typography>
            <CardHolder
              key={1}
              handleCardClick={handleCardClick}
              leads={leads.haventHeardBack}
            />
          </Container>
        </Grid>

        <Grid item xs={4}>
          <Container>
            <Typography variant="heading3" component="h3">
              Heard Back
            </Typography>
            <CardHolder
              key={2}
              handleCardClick={handleCardClick}
              leads={leads.heardBack}
            />
          </Container>
        </Grid>

        <Grid item xs={4}>
          <Container>
            <Typography variant="heading3" component="h3">
              Interviewed
            </Typography>
            <CardHolder
              key={3}
              handleCardClick={handleCardClick}
              leads={leads.interviewed}
            />
          </Container>
        </Grid>
      </Grid>
    </div>
  ) : (
    <div>
      <NavBar
        handleCardClick={handleHomeClick}
        handleLogout={props.handleLogout}
        currentName={props.currentName}
        loggedIn={true}
      />
      <LeadSpec lead={clickedLead} handleStatusChange={handleStatusChange} />
    </div>
  );
}
