const themeObject = {
    palette: {
        primary: {
            light: "#33c9dc",
            main: "#00bcd4",
            dark: "#008394",
            contrastText: "#fff",
        },
        secondary: {
            light: "#ff6333",
            main: "#ff3d00",
            dark: "#b22a00",
            contrastText: "#fff",
        },
    },
    anchor: {
        color: "#00bcd4",
        "&:hover": {
            textDecoration: "none",
            color: "#008394",
        },
    },
    typography: {
        useNextVariants: true,
    },
    form: {
        textAlign: "center",
    },
    image: {
        margin: "1rem 0",
    },
    pageTitle: {
        margin: "0.7rem auto",
    },
    textField: {
        margin: "0.7rem auto",
    },
    button: {
        marginTop: 20,
        position: "relative",
    },
    customError: {
        color: "red",
        fontSize: "0.8rem",
        marginTop: 10,
    },
    progress: {
        position: "absolute",
    },
    invisibleSeparator: {
        border: "none",
        margin: 4,
    },
    visibleSeparator: {
        width: "100%",
        borderBottom: "1px solid rgba(0,0,0,0.1)",
        marginBottom: 20,
    },
    paper: {
        padding: 20,
    },
    profile: {
        "& .image-wrapper": {
            textAlign: "center",
            position: "relative",
            "& button": {
                position: "absolute",
                top: "80%",
                left: "70%",
            },
        },
        "& .profile-image": {
            width: 200,
            height: 200,
            objectFit: "cover",
            maxWidth: "100%",
            borderRadius: "50%",
        },
        "& .profile-details": {
            textAlign: "center",
            "& span, svg": {
                verticalAlign: "middle",
            },
            "& a": {
                color: "#00bcd4",
            },
        },
        "& hr": {
            border: "none",
            margin: "0 0 10px 0",
        },
        "& svg.button": {
            "&:hover": {
                cursor: "pointer",
            },
        },
    },
    buttons: {
        textAlign: "center",
        "& a": {
            margin: "20px 10px",
        },
    },
    handle: {
        height: 20,
        backgroundColor: "#00bcd4",
        width: 60,
        margin: "0 auto 7px auto",
    },
    fullLine: {
        height: 15,
        backgroundColor: "rgba(0,0,0,0.6)",
        width: "100%",
        marginBottom: 10,
    },
    halfLine: {
        height: 15,
        backgroundColor: "rgba(0,0,0,0.6)",
        width: "50%",
        marginBottom: 10,
    },
};

export default themeObject;
