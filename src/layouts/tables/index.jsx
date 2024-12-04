import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import DataTable from "examples/Tables/DataTable";
import {
  fetchPopularProducts,
  fetchBestSellersProducts,
  fetchFlashSaleProducts,
} from "layouts/tables/data/api"; // Assurez-vous d'importer la fonction d'API

import popularProductsData from "layouts/tables/data/PopularProductsTable";
import BestSellersProductsData from "layouts/tables/data/BestSellersProductsTable";
import FlashSaleProductsData from "layouts/tables/data/FlashSaleProducts";
import { CircularProgress, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
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
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <MDTypography variant="h6" color="white">
                    Popular Products Table
                  </MDTypography>
                  <Link to={"/product/addProduct"}>
                    <MDTypography variant="h6" color="white">
                      {" "}
                      <AddCircleOutlineIcon fontSize="medium"></AddCircleOutlineIcon>
                    </MDTypography>
                  </Link>
                </Stack>
              </MDBox>
              <MDBox pt={3}>
                {loading ? (
                  <CircularProgress></CircularProgress>
                ) : !products.length ? (
                  <MDTypography variant="body1" color="text" align="center" mb={2}>
                    {" "}
                    No products founds{" "}
                  </MDTypography>
                ) : error ? (
                  <MDTypography variant="body1" color="text" align="center" mb={2}>
                    {error}
                  </MDTypography>
                ) : (
                  <DataTable
                    table={{ columns: popularColumns, rows: popularRows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                )}
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
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <MDTypography variant="h6" color="white">
                    Best-Sellers Products Table
                  </MDTypography>
                  <Link to={"/product/addProduct"}>
                    <MDTypography variant="h6" color="white">
                      {" "}
                      <AddCircleOutlineIcon fontSize="medium"></AddCircleOutlineIcon>
                    </MDTypography>
                  </Link>
                </Stack>
              </MDBox>
              <MDBox pt={3}>
                {BSloading ? (
                  <CircularProgress></CircularProgress>
                ) : !BSproducts.length ? (
                  <MDTypography variant="body1" color="text" align="center" mb={2}>
                    {" "}
                    No products founds{" "}
                  </MDTypography>
                ) : BSerror ? (
                  <MDTypography variant="body1" color="text" align="center" mb={2}>
                    {BSerror}
                  </MDTypography>
                ) : (
                  <DataTable
                    table={{ columns: bestSellersColumns, rows: bestSellersRows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                )}
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
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <MDTypography variant="h6" color="white">
                    Flash-Sellers Products Table
                  </MDTypography>
                  <Link to={"/product/addProduct"}>
                    <MDTypography variant="h6" color="white">
                      {" "}
                      <AddCircleOutlineIcon fontSize="medium"></AddCircleOutlineIcon>
                    </MDTypography>
                  </Link>
                </Stack>
              </MDBox>
              <MDBox pt={3}>
                {FSloading ? (
                  <CircularProgress></CircularProgress>
                ) : !FSproducts.length ? (
                  <MDTypography variant="body1" color="text" align="center" mb={2}>
                    {" "}
                    No products founds{" "}
                  </MDTypography>
                ) : FSerror ? (
                  <MDTypography variant="body1" color="text" align="center" mb={2}>
                    {FSerror}
                  </MDTypography>
                ) : (
                  <DataTable
                    table={{ columns: FlashSalleColumns, rows: FlashSalleRows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Table;
