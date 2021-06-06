import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {

    }
}))

const ProfilePage = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            This is ProfilePage component
        </div>
    )
}

export default ProfilePage