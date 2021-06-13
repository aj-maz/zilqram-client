import React, { useEffect, useState } from "react";
import {
  makeStyles,
  IconButton,
  Avatar,
  Typography,
  Button,
  Divider,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  DialogTitle,
} from "@material-ui/core";
import { CameraAlt, Edit } from "@material-ui/icons";
import { Row, Col } from "react-grid-system";
import { useParams } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import { Zilliqa } from "@zilliqa-js/zilliqa";

import withError from "../Common/withError";
import AddItem from "./AddItem";
import NFTCard from "../NFT/NFTCard";

const zilliqa = new Zilliqa("https://dev-api.zilliqa.com");

const useStyles = makeStyles((theme) => ({
  root: {},
  coverContainer: {
    width: "100%",
    background: "#b2b2b2",
    height: 250,
    position: "relative",
    //  borderBottom: `1px solid ${theme.palette.primary.main}`
  },
  collectionActions: {
    position: "absolute",
    top: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    right: theme.spacing(1),
  },
  actionBtn: {
    marginBottom: theme.spacing(1),
  },
  cover: {
    objectFit: "cover",
    width: "100%",
    height: "100%",
  },
  infoRow: {
    margin: "0px !important",
    textAlign: "center",
    position: "relative",
    top: -75,
  },
  avatar: {
    width: 150,
    height: 150,
    border: `4px solid ${theme.palette.secondary.main}`,
    display: "inline-block",
  },
  avatarContainer: {
    marginBottom: theme.spacing(1),
  },
  collectionName: {
    marginBottom: theme.spacing(1),
  },
  infoItem: {
    display: "inline-block",
    padding: `0px ${theme.spacing(1)}px`,
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    width: 70,
  },
  infoItems: {
    display: "flex",
    justifyContent: "space-evenly",
    marginBottom: theme.spacing(2),
  },
  sectionTitle: {
    display: "inline-block",
    marginRight: theme.spacing(2),
  },
  singleItem: {
    height: 400,
  },
  divider: {
    marginBottom: theme.spacing(1),
  },
  row: {
    marginBottom: theme.spacing(1),
  },
  fileInput: {
    display: "none",
  },
  section: {
    padding: `${theme.spacing(1.5)}px 0px `,
  },
  desc: {
    marginBottom: theme.spacing(1),
  },
  avatarModal: {
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

const NFT_COLLECTION = gql`
  query nftCollection($_id: ID!) {
    nftCollection(_id: $_id) {
      _id
      name
      logo
      creator {
        _id
        username
        displayName
        avatar
        bio
        setted
        createdAt
        updatedAt
        addresses
      }
      description
      contractAddress
      cover
    }
  }
`;

const UPDATE_COLLECTION_COVER = gql`
  mutation updateNftCollectionCover($collectionId: ID!, $cover: Upload!) {
    updateNftCollectionCover(collectionId: $collectionId, cover: $cover)
  }
`;

const EDIT_COLLECTION = gql`
  mutation editNftCollection(
    $collectionId: ID!
    $logo: Upload!
    $description: String
  ) {
    editNftCollection(
      collectionId: $collectionId
      logo: $logo
      description: $description
    )
  }
`;

const EditDialog = ({
  name,
  logo,
  description,
  open,
  setOpen,
  refetch,
  _id,
  alertError,
}) => {
  const classes = useStyles();
  const [selectedLogoFile, setSelectedLogoFile] = useState(false);
  const [logoUrl, setLogoUrl] = useState(logo);
  const [descriptionS, setDescription] = useState(description);
  const [editCollection] = useMutation(EDIT_COLLECTION);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle>Create Your Collection</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Configure your awesome collection.
        </Typography>
        <div>
          <div className={classes.section}>
            <Typography className={classes.desc} variant="subtitle1">
              Feel free to change your collection logo. But remember for your
              own good try to choose a 320x320.
            </Typography>
            <input
              onChange={(e) => {
                const file = e.target.files[0];
                setSelectedLogoFile(file);
                setLogoUrl(URL.createObjectURL(file));
              }}
              id="avatar"
              type="file"
              className={classes.fileInput}
            />
            <label className={classes.avatarLabel} htmlFor="avatar">
              <Avatar className={classes.avatarModal} src={logoUrl} />
            </label>
          </div>
          <div className={classes.section}>
            <Typography className={classes.desc} variant="subtitle1">
              You can not change the name of the collection.
            </Typography>
            <TextField
              label="Name *"
              variant="outlined"
              fullWidth
              disabled
              color="primary"
              value={name}
            />
          </div>
          <div className={classes.section}>
            <Typography className={classes.desc} variant="subtitle1">
              Tell us about your cool collection.
            </Typography>

            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              color="primary"
              multiline
              value={descriptionS}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          disabled={!selectedLogoFile}
          color="primary"
          variant="contained"
          onClick={() => {
            console.log("wtff??");
            editCollection({
              variables: {
                collectionId: _id,
                logo: selectedLogoFile,
                description: descriptionS,
              },
            })
              .then(() => {
                refetch();
                handleClose();
              })
              .catch((err) => {
                alertError(
                  "An unexpected error happened. Please try in a bit."
                );
              });
          }}
        >
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const CollectionPage = ({ alertError, me }) => {
  const classes = useStyles();
  const [coverAddress, setCoverAddress] = useState(false);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState("...");
  const [tokenOwners, setTokenOwners] = useState("...");
  const [tokenUris, setTokenUris] = useState([]);
  const [refreshToken, setRefreshToken] = useState(0);

  const { _id } = useParams();

  const { data, loading, error, refetch } = useQuery(NFT_COLLECTION, {
    variables: { _id },
  });

  const [updateCover] = useMutation(UPDATE_COLLECTION_COVER);

  const match = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    if (data && data.nftCollection) {
      const collection = data.nftCollection;
      if (collection.cover) {
        setCoverAddress(
          `${process.env.REACT_APP_FILE_URL}/${collection.cover}`
        );
      } else {
        setCoverAddress(false);
      }
      if (collection.contractAddress) {
        const contract = zilliqa.contracts.at(collection.contractAddress);

        contract.getState().then((contractState) => {
          if (contractState) {
            setItems(contractState.total_supply);
            let a = new Set(Object.values(contractState.token_owners));
            setTokenOwners(a.size);
            setTokenUris(Object.values(contractState.token_uris));
          } else {
            setRefreshToken(refreshToken + 1);
          }
        });
      }
    }
  }, [data, refreshToken]);

  if (loading) return <div>Loading</div>;

  if (!data) <div>404</div>;

  const collection = data.nftCollection;

  const avatarAddress = `${process.env.REACT_APP_FILE_URL}/${collection.logo}`;

  // TODO is owner must be implemented
  const isOwner = true;

  return (
    <Switch>
      <Route path={`${match.url}/add-item`}>
        <AddItem collection={collection} />
      </Route>
      <Route path="/">
        <div className={classes.root}>
          <div className={classes.coverContainer}>
            {coverAddress && (
              <img src={coverAddress} className={classes.cover} />
            )}
            {isOwner && (
              <div className={classes.collectionActions}>
                <input
                  onChange={(e) => {
                    const selectedFile = e.target.files[0];
                    setCoverAddress(URL.createObjectURL(selectedFile));
                    updateCover({
                      variables: {
                        collectionId: _id,
                        cover: selectedFile,
                      },
                    })
                      .then(() => {
                        refetch();
                      })
                      .catch((err) => {
                        alertError(
                          "An unexpected error happened. Please try in a bit."
                        );
                      });
                  }}
                  id="coverInput"
                  type="file"
                  className={classes.fileInput}
                />
                <label className={classes.avatarLabel} htmlFor="coverInput">
                  <IconButton
                    color="primary"
                    component="span"
                    className={classes.actionBtn}
                  >
                    <CameraAlt />
                  </IconButton>
                </label>

                <IconButton
                  onClick={() => setOpen(true)}
                  color="primary"
                  className={classes.actionBtn}
                >
                  <Edit />
                </IconButton>
              </div>
            )}
          </div>
          <Row className={classes.infoRow}>
            <Col lg={3} md={2} sm={1} xs={0}></Col>
            <Col lg={6} md={8} sm={10} xs={12}>
              <div className={classes.avatarContainer}>
                <Avatar src={avatarAddress} className={classes.avatar} />
              </div>
              <div className={classes.infoSection}>
                <Typography className={classes.collectionName} variant="h4">
                  {collection.name}
                </Typography>
                <div className={classes.infoItems}>
                  <div className={classes.infoItem}>
                    <div className={classes.infoItemValue}>
                      <Typography variant="h5">{items}</Typography>
                    </div>
                    <div className={classes.infoItemTitle}>
                      <Typography variant="h6">Item</Typography>
                    </div>
                  </div>
                  <div className={classes.infoItem}>
                    <div className={classes.infoItemValue}>
                      <Typography variant="h5">{tokenOwners}</Typography>
                    </div>
                    <div className={classes.infoItemTitle}>
                      <Typography variant="h6">Owner</Typography>
                    </div>
                  </div>
                </div>
                <Typography variant="body1">
                  {collection.description}
                </Typography>
              </div>
            </Col>
          </Row>

          <Container>
            <Row className={classes.row}>
              <Col md={12}>
                <Typography className={classes.sectionTitle} variant="h5">
                  Items
                </Typography>
                {me && me._id == collection.owner._id && (
                  <Button
                    onClick={() => history.push(`${match.url}/add-item`)}
                    varaint="text"
                    color="primary"
                  >
                    Add New Item
                  </Button>
                )}
              </Col>
            </Row>
            <Divider className={classes.divider} />

            <Row className={classes.row}>
              {tokenUris.length === 0 ? (
                <Col xs={12}>
                  <div className={classes.singleItem}>
                    <Typography variant=""></Typography> There is no token yet
                  </div>
                </Col>
              ) : (
                tokenUris.map((uri, index) => (
                  <Col key={index} lg={3} md={4} sm={6} xs={12}>
                    <NFTCard
                      token_uri={uri}
                      collection={collection}
                      tokenId={index + 1}
                    />
                  </Col>
                ))
              )}
            </Row>
          </Container>

          <EditDialog
            open={open}
            setOpen={setOpen}
            refetch={refetch}
            description={collection.description}
            name={collection.name}
            logo={avatarAddress}
            _id={_id}
            alertError={alertError}
          />
        </div>
      </Route>
    </Switch>
  );
};

export default withError(CollectionPage);
