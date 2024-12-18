import React, { useState, useEffect } from "react";
import Bill from "layouts/billing/components/ConfirmedCommand/Bill";
import {
  fetchConfirmedCommands,
  inProgressCommand as apiinProgressCommand,
  deleteCommand as apiDeleteCommand,
} from "layouts/billing/data/api";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { getUserById, getAdresseById } from "layouts/dashboard/components/Projects/data/api";

import { CircularProgress } from "@mui/material";
import { getCardById } from "layouts/billing/data/api";

function ConfirmedCommandInformation() {
  const [commands, setCommands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCommands = async () => {
      setLoading(true);
      try {
        const commandsData = await fetchConfirmedCommands();
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
                        productData = await getCardById(item.productId);
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

    loadCommands();
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

  const handleInProgressCommand = async (commandId) => {
    try {
      const updatedCommand = await apiinProgressCommand(commandId);
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
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} At ${hours}:${minutes}`;
  }

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Card id="delete-account">
      <MDBox pt={3} px={2} display="flex" justifyContent="space-between">
        <MDTypography variant="h6" fontWeight="medium">
          Your confirmed orders
        </MDTypography>
        <MDTypography variant="h6" fontWeight="medium">
          {commands.length}
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={2}>
        {commands.length > 0 ? (
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
                items={command.products.map((product) => ({
                  productName: product.product?.title || "Not defined",
                  brandName: product.product?.brandName || "Not defined",
                  image: product.product?.image?.[0] || "Not defined",
                  quantity: product.quantity,
                  size: product.size,
                  color: product.color,
                }))}
                onProgress={() => handleInProgressCommand(command._id)} // Pass command ID
                onDelete={() => handleDeleteCommand(command._id)} // Pass command ID
              />
            ))}
          </MDBox>
        ) : (
          <MDTypography variant="caption" color="text" fontWeight="bold" textTransform="uppercase">
            No confirmed orders founds
          </MDTypography>
        )}
      </MDBox>
    </Card>
  );
}

export default ConfirmedCommandInformation;
