import React, { useMemo, useState, useContext } from "react";
import "./Categories.css";
import MaterialReactTable from "material-react-table";
import { createTheme, ThemeProvider, IconButton } from "@mui/material";
import { Delete, Update } from "@mui/icons-material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import BarChartIcon from "@mui/icons-material/BarChart";
import DeleteConfirmationDialog from "../../components/ConfirmationDialog/ConfirmationDialog";
import AddCategoryModal from "../../components/categories/AddModal/AddModal";
import UpdateModal from "../../components/categories/UpdateModal/UpdateModal";
import { categoriesData } from "../../data";
import { Link } from "react-router-dom";
import DescriptionPopup from "../../components/DescriptionPopup/DescriptionPopup";
import StatisticsModal from "../../components/StatisticsModal/StatisticsModal";
import ThemeContext from "../../components/ThemeContext/ThemeContext";
import { useTranslation } from "react-i18next";

const defaultImage = "../../../public/default-image.png";

const Categories = () => {
  const [categories, setCategories] = useState(categoriesData);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState('');
  const [statisticsModalVisible, setStatisticsModalVisible] = useState(false);
  const { t } = useTranslation();

  const { themeMode } = useContext(ThemeContext);

  const renderCell = (value) => {
    if (value.length > 50) {
      const truncatedText = value.substring(0, 50) + "...";
      return (
        <span className="cell-text">
          {truncatedText}{" "}
          <span
            className="read-more"
            onClick={() => handleExpandDescription(value)}
          >
            (Read more)
          </span>
        </span>
      );
    } else {
      return <span className="cell-text">{value}</span>;
    }
  };

  const handleExpandDescription = (fullDescription) => {
    setSelectedDescription(fullDescription);
    setPopupVisible(true);
  };

  const renderImageCell = (value) => (
    <img
      src={value || defaultImage}
      alt="category"
      className="table-image"
      onError={(e) => {
        e.target.src = defaultImage;
      }}
    />
  );

  const renderSubCategoriesCell = (category) => (
    <span className="cell-text">
      <Link to={`/manage-subcategories/${category.id}`}>
        Manage Subcategories
      </Link>
    </span>
  );

  const renderActionsCell = (category) => (
    <div className="actions-container">
      <IconButton onClick={() => handleDelete(category)} title="Delete">
        <Delete />
      </IconButton>
      <IconButton onClick={() => handleEdit(category)} title="Edit">
        <Update />
      </IconButton>
    </div>
  );

  const headerTitles = {
    image: t('tableHeader.image'),
    name: t('tableHeader.name'),
    createdAt: t('tableHeader.createdAt'),
    updatedAt: t('tableHeader.updatedAt'),
    subCategories: t('tableHeader.subSubCategories'),
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "image",
        header: "Image",
        Cell: ({ cell }) => renderImageCell(cell.getValue()),
      },
      {
        accessorKey: "name",
        header: headerTitles.name,
        Cell: ({ cell }) => renderCell(cell.getValue()),
      },
      {
        accessorKey: "description",
        header: "Description",
        Cell: ({ cell }) => renderCell(cell.getValue()),
      },
      {
        accessorKey: "createdAt",
        header: headerTitles.createdAt,
        Cell: ({ cell }) => renderCell(cell.getValue()),
      },
      {
        accessorKey: "updatedAt",
        header: headerTitles.updatedAt,
        Cell: ({ cell }) => renderCell(cell.getValue()),
      },
      {
        accessorKey: "subCategories",
        header: headerTitles.subCategories,
        Cell: ({ row }) => renderSubCategoriesCell(row.original),
      },
      {
        accessorKey: "actions",
        header: "Actions",
        Cell: ({ row }) => renderActionsCell(row.original),
      },
    ],
    [t]
  );

  const handleAdd = () => {
    setAddModalVisible(true);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setUpdateModalVisible(true);
  };

  const handleDelete = (category) => {
    setCategoryToDelete(category);
    setDeleteConfirmationVisible(true);
  };

  const handleStatistics = () => {
    setStatisticsModalVisible(true);
  };

  const confirmDelete = () => {
    if (categoryToDelete) {
      setCategories(
        categories.filter((category) => category.id !== categoryToDelete.id)
      );
      setDeleteConfirmationVisible(false);
    }
  };

  const addCategory = (newCategory) => {
    const currentDate = new Date().toISOString();
    const categoryWithDates = {
      ...newCategory,
      createdAt: currentDate,
      updatedAt: currentDate,
    };
    setCategories([categoryWithDates, ...categories]);
    setAddModalVisible(false);
  };

  const updateCategory = (updatedCategory) => {
    setCategories(
      categories.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category
      )
    );
    setUpdateModalVisible(false);
  };

  const theme = useMemo(
    () => createTheme({
      palette: {
        mode: themeMode,
      },
    }),
    [themeMode]
  );

  return (
    <div className="categories-container">
      <div className="toolbar">
        <IconButton onClick={handleAdd} title="Add Category">
          <AddCircleOutlineIcon />
        </IconButton>
        <IconButton onClick={handleStatistics} title="View Statistics">
          <BarChartIcon />
        </IconButton>
      </div>
      <div className="table-container">
        <ThemeProvider theme={theme}>
          <MaterialReactTable
            columns={columns}
            data={categories}
            className="-theme-dark" // Ensure Material-UI table receives theme class
          />
        </ThemeProvider>
      </div>

      <DeleteConfirmationDialog
        open={deleteConfirmationVisible}
        onClose={() => setDeleteConfirmationVisible(false)}
        onConfirm={confirmDelete}
        itemType="category"
      />

      <AddCategoryModal
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        onAdd={addCategory}
        type="category"
      />

      <UpdateModal
        visible={updateModalVisible}
        onClose={() => setUpdateModalVisible(false)}
        onUpdate={updateCategory}
        entity="category"
        currentData={selectedCategory}
      />

      <DescriptionPopup
        description={selectedDescription}
        visible={popupVisible}
        onClose={() => setPopupVisible(false)}
      />

      <StatisticsModal
        visible={statisticsModalVisible}
        onClose={() => setStatisticsModalVisible(false)}
        data={categories}
      />
    </div>
  );
};

export default Categories;
