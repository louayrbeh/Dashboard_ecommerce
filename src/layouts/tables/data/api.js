// api.js

// Function to fetch popular products
export async function fetchPopularProducts() {
  try {
    const response = await fetch("http://localhost:3111/pro/popular"); // Use your actual URL
    console.log("Response status:", response.status);
    if (!response.ok) {
      throw new Error("Failed to fetch popular products");
    }
    const data = await response.json();
    console.log("Popular Products:", data); // Log data to confirm
    return data;
  } catch (error) {
    console.error("Error fetching popular products:", error);
    return [];
  }
}

// Function to fetch best sellers
export async function fetchBestSellersProducts() {
  try {
    const response = await fetch("http://localhost:3111/pro/best-sellers");
    console.log("Response status:", response.status);
    if (!response.ok) {
      throw new Error("Failed to fetch best sellers");
    }
    const data = await response.json();
    console.log("BS Product :", data);
    return data;
  } catch (error) {
    console.error("Error fetching best sellers:", error);
    return [];
  }
}

// Function to fetch flash sale products
export async function fetchFlashSaleProducts() {
  try {
    const response = await fetch("http://localhost:3111/pro/flash-sale");
    console.log("Response status:", response.status);
    if (!response.ok) {
      throw new Error("Failed to fetch flash sale products");
    }
    const data = await response.json();
    console.log("FS Product :", data);
    return data;
  } catch (error) {
    console.error("Error fetching flash sale products:", error);
    return [];
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
    const response = await fetch(`http://localhost:3111/card/get/${productId}`);
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
