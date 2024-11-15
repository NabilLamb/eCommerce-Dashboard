import React, { useMemo, useContext } from "react";
import "./DataGrid.css";
import MaterialReactTable from "material-react-table";
import { userData } from "../../data";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ThemeContext from "../../components/ThemeContext/ThemeContext"; 
import { useTranslation } from "react-i18next";

const DataGrid = () => {
  const defaultImage = "../../../public/default-image-profile.jpg";
  const { themeMode } = useContext(ThemeContext);
  const { t } = useTranslation();
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

  const headerTitles = {
    FirstName: t("updateProfile.firstName"),
    LastName: t("updateProfile.lastName"),
    ContactNumber: t("updateProfile.contactNumber"),
    Role: t("updateProfile.role"),
    Address: t("updateProfile.address"),
    City: t("updateProfile.city"),
    Country: t("updateProfile.country"),
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "imageUrl",
        header: "Image",
        Cell: ({ cell }) => renderImageCell(cell.getValue()),
      },
      {
        accessorKey: "name.firstName",
        header: headerTitles.FirstName,
      },
      {
        accessorKey: "name.lastName",
        header: headerTitles.LastName,
      },
      {
        accessorKey: "contactNumber",
        header: headerTitles.ContactNumber,
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "role",
        header: headerTitles.Role,
      },
      {
        accessorKey: "address",
        header: headerTitles.Address,
      },
      {
        accessorKey: "city",
        header: headerTitles.City,
      },
      {
        accessorKey: "country",
        header: headerTitles.Country,
      },
    ],
    [t]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
        },
      }),
    [themeMode]
  );

  return (
    <div>
      <div className="table-container">
        <ThemeProvider theme={theme}>
          <MaterialReactTable columns={columns} data={userData} />
        </ThemeProvider>
      </div>
    </div>
  );
};

export default DataGrid;
