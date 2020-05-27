import React from "react";
import { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
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
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function LeadForm(props) {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState("");

  const classes = useStyles();

  // const API = "https://backend-jobhuntr.herokuapp.com/leads";
  const API = "http://localhost:3000/leads";

  let handleSubmit = (event) => {
    event.preventDefault();
    console.log(props.currentId);
    let data = {
      title: title,
      company: company,
      location: location,
      description: description,
      status: status,
      user_id: props.currentId,
    };

    props.addNewLead(data);
    // fetch(API, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((response) => console.log(response))
    //   .then(props.newFetch());
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  let handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  let handleCompanyChange = (event) => {
    setCompany(event.target.value);
  };
  let handleLocationChange = (event) => {
    setLocation(event.target.value);
  };
  let handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Add a job lead
        </Typography>
        <form
          onSubmit={(event) => handleSubmit(event)}
          className={classes.form}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                onChange={(event) => {
                  handleTitleChange(event);
                }}
                autoComplete="Job Title"
                name="Job Title"
                variant="outlined"
                required
                fullWidth
                id="Job Title"
                label="Job Title"
                autoFocus
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                onChange={(event) => {
                  handleCompanyChange(event);
                }}
                variant="outlined"
                required
                fullWidth
                id="company"
                label="Company"
                name="company"
                autoComplete="company"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(event) => {
                  handleLocationChange(event);
                }}
                variant="outlined"
                required
                fullWidth
                name="Location"
                label="Location"
                type="location"
                id="location"
                autoComplete="location"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(event) => {
                  handleDescriptionChange(event);
                }}
                variant="outlined"
                required
                fullWidth
                name="Description"
                label="Description"
                type="description"
                id="Description"
                autoComplete="description"
              />
            </Grid>
          </Grid>
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add to Job Lead List
          </Button>
        </form>
      </div>
      <Box mt={5}></Box>
    </Container>
  );
}
