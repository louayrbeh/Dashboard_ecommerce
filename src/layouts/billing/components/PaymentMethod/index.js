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
import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { CircularProgress, TextField, Card, Grid } from "@mui/material";
import { Search } from "@mui/icons-material";
import Bill from "./bill";
import { fetchCommandById } from "layouts/billing/data/api";
import { getUserById } from "layouts/dashboard/components/Projects/data/api";
import { getAdresseById } from "layouts/dashboard/components/Projects/data/api";

import { getCardById } from "layouts/billing/data/api";

function PaymentMethod() {
  const [commandId, setCommandId] = useState(null);
  const [commands, setCommands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fonction pour gérer la recherche
  const handleSearch = async () => {
    if (!commandId) return;

    setLoading(true);
    setError(null);

    try {
      const commandData = await fetchCommandById(commandId);
      console.log("commandData :", commandData);

      if (commandData) {
        const userData = await getUserById(commandData.userId);
        const adresseData = await getAdresseById(commandData.addressId);

        const products = commandData.items
          ? await Promise.all(
              commandData.items.map(async (item) => {
                const productData = await getCardById(item.productId);
                return {
                  ...item,
                  quantity: Number(item.quantity),
                  size: Array.isArray(item.size) ? item.size.join(", ") : String(item.size),
                  color: Array.isArray(item.color) ? item.color.join(", ") : String(item.color),
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

        setCommands([
          {
            ...commandData,
            Clientname: userData.username,
            Clientemail: userData.email,
            Clientphone: userData.phone,
            adresse: fullAddress,
            products,
          },
        ]);
      } else {
        setError("Order not found.");
      }
    } catch (error) {
      setError("Error retrieving order details, Please check the order id and retry!");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCommand = async (commandId) => {
    try {
      await apiDeleteCommand(commandId);
      setCommands((prevCommands) => prevCommands.filter((cmd) => cmd._id !== commandId));
      console.log(`Commande supprimée : ${commandId}`);
    } catch (error) {
      console.error(`Erreur lors de la suppression de la commande : ${error}`);
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} At ${hours}:${minutes}`;
  }
  function formatState(confirmed, inprogress, delivred) {
    if (!confirmed && !inprogress && !delivred) {
      return "New order";
    }
    if (confirmed && !inprogress && !delivred) {
      return "Confirmed";
    }
    if (confirmed && inprogress && !delivred) {
      return "In progress";
    }
    if (confirmed && inprogress && delivred) {
      return "Delivred";
    }
  }
  return (
    <Card id="search-order">
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium">
          Search orders by ID
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              value={commandId || ""}
              onChange={(e) => setCommandId(e.target.value)}
              placeholder=""
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <MDButton variant="gradient" color="dark" onClick={handleSearch}>
              <Search sx={{ fontWeight: "bold" }} />
              &nbsp;Search order
            </MDButton>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox p={2}>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <MDTypography variant="caption" color="error" fontWeight="bold">
            {error}
          </MDTypography>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <MDBox pt={1} pb={2} px={2}>
                <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
                  {commands.map((command, index) => (
                    <Bill
                      key={index}
                      name={command.Clientname}
                      email={command.Clientemail}
                      phone={command.Clientphone}
                      addresse={command.adresse}
                      total={command.total}
                      subtotal={command.subtotal}
                      deliveryFee={command.deliveryFee}
                      date={formatDate(command.createdAt)}
                      state={formatState(
                        command.IsConfirmed,
                        command.IsInProgress,
                        command.IsDelivred
                      )}
                      items={command.products.map((product) => ({
                        productName: product.product?.title || "Not defined",
                        brandName: product.product?.brandName || "Not defined",
                        image: product.product?.image?.[0] || "Not defined",
                        quantity: product.quantity,
                        size: product.size,
                        color: product.color,
                      }))}
                      onDelete={() => handleDeleteCommand(command._id)}
                    />
                  ))}
                </MDBox>
              </MDBox>
            </Grid>
          </Grid>
        )}
      </MDBox>
    </Card>
  );
}

export default PaymentMethod;
