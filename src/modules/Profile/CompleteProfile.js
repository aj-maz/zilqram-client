import React, { useState } from "react";
import {
  makeStyles,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  section: {
    padding: theme.spacing(1.5),
  },
  desc: {
    marginBottom: theme.spacing(1),
  },
  avatar: {
    width: 100,
    height: 100,
  },
  fileInput: {
    display: "none",
  },
  avatarLabel: {
    cursor: "pointer",
  },
}));

const COMPLETE_PROFILE = gql`
  mutation completeProfile(
    $avatar: Upload
    $username: String!
    $displayName: String!
    $bio: String
  ) {
    completeProfile(
      avatar: $avatar
      username: $username
      displayName: $displayName
      bio: $bio
    )
  }
`;

const CompleteProfile = ({refetch}) => {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm();

  const [completeProfile] = useMutation(COMPLETE_PROFILE);

  const [selectedAvatar, setSelectedAvatar] = useState("");

  const onSubmit = (data) => {
    completeProfile({
      variables: {
        ...data,
        avatar: selectedAvatar,
      },
    })
      .then((r) => {
        refetch()
      })
      .catch((err) => console.log(err));
  };

  return (
    <Paper className={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.section}>
          <Typography className={classes.desc} variant="subtitle1">
            Choose a cool avatar for yourself
          </Typography>
          <input
            onChange={(e) => {
              const file = e.target.files[0];
              setSelectedAvatar(file);
            }}
            id="avatar"
            type="file"
            className={classes.fileInput}
          />
          <label className={classes.avatarLabel} htmlFor="avatar">
            {selectedAvatar ? (
              <Avatar
                className={classes.avatar}
                src={URL.createObjectURL(selectedAvatar)}
              />
            ) : (
              <Avatar className={classes.avatar}>A</Avatar>
            )}
          </label>
        </div>
        <div className={classes.section}>
          <Typography className={classes.desc} variant="subtitle1">
            A cool username is required for ziliqists.
          </Typography>
          <Controller
            name="username"
            rules={{ required: true }}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                color="primary"
                error={!!error}
                helperText={error && "Username is required."}
                {...field}
              />
            )}
          />
        </div>
        <div className={classes.section}>
          <Typography className={classes.desc} variant="subtitle1">
            Also a cool display name.
          </Typography>
          <Controller
            name="displayName"
            rules={{ required: true }}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                label="Display Name"
                variant="outlined"
                fullWidth
                color="primary"
                error={!!error}
                helperText={error && "Display Name is required."}
                {...field}
              />
            )}
          />
        </div>
        <div className={classes.section}>
          <Typography className={classes.desc} variant="subtitle1">
            Tell us about your coolness.
          </Typography>

          <Controller
            name="bio"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                label="Bio"
                variant="outlined"
                fullWidth
                color="primary"
                {...field}
              />
            )}
          />
        </div>
        <div className={classes.section}>
          <Button type="submit" variant="contained" fullWidth color="secondary">
            Complete Profile
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default CompleteProfile;
