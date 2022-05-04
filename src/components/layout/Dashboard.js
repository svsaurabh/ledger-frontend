import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadUser } from "../../actions/auth";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Dashboard = ({ auth: { loading, user }, loadUser }) => {
    useEffect(() => {
        loadUser();
    }, [loadUser]);
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
        <div>Hi {user?.firstName}</div>
    );
};

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    loadUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps, { loadUser })(Dashboard);
