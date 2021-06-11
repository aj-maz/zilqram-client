import React, { useState } from "react";
import {
  makeStyles,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
} from "@material-ui/core";
import { ArrowLeft, AddAPhoto, Close } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { Container, Row, Col } from "react-grid-system";
import { useForm, Controller } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";

const useStyles = makeStyles((theme) => ({
  root: {},
  backSection: {
    padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
    background: "#f2f2f2",
    color: "#999",
    borderBottom: `1px solid #e8e8e8`,
  },
  backType: {
    display: "inline-block",
  },
  backAction: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",

    "&:hover": {
      textDecoration: "underline",
    },
  },
  container: {
    textAlign: "left",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  section: {
    marginBottom: theme.spacing(2),
  },
  subtitle: {
    marginBottom: theme.spacing(1),
  },
  imageContainer: {
    width: 350,
    height: 350,
    border: "2px dashed #b8b8b8",
    cursor: "pointer",
    borderRadius: theme.spacing(1),
  },
  fileInput: {
    display: "none",
  },
  addAPhoto: {
    width: 80,
    height: 80,
    color: "#b8b8b8",
  },
  notImageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  selectedImageContainer: {
    width: 350,
    border: "2px dashed #b8b8b8",
    cursor: "pointer",
    borderRadius: theme.spacing(1),
    textAlign: "center",
    display: "inline-block",
  },
  selectedIamge: {
    width: 320,
    marginTop: theme.spacing(2),
    borderRadius: theme.spacing(1),
  },
  changeText: {
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
    color: "#8f8f8f",
  },
  propertyContainer: {
    display: "flex",
    alignItems: "center",
  },
  propertyInputItem: {
    marginBottom: theme.spacing(1),
  },
  propertyAddButton: {
    marginTop: theme.spacing(0.3),
  },
  propItem: {
    border: `1px solid ${theme.palette.primary.main}`,
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  closeBtn: {
    cursor: "pointer",
    color: theme.palette.primary.main,
  },
  propSection: {
    marginLeft: "0 !important",
    marginRight: "0 !important",
    marginBottom: theme.spacing(2),
  },
  propContainer: {
    display: "inline-block",
  },
}));

const ObjectId = (rnd = (r16) => Math.floor(r16).toString(16)) =>
  rnd(Date.now() / 1000) +
  " ".repeat(16).replace(/./g, () => rnd(Math.random() * 16));

const CREATE_META_PROPERTY = gql`
  mutation createMetaProperty(
    $_id: ID!
    $name: String!
    $description: String
    $external_url: String
    $properties: String
    $image: Upload!
  ) {
    createMetaProperty(
      _id: $_id
      name: $name
      description: $description
      external_url: $external_url
      properties: $properties
      image: $image
    )
  }
`;

const AddItem = ({ collection }) => {
  const classes = useStyles();
  const history = useHistory();
  const [selectedImage, setSelectedImage] = useState(null);
  const [properties, setProperties] = useState([]);
  const [traitType, setTraitType] = useState("");
  const [value, setValue] = useState("");

  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [externalLink, setExternalLink] = useState("");

  const [createMetaProperty] = useMutation(CREATE_META_PROPERTY);

  const addProperty = (prop) => {
    setProperties([...properties, prop]);
  };

  const deleteProperty = (index) => {
    setProperties([...properties].filter((item, ind) => ind !== index));
  };

  return (
    <div className={classes.root}>
      <div className={classes.backSection}>
        <div
          onClick={() => history.push(`/collection/${collection._id}`)}
          className={classes.backAction}
        >
          <ArrowLeft />
          <Typography className={classes.backType} variant="body2">
            Back to {collection.name}
          </Typography>
        </div>
      </div>
      <Container className={classes.container}>
        <Row>
          <Col lg={1} md={0}></Col>
          <Col lg={10} md={12}>
            <div className={classes.section}>
              <Typography className={classes.title} variant="h5">
                Create new item in the {collection.name} collection
              </Typography>
            </div>
            <div className={classes.section}>
              <Typography className={classes.subtitle} variant="h6">
                NFT Image *
              </Typography>
              <input
                className={classes.fileInput}
                type="file"
                id="image-select"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setSelectedImage(file);
                }}
              />
              <label htmlFor="image-select">
                <div
                  className={
                    selectedImage
                      ? classes.selectedImageContainer
                      : classes.imageContainer
                  }
                >
                  {selectedImage ? (
                    <div>
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        className={classes.selectedIamge}
                      />
                      <Typography
                        variant="body1"
                        className={classes.changeText}
                      >
                        Change
                      </Typography>
                    </div>
                  ) : (
                    <div className={classes.notImageContainer}>
                      <AddAPhoto className={classes.addAPhoto} />
                    </div>
                  )}
                </div>
              </label>
            </div>
            <div>
              <Row className={classes.section}>
                <Col md={6}>
                  <TextField
                    label="Name *"
                    variant="outlined"
                    fullWidth
                    color="primary"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Col>
                <Col md={6}>
                  <TextField
                    label="External Link"
                    variant="outlined"
                    fullWidth
                    color="primary"
                    value={externalLink}
                    onChange={(e) => setExternalLink(e.target.value)}
                  />
                </Col>
              </Row>
              <Row className={classes.section}>
                <Col md={12}>
                  <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    color="primary"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Typography variant="h6" className={classes.subtitle}>
                    Properties
                  </Typography>

                  <Row className={classes.propertyContainer}>
                    <Col md={4}>
                      <TextField
                        label="Type"
                        variant="outlined"
                        fullWidth
                        color="primary"
                        size="small"
                        className={classes.propertyInputItem}
                        value={traitType}
                        onChange={(e) => setTraitType(e.target.value)}
                      />
                    </Col>
                    <Col md={4}>
                      <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        color="primary"
                        className={classes.propertyInputItem}
                        size="small"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                      />
                    </Col>
                    <Col md={4}>
                      <Button
                        className={classes.propertyAddButton}
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          addProperty({ traitType, value });
                          setTraitType("");
                          setValue("");
                        }}
                      >
                        Add
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row className={classes.propSection}>
                {properties.map((prop, index) => (
                  <Col
                    className={classes.propItem}
                    key={index}
                    lg={2}
                    md={3}
                    sm={6}
                  >
                    <div className={classes.propContainer}>
                      <Typography variant="body1">{prop.traitType}</Typography>
                      <Typography variant="body2">{prop.value}</Typography>
                    </div>
                    <Close
                      className={classes.closeBtn}
                      onClick={() => deleteProperty(index)}
                    />
                  </Col>
                ))}
              </Row>
              <Divider className={classes.section} />
              <Button
                disabled={!selectedImage || !name}
                onClick={() => {
                  // create an Id and store it - Check

                  // call mint transition - Check

                  // create metadata mutation -

                  const nftId = ObjectId();

                  const contract = window.zilPay.contracts.at(
                    collection.contractAddress
                  );

                  contract
                    .call(
                      "Mint",
                      [
                        {
                          vname: "to",
                          type: "ByStr20",
                          value: window.zilPay.wallet.defaultAccount.base16,
                        },
                        {
                          vname: "token_uri",
                          type: "String",
                          value: `${process.env.REACT_APP_NFT_ADDRESS}/${nftId}`,
                        },
                      ],
                      {
                        gasLimit: "25000",
                        gasPrice: "1000000000",
                      }
                    )
                    .then(([tx, contract]) => {
                      createMetaProperty({
                        variables: {
                          _id: nftId,
                          name: name,
                          description,
                          external_url: externalLink,
                          properties: JSON.stringify(properties),
                          image: selectedImage,
                        },
                      })
                        .then((msg) => {
                          history.push(`/collection/${collection._id}`);
                        })
                        .catch((err) => console.log(err));
                    })
                    .catch((err) => {
                      createMetaProperty({
                        variables: {
                          _id: nftId,
                          name: name,
                          description,
                          external_url: externalLink,
                          properties: JSON.stringify(
                            properties.map((prop) => ({
                              value: prop.value,
                              trait_type: prop.traitType,
                            }))
                          ),
                          image: selectedImage,
                        },
                      })
                        .then((msg) => {
                          history.push(`/collection/${collection._id}`);
                        })
                        .catch((err) => console.log(err));
                    });

                  console.log(
                    selectedImage,
                    description,
                    name,
                    properties,
                    collection
                  );
                }}
                variant="contained"
                color="primary"
              >
                Create
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddItem;
