import React from "react";
import Alert from "@mui/material/Alert";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alerts = ({ alerts }) => {
    return (
        alerts &&
        alerts.map((alert) => (
            <Alert
                key={alert.id}
                severity={`${alert.alertType}`}
                sx={{
                    flexGrow: 1,
                    justifyContent: "center",
                    alignIterms: "center",
                }}
            >
                {alert.msg}
            </Alert>
        ))
    );
};

Alerts.propTypes = {
    alerts: PropTypes.array,
};

const mapStateToProps = (state) => ({
    alerts: state.alerts,
});

export default connect(mapStateToProps)(Alerts);
