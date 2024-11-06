// Function to fetch users by id
export async function getUserById(userId) {
  try {
    const response = await fetch(`http://localhost:3111/getUser/${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users by ID:", error);
    return [];
  }
}
// function fetch adresse by id

export async function getAdresseById(adresseId) {
  try {
    const response = await fetch(`http://localhost:3111/adresse/get/${adresseId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch adresse");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching adresse by ID:", error);
    return [];
  }
}
// Function to fetch users
export async function fetchUsers() {
  try {
    const response = await fetch("http://localhost:3111/fetchUsers");
    console.log("Response status:", response.status);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const data = await response.json();
    console.log("Users :", data);
    return data;
  } catch (error) {
    console.error("Error fetching users : ", error);
    return [];
  }
}

// Delete user by ID
export async function deleteUser(userId) {
  try {
    const response = await fetch(`http://localhost:3111/delete/${userId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete user");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}
// Function to fetch the total number of users
export async function getUserCount() {
  try {
    const response = await fetch("http://localhost:3111/userCount");
    if (!response.ok) {
      throw new Error("Failed to fetch user count");
    }
    const data = await response.json();
    console.log("Raw API response:", data); // Vérifiez la réponse brute
    return data.totalUsers; // Utilisez 'totalUsers' au lieu de 'count'
  } catch (error) {
    console.error("Error fetching user count:", error);
  }
}
export async function getProductCount() {
  try {
    const response = await fetch("http://localhost:3111/pro//productCount");
    if (!response.ok) {
      throw new Error("Failed to fetch product count");
    }
    const data = await response.json();
    console.log("Raw API response:", data); // Vérifiez la réponse brute
    return data.totalProduct; // Utilisez 'totalUsers' au lieu de 'count'
  } catch (error) {
    console.error("Error fetching product count:", error);
  }
}

export async function getCommandeCount() {
  try {
    const response = await fetch("http://localhost:3111/command//commandCount");
    if (!response.ok) {
      throw new Error("Failed to fetch commande count");
    }
    const data = await response.json();
    console.log("Raw API response:", data); // Vérifiez la réponse brute
    return data.totalCommands; // Utilisez 'totalUsers' au lieu de 'count'
  } catch (error) {
    console.error("Error fetching commande count:", error);
  }
}
