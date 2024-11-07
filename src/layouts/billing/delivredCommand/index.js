import { CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
// import Divider from "@mui/material/Divider";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import MDButton from "components/MDButton";

// Billing page components

import { deleteCommand as apiDeleteCommand } from "layouts/billing/data/api";

import Delivred from "./delivred";
import { fetchDelivredCommands } from "../data/api";

function Delivreds() {
  const [commands, setCommands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDelivredCommands = async () => {
      setLoading(true);
      try {
        const commandsData = await fetchDelivredCommands();
        if (Array.isArray(commandsData)) {
          const enrichedCommands = await Promise.all(
            commandsData.map(async (command) => {
              return {
                ...command,
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

    loadDelivredCommands();
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

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={2} display="flex" justifyContent="space-between">
        <MDTypography variant="h6" fontWeight="medium">
          Delivred orders
        </MDTypography>
        <MDTypography variant="h6" fontWeight="medium">
          {commands.length}
        </MDTypography>
      </MDBox>
      <MDBox pt={3} pb={2} px={2}>
        <MDBox mb={2}></MDBox>
        {commands.length > 0 ? (
          <MDBox
            component="ul"
            display="flex"
            flexDirection="column"
            p={0}
            m={0}
            sx={{ listStyle: "none" }}
          >
            {commands.map((command, index) => (
              <Delivred
                key={index}
                color="success"
                id={command._id}
                date={formatDate(command.createdAt)}
                montant={command.total}
                onDelete={() => handleDeleteCommand(command._id)} // Pass command ID
              />
            ))}
          </MDBox>
        ) : (
          <MDTypography variant="caption" color="text" fontWeight="bold" textTransform="uppercase">
            No delevred orders founds
          </MDTypography>
        )}
      </MDBox>
    </Card>
  );
}

export default Delivreds;
