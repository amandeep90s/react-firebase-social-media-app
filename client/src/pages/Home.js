import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";
import { Grid } from "@material-ui/core";
// Util
import ScreamSkeleton from "../util/ScreamSkeleton";
// Component
import Scream from "../components/scream/Scream";
import Profile from "../components/profile/Profile";

const Home = () => {
    const {
        data: { screams, loading },
    } = useSelector((state) => ({ ...state }));

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getScreams());
    }, []);

    const recentScreamsMarkup = !loading ? (
        screams.map((scream) => (
            <Scream scream={scream} key={scream.screamId} />
        ))
    ) : (
        <ScreamSkeleton />
    );

    return (
        <Grid container spacing={2}>
            <Grid item sm={8} xs={12}>
                {recentScreamsMarkup}
            </Grid>
            <Grid item sm={4} xs={12}>
                <Profile />
            </Grid>
        </Grid>
    );
};

export default Home;
