// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useState } from "react";
import { useEffect } from "react";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

import getCurrentSeller from "./data/apiProfile";

function Overview() {
  const [sellerData, setSellerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        const data = await getCurrentSeller();
        console.log("data :", data); // Vérifiez ici la structure des données
        setSellerData(data);
      } catch (err) {
        setError("Erreur lors du chargement des données vendeur.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSellerData();
  }, []);
  if (loading) {
    return <MDTypography variant="h6">Chargement des données...</MDTypography>;
  }

  if (error) {
    return (
      <MDTypography variant="h6" color="error">
        {error}
      </MDTypography>
    );
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header
        name={sellerData.storeName}
        title={sellerData.storeTitle}
        logo={sellerData.logo}
        storeData={{
          sellername: sellerData.storeName,
          email: sellerData.email,
          password: "password",
          phone: sellerData.phone,
          facebook: sellerData.facebook,
          instagram: sellerData.instagram,
          whatsapp: sellerData.whatsapp,
          siteweb: sellerData.siteweb,
          adresse: sellerData.adresse,
          logo: sellerData.logo,
          storeName: sellerData.storeName,
          storeTitle: sellerData.storeTitle,
          description: sellerData.description,
        }}
      >
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={4} xl={4}>
              <PlatformSettings />
            </Grid>
            <Grid item xs={12} md={4} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <ProfileInfoCard
                title="Profil informations"
                description={sellerData.description}
                info={{
                  fullName: sellerData.sellername || "Non spécifié",
                  mobile: sellerData.phone || "Non spécifié",
                  email: sellerData.email || "Non spécifié",
                  location: sellerData.adresse || "Non spécifié",
                }}
                social={[
                  {
                    link: sellerData.facebook || "#",
                    icon: <FacebookIcon />,
                    color: "facebook",
                  },
                  {
                    link: sellerData.whatsapp || "#",
                    icon: <WhatsAppIcon></WhatsAppIcon>,
                    color: "twitter",
                  },
                  {
                    link: sellerData.instagram || "#",
                    icon: <InstagramIcon />,
                    color: "instagram",
                  },
                ]}
                action={{ route: "", tooltip: "Modifier le profil" }}
                shadow={false}
              />
            </Grid>
            <Grid item xs={12} xl={4}>
              <ProfilesList title="Ratings" profiles={profilesListData} shadow={false} />
            </Grid>
          </Grid>
        </MDBox>
      </Header>
    </DashboardLayout>
  );
}

export default Overview;
