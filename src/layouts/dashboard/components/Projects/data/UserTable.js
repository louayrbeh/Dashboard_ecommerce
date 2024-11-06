/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import { deleteUser } from "./api";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";

// Fonction pour définir les colonnes et lignes du tableau de produits populaires
export default function userData(users, onDelete) {
  if (!Array.isArray(users)) {
    return { columns: [], rows: [] }; // Gérer le cas où products n'est pas un tableau
  }

  const User = ({ pdp, username }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={pdp} name={username} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {username}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  const Phone = ({ phone }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {phone}
      </MDTypography>
    </MDBox>
  );
  const Email = ({ email }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {email}
      </MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "User", accessor: "user", width: "45%", align: "left" },
      { Header: "Email", accessor: "email", align: "center" },
      { Header: "Phone", accessor: "phone", align: "center" },

      { Header: "Action", accessor: "action", align: "center" },
    ],
    rows: users.map((user) => ({
      user: <User pdp={user.pdp} username={user.username} />,

      email: <Email email={user.email} />,
      phone: <Phone phone={user.phone} />,
      action: (
        <Stack display={"flex"}>
          {/* Lien vers la vue détaillée du produit */}
          <Link to={`/user/${user._id}`}>
            <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
              View
            </MDTypography>
          </Link>
          {/* Bouton pour supprimer le produit */}
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
            onClick={async () => {
              await deleteUser(user._id); // Appel à la fonction deleteProduct avec l'ID du produit
              onDelete(); // Appel de la fonction onDelete pour mettre à jour la liste
            }}
          >
            Delete
          </MDTypography>
        </Stack>
      ),
    })),
  };
}
