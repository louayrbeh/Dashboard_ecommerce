// api.js

// Function to fetch popular products
export async function fetchPopularProducts() {
  try {
    const token = localStorage.getItem("token"); // On suppose que le token est dans le stockage local

    if (!token) {
      throw new Error("Token manquant. Veuillez vous connecter.");
    }

    const response = await fetch("http://localhost:3111/seller/popular", {
      method: "GET", // GET pour récupérer les produits populaires
      headers: {
        Authorization: `Bearer ${token}`, // Ajouter le token JWT dans les en-têtes
      },
    });

    // Vérifiez si la réponse est correcte
    if (!response.ok) {
      const errorData = await response.json(); // Récupérer les détails de l'erreur
      throw new Error(
        errorData.message || "Erreur lors de la récupération des produits populaires"
      );
    }

    const data = await response.json(); // Parse les données de la réponse

    // Log des données pour la vérification
    console.log("Produits populaires récupérés : ", data);

    return data; // Retourner les données si nécessaire (par exemple pour les stocker dans l'état)
  } catch (error) {
    console.error("Erreur lors de la récupération des produits populaires :", error.message);
    return null; // Retourner null ou une valeur d'erreur pour l'utiliser plus tard
  }
}

// Function to fetch best sellers
export async function fetchBestSellersProducts() {
  try {
    const token = localStorage.getItem("token"); // On suppose que le token est dans le stockage local

    if (!token) {
      throw new Error("Token manquant. Veuillez vous connecter.");
    }

    const response = await fetch("http://localhost:3111/seller/BestSellers", {
      method: "GET", // GET pour récupérer les produits bestSeller
      headers: {
        Authorization: `Bearer ${token}`, // Ajouter le token JWT dans les en-têtes
      },
    });

    // Vérifiez si la réponse est correcte
    if (!response.ok) {
      const errorData = await response.json(); // Récupérer les détails de l'erreur
      throw new Error(
        errorData.message || "Erreur lors de la récupération des produits bestSeller"
      );
    }

    const data = await response.json(); // Parse les données de la réponse

    // Log des données pour la vérification
    console.log("Produits bestSeller récupérés : ", data);

    return data; // Retourner les données si nécessaire (par exemple pour les stocker dans l'état)
  } catch (error) {
    console.error("Erreur lors de la récupération des produits bestSeller :", error.message);
    return null; // Retourner null ou une valeur d'erreur pour l'utiliser plus tard
  }
}
// Function to fetch flash sale products
export async function fetchFlashSaleProducts() {
  try {
    const token = localStorage.getItem("token"); // On suppose que le token est dans le stockage local

    if (!token) {
      throw new Error("Token manquant. Veuillez vous connecter.");
    }

    const response = await fetch("http://localhost:3111/seller/FlashSales", {
      method: "GET", // GET pour récupérer les produits FlashSale
      headers: {
        Authorization: `Bearer ${token}`, // Ajouter le token JWT dans les en-têtes
      },
    });

    // Vérifiez si la réponse est correcte
    if (!response.ok) {
      const errorData = await response.json(); // Récupérer les détails de l'erreur
      throw new Error(errorData.message || "Erreur lors de la récupération des produits FlashSale");
    }

    const data = await response.json(); // Parse les données de la réponse

    // Log des données pour la vérification
    console.log("Produits FlashSale récupérés : ", data);

    return data; // Retourner les données si nécessaire (par exemple pour les stocker dans l'état)
  } catch (error) {
    console.error("Erreur lors de la récupération des produits FlashSale :", error.message);
    return null; // Retourner null ou une valeur d'erreur pour l'utiliser plus tard
  }
}

// Add product
export async function addProduct(productData) {
  try {
    const response = await fetch("http://localhost:3111/pro/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error("Failed to add product");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding product:", error);
  }
}

// Get product by ID
export async function getProductById(productId) {
  try {
    const response = await fetch(`http://localhost:3111/pro/get/${productId}`);
    if (!response.ok) {
      const errorMessage = await response.text(); // Obtenir le message d'erreur du serveur
      throw new Error(`Failed to fetch product: ${errorMessage}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
  }
}

// Update product by ID
export async function updateProduct(productId, productData) {
  try {
    const response = await fetch(`http://localhost:3111/pro/update/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error("Failed to update product");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating product:", error);
  }
}

// Delete product by ID
export async function deleteProduct(productId) {
  try {
    const response = await fetch(`http://localhost:3111/pro/delete/${productId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete product");
    }
  } catch (error) {
    console.error("Error deleting product:", error);
  }
}
export async function deleteProductFromSeller(productId) {
  const token = localStorage.getItem("token"); // Récupérer le token JWT du localStorage

  if (!token) {
    console.error("Token manquant. Veuillez vous connecter.");
    return;
  }

  try {
    const response = await fetch(`http://localhost:3111/seller/remove-product/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`, // Inclure le token JWT pour l'authentification
      },
    });

    const data = await response.json();

    // Vérifier si la réponse est correcte
    if (response.ok) {
      console.log("Produit supprimé avec succès : ", data);
      return data;
    } else {
      console.error("Erreur lors de la suppression du produit : ", data.message);
      return null;
    }
  } catch (error) {
    console.error("Erreur lors de la suppression du produit :", error.message);
    return null;
  }
}
