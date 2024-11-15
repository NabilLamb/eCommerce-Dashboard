import React, { useMemo, useState, useContext, useEffect } from "react";
import "./Products.css";
import MaterialReactTable from "material-react-table";
import { productsData } from "../../data";
import { createTheme, ThemeProvider, IconButton } from "@mui/material";
import { Delete, Update, BarChart } from "@mui/icons-material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddProductModal from "../../components/AddProductModal/AddProductModal";
import UpdateProductModal from "../../components/UpdateProductModal/UpdateProductModal";
import DeleteConfirmationDialog from "../../components/ConfirmationDialog/ConfirmationDialog";
import ProductDetailsModal from "../../components/ProductDetailsModal/ProductDetailsModal";
import DescriptionPopup from "../../components/DescriptionPopup/DescriptionPopup";
import StatisticsModal from "../../components/StatisticsModal/StatisticsModal";
import ThemeContext from "../../components/ThemeContext/ThemeContext";
import { useTranslation } from "react-i18next";

const defaultImage = "../../../public/default-image.png";

const Products = () => {
  const [products, setProducts] = useState(productsData);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [descriptionPopupVisible, setDescriptionPopupVisible] = useState(false);
  const [expandedDescription, setExpandedDescription] = useState("");
  const [statisticsModalVisible, setStatisticsModalVisible] = useState(false);

  const { themeMode } = useContext(ThemeContext);

  const { t } = useTranslation();

  // const renderCell = (value) => {
  //   if (value && value.length > 50) {
  //     const truncatedText = value.substring(0, 50) + "...";
  //     return (
  //       <span className="cell-text">
  //         {truncatedText}{" "}
  //         <span
  //           className="read-more"
  //           onClick={() => handleExpandDescription(value)}
  //         >
  //           (Read more)
  //         </span>
  //       </span>
  //     );
  //   } else {
  //     return <span className="cell-text">{value}</span>;
  //   }
  // };

  const handleExpandDescription = (value) => {
    setExpandedDescription(value);
    setDescriptionPopupVisible(true);
  };

  const handleStatisticsGlobal = () => {
    const totalSoldData = products.map((product) => ({
      name: product.name,
      PurchaseCount: product.totalSold,
    }));

    setStatisticsModalVisible(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };


  const headerTitles = {
    name: t('tableHeader.name'),
    brand: t('tableHeader.brand'),
    price: t('tableHeader.Price'),
    discount: t('tableHeader.discount'),
    createdAt: t('tableHeader.createdAt'),
    lastUpdated: t('tableHeader.lastUpdated'),
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "mainImage",
        header: "Image",
        Cell: ({ cell }) => (
          <img
            src={cell.getValue() || defaultImage}
            alt="product"
            onError={(e) => { e.target.src = defaultImage; }}
            style={{ width: 50, height: 50, objectFit: "cover", cursor: "pointer" }}
            onClick={() => window.open(cell.getValue() || defaultImage, "_blank")}
          />
        ),
        size: 100,
      },
      {
        accessorKey: "name",
        header: headerTitles.name,
        Cell: ({ cell }) => (
          <span className="cell-text">
            {cell.getValue()?.length > 50 ? (
              <>
                {cell.getValue().substring(0, 50)}...{" "}
                <span className="read-more" onClick={() => handleExpandDescription(cell.getValue())}>
                       read More
                </span>
              </>
            ) : cell.getValue()}
          </span>
        ),
        size: 100,
      },
      {
        accessorKey: "description",
        header: "Description",
        Cell: ({ cell }) => (
          <span className="cell-text">
            {cell.getValue()?.length > 50 ? (
              <>
                {cell.getValue().substring(0, 50)}...{" "}
                <span className="read-more" onClick={() => handleExpandDescription(cell.getValue())}>
                  (read more)
                </span>
              </>
            ) : cell.getValue()}
          </span>
        ),
        size: 200,
      },
      {
        accessorKey: "brand",
        header: headerTitles.brand,
        size: 150,
      },
      {
        accessorKey: "price",
        header: `${headerTitles.price} ($)`,
        size: 100,
      },
      {
        accessorKey: "discount",
        header: `${headerTitles.discount} (%)`,
        size: 100,
      },
      {
        accessorKey: "createdAt",
        header: headerTitles.createdAt,
        Cell: ({ cell }) => formatDate(cell.getValue()),
        size: 100,
      },
      {
        accessorKey: "updatedAt",
        header: headerTitles.lastUpdated,
        Cell: ({ cell }) => formatDate(cell.getValue()),
        size: 150,
      },
      {
        accessorKey: "stock",
        header: t('stock'),
        Cell: ({ cell }) => (
          <span style={{ color: cell.getValue() === 0 ? "red" : "green" }}>
            {cell.getValue() === 0 ? t('outOfStock') : `${t('inStock')} (${cell.getValue()} ${t('items')})`}
          </span>
        ),
      },
      {
        accessorKey: "actions",
        header: "Actions",
        Cell: ({ row }) => (
          <div>
            <IconButton onClick={() => handleDelete(row)} title={t('delete')}>
              <Delete />
            </IconButton>
            <IconButton onClick={() => handleUpdate(row)} title={t('update')}>
              <Update />
            </IconButton>
            <IconButton onClick={() => handleStatistics(row)} title={t('detailsAndStatistics')}>
              <BarChart />
            </IconButton>
          </div>
        ),
      },
    ],
    [headerTitles, t]
  );

  const theme = useMemo(
    () => createTheme({ palette: { mode: themeMode } }),
    [themeMode]
  );

  const handleDelete = (row) => {
    setProductToDelete(row.original);
    setDeleteConfirmationVisible(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      setProducts(
        products.filter((product) => product.id !== productToDelete.id)
      );
      setDeleteConfirmationVisible(false);
    }
  };

  const handleUpdate = (row) => {
    setSelectedProduct(row.original);
    setUpdateModalVisible(true);
  };

  const handleStatistics = (row) => {
    setSelectedProduct(row.original);
    setDetailsModalVisible(true);
  };

  const handleAdd = () => {
    setModalVisible(true);
  };

  const handleProductAdd = (newProduct) => {
    const newProductData = {
      id: products.length + 1,
      mainImage: newProduct.mainImage || defaultImage,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...newProduct,
    };

    setProducts([newProductData, ...products]);
    setModalVisible(false);
  };

  const handleProductUpdate = (updatedProduct) => {
    setProducts(
      products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setUpdateModalVisible(false);
  };

  const handleImageClick = (imageSrc) => {
    window.open(imageSrc, "_blank");
  };

  return (
    <div>
      <div className="table-container">
        <div className="toolbar">
          <IconButton onClick={handleAdd} title="Add Product">
            <AddCircleOutlineIcon />
          </IconButton>
          <IconButton onClick={handleStatisticsGlobal} title="View Statistics">
            <BarChart />
          </IconButton>
        </div>
        <ThemeProvider theme={theme}>
          <MaterialReactTable columns={columns} data={products} />
        </ThemeProvider>
        <AddProductModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          handleProductAdd={handleProductAdd}
        />

        {selectedProduct && (
          <UpdateProductModal
            visible={updateModalVisible}
            onClose={() => setUpdateModalVisible(false)}
            handleProductUpdate={handleProductUpdate}
            product={selectedProduct}
          />
        )}
        {selectedProduct && (
          <ProductDetailsModal
            visible={detailsModalVisible}
            onClose={() => setDetailsModalVisible(false)}
            product={selectedProduct}
          />
        )}
        <DeleteConfirmationDialog
          open={deleteConfirmationVisible}
          onClose={() => setDeleteConfirmationVisible(false)}
          onConfirm={confirmDelete}
          itemType="product"
        />

        {descriptionPopupVisible && (
          <DescriptionPopup
            description={expandedDescription}
            visible={descriptionPopupVisible}
            onClose={() => setDescriptionPopupVisible(false)}
          />
        )}

        <StatisticsModal
          visible={statisticsModalVisible}
          onClose={() => setStatisticsModalVisible(false)}
          data={products.map((product) => ({
            name: product.name,
            PurchaseCount: product.totalSold,
          }))}
        />
      </div>
    </div>
  );
};

export default Products;
