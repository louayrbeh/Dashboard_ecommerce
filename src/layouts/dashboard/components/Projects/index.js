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
import React, { useEffect, useState } from "react";

import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import userData from "./data/UserTable";

import DataTable from "examples/Tables/DataTable";

import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { fetchUsers } from "./data/api";
function Users() {
  const [user, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true); // Début du chargement
      try {
        const users = await fetchUsers();
        if (Array.isArray(users)) {
          setUsers(users);
        } else {
          setError("La réponse de l'API n'est pas un tableau.");
        }
      } catch (error) {
        setError("Erreur lors de la récupération des users.");
      } finally {
        setLoading(false); // Fin du chargement
      }
    };

    loadUsers();
  }, []);
  const handleDelete = async () => {
    const data = await fetchUsers();
    setUsers(data); // Mettre à jour les produits
  };

  const { columns: userColumns, rows: userRows } = userData(user, handleDelete);

  if (loading) {
    return <p>Chargement des users...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!user.length) {
    return <p>Aucun user trouvé.</p>; // Message si aucun produit n'est disponible
  }

  return (
    <Card>
      <MDBox
        mx={2}
        mt={-3}
        py={3}
        px={2}
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        coloredShadow="info"
      >
        <Stack direction={"row"} spacing={40}>
          <MDTypography variant="h6" color="white">
            User Table
          </MDTypography>
          <Link to={""}>
            <MDTypography variant="h6" color="white">
              {" "}
            </MDTypography>
          </Link>
        </Stack>
      </MDBox>
      <MDBox pt={3}>
        <DataTable
          table={{ columns: userColumns, rows: userRows }}
          isSorted={false}
          entriesPerPage={false}
          showTotalEntries={false}
          noEndBorder
        />
      </MDBox>
    </Card>
  );
}

export default Users;
