/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import { deleteProduct } from "layouts/tables/data/api";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import { Stack } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { deleteProductFromSeller } from "./api";

// Fonction pour définir les colonnes et lignes du tableau de produits populaires
export default function BestSellersProductsData(BSproducts, onDelete) {
  if (!Array.isArray(BSproducts)) {
    return { columnsBS: [], rowsBS: [] }; // Gérer le cas où products n'est pas un tableau
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
    rows: BSproducts.map((BSproduct) => ({
      product: (
        <Product image={BSproduct.image[0]} title={BSproduct.title} brand={BSproduct.brandName} />
      ),
      price: <Price price={BSproduct.price} discount={BSproduct.discountPercent} />,
      status: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={BSproduct.isAvailable ? "In Stock" : "Out of Stock"}
            color={BSproduct.isAvailable ? "success" : "dark"}
            variant="gradient"
            size="sm"
          />
        </MDBox>
      ),
      action: (
        <Stack direction={"row"} spacing={1} display={"flex"}>
          {/* Lien vers la vue détaillée du produit */}
          <Link to={`/product/${BSproduct._id}`}>
            <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
              <VisibilityIcon fontSize="small" />
            </MDTypography>
          </Link>
          {/* Bouton pour supprimer le produit */}

          <Link to={`/product/UpdateProduct/${BSproduct._id}`}>
            <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
              <EditIcon fontSize="small" />
            </MDTypography>
          </Link>
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
            onClick={async () => {
              await deleteProduct(BSproduct._id);
              await deleteProductFromSeller(BSproduct._id); // Appel à la fonction deleteProduct avec l'ID du produit
              onDelete(); // Appel de la fonction onDelete pour mettre à jour la liste
            }}
          >
            <DeleteIcon fontSize="small" />
          </MDTypography>
        </Stack>
      ),
    })),
  };
}
