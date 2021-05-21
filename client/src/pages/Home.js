import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid } from "@material-ui/core";

// Component
import Scream from "../components/scream/Scream";

const Home = () => {
    const [screams, setScreams] = useState([]);

    const recentScreamsMarkup =
        screams.length > 0 ? (
            screams.map((scream) => (
                <Scream scream={scream} key={scream.screamId} />
            ))
        ) : (
            <p>Loading...</p>
        );

    useEffect(() => {
        axios
            .get("/screams")
            .then((res) => {
                setScreams(res.data);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid item sm={8} xs={12}>
                {recentScreamsMarkup}
            </Grid>
            <Grid item sm={4} xs={12}>
                <p>Profile</p>
            </Grid>
        </Grid>
    );
};

export default Home;
