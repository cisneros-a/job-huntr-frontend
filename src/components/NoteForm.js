import React from "react";
import { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import AssignmentSharpIcon from "@material-ui/icons/AssignmentSharp";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function NoteForm(props) {
  const classes = useStyles();

  const [note, setNote] = useState("");

  let handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  // const API = "https://backend-jobhuntr.herokuapp.com/notes";
  const API = "http://localhost:3000/notes";

  let handleSubmit = (event) => {
    event.preventDefault();

    fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ lead_id: props.leadId, content: note }),
    })
      .then(props.getLeadNotes())
      .then(setNote(""));
  };

  return (
    <Container component="main" maxWidth="m">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AssignmentSharpIcon />
        </Avatar>

        <form
          onSubmit={(event) => handleSubmit(event)}
          className={classes.form}
          noValidate
        >
          <TextField
            onChange={(event) => {
              handleNoteChange(event);
            }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="note"
            label="Your note"
            name="note"
            autoComplete="note"
            autoFocus
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add Note
          </Button>
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
}
