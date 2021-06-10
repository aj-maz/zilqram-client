import React from 'react'
import { makeStyles, TextField , Button} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        position: 'absolute',
        bottom: 0,
        minHeight: 75,
        border: '1px solid #e8e8e8',
        background: theme.palette.background.paper,
        boxSizing: 'border-box',
        padding: theme.spacing(1),
        width: '100%',
        display: 'flex',
        alignItems: 'center'
    },
    filedContainer: {
        width: 'calc(100% - 120px)',
        display: "inline-block",
        padding: theme.spacing(1)
    },
    actionContainer: {
        width: 100,
        display: "inline-block"

    }
}))

const ConversationFooter = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <div className={classes.filedContainer}>
            <TextField variant="filled" multiline label="message" fullWidth />

            </div>
            <div className={classes.actionContainer}>
                <Button fullWidth color="primary">Send</Button>
            </div>
        </div>
    )
}

export default ConversationFooter