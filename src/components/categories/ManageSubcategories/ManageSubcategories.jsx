import React, { useState, useMemo, useContext } from "react";
import MaterialReactTable from "material-react-table";
import { createTheme, ThemeProvider, IconButton } from "@mui/material";
import { Delete as DeleteIcon, Update, BarChart } from "@mui/icons-material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteConfirmationDialog from "../../ConfirmationDialog/ConfirmationDialog";
import { subcategoriesData } from "../../../data";
import { Link, useParams } from "react-router-dom";
import AddModal from "../AddModal/AddModal";
import UpdateModal from "../UpdateModal/UpdateModal";
import DescriptionPopup from "../../DescriptionPopup/DescriptionPopup";
import StatisticsModal from "../../StatisticsModal/StatisticsModal";
import ThemeContext from "../../ThemeContext/ThemeContext";
import { useTranslation } from "react-i18next";

const defaultImage = "../../../public/default-image.png";

const ManageSubcategories = () => {
  const { categoryId } = useParams();
  const { t } = useTranslation();
  const { themeMode } = useContext(ThemeContext);

  const [subcategories, setSubcategories] = useState(
    subcategoriesData.filter(
      (subcat) => subcat.categoryId === parseInt(categoryId)
    )
  );
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
  const [subcategoryToDelete, setSubcategoryToDelete] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentSubcategory, setCurrentSubcategory] = useState(null);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState("");
  const [statisticsModalVisible, setStatisticsModalVisible] = useState(false);

  const handleDelete = (subcategory) => {
    setSubcategoryToDelete(subcategory);
    setDeleteConfirmationVisible(true);
  };

  const confirmDelete = () => {
    if (subcategoryToDelete) {
      setSubcategories(
        subcategories.filter((subcat) => subcat.id !== subcategoryToDelete.id)
      );
      setDeleteConfirmationVisible(false);
    }
  };

  const handleEdit = (subcategory) => {
    setCurrentSubcategory(subcategory);
    setUpdateModalVisible(true);
  };

  const renderActionsCell = (subcategory) => (
    <div>
      <IconButton onClick={() => handleDelete(subcategory)} title="Delete">
        <DeleteIcon />
      </IconButton>
      <IconButton onClick={() => handleEdit(subcategory)} title="Edit">
        <Update />
      </IconButton>
    </div>
  );

  const renderSubSubCategoriesCell = (subcategory) => (
    <span>
      <Link to={`/manage-subsubcategories/${subcategory.id}`}>
        Manage Sub-Subcategories
      </Link>
    </span>
  );

  const renderImageCell = (value) => (
    <img
      src={value || defaultImage}
      alt="subcategory"
      style={{ width: 50, height: 50, objectFit: "cover" }}
      onError={(e) => {
        e.target.src = defaultImage;
      }}
    />
  );

  const handleExpandDescription = (description) => {
    setSelectedDescription(description);
    setPopupVisible(true);
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
        header: t("tableHeader.name"),
        Cell: ({ cell }) => cell.getValue(),
      },
      {
        accessorKey: 'description',
        header: "Description",
        Cell: ({ cell }) => (
          <span style={{ color: 'var(--text-color)' }}>
            {cell.getValue().length > 50 ? (
              <>
                {cell.getValue().substring(0, 50)}...
                <span
                  style={{ cursor: 'pointer', textDecoration: 'underline', marginLeft: '5px' }}
                  onClick={() => handleExpandDescription(cell.getValue())}
                >
                  (read more)
                </span>
              </>
            ) : (
              cell.getValue()
            )}
          </span>
        ),
      },
      {
        accessorKey: "createdAt",
        header: t("tableHeader.createdAt"),
        Cell: ({ cell }) => cell.getValue(),
      },
      {
        accessorKey: "updatedAt",
        header: t("tableHeader.updatedAt"),
        Cell: ({ cell }) => cell.getValue(),
      },
      {
        accessorKey: "subSubCategories",
        header: t("tableHeader.subSubCategories"),
        Cell: ({ row }) => renderSubSubCategoriesCell(row.original),
      },
      {
        accessorKey: "actions",
        header: "Actions",
        Cell: ({ row }) => renderActionsCell(row.original),
      },
    ],
    [t]
  );

  const theme = useMemo(
    () => createTheme({
      palette: {
        mode: themeMode,
      },
    }),
    [themeMode]
  );

  const handleAdd = () => {
    setCurrentSubcategory(null);
    setModalVisible(true);
  };

  const handleStatistics = () => {
    setStatisticsModalVisible(true);
  };

  const addOrUpdateSubcategory = (subcategory) => {
    const currentDate = new Date().toISOString();
    const subcategoryWithDates = {
      ...subcategory,
      createdAt: currentDate,
      updatedAt: currentDate,
    };

    if (currentSubcategory) {
      setSubcategories(
        subcategories.map((subcat) =>
          subcat.id === subcategory.id ? subcategoryWithDates : subcat
        )
      );
    } else {
      setSubcategories([subcategoryWithDates, ...subcategories]);
    }

    setModalVisible(false);
    setUpdateModalVisible(false);
  };

  return (
    <div>
      <div className="table-container">
        <div className="toolbar">
          <IconButton onClick={handleAdd} title="Add Subcategory">
            <AddCircleOutlineIcon />
          </IconButton>
          <IconButton onClick={handleStatistics} title="View Statistics">
            <BarChart />
          </IconButton>
        </div>
        <ThemeProvider theme={theme}>
          <MaterialReactTable columns={columns} data={subcategories} />
        </ThemeProvider>

        <DeleteConfirmationDialog
          open={deleteConfirmationVisible}
          onClose={() => setDeleteConfirmationVisible(false)}
          onConfirm={confirmDelete}
          itemType="subcategory"
        />

        <AddModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onAdd={addOrUpdateSubcategory}
          type="subcategory"
        />

        <UpdateModal
          visible={updateModalVisible}
          onClose={() => setUpdateModalVisible(false)}
          onUpdate={addOrUpdateSubcategory}
          entity="subcategory"
          currentData={currentSubcategory}
        />

        <DescriptionPopup
          description={selectedDescription}
          visible={popupVisible}
          onClose={() => setPopupVisible(false)}
        />

        <StatisticsModal
          visible={statisticsModalVisible}
          onClose={() => setStatisticsModalVisible(false)}
          data={subcategories}
        />
      </div>
    </div>
  );
};

export default ManageSubcategories;
