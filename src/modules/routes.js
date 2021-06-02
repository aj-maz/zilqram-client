import { makeStyles } from "@material-ui/core";
import { Row, Col } from "react-grid-system";

import ContentActions from "./Content/ContentActions";
import ContentMeta from "./Content/ContentMeta";
import ContentLikedBy from "./Content/ContentLikedBy";
import ContentPicture from "./Content/ContentPicture";
import ContentHeader from "./Content/ContentHeader";

const useStyles = makeStyles((theme) => ({
  root: {},
  section: {
    marginBottom: theme.spacing(2),
  },
}));

const Routes = () => {
  const classes = useStyles();
  return (
    <Row styles={{background: "#f8f8f8"}}>
      <Col md={3}>
        <div className={classes.section}>
          <ContentMeta>
            <ContentActions liked={true} />
          </ContentMeta>
        </div>
        <div className={classes.section}>
          <ContentActions />
        </div>
        <div className={classes.section}>
          <ContentActions />
        </div>
        <div className={classes.section}>
          <ContentActions />
        </div>
        <div className={classes.section}>
          <ContentMeta>
            <ContentHeader
              image="/images/sample1.png"
              displayName="Dorsa Hosseini"
              followed={false}
            />
            <ContentPicture src="/images/sample1.png" />
            <ContentActions />
            <ContentLikedBy likes={12} />
          </ContentMeta>
        </div>
        <div className={classes.section}>
          <ContentActions />
        </div>
      </Col>
      <Col md={3}>
        <div className={classes.section}>
          <ContentMeta>
            <ContentActions liked={true} />
            <ContentLikedBy likes={15} />
          </ContentMeta>
        </div>
      </Col>
      <Col md={3}>This is one of the routes</Col>
      <Col md={3}>This is one of the routes</Col>
    </Row>
  );
};

export default Routes;
