// URL de base de votre API
const API_URL = "http://localhost:3111/seller";

// Fonction pour enregistrer un vendeur
export const registerSeller = async (sellerData) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sellerData),
    });

    if (!response.ok) {
      // Gestion des erreurs HTTP
      const errorData = await response.json();
      throw new Error(errorData.message || "Erreur lors de l'enregistrement");
    }

    const data = await response.json();
    console.log("Enregistrement réussi :", data);
    return data;
  } catch (error) {
    console.error("Erreur lors de l'enregistrement :", error);
    throw error;
  }
};

// Fonction pour connecter un vendeur
export const loginSeller = async (loginData) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      // Gestion des erreurs HTTP
      const errorData = await response.json();
      throw new Error(errorData.message || "Erreur lors de la connexion");
    }

    const data = await response.json();
    console.log("Connexion réussie :", data);
    return data;
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    throw error;
  }
};
