/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Grid,
  Autocomplete,
  Chip,
  Card,
  CardContent,
  Checkbox,
} from "@mui/material";
import { useParams } from "react-router-dom";

import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { AddPhotoAlternate, Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { updateProduct, getProductById } from "./data/api";

// Initialisation des états et des options
const initialCategories = ["Mans", "Womens", "Kids"];
const initialBrands = ["Richman", "Brand2", "Brand3"];
const initialSizes = ["S", "M", "L", "XL", "XXL", "XXXL"];
const initialColors = ["Red", "Green", "Blue", "Pink", "Black"];

const UpdateProductForm = () => {
  const { productId } = useParams();
  console.log(productId);
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState(initialCategories);
  const [brands, setBrands] = useState(initialBrands);
  const [sizes, setSizes] = useState(initialSizes);
  const [colors, setColors] = useState(initialColors);
  const [tags, setTags] = useState([]);

  const [newCategory, setNewCategory] = useState("");
  const [newBrand, setNewBrand] = useState("");
  const [newSize, setNewSize] = useState("");
  const [newColor, setNewColor] = useState("");
  const [newTag, setNewTag] = useState("");

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [title, setTitle] = useState(""); // État pour le titre
  const [description, setDescription] = useState(""); // État pour la description
  const [regularPrice, setRegularPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [shippingFee, setShippingFee] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [stock, setStock] = useState("");
  const [weight, setWeight] = useState("");
  const [imageFields, setImageFields] = useState([{ imageUrl: "" }]);
  const [checkboxValues, setCheckboxValues] = useState({
    popular: true, // Checkbox par défaut cochée
    flashSale: false,
    bestSeller: false,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getProductById(productId);
        setProduct(fetchedProduct);
        // Set initial form values from fetched product
        setSelectedCategory(fetchedProduct.category);
        setSelectedBrand(fetchedProduct.brandName);
        setTitle(fetchedProduct.title);
        setDescription(fetchedProduct.description);
        setRegularPrice(fetchedProduct.price);
        setDiscountPrice(fetchedProduct.priceAfterDiscount);
        setShippingFee(fetchedProduct.discountPercent);
        setTaxRate(fetchedProduct.tax);
        setSelectedSizes(fetchedProduct.sizes || []);
        setSelectedColors(fetchedProduct.colors || []);
        setSelectedTags(fetchedProduct.tags || []);
        setStock(fetchedProduct.stock);
        setWeight(fetchedProduct.weight);
        setImageFields(fetchedProduct.image.map((img) => ({ imageUrl: img }))); // Assurez-vous que fetchedProduct.image est un tableau
        setCheckboxValues({
          popular: fetchedProduct.isPopular,
          flashSale: fetchedProduct.isFlashSale,
          bestSeller: fetchedProduct.isBestSeller,
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading product...</div>;
  }
  const handleSubmit = async () => {
    const UpdatedproductData = {
    
      title: title,
      description: description,
      category: selectedCategory,
      brandName: selectedBrand,
      price: regularPrice,
      priceAfetDiscount: discountPrice,
      discountpercent: shippingFee,
      tax: taxRate,
      tags: selectedTags,
      sizes: selectedSizes,
      colors: selectedColors,
      stock: stock,
      weight: weight,
      isAvailable: true,
      image: imageFields.map((field) => field.imageUrl),
      isPopular: checkboxValues.popular,
      isBestSeller: checkboxValues.bestSeller,
      isFlashSale: checkboxValues.flashSale,
    };
    console.log(UpdatedproductData);
    try {
      const response = await updateProduct( productId,UpdatedproductData);
      console.log("Produit updated avec succès:", response);
      alert("Product updated successfuly !");
    } catch (error) {
      console.error("Error during update product:", error);
      alert("Error during update product");
    }
  };

  // Fonction pour gérer les changements d'état des checkboxes
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxValues((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };
  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory("");
    }
  };

  const handleAddBrand = () => {
    if (newBrand && !brands.includes(newBrand)) {
      setBrands([...brands, newBrand]);
      setNewBrand("");
    }
  };

  const handleAddSize = () => {
    if (newSize && !sizes.includes(newSize)) {
      setSizes([...sizes, newSize]);
      setNewSize("");
    }
  };

  const handleAddColor = () => {
    if (newColor && !colors.includes(newColor)) {
      setColors([...colors, newColor]);
      setNewColor("");
    }
  };

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const handleAddImageField = () => {
    setImageFields([...imageFields, { imageUrl: "" }]);
  };

  // Gestion des changements d'options
  const handleImageChange = (index, event) => {
    const newImageFields = [...imageFields];
    newImageFields[index].imageUrl = event.target.value;
    setImageFields(newImageFields);
  };

  // Supprimer un champ d'image
  const handleRemoveImageField = (index) => {
    const newImageFields = [...imageFields];
    newImageFields.splice(index, 1);
    setImageFields(newImageFields);
  };

  const handleCategoryChange = (event, newValue) => {
    if (newValue && !categories.includes(newValue)) {
      setCategories([...categories, newValue]);
    }
    setSelectedCategory(newValue);
  };

  const handleBrandChange = (event, newValue) => {
    if (newValue && !brands.includes(newValue)) {
      setBrands([...brands, newValue]);
    }
    setSelectedBrand(newValue);
  };

  const handleSizeChange = (event, newValue) => {
    setSelectedSizes(newValue);
    const newSizes = newValue.filter((size) => !sizes.includes(size));
    if (newSizes.length > 0) {
      setSizes([...sizes, ...newSizes]);
    }
  };

  const handleColorChange = (event, newValue) => {
    setSelectedColors(newValue);
    const newColors = newValue.filter((color) => !colors.includes(color));
    if (newColors.length > 0) {
      setColors([...colors, ...newColors]);
    }
  };

  const handleTagChange = (event, newValue) => {
    setSelectedTags(newValue);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox sx={{ p: 4 }}>
        <Grid container spacing={2}>
          {/* Carte pour Basic Information */}
          <Grid item xs={12} md={8}>
            <MDBox mt={4}>
              <Card sx={{ minHeight: "840px" }}>
                <CardContent>
                  <MDTypography variant="h5" gutterBottom>
                    Basic Information
                  </MDTypography>
                  <Grid container spacing={1}>
                    {/* Titre */}
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Title"
                        variant="outlined"
                        margin="normal"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </Grid>

                    {/* Description */}
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Description"
                        variant="outlined"
                        margin="normal"
                        multiline
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </Grid>

                    {/* Catégorie et Marque */}
                    <Grid item xs={12} md={6}>
                      <Autocomplete
                        freeSolo
                        options={categories}
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Category"
                            variant="outlined"
                            margin="normal"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Autocomplete
                        freeSolo
                        options={brands}
                        value={selectedBrand}
                        onChange={handleBrandChange}
                        renderInput={(params) => (
                          <TextField {...params} label="Brand" variant="outlined" margin="normal" />
                        )}
                      />
                    </Grid>

                    {/* Regular Price et Discount Price */}
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Regular Price"
                        value={regularPrice}
                        onChange={(e) => setRegularPrice(e.target.value)}
                        variant="outlined"
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Discount Price"
                        value={discountPrice}
                        onChange={(e) => setDiscountPrice(e.target.value)}
                        variant="outlined"
                        margin="normal"
                      />
                    </Grid>

                    {/* Shipping Fee et Tax Rate */}
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Shipping Fee"
                        value={shippingFee}
                        onChange={(e) => setShippingFee(e.target.value)}
                        variant="outlined"
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Tax Rate (%)"
                        value={taxRate}
                        onChange={(e) => setTaxRate(e.target.value)}
                        variant="outlined"
                        margin="normal"
                      />
                    </Grid>

                    {/* Tags */}
                    <Grid item xs={12}>
                      <Autocomplete
                        multiple
                        freeSolo
                        value={selectedTags}
                        onChange={handleTagChange}
                        options={tags}
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                          ))
                        }
                        renderInput={(params) => (
                          <TextField {...params} label="Tags" variant="outlined" margin="normal" />
                        )}
                      />
                    </Grid>
                    {/*checkbox */}
                    <Grid container spacing={1} mt={2}>
                      <Grid item xs={12} md={4}>
                        <Box display={"flex"}>
                          <Checkbox
                            checked={checkboxValues.popular} // Utilisez l'état ici
                            onChange={handleCheckboxChange} // Gérer le changement
                            name="popular" // Nom unique pour identifier la checkbox
                            size="small"
                            sx={{
                              color: "secondary",
                              "&.Mui-checked": {
                                color: "secondary",
                              },
                            }}
                          />
                          <MDTypography variant="subtitle1">Popular product</MDTypography>
                        </Box>
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <Box display={"flex"}>
                          <Checkbox
                            checked={checkboxValues.flashSale} // Utilisez l'état ici
                            onChange={handleCheckboxChange} // Gérer le changement
                            name="flashSale" // Nom unique pour identifier la checkbox
                            size="small"
                            sx={{
                              color: "secondary",
                              "&.Mui-checked": {
                                color: "secondary",
                              },
                            }}
                          />

                          <MDTypography variant="subtitle1">Flash-Sale product</MDTypography>
                        </Box>
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <Box display={"flex"}>
                          <Checkbox
                            checked={checkboxValues.bestSeller} // Utilisez l'état ici
                            onChange={handleCheckboxChange} // Gérer le changement
                            name="bestSeller" // Nom unique pour identifier la checkbox
                            size="small"
                            sx={{
                              color: "secondary",
                              "&.Mui-checked": {
                                color: "secondary",
                              },
                            }}
                          />
                          <MDTypography variant="subtitle1">Best-Seller product</MDTypography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </MDBox>
          </Grid>

          {/* Carte pour Add New Options et Specifications */}
          <Grid item xs={12} md={4}>
            {/* Carte pour ajouter de nouvelles options */}
            <MDBox mt={4}>
              <Card>
                <CardContent>
                  <MDTypography variant="h5" gutterBottom>
                    Organisation
                  </MDTypography>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Grid container spacing={1}>
                        <Grid item xs={9}>
                          <TextField
                            label="Add New Category"
                            fullWidth
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <MDButton
                            onClick={handleAddCategory}
                            variant="contained"
                            color="secondary"
                          >
                            Add
                          </MDButton>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={1}>
                        <Grid item xs={9}>
                          <TextField
                            label="Add New Brand"
                            fullWidth
                            value={newBrand}
                            onChange={(e) => setNewBrand(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <MDButton onClick={handleAddBrand} variant="contained" color="secondary">
                            Add
                          </MDButton>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={1}>
                        <Grid item xs={9}>
                          <TextField
                            label="Add New Size"
                            fullWidth
                            value={newSize}
                            onChange={(e) => setNewSize(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <MDButton onClick={handleAddSize} variant="contained" color="secondary">
                            Add
                          </MDButton>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={1}>
                        <Grid item xs={9}>
                          <TextField
                            label="Add New Color"
                            fullWidth
                            value={newColor}
                            onChange={(e) => setNewColor(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <MDButton onClick={handleAddColor} variant="contained" color="secondary">
                            Add
                          </MDButton>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={1}>
                        <Grid item xs={9}>
                          <TextField
                            label="Add New Tag"
                            fullWidth
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <MDButton onClick={handleAddTag} variant="contained" color="secondary">
                            Add
                          </MDButton>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </MDBox>

            {/* Carte pour les spécifications */}
            <MDBox mt={4}>
              <Card>
                <CardContent>
                  <MDTypography variant="h5" gutterBottom>
                    Specifications
                  </MDTypography>
                  <Grid container spacing={1}>
                    {/* Tailles */}
                    <Grid item xs={12}>
                      <Autocomplete
                        multiple
                        freeSolo
                        value={selectedSizes}
                        onChange={handleSizeChange}
                        options={sizes}
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                          ))
                        }
                        renderInput={(params) => (
                          <TextField {...params} label="Sizes" variant="outlined" margin="normal" />
                        )}
                      />
                    </Grid>

                    {/* Couleurs */}
                    <Grid item xs={12}>
                      <Autocomplete
                        multiple
                        freeSolo
                        value={selectedColors}
                        onChange={handleColorChange}
                        options={colors}
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                          ))
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Colors"
                            variant="outlined"
                            margin="normal"
                          />
                        )}
                      />
                    </Grid>

                    {/* Stock et Poids */}
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Stock"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        variant="outlined"
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Weight"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        variant="outlined"
                        margin="normal"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </MDBox>
          </Grid>
        </Grid>
        {/* Carte pour les images */}
        <MDBox mt={4}>
          <Card>
            <CardContent>
              <MDTypography variant="h5" gutterBottom>
                Custom Images
              </MDTypography>
              <Grid container spacing={1}>
                {imageFields.map((field, index) => (
                  <Grid item xs={12} key={index}>
                    <Box display="flex" alignItems="center">
                      <TextField
                        fullWidth
                        label={`Image URL ${index + 1}`}
                        value={field.imageUrl}
                        onChange={(event) => handleImageChange(index, event)}
                        variant="outlined"
                        margin="normal"
                      />
                      <IconButton
                        color="error"
                        onClick={() => handleRemoveImageField(index)}
                        disabled={imageFields.length === 1}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </Grid>
                ))}

                <MDButton
                  onClick={handleAddImageField}
                  startIcon={<AddPhotoAlternate />}
                  variant="contained"
                  color="secondary"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  ADD
                </MDButton>
              </Grid>
            </CardContent>
          </Card>
        </MDBox>
        <MDBox mt={4}>
          <MDButton fullWidth variant="contained" color="primary" onClick={() => handleSubmit()}>
            Save Product
          </MDButton>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
};

export default UpdateProductForm;
