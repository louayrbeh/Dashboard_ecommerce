export async function fetchCommands() {
  try {
    const response = await fetch("http://localhost:3111/command/get-all-command"); // Use your actual URL
    console.log("Response status:", response.status);
    if (!response.ok) {
      throw new Error("Failed to fetch command");
    }
    const data = await response.json();
    console.log("commands:", data); // Log data to confirm
    return data;
  } catch (error) {
    console.error("Error fetching commands:", error);
    return [];
  }
}

export async function fetchCommandById(commandId) {
  if (!commandId) return null;
  try {
    const response = await fetch(`http://localhost:3111/command/get/${commandId}`);
    if (!response.ok) throw new Error("Failed to fetch command");
    return await response.json();
  } catch (error) {
    console.error("Error fetching commands:", error);
    throw error; // Throw error pour que le composant le gère
  }
}
export async function fetchConfirmedCommands() {
  try {
    const response = await fetch("http://localhost:3111/command/get-confirmed-command"); // Use your actual URL
    console.log("Response status:", response.status);
    if (!response.ok) {
      throw new Error("Failed to fetch confirmed command");
    }
    const data = await response.json();
    console.log("commands:", data); // Log data to confirm
    return data;
  } catch (error) {
    console.error("Error fetching confirmed commands:", error);
    return [];
  }
}
export async function fetchInProgressCommands() {
  try {
    const response = await fetch("http://localhost:3111/command/get-inprogress-command"); // Use your actual URL
    console.log("Response status:", response.status);
    if (!response.ok) {
      throw new Error("Failed to fetch inprogress command");
    }
    const data = await response.json();
    console.log("commands:", data); // Log data to confirm
    return data;
  } catch (error) {
    console.error("Error fetching inprogress commands:", error);
    return [];
  }
}

export async function fetchDelivredCommands() {
  try {
    const response = await fetch("http://localhost:3111/command/get-delivred-command"); // Use your actual URL
    console.log("Response status:", response.status);
    if (!response.ok) {
      throw new Error("Failed to fetch delivred command");
    }
    const data = await response.json();
    console.log("commands:", data); // Log data to confirm
    return data;
  } catch (error) {
    console.error("Error fetching delivred commands:", error);
    return [];
  }
}
// Function to confirm a command
export async function confirmedCommand(commandId) {
  try {
    console.log("commande id ", commandId);
    const response = await fetch(`http://localhost:3111/command/update/${commandId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        IsConfirmed: true,
      }), // Update the IsConfirmed property
    });
    if (!response.ok) {
      throw new Error("Failed to confirm command");
    }
    const updatedCommand = await response.json();
    return updatedCommand; // Return the updated command
  } catch (error) {
    console.error("Error confirming command:", error);
    throw error;
  }
}

// Function to mark a command as in progress
export async function inProgressCommand(commandId) {
  try {
    const response = await fetch(`http://localhost:3111/command/update/${commandId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ IsInProgress: true }), // Update the IsInProgress property
    });
    if (!response.ok) {
      throw new Error("Failed to update command to in progress");
    }
    const updatedCommand = await response.json();
    return updatedCommand; // Return the updated command
  } catch (error) {
    console.error("Error updating command to in progress:", error);
    throw error;
  }
}

// Function to mark a command as delivered
export async function delivredCommand(commandId) {
  try {
    const response = await fetch(`http://localhost:3111/command/update/${commandId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ IsDelivred: true }), // Update the IsDelivred property
    });
    if (!response.ok) {
      throw new Error("Failed to update command to delivered");
    }
    const updatedCommand = await response.json();
    return updatedCommand; // Return the updated command
  } catch (error) {
    console.error("Error updating command to delivered:", error);
    throw error;
  }
}
// Function to delete a command
export async function deleteCommand(commandId) {
  try {
    const response = await fetch(`http://localhost:3111/command/delete/${commandId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete command");
    }
    return response.status; // Return the response status for further use if needed
  } catch (error) {
    console.error("Error deleting command:", error);
    throw error;
  }
}
