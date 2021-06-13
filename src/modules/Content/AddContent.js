import React, { useState } from "react";
import {
  makeStyles,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import { Row, Col } from "react-grid-system";
import { AddAPhoto } from "@material-ui/icons";
import { gql, useMutation } from "@apollo/client";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  input: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
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
  imageInputContainer: {
    textAlign: "center",
  },
}));

const CREATE_CONTENT = gql`
  mutation createContent(
    $variant: String!
    $body: String!
    $image: Upload
    $exclusive: Boolean!
  ) {
    createContent(
      variant: $variant
      body: $body
      image: $image
      exclusive: $exclusive
    ) {
      _id
    }
  }
`;

const AddContent = ({ refetch }) => {
  const classes = useStyles();
  const [selectedImage, setSelectedImage] = useState(null);
  const [contentType, setContentType] = useState("zweet");
  const [exclusive, setExclusive] = useState(false);
  const [body, setBody] = useState("");

  const [createContent] = useMutation(CREATE_CONTENT);

  const reset = () => {
    setContentType("zweet");
    setExclusive(false);
    setSelectedImage(null);
    setBody("");
  };

  const handleChange = (event) => {
    setContentType(event.target.value);
  };

  const renderProperInput = () => {
    switch (contentType) {
      case "zweet":
        return (
          <div>
            <TextField
              value={body}
              onChange={(e) => setBody(e.target.value)}
              variant="outlined"
              label="Zweet"
              fullWidth
              multiline
            />
          </div>
        );
      case "photo":
        return (
          <div className={classes.imageInputContainer}>
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
                    <Typography variant="body1" className={classes.changeText}>
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
        );
    }
  };

  return (
    <Paper className={classes.root}>
      <Row>
        <Col md={6}>
          <FormControl
            fullWidth
            variant="outlined"
            className={classes.formControl}
          >
            <InputLabel id="contentType">Content Type</InputLabel>
            <Select
              labelId="contentType"
              id="contentType"
              value={contentType}
              onChange={handleChange}
              label="Content Type"
            >
              <MenuItem value="zweet">Zweet</MenuItem>
              <MenuItem value="photo">Photo</MenuItem>
            </Select>
          </FormControl>
        </Col>
        <Col md={6}>
          <FormControlLabel
            control={
              <Switch
                checked={exclusive}
                onChange={() => setExclusive(!exclusive)}
                name="exclusivity"
                color="primary"
              />
            }
            label={exclusive ? "Exclusive" : "Not Exclusive"}
          />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <div className={classes.input}>{renderProperInput()}</div>
        </Col>
      </Row>
      <Row>
        <Col md={3} sm={0}></Col>
        <Col md={6} sm={12}>
          <Button
            onClick={() => {
              createContent({
                variables: {
                  variant: contentType,
                  body,
                  image: selectedImage,
                  exclusive,
                },
              }).then(() => {
                refetch();
                reset();
              });
            }}
            fullWidth
            variant="contained"
            color="primary"
          >
            Post
          </Button>
        </Col>
      </Row>
    </Paper>
  );
};

export default AddContent;
