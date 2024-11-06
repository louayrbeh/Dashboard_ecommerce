/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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
import { deleteProduct } from "layouts/tables/data/api";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import { Stack } from "@mui/material";

import { Link } from "react-router-dom";

// Fonction pour définir les colonnes et lignes du tableau de produits populaires
export default function FlashSaleProductsData(FSproducts, onDelete) {
  if (!Array.isArray(FSproducts)) {
    return { FScolumns: [], FSrows: [] }; // Gérer le cas où products n'est pas un tableau
  }

  const Product = ({ image, title, brand }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={title} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {title}
        </MDTypography>
        <MDTypography variant="caption">{brand}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Price = ({ price, discount }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        ${price}
      </MDTypography>
      <MDTypography variant="caption">{discount ? `${discount}% off` : "No discount"}</MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Product", accessor: "product", width: "45%", align: "left" },
      { Header: "Price", accessor: "price", align: "center" },
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "Action", accessor: "action", align: "center" },
    ],
    rows: FSproducts.map((FSproduct) => ({
      product: (
        <Product image={FSproduct.image[0]} title={FSproduct.title} brand={FSproduct.brandName} />
      ),
      price: <Price price={FSproduct.price} discount={FSproduct.discountPercent} />,
      status: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={FSproduct.isAvailable ? "In Stock" : "Out of Stock"}
            color={FSproduct.isAvailable ? "success" : "dark"}
            variant="gradient"
            size="sm"
          />
        </MDBox>
      ),
      action: (
        <Stack display={"flex"}>
          {/* Lien vers la vue détaillée du produit */}
          <Link to={`/product/${FSproduct._id}`}>
            <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
              View
            </MDTypography>
          </Link>
          {/* Bouton pour supprimer le produit */}
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
            onClick={async () => {
              await deleteProduct(FSproduct._id); // Appel à la fonction deleteProduct avec l'ID du produit
              onDelete(); // Appel de la fonction onDelete pour mettre à jour la liste
            }}
          >
            Delete
          </MDTypography>
          <Link to={`/product/UpdateProduct/${FSproduct._id}`}>
            <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
              Update
            </MDTypography>
          </Link>
        </Stack>
      ),
    })),
  };
}
