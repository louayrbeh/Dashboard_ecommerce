import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { Delete } from "@mui/icons-material";

// eslint-disable-next-line react/prop-types
function Delivred({ color, icon, id, date, montant, onDelete }) {
  return (
    <MDBox key={id} component="li" py={1} pr={2} mb={1}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center">
        <MDBox display="flex" alignItems="center">
          <MDBox mr={2}>
            <MDButton variant="outlined" color="error" iconOnly circular onClick={onDelete}>
              <Delete sx={{ fontWeight: "bold" }}></Delete>
            </MDButton>
          </MDBox>
          <MDBox display="flex" flexDirection="column">
            <MDTypography variant="button" fontWeight="medium" gutterBottom>
              ID: {id}
            </MDTypography>
            <MDTypography variant="caption" color="text" fontWeight="regular">
              {date}
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDTypography variant="button" color={color} fontWeight="medium" textGradient>
          + {montant}$
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}

// Typechecking props of the Transaction
Delivred.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]).isRequired,
  icon: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  montant: PropTypes.string.isRequired,

  onDelete: PropTypes.func.isRequired,
};

export default Delivred;
