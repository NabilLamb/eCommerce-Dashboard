import React, { useState, useContext, useMemo, useRef, useEffect } from "react";
import MaterialReactTable from "material-react-table";
import {
  createTheme,
  ThemeProvider,
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
} from "@mui/material";
import { MdCancel } from "react-icons/md";
import { FaPrint } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import ThemeContext from "../../components/ThemeContext/ThemeContext";
import {
  deliveryNotesData,
  ordersData,
  userData,
  productsData,
} from "../../data";
import ConfirmationDialog from "../../components/ConfirmationDialog/ConfirmationDialog";
import PrintDeliveryNote from "../../components/PrintDeliveryNote/PrintDeliveryNote";
import { useTranslation } from "react-i18next";
import "./DeliveryNotes.css";

const DeliveryNotes = () => {
  const [deliveryNotes, setDeliveryNotes] = useState(deliveryNotesData);
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [deliveryNoteDetailsToPrint, setDeliveryNoteDetailsToPrint] =
    useState(null);
  const { themeMode } = useContext(ThemeContext);
  const { t } = useTranslation();

  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    onAfterPrint: () => setDeliveryNoteDetailsToPrint(null),
  });

  useEffect(() => {
    if (deliveryNoteDetailsToPrint !== null) {
      handlePrint();
    }
  }, [deliveryNoteDetailsToPrint]);

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedOrder(null);
  };

  const handleOpenConfirmDialog = (order) => {
    setOrderToDelete(order);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setOrderToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (orderToDelete) {
      const updatedDeliveryNotes = deliveryNotes.filter(
        (note) => note.id !== orderToDelete.id
      );
      setDeliveryNotes(updatedDeliveryNotes);
    }
    setOpenConfirmDialog(false);
    setOrderToDelete(null);
  };

  const handlePrintIconClick = (deliveryNote) => {
    const order = ordersData.find((order) => order.id === deliveryNote.orderId);
    const user = userData.find((user) => user.id === order.userId);
    const deliveryNoteDetails = {
      ...deliveryNote,
      userId: user.id,
      userName: `${user.name.firstName} ${user.name.lastName}`,
      contactNumber: user.contactNumber,
      email: user.email,
      address: user.address,
      city: user.city,
      country: user.country,
      products: order.itemsOrdered.map((item) => ({
        id: item.productId,
        name:
          productsData.find((p) => p.id === item.productId)?.name || "Unknown",
        quantity: item.quantity,
        price: productsData.find((p) => p.id === item.productId)?.price || 0,
        pva: productsData.find((p) => p.id === item.productId)?.pva || 0,
      })),
    };

    setDeliveryNoteDetailsToPrint(deliveryNoteDetails);
  };

  const generateDeliveryNoteId = (index) => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${String(index).padStart(2, "0")}${day}${month}/${year}`;
  };

  const headerTitles = {
    DeliveryNotesId: t("tableHeader.DeliveryNotesId"),
    OrderId: t("tableHeader.OrderId"),
    CustumerName: t("tableHeader.CustumerName"),
    ItemsOrdered: t("tableHeader.ItemsOrdered"),
    ProductName: t('statistics.productName'),
    Quantity: t('tableHeader.Quantity'),
    ViewItems: t('tableHeader.ViewItems'),
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: headerTitles.DeliveryNotesId,
        Cell: ({ cell }) => generateDeliveryNoteId(cell.getValue()),
        size: 150,
      },
      {
        accessorKey: "orderId",
        header: headerTitles.OrderId,
        size: 100,
      },
      {
        accessorKey: "orderId",
        header: headerTitles.CustumerName,
        Cell: ({ cell }) => {
          const orderId = cell.getValue();
          if (typeof orderId !== "number") return "Unknown";

          const order = ordersData.find((order) => order.id === orderId);
          const userId = order ? order.userId : "Unknown";
          const user = userData.find((user) => user.id === userId);

          return user
            ? `${user.name.firstName} ${user.name.lastName}`
            : "Unknown";
        },
        size: 200,
      },
      {
        accessorKey: "date",
        header: "Date",
        size: 200,
      },
      {
        id: "products",
        header: headerTitles.ItemsOrdered,
        Cell: ({ row }) => {
          const orderId = row.original.orderId;
          const order = ordersData.find((order) => order.id === orderId);
          return (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOpenModal(order)}
              className="view-items-btn"
            >
              {headerTitles.ViewItems}
            </Button>
          );
        },
        size: 150,
      },
      {
        id: "actions",
        header: "Actions",
        Cell: ({ row }) => (
          <>
            <IconButton onClick={() => handleOpenConfirmDialog(row.original)}>
              <MdCancel color="error" />
            </IconButton>
            <IconButton onClick={() => handlePrintIconClick(row.original)}>
              <FaPrint color="primary" />
            </IconButton>
          </>
        ),
        size: 150,
      },
    ],
    [t, ordersData, userData, deliveryNotes, handlePrint]
  );

  const theme = createTheme({
    palette: {
      mode: themeMode || "light",
    },
  });

  return (
    <div>
      <div className="table-container">
        <ThemeProvider theme={theme}>
          <MaterialReactTable columns={columns} data={deliveryNotes} />
        </ThemeProvider>
      </div>

      {selectedOrder && (
        <Dialog open={openModal} onClose={handleCloseModal} fullWidth>
          <DialogTitle className={`dialog-title ${themeMode}-theme`}>
            {headerTitles.ItemsOrdered}
          </DialogTitle>
          <DialogContent className={`dialog-content ${themeMode}-theme`}>
            <TableContainer component={Paper} className={`table-container ${themeMode}-theme`} >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{headerTitles.ProductName}</TableCell>
                    <TableCell>{headerTitles.Quantity}</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedOrder.itemsOrdered.map((item, index) => {
                    const product = productsData.find(
                      (p) => p.id === item.productId
                    );
                    return (
                      <TableRow key={index}>
                        <TableCell>
                          {product ? product.name : "Unknown"}
                        </TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>$
                          {(
                            item.quantity * (product ? product.price : 0)
                          ).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
        </Dialog>
      )}

      {orderToDelete && (
        <ConfirmationDialog
          open={openConfirmDialog}
          onClose={handleCloseConfirmDialog}
          onConfirm={handleConfirmDelete}
          itemType="deliveryNote"
        />
      )}

      <div style={{ display: "none" }}>
        <PrintDeliveryNote
          ref={printRef}
          deliveryNoteDetails={deliveryNoteDetailsToPrint}
        />
      </div>
    </div>
  );
};

export default DeliveryNotes;
