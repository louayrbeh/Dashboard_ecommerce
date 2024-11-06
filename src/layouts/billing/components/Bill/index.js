import React, { useState } from "react";
import PropTypes from "prop-types";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { useMaterialUIController } from "context";
import { Divider } from "@mui/material";

function Bill({
  name,
  email,
  phone,
  addresse,
  subtotal,
  deliveryFee,
  total,
  date,
  items = [],
  noGutter,
  onConfirm,
  onDelete,
}) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => setShowDetails((prev) => !prev);

  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor={darkMode ? "transparent" : "grey-100"}
      borderRadius="lg"
      p={3}
      mb={noGutter ? 0 : 1}
      mt={2}
    >
      <MDBox width="100%" display="flex" flexDirection="column">
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}
        >
          <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
            {name || "N/A"}
          </MDTypography>

          <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
            <MDButton variant="text" color="error" onClick={onDelete}>
              <Icon>delete</Icon>&nbsp;delete
            </MDButton>
            <MDButton variant="text" color={darkMode ? "white" : "dark"} onClick={onConfirm}>
              confirm
            </MDButton>
          </MDBox>
        </MDBox>

        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text">
            Email Address &nbsp;:&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium">
              {email || "N/A"}
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text">
            Client Address &nbsp;:&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize">
              {addresse || "N/A"}
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text">
            Phone Number :&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize">
              {phone || "N/A"}
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text">
            Created At &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize">
              {date || "N/A"}
            </MDTypography>
          </MDTypography>
        </MDBox>

        {/* Toggle Show Details Button */}
        <MDBox mt={1}>
          <MDTypography
            variant="caption"
            fontWeight="medium"
            textTransform="capitalize"
            onClick={toggleDetails}
            style={{ cursor: "pointer" }}
          >
            {showDetails ? "Hide Details <<" : "Show Details >>"}
          </MDTypography>
        </MDBox>

        {/* Product Items Details */}
        {showDetails && (
          <MDBox border="1px solid" borderColor="grey.400" borderRadius="lg">
            <MDBox mt={1} mb={1} ml={5}>
              <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
                Cards:
              </MDTypography>
              {items && items.length > 0 ? (
                items.map((item, index) => (
                  <MDBox key={index} display="flex" alignItems="center" mt={2}>
                    <img
                      src={item.image}
                      alt={item.productName || "Image non disponible"}
                      style={{
                        width: "13%",
                        height: "100%",
                        marginRight: "10px",
                        objectFit: "contain",
                      }}
                    />
                    <MDBox display="flex" flexDirection="column">
                      <MDTypography variant="caption" color="text">
                        Product Name:&nbsp;
                        <MDTypography variant="caption" fontWeight="medium">
                          {item.productName || "Produit non disponible"}
                        </MDTypography>
                      </MDTypography>
                      <MDTypography variant="caption" color="text">
                        Brand:&nbsp;
                        <MDTypography variant="caption" fontWeight="medium">
                          {item.brandName || "Marque non disponible"}
                        </MDTypography>
                      </MDTypography>
                      <MDTypography variant="caption" color="text">
                        Quantity:&nbsp;
                        <MDTypography variant="caption" fontWeight="medium">
                          {item.quantity || "Quantité non disponible"}
                        </MDTypography>
                      </MDTypography>
                      <MDTypography variant="caption" color="text">
                        Size:&nbsp;
                        <MDTypography variant="caption" fontWeight="medium">
                          {Array.isArray(item.size)
                            ? item.size.join(", ")
                            : item.size || "Taille non disponible"}
                        </MDTypography>
                      </MDTypography>
                      <MDTypography variant="caption" color="text">
                        Color:&nbsp;
                        <MDTypography variant="caption" fontWeight="medium">
                          {Array.isArray(item.color)
                            ? item.color.join(", ")
                            : item.color || "Couleur non disponible"}
                        </MDTypography>
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                ))
              ) : (
                <MDTypography variant="caption" color="text">
                  Aucun article disponible
                </MDTypography>
              )}
            </MDBox>

            {/* Afficher le bloc de paiement uniquement si des articles sont disponibles */}
            {items && items.length > 0 && (
              <MDBox
                width="70%"
                display="flex"
                flexDirection="column"
                border="1px solid"
                borderColor="grey.400"
                borderRadius="lg"
                mt={2}
                mb={2}
                mx="auto"
              >
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  alignItems={{ xs: "flex-start", sm: "center" }}
                  flexDirection={{ xs: "column", sm: "row" }}
                  mb={1}
                  mt={1}
                  ml={3}
                >
                  <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
                    Paiement informations :
                  </MDTypography>
                </MDBox>

                <MDBox mb={1} lineHeight={0} ml={3}>
                  <MDTypography variant="caption" color="text">
                    Subtotal &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;
                    <MDTypography variant="caption" fontWeight="medium">
                      {subtotal || "N/A"}
                    </MDTypography>
                  </MDTypography>
                </MDBox>
                <MDBox mb={0} lineHeight={0} ml={3}>
                  <MDTypography variant="caption" color="text">
                    Delivery Fee :&nbsp;&nbsp;&nbsp;
                    <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize">
                      {deliveryFee || "N/A"}
                    </MDTypography>
                  </MDTypography>
                </MDBox>
                <Divider />

                <MDBox mb={1} lineHeight={0} ml={3}>
                  <MDTypography variant="caption" color="text">
                    Total &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                    &nbsp;&nbsp;&nbsp;
                    <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize">
                      {total || "N/A"}
                    </MDTypography>
                  </MDTypography>
                </MDBox>
              </MDBox>
            )}
          </MDBox>
        )}
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of Bill
Bill.defaultProps = {
  noGutter: false,
  items: [],
};

// Typechecking props for the Bill
Bill.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  addresse: PropTypes.string.isRequired,
  subtotal: PropTypes.number.isRequired,
  deliveryFee: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      productName: PropTypes.string,
      brandName: PropTypes.string,
      image: PropTypes.string,
      quantity: PropTypes.number,
      size: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
      color: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    })
  ),
  noGutter: PropTypes.bool,
  onConfirm: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Bill;
