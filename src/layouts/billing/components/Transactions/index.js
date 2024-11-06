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
import { CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
// import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import MDButton from "components/MDButton";

// Billing page components
import Transaction from "layouts/billing/components/Transaction";
import {
  fetchInProgressCommands,
  delivredCommand as apiDelivredCommand,
  deleteCommand as apiDeleteCommand,
} from "layouts/billing/data/api";

import { getUserById, getAdresseById } from "layouts/dashboard/components/Projects/data/api";
import { getProductById } from "layouts/tables/data/api";

function Transactions() {
  const [commands, setCommands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadInProgressCommands = async () => {
      setLoading(true);
      try {
        const commandsData = await fetchInProgressCommands();
        if (Array.isArray(commandsData)) {
          const enrichedCommands = await Promise.all(
            commandsData.map(async (command) => {
              const userData = await getUserById(command.userId);
              const adresseData = await getAdresseById(command.addressId);

              const products = command.items
                ? await Promise.all(
                    command.items.map(async (item) => {
                      let productData;
                      try {
                        productData = await getProductById(item.productId);
                      } catch (error) {
                        console.error(
                          `Erreur lors de la récupération du produit ${item.productId}:`,
                          error
                        );
                      }

                      return {
                        ...item,
                        quantity: Number(item.quantity),
                        size: Array.isArray(item.size) ? item.size.join(", ") : String(item.size),
                        color: Array.isArray(item.color)
                          ? item.color.join(", ")
                          : String(item.color),
                        product: productData || {
                          title: "Produit non disponible",
                          brandName: "Marque non disponible",
                          image: [],
                        },
                      };
                    })
                  )
                : [];

              const fullAddress = `${adresseData.pays}, ${adresseData.gouvernant}, ${adresseData.muniplicite}, ${adresseData.rue}, ${adresseData.postal},(${adresseData.phone})`;

              return {
                ...command,
                Clientname: userData.username,
                Clientemail: userData.email,
                Clientphone: userData.phone,
                adresse: fullAddress,
                products,
              };
            })
          );
          enrichedCommands.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          setCommands(enrichedCommands);
        } else {
          setError("La réponse de l'API n'est pas un tableau.");
        }
      } catch (error) {
        setError("Erreur lors de la récupération des commandes.");
      } finally {
        setLoading(false);
      }
    };

    loadInProgressCommands();
  }, []);
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} At ${hours}:${minutes}`;
  }

  const handleDelivredCommand = async (commandId) => {
    try {
      const updatedCommand = await apiDelivredCommand(commandId);
      setCommands((prevCommands) =>
        prevCommands.map((cmd) => (cmd.id === commandId ? { ...cmd, ...updatedCommand } : cmd))
      );
      console.log(`Commande in progress : ${commandId}`);
    } catch (error) {
      console.error(`Erreur lors de la ajoute de la commande in progress : ${error}`);
    }
  };

  const handleDeleteCommand = async (commandId) => {
    try {
      await apiDeleteCommand(commandId);
      setCommands((prevCommands) => prevCommands.filter((cmd) => cmd.id !== commandId));
      console.log(`Commande supprimée : ${commandId}`);
    } catch (error) {
      console.error(`Erreur lors de la suppression de la commande : ${error}`);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!commands.length) {
    return <p>Aucune commande trouvée</p>;
  }

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          In progress commands
        </MDTypography>
        <MDBox display="flex" alignItems="flex-start">
          <MDBox color="text" mr={0.5} lineHeight={0}>
            <Icon color="inherit" fontSize="small">
              date_range
            </Icon>
          </MDBox>
          <MDTypography variant="button" color="text" fontWeight="regular">
            23 - 30 March 2020
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox pt={3} pb={2} px={2}>
        <MDBox mb={2}>
          <MDTypography variant="caption" color="text" fontWeight="bold" textTransform="uppercase">
            newest
          </MDTypography>
        </MDBox>
        <MDBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{ listStyle: "none" }}
        >
          {commands.map((command, index) => (
            <Transaction
              key={index}
              color="error"
              icon="expand_more"
              id={command._id}
              date={formatDate(command.createdAt)}
              montant={command.total}
            />
          ))}
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default Transactions;