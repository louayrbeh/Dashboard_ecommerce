import { useState, useEffect } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";

// Material Dashboard 2 React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Images
import burceMars from "assets/images/bruce-mars.jpg";
import backgroundImage from "assets/images/bg-profile.jpeg";
import { updateSeller } from "layouts/profile/data/apiProfile";
import { CardContent } from "@mui/material";

function Header({ children, name, title, logo, storeData: initialStoreData }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name,
    title,
    logo,
  });
  const [storeData, setstoreData] = useState(initialStoreData);

  useEffect(() => {
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    window.addEventListener("resize", handleTabsOrientation);
    handleTabsOrientation();
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => {
    setTabValue(newValue);
    if (newValue === 1) {
      setIsEditing(true); // Activer le mode édition si "Edit" est sélectionné
    } else {
      setIsEditing(false); // Revenir au mode normal
    }
  };

  const handleSaveClick = async () => {
    try {
      setIsEditing(false); // Sortir du mode édition
      setTabValue(0); // Revenir à l'onglet "Home"

      // Appel à la fonction pour mettre à jour les données dans le backend
      const result = await updateSeller(storeData);
      console.log("Mise à jour réussie", result);

      // Vous pouvez gérer d'autres actions après la mise à jour, par exemple une alerte de succès ou la redirection.
    } catch (error) {
      console.error("Erreur lors de la sauvegarde :", error);
      // Afficher un message d'erreur à l'utilisateur si nécessaire
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false); // Sortir du mode édition
    setTabValue(0); // Revenir à l'onglet "Home"
  };

  return (
    <MDBox position="relative" mb={5}>
      <MDBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <MDAvatar src={formData.logo} alt="profile-image" size="xl" shadow="sm" />
          </Grid>
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                {formData.name}
              </MDTypography>
              <MDTypography variant="button" color="text" fontWeight="regular">
                {formData.title}
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
            <AppBar position="static">
              <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
                <Tab
                  label="Store"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      home
                    </Icon>
                  }
                />
                <Tab
                  label="Edit"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      edit
                    </Icon>
                  }
                />
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
        {/* Affichage conditionnel */}
        <MDBox mt={3}>
          {isEditing ? (
            <MDBox mt={5} mb={3}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6} xl={4}>
                  <Card sx={{ height: "500px" }}>
                    <CardContent>
                      <MDTypography variant="h5" gutterBottom>
                        Account Informations :
                      </MDTypography>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Username"
                          variant="outlined"
                          margin="normal"
                          value={storeData.sellername}
                          onChange={(e) =>
                            setstoreData({ ...storeData, sellername: e.target.value })
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Email"
                          variant="outlined"
                          margin="normal"
                          value={storeData.email}
                          onChange={(e) => setstoreData({ ...storeData, email: e.target.value })}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Password"
                          variant="outlined"
                          margin="normal"
                          value={storeData.password}
                          onChange={(e) => setstoreData({ ...storeData, password: e.target.value })}
                        />
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <Card sx={{ height: "500px" }}>
                    <CardContent>
                      <MDTypography variant="h5" gutterBottom>
                        Store Contact Informations :
                      </MDTypography>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Phone"
                          variant="outlined"
                          margin="normal"
                          value={storeData.phone}
                          onChange={(e) => setstoreData({ ...storeData, phone: e.target.value })}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Facebook link"
                          variant="outlined"
                          margin="normal"
                          value={storeData.facebook}
                          onChange={(e) => setstoreData({ ...storeData, facebook: e.target.value })}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Instagram link"
                          variant="outlined"
                          margin="normal"
                          value={storeData.instagram}
                          onChange={(e) =>
                            setstoreData({ ...storeData, instagram: e.target.value })
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Whatsapp Number"
                          variant="outlined"
                          margin="normal"
                          value={storeData.whatsapp}
                          onChange={(e) => setstoreData({ ...storeData, whatsapp: e.target.value })}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Web site :"
                          variant="outlined"
                          margin="normal"
                          value={storeData.siteweb}
                          onChange={(e) => setstoreData({ ...storeData, siteweb: e.target.value })}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Adresse"
                          variant="outlined"
                          margin="normal"
                          value={storeData.adresse}
                          onChange={(e) => setstoreData({ ...storeData, adresse: e.target.value })}
                        />
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <Card sx={{ height: "500px" }}>
                    <CardContent>
                      <MDTypography variant="h5" gutterBottom>
                        Store Informations :
                      </MDTypography>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Logo"
                          variant="outlined"
                          margin="normal"
                          value={storeData.logo}
                          onChange={(e) => setstoreData({ ...storeData, logo: e.target.value })}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Store Name"
                          variant="outlined"
                          margin="normal"
                          value={storeData.storeName}
                          onChange={(e) =>
                            setstoreData({ ...storeData, storeName: e.target.value })
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Store Title"
                          variant="outlined"
                          margin="normal"
                          value={storeData.storeTitle}
                          onChange={(e) =>
                            setstoreData({ ...storeData, storeTitle: e.target.value })
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          multiline
                          minRows={5}
                          label="Description"
                          variant="outlined"
                          margin="normal"
                          value={storeData.description}
                          onChange={(e) =>
                            setstoreData({ ...storeData, description: e.target.value })
                          }
                        />
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              <MDBox mt={2}>
                <Card>
                  <CardContent>
                    <MDBox display="flex" justifyContent="flex-end" gap={2}>
                      <MDButton
                        onClick={handleCancelClick}
                        variant="outlined"
                        color="error"
                        sx={{ width: "150px" }}
                      >
                        Cancel
                      </MDButton>
                      <MDButton
                        onClick={handleSaveClick}
                        variant="gradient"
                        color="success"
                        sx={{ width: "150px" }}
                      >
                        Save
                      </MDButton>
                    </MDBox>
                  </CardContent>
                </Card>
              </MDBox>
            </MDBox>
          ) : (
            children
          )}
        </MDBox>
      </Card>
    </MDBox>
  );
}

// Setting default props for the Header
Header.defaultProps = {
  children: "",
  name: "Store name",
  title: "Store title",

  logo: burceMars,
};

// Typechecking props for the Header
Header.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  title: PropTypes.string,
  logo: PropTypes.string,
  storeData: PropTypes.shape({
    sellername: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    phone: PropTypes.string,
    facebook: PropTypes.string,
    instagram: PropTypes.string,
    whatsapp: PropTypes.string,
    siteweb: PropTypes.string,
    adresse: PropTypes.string,
    logo: PropTypes.string,
    storeName: PropTypes.string,
    storeTitle: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default Header;
