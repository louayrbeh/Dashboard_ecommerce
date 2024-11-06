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
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import {
  fetchPopularProducts,
  fetchBestSellersProducts,
  fetchFlashSaleProducts,
} from "layouts/tables/data/api"; // Assurez-vous d'importer la fonction d'API

import popularProductsData from "layouts/tables/data/PopularProductsTable"; // Assurez-vous d'importer la fonction d'API
import BestSellersProductsData from "layouts/tables/data/BestSellersProductsTable"; // Assurez-vous d'importer la fonction d'API
import FlashSaleProductsData from "layouts/tables/data/FlashSaleProducts"; // Assurez-vous d'importer la fonction d'API
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
function Table() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [BSproducts, setBSProducts] = useState([]);
  const [BSloading, setBSLoading] = useState(true);
  const [BSerror, setBSError] = useState(null);
  const [FSproducts, setFSProducts] = useState([]);
  const [FSloading, setFSLoading] = useState(true);
  const [FSerror, setFSError] = useState(null);

  useEffect(() => {
    const loadPopularProducts = async () => {
      setLoading(true); // Début du chargement
      try {
        const products = await fetchPopularProducts();
        if (Array.isArray(products)) {
          setProducts(products);
        } else {
          setError("La réponse de l'API n'est pas un tableau.");
        }
      } catch (error) {
        setError("Erreur lors de la récupération des produits populaires.");
      } finally {
        setLoading(false); // Fin du chargement
      }
    };
    const loadBestSellersProducts = async () => {
      setBSLoading(true); // Début du chargement
      try {
        const BSproducts = await fetchBestSellersProducts();
        if (Array.isArray(BSproducts)) {
          setBSProducts(BSproducts);
        } else {
          setBSError("La réponse de l'API n'est pas un tableau.");
        }
      } catch (BSerror) {
        setBSError("Erreur lors de la récupération des produits bEST SELLER.");
      } finally {
        setBSLoading(false); // Fin du chargement
      }
    };
    const loadFlashSalleProducts = async () => {
      setFSLoading(true); // Début du chargement
      try {
        const FSproducts = await fetchFlashSaleProducts();
        if (Array.isArray(FSproducts)) {
          setFSProducts(FSproducts);
        } else {
          setFSError("La réponse de l'API n'est pas un tableau.");
        }
      } catch (FSerror) {
        setFSError("Erreur lors de la récupération des produits Flash sale.");
      } finally {
        setFSLoading(false); // Fin du chargement
      }
    };

    loadPopularProducts();
    loadBestSellersProducts();
    loadFlashSalleProducts();
  }, []);
  const handleDelete = async () => {
    const data = await fetchPopularProducts();
    setProducts(data); // Mettre à jour les produits
  };
  const BShandleDelete = async () => {
    const data = await fetchBestSellersProducts();
    setBSProducts(data); // Mettre à jour les produits
  };
  const FShandleDelete = async () => {
    const data = await fetchFlashSaleProducts();
    setFSProducts(data); // Mettre à jour les produits
  };
  const { columns: popularColumns, rows: popularRows } = popularProductsData(
    products,
    handleDelete
  );

  const { columns: bestSellersColumns, rows: bestSellersRows } = BestSellersProductsData(
    BSproducts,
    BShandleDelete
  );

  const { columns: FlashSalleColumns, rows: FlashSalleRows } = FlashSaleProductsData(
    FSproducts,
    FShandleDelete
  );

  if (loading) {
    return <p>Chargement des produits populaires...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!products.length) {
    return <p>Aucun produit populaire trouvé.</p>; // Message si aucun produit n'est disponible
  }
  if (BSloading) {
    return <p>Chargement des produits Best-Seller...</p>;
  }

  if (BSerror) {
    return <p>{BSerror}</p>;
  }

  if (!BSproducts.length) {
    return <p>Aucun produit Best-Seller trouvé.</p>; // Message si aucun produit n'est disponible
  }
  if (FSloading) {
    return <p>Chargement des produits Flash-Sellers...</p>;
  }

  if (FSerror) {
    return <p>{FSerror}</p>;
  }

  if (!FSproducts.length) {
    return <p>Aucun produit Flash-Seller trouvé.</p>; // Message si aucun produit n'est disponible
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <Stack direction={"row"} spacing={40}>
                  <MDTypography variant="h6" color="white">
                    Popular Products Table
                  </MDTypography>
                  <Link to={"/product/addProduct"}>
                    <MDTypography variant="h6" color="white">
                      {" "}
                      Add+
                    </MDTypography>
                  </Link>
                </Stack>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: popularColumns, rows: popularRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Best-Sellers Products Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: bestSellersColumns, rows: bestSellersRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Flash-Sellers Products Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: FlashSalleColumns, rows: FlashSalleRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Table;
