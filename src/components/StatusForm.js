import React from "react";
import { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";

import Box from "@material-ui/core/Box";
import AssignmentSharpIcon from "@material-ui/icons/AssignmentSharp";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "right",
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

export default function StatusForm(props) {
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState("");
  const classes = useStyles();

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  // const API = `https://backend-jobhuntr.herokuapp.com/leads/${props.leadId}`;
  const API = `http://localhost:3000/leads/${props.lead.id}`;

  let handleSubmit = (event) => {
    event.preventDefault();
    props.lead.status = status;
    props.handleStatusChange(props.lead);

    // fetch(API, {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //   },
    //   body: JSON.stringify({ status: status }),
    // }).then(props.newFetch());
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AssignmentSharpIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {/* Sign in */}
        </Typography>
        <form
          onSubmit={(event) => handleSubmit(event)}
          className={classes.form}
          noValidate
        >
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-controlled-open-select-label">
              Status
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={status}
              onChange={handleStatusChange}
            >
              <MenuItem value={"Haven't Heard Back"}>
                Haven't Heard Back
              </MenuItem>
              <MenuItem value={"Heard Back"}>Heard Back</MenuItem>
              <MenuItem value={"Interviewed"}>Interviewed</MenuItem>
            </Select>
          </FormControl>
          <br></br>
          <Button
            type="submit"
            halfWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Change Status
          </Button>
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
}
