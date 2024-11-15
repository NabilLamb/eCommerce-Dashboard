import React, { useMemo, useState, useEffect, useContext } from "react";
import MaterialReactTable from "material-react-table";
import { createTheme, ThemeProvider, IconButton } from "@mui/material";
import { Delete, Update, BarChart } from "@mui/icons-material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteConfirmationDialog from "../../ConfirmationDialog/ConfirmationDialog";
import { subsubcategoriesData } from "../../../data";
import { useParams } from "react-router-dom";
import AddModal from "../AddModal/AddModal";
import UpdateModal from "../UpdateModal/UpdateModal";
import DescriptionPopup from "../../DescriptionPopup/DescriptionPopup";
import StatisticsModal from "../../StatisticsModal/StatisticsModal"; // Import StatisticsModal
import ThemeContext from "../../ThemeContext/ThemeContext";
import './ManageSubSubcategories.module.css';
import { useTranslation } from "react-i18next";


const defaultImage = "../../../public/default-image.png";

const ManageSubSubcategories = () => {
  const { subcategoryId } = useParams(); // Get subcategoryId from URL params
  const [subsubcategories, setSubSubcategories] = useState([]);
  const { t } = useTranslation();
  useEffect(() => {
    // Filter subsubcategoriesData based on subcategoryId when it changes
    const filteredSubSubcategories = subsubcategoriesData.filter(
      (subsubcat) => subsubcat.subcategoryId === parseInt(subcategoryId)
    );
    setSubSubcategories(filteredSubSubcategories);
  }, [subcategoryId]);

  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);
  const [subSubcategoryToDelete, setSubSubcategoryToDelete] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentSubSubcategory, setCurrentSubSubcategory] = useState(null);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState("");
  const [statisticsModalVisible, setStatisticsModalVisible] = useState(false); // State for StatisticsModal

  const { themeMode } = useContext(ThemeContext);

  // Define renderCell function here
  const renderCell = (value) => {
    if (value.length > 50) {
      const truncatedText = value.substring(0, 50) + "...";
      return (
        <span>
          {truncatedText}{" "}
          <span
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => handleExpandDescription(value)}
          >
            (Read more)
          </span>
        </span>
      );
    } else {
      return <span>{value}</span>;
    }
  };

  const handleExpandDescription = (description) => {
    setSelectedDescription(description);
    setPopupVisible(true);
  };

  // Function to handle deletion of subsubcategory
  const handleDelete = (subsubcategory) => {
    setSubSubcategoryToDelete(subsubcategory);
    setDeleteConfirmationVisible(true);
  };

  // Function to confirm deletion
  const confirmDelete = () => {
    if (subSubcategoryToDelete) {
      setSubSubcategories(
        subsubcategories.filter(
          (subsubcat) => subsubcat.id !== subSubcategoryToDelete.id
        )
      );
      setDeleteConfirmationVisible(false);
    }
  };

  // Function to handle editing of subsubcategory
  const handleEdit = (subsubcategory) => {
    setCurrentSubSubcategory(subsubcategory);
    setUpdateModalVisible(true);
  };

  // Function to render actions column in the table
  const renderActionsCell = (subsubcategory) => (
    <div>
      <IconButton onClick={() => handleDelete(subsubcategory)} title="Delete">
        <Delete />
      </IconButton>
      <IconButton onClick={() => handleEdit(subsubcategory)} title="Edit">
        <Update />
      </IconButton>
    </div>
  );

  // Memoized columns definition for the table
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
        Cell: ({ cell }) => renderCell(cell.getValue()),
      },
      {
        accessorKey: "description",
        header: "Description",
        Cell: ({ cell }) => renderCell(cell.getValue()),
      },
      {
        accessorKey: "createdAt",
        header: t("tableHeader.createdAt"),
        Cell: ({ cell }) => renderCell(cell.getValue()),
      },
      {
        accessorKey: "updatedAt",
        header: t("tableHeader.updatedAt"),
        Cell: ({ cell }) => renderCell(cell.getValue()),
      },
      {
        accessorKey: "actions",
        header: "Actions",
        Cell: ({ row }) => renderActionsCell(row.original),
      },
    ],
    [] // Ensure useMemo dependencies are properly handled
  );

  // Memoized theme creation
  const theme = useMemo(
    () => createTheme({
      palette: {
        mode: themeMode,
      },
    }),
    [themeMode]
  );

  // Function to handle addition of new subsubcategory
  const handleAdd = () => {
    setCurrentSubSubcategory(null);
    setModalVisible(true);
  };

  // Function to handle the display of a bar chart
  const handleBarChart = () => {
    setStatisticsModalVisible(true); // Open StatisticsModal
  };

  // Function to add or update a subsubcategory
  const addOrUpdateSubSubcategory = (subsubcategory) => {
    const currentDate = new Date().toISOString();
    const subsubcategoryWithDates = {
      ...subsubcategory,
      createdAt: currentDate,
      updatedAt: currentDate,
    };

    if (currentSubSubcategory) {
      setSubSubcategories(
        subsubcategories.map((subsubcat) =>
          subsubcat.id === subsubcategory.id
            ? subsubcategoryWithDates
            : subsubcat
        )
      );
    } else {
      setSubSubcategories([subsubcategoryWithDates, ...subsubcategories]); // Add new subsubcategory at the beginning
    }

    setModalVisible(false);
    setUpdateModalVisible(false);
  };

  // Function to render image cell
  const renderImageCell = (value) => (
    <img
      src={value || defaultImage}
      alt="subsubcategory"
      style={{ width: 50, height: 50, objectFit: "cover" }}
      onError={(e) => {
        e.target.src = defaultImage;
      }}
    />
  );

  return (
    <div>
      <div className="table-container">
        <div className="toolbar">
          <IconButton onClick={handleAdd} title="Add Subsubcategory">
            <AddCircleOutlineIcon />
          </IconButton>
          <IconButton onClick={handleBarChart} title="View Statistics">
            <BarChart />
          </IconButton>
        </div>
        <ThemeProvider theme={theme}>
          <MaterialReactTable columns={columns} data={subsubcategories} />
        </ThemeProvider>

        <DeleteConfirmationDialog
          open={deleteConfirmationVisible}
          onClose={() => setDeleteConfirmationVisible(false)}
          onConfirm={confirmDelete}
          itemType="subsubcategory"
        />

        <AddModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onAdd={addOrUpdateSubSubcategory}
          type="subsubcategory"
        />

        <UpdateModal
          visible={updateModalVisible}
          onClose={() => setUpdateModalVisible(false)}
          onUpdate={addOrUpdateSubSubcategory}
          entity="subsubcategory"
          currentData={currentSubSubcategory}
        />

        <DescriptionPopup
          description={selectedDescription}
          visible={popupVisible}
          onClose={() => setPopupVisible(false)}
        />

        <StatisticsModal
          visible={statisticsModalVisible}
          onClose={() => setStatisticsModalVisible(false)}
          data={subsubcategories}
        />
      </div>
    </div>
  );
};

export default ManageSubSubcategories;

