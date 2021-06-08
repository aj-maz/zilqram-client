import React, { useState } from "react";
import {
  makeStyles,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  Avatar,
} from "@material-ui/core";
import { Collections, CameraAlt } from "@material-ui/icons";
import { useForm, Controller } from "react-hook-form";
import { useMutation, gql } from "@apollo/client";
import withError from "../Common/withError";
import { useHistory } from 'react-router-dom'

import NFTContract from "../Contracts/NFT";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    height: 360,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  container: {
    textAlign: "center",
    margin: theme.spacing(2),
    width: "100%",
  },
  Icon: {
    width: 80,
    height: 80,
  },
  title: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  button: {
    marginBottom: theme.spacing(1),
  },
  subtitle: {
    cursor: "pointer",
    color: theme.palette.primary.main,
    marginTop: theme.spacing(1),
  },
  section: {
    padding: `${theme.spacing(1.5)}px 0px `,
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
  camera: {
    width: 50,
    height: 50,
  },
}));

const CREATE_NFT_COLLECTION = gql`
  mutation createNftCollection(
    $logo: Upload!
    $name: String!
    $description: String
    $contractAddress: String!
  ) {
    createNftCollection(
      logo: $logo
      name: $name
      description: $description
      contractAddress: $contractAddress
    ) {
      _id
    }
  }
`;

const CreateCollectionCard = ({ alertError }) => {
  const classes = useStyles();
  const [createCollection] = useMutation(CREATE_NFT_COLLECTION);

  const [open, setOpen] = useState(false);

  // console.log(window.zilPay, NFTContract)

  const history = useHistory()

  const init = (collectionName) => [
    {
      vname: "contract_owner",
      type: "ByStr20",
      value: window.zilPay.wallet.defaultAccount.bech32, //"zil1zxvjnkxr3r0rv582rv7u0w07pnh0ap30td4thr"
    },
    { vname: "name", type: "String", value: collectionName },
    { vname: "symbol", type: "String", value: collectionName },
    {
      vname: "_scilla_version",
      type: "Uint32",
      value: "0",
    },
  ];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const [selectedLogo, setSelectedLogo] = useState("");

  const handleClose = () => {
    setOpen(false);
    setSelectedLogo("");
    reset();
  };

  const onSubmit = (data) => console.log(data);

  return (
    <div>
      <Paper className={classes.root}>
        <div className={classes.container}>
          <Collections className={classes.Icon} />
          <Typography variant="h6" className={classes.title}>
            Create new collection
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            className={classes.button}
            onClick={() => setOpen(true)}
          >
            Create
          </Button>
          <Typography variant="body1" className={classes.subtitle}>
            or add an existing contract
          </Typography>
        </div>
      </Paper>
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <DialogTitle>Create Your Collection</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            You can change these values later, along with configuring external
            URLs, payment options, and trading fees.
          </Typography>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={classes.section}>
                <Typography className={classes.desc} variant="subtitle1">
                  Choose the required collection logo. In best case scenario
                  it's a 320x320.
                </Typography>
                <input
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setSelectedLogo(file);
                  }}
                  id="avatar"
                  type="file"
                  className={classes.fileInput}
                />
                <label className={classes.avatarLabel} htmlFor="avatar">
                  {selectedLogo ? (
                    <Avatar
                      className={classes.avatar}
                      src={URL.createObjectURL(selectedLogo)}
                    />
                  ) : (
                    <Avatar className={classes.avatar}>
                      <CameraAlt className={classes.camera} />
                    </Avatar>
                  )}
                </label>
              </div>
              <div className={classes.section}>
                <Typography className={classes.desc} variant="subtitle1">
                  And the required collection name. It must be unique.
                </Typography>
                <Controller
                  name="name"
                  rules={{ required: true }}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      label="Name *"
                      variant="outlined"
                      fullWidth
                      color="primary"
                      error={!!error}
                      helperText={error && "Name is required."}
                      multiline
                      {...field}
                    />
                  )}
                />
              </div>
              <div className={classes.section}>
                <Typography className={classes.desc} variant="subtitle1">
                  Tell us about your cool collection.
                </Typography>

                <Controller
                  name="description"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      label="Description"
                      variant="outlined"
                      fullWidth
                      color="primary"
                      {...field}
                    />
                  )}
                />
              </div>
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            disabled={!watch().name || !selectedLogo}
            onClick={handleClose}
            color="primary"
            variant="contained"
            onClick={() => {
              const contract = window.zilPay.contracts.new(
                NFTContract,
                init(watch().name)
              );

              contract
                .deploy({
                  gasLimit: "25000",
                  gasPrice: "1000000000",
                })
                .then(([tx, contract]) => {
                  console.log(tx, contract);

                  console.log(contract, contract.address);


                  createCollection({
                    variables: {
                      ...watch(),
                      logo: selectedLogo,
                      contractAddress: contract.address,
                    },
                  })
                    .then(({data}) => {
                      history.push(`/collection/${data.createNftCollection._id}`)
                    })
                    .catch((err) => {
                      console.log(err);
                      alertError(`collection ${watch().name} existed.`);
                    });
                })
                .catch((err) => console.log(err));
            }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default withError(CreateCollectionCard);
