import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadUser, updateUser } from "../../actions/auth";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Input from "@mui/material/Input";
import { Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";

const Profile = ({ auth: { user, loading }, loadUser, updateUser }) => {
    useEffect(() => {
        loadUser();
    }, [loadUser, updateUser]);
    const [edit, setEdit] = useState(false);
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!name || name == "") {
            setError(true);
        } else {
            const [firstName, lastName] = name.split(" ");
            if (firstName == user.firstName && lastName == user.lastName) {
                setError(false);
                setEdit(false);
            } else {
                updateUser({ firstName, lastName, email: user.email });
                setError(false);
                setEdit(false);
            }
        }
    };
    return loading && user === null ? (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
            }}
        >
            <CircularProgress />
        </Box>
    ) : (
        <Container component="main" maxWidth="s">
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "80vh",
                    width: "100%",
                }}
            >
                <Stack
                    spacing={2}
                    sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "center",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        <Avatar>H</Avatar>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        <Typography variant="h4">
                            Welcome, {user?.firstName}
                        </Typography>
                    </Box>
                    <Typography variant="h6" sx={{ width: "100%" }}>
                        First Name:{" "}
                        <Input
                            disabled={!edit}
                            disableUnderline={!edit}
                            defaultValue={`${user?.firstName} ${user?.lastName}`}
                            onChange={(e) => setName(e.target.value)}
                            error={error && name == ""}
                            sx={{ fontSize: "1.25rem", padding: "0px" }}
                        />
                        {!edit ? (
                            <Button
                                onClick={() => {
                                    setEdit(true);
                                    setName(
                                        `${user?.firstName} ${user?.lastName}`
                                    );
                                }}
                            >
                                <EditIcon />
                            </Button>
                        ) : null}
                    </Typography>
                    <Typography variant="h6">Email: {user?.email}</Typography>

                    {edit ? (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                            }}
                        >
                            {" "}
                            <Button onClick={handleSubmit}>Submit</Button>{" "}
                        </Box>
                    ) : null}
                </Stack>
            </Box>
        </Container>
    );
};

Profile.propTypes = {
    auth: PropTypes.object.isRequired,
    loadUser: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps, { loadUser, updateUser })(Profile);
