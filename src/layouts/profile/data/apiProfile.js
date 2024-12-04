// URL de base de votre API
const API_URL = "http://localhost:3111/seller";

export default async function getCurrentSeller() {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token non trouvé. Le vendeur doit être connecté.");
  }

  const response = await fetch("http://localhost:3111/seller/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    // Utilisez uniquement json() ici pour obtenir les données JSON
    return await response.json();
  } else {
    throw new Error(`Erreur lors de la récupération des données vendeur : ${response.statusText}`);
  }
}
export async function updateSeller(updatedData) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token non trouvé. Le vendeur doit être connecté.");
  }

  const response = await fetch("http://localhost:3111/seller/edit", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });

  if (response.ok) {
    console.log("Mise à jour réussie");
    return await response.json();
  } else {
    throw new Error(`Erreur lors de la mise à jour des données : ${response.statusText}`);
  }
}
export async function getCurrentSellerId() {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token non trouvé. Le vendeur doit être connecté.");
  }

  const response = await fetch("http://localhost:3111/seller/id", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    // Utilisez uniquement json() ici pour obtenir les données JSON
    return await response.json();
  } else {
    throw new Error(`Erreur lors de la récupération d id vendeur : ${response.statusText}`);
  }
}

export const addProductToSeller = async (productId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3111/seller/add-seller-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add product to seller.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding product to seller:", error.message);
    throw error;
  }
};
