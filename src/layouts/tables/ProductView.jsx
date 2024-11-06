import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Grid, Chip, Divider, Stack } from "@mui/material";
import { getProductById } from "layouts/tables/data/api";

import CategoryIcon from "@mui/icons-material/Category";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import StraightenIcon from "@mui/icons-material/Straighten";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import InventoryIcon from "@mui/icons-material/Inventory";
import CottageIcon from "@mui/icons-material/Cottage";
import SettingsIcon from "@mui/icons-material/Settings";
import VerifiedIcon from "@mui/icons-material/Verified";
import WeightIcon from "@mui/icons-material/FitnessCenter";
import PercentIcon from "@mui/icons-material/Percent";
import TaxIcon from "@mui/icons-material/Receipt";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

const ProductView = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getProductById(productId);
        setProduct(fetchedProduct);
        if (fetchedProduct.image && fetchedProduct.image.length > 0) {
          setSelectedImage(fetchedProduct.image[0]); // Définir la première image comme image sélectionnée
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading product...</div>;
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box sx={{ padding: "2rem" }}>
        <Grid container spacing={4}>
          {/* Product Gallery */}
          <Grid item xs={12} md={6}>
            <Stack direction={"row"} spacing={0.5} alignItems="center">
              <Typography variant="h6" gutterBottom>
                Product Gallery
              </Typography>
              <Divider sx={{ height: "5px", flexGrow: 4 }} />
            </Stack>
            <Box height={20}></Box>

            {/* Main selected image */}
            <Box
              component="img"
              src={selectedImage || "placeholder.jpg"}
              alt={product.title || "Not defined"}
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
                border: "1px solid #ddd",
                padding: "1rem",
              }}
            />

            {/* Thumbnails for other images */}
            {product.image && product.image.length > 1 && (
              <Stack direction="row" spacing={2} marginTop={2}>
                {product.image.map((img, index) => (
                  <Box
                    key={index}
                    component="img"
                    src={img}
                    alt={`Thumbnail ${index}`}
                    onClick={() => setSelectedImage(img)}
                    sx={{
                      width: 100,
                      height: 100,
                      borderRadius: "8px",
                      border: selectedImage === img ? "2px solid #1976d2" : "1px solid #ddd",
                      cursor: "pointer",
                    }}
                  />
                ))}
              </Stack>
            )}
          </Grid>

          {/* Product Details */}
          <Grid item xs={12} md={6}>
            <Stack direction={"row"} spacing={0.5} alignItems="center">
              <Typography variant="h6" gutterBottom>
                Product Details
              </Typography>
              <Divider sx={{ height: "5px", flexGrow: 4 }} />
            </Stack>
            <Box height={20}></Box>
            <Stack marginTop={2}>
              <Typography variant="h6" gutterBottom>
                {product.title ? product.title : "Not defined"}
              </Typography>
            </Stack>

            {/* Displaying Additional Product Information */}
            <Stack direction="row" spacing={1} marginTop={2}>
              <CottageIcon />
              <Typography variant="body2">
                <strong>Brand :</strong> {product.brandName ? product.brandName : "Not defined"}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} marginTop={2}>
              <CategoryIcon />
              <Typography variant="body2">
                <strong>Category:</strong> {product.category ? product.category : "Not defined"}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} marginTop={2}>
              <ColorLensIcon />
              <Typography variant="body2">
                <strong>Color :</strong>
                {product.colors && product.colors.length > 0
                  ? product.colors.map((color) => (
                      <Chip key={color} label={color} sx={{ marginLeft: "0.5rem" }} />
                    ))
                  : "Not defined"}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} marginTop={2}>
              <StraightenIcon />
              <Typography variant="body2">
                <strong>Size :</strong>
                {product.sizes && product.sizes.length > 0
                  ? product.sizes.map((size) => (
                      <Chip key={size} label={size} sx={{ marginLeft: "0.5rem" }} />
                    ))
                  : "Not defined"}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} marginTop={2}>
              <LocalOfferIcon />
              <Typography variant="body2">
                <strong>Price :</strong> ${product.price ? product.price : "Not defined"}
                {product.discount ? (
                  <>
                    <span style={{ textDecoration: "line-through", marginLeft: "0.5rem" }}>
                      {product.priceAfetDiscount}
                    </span>
                  </>
                ) : null}
              </Typography>
            </Stack>

            {/* Tax and Discount Information */}
            <Stack direction="row" spacing={1} marginTop={2}>
              <TaxIcon />
              <Typography variant="body2">
                <strong>Tax :</strong> {product.tax ? product.tax : "Not defined"}%
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} marginTop={2}>
              <PercentIcon />
              <Typography variant="body2">
                <strong>Discount Percent :</strong>{" "}
                {product.dicountpercent ? product.dicountpercent : "Not defined"}%
              </Typography>
            </Stack>

            {/* Stock and Weight */}
            <Stack direction="row" spacing={1} marginTop={2}>
              <InventoryIcon />
              <Typography variant="body2">
                <strong>Stock :</strong> {product.stock ? product.stock : "Not defined"} pieces
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} marginTop={2}>
              <WeightIcon />
              <Typography variant="body2">
                <strong>Weight :</strong> {product.weight ? product.weight : "Not defined"} kg
              </Typography>
            </Stack>

            {/* Product Description */}
            <Stack direction="row" spacing={1} marginTop={2}>
              <Typography variant="body2">
                <strong>Description :</strong>{" "}
                {product.description ? product.description : "Not defined"}
              </Typography>
            </Stack>

            {/* Reviews and Rating */}
            <Stack direction="row" spacing={1} marginTop={2}>
              <VerifiedIcon />
              <Typography variant="body2">
                <strong>Reviews :</strong>{" "}
                {product.numOfReviews ? product.numOfReviews : "Not defined"} reviews (Rating:{" "}
                {product.rating ? product.rating : "Not defined"})
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
};

export default ProductView;
