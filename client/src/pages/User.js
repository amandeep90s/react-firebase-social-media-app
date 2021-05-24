import React, { useEffect, useState } from "react";
import Scream from "../components/scream/Scream";
import StaticProfile from "../components/profile/StaticProfile";
import axios from "axios";
// MUI Stuff
import { Grid } from "@material-ui/core";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";
// Skeleton
import ScreamSkeleton from "../util/ScreamSkeleton";
import ProfileSkeleton from "../util/ProfileSkeleton";

const User = ({ match }) => {
    const [screamIdParam, setScreamIdParam] = useState(null);
    const [profile, setProfile] = useState(null);

    const dispatch = useDispatch();

    const {
        data: { screams, loading },
    } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        const { handle, screamId } = match.params;

        if (screamId) setScreamIdParam(screamId);

        dispatch(getUserData(handle));

        axios
            .get(`/user/${handle}`)
            .then((res) => {
                setProfile(res.data.user);
            })
            .catch((err) => console.log(err));

        return () => {
            setProfile({});
        };
    }, [dispatch, match.params]);

    const screamsMarkup = loading ? (
        <ScreamSkeleton />
    ) : screams === null ? (
        <p>No screams from this user</p>
    ) : !screamIdParam ? (
        screams.map((scream) => (
            <Scream key={scream.screamId} scream={scream} />
        ))
    ) : (
        screams.map((scream) => {
            if (scream.screamId !== screamIdParam)
                return <Scream key={scream.screamId} scream={scream} />;
            else
                return (
                    <Scream key={scream.screamId} scream={scream} openDialog />
                );
        })
    );

    return (
        <Grid container spacing={2}>
            <Grid item sm={8} xs={12}>
                {screamsMarkup}
            </Grid>
            <Grid item sm={4} xs={12}>
                {profile === null ? (
                    <ProfileSkeleton />
                ) : (
                    <StaticProfile profile={profile} />
                )}
            </Grid>
        </Grid>
    );
};

export default User;
