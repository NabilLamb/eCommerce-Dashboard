import React, { useMemo, useState, useRef, useEffect, useContext } from "react";
import MaterialReactTable from "material-react-table";
import "./Orders.css";
import ExcelOrders from "../../components/Excel/ExcelOrders";
import {
  createTheme,
  ThemeProvider,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { MdBarChart, MdCancel, MdEdit } from "react-icons/md";
import { FaPrint } from "react-icons/fa";
import StatisticsModal from "../../components/StatisticsModal/StatisticsModal";
import DeleteConfirmationDialog from "../../components/ConfirmationDialog/ConfirmationDialog";
import BillComponent from "../../components/BillComponent/BillComponent";
import { ordersData, userData, productsData } from "../../data";
import { useReactToPrint } from "react-to-print";
import ThemeContext from "../../components/ThemeContext/ThemeContext";
import { useTranslation } from "react-i18next";
const Orders = () => {
  const [orders, setOrders] = useState(ordersData);
  const [statisticsModalVisible, setStatisticsModalVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrderItems, setSelectedOrderItems] = useState([]);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [orderToChangeStatus, setOrderToChangeStatus] = useState(null);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [orderToPrint, setOrderToPrint] = useState(null);
  const { t } = useTranslation();

  const { themeMode } = useContext(ThemeContext);

  const componentRef = useRef();

  useEffect(() => {
    if (orderToPrint) {
      handlePrint();
    }
  }, [orderToPrint]);

  const handleStatisticsGlobal = () => {
    setStatisticsModalVisible(true);
  };

  const handleOpenModal = (items) => {
    setSelectedOrderItems(items);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => setOrderToPrint(null),
  });

  const handlePrintInvoice = (order) => {
    setOrderToPrint(order);
  };

  const handleCancel = (order) => {
    setOrderToDelete(order);
    setDeleteConfirmationOpen(true);
  };

  const handleEditStatus = (order) => {
    setOrderToChangeStatus(order);
    setSelectedStatus(order.orderStatus);
    setStatusModalOpen(true);
  };

  const handleDeleteConfirmed = () => {
    if (orderToDelete) {
      const updatedOrders = orders.filter(
        (order) => order.id !== orderToDelete.id
      );
      setOrders(updatedOrders);
      setDeleteConfirmationOpen(false);
      setOrderToDelete(null);
    }
  };

  const handleDeleteCancelled = () => {
    setDeleteConfirmationOpen(false);
    setOrderToDelete(null);
  };

  const handleStatusChange = () => {
    if (orderToChangeStatus && selectedStatus) {
      const updatedOrders = orders.map((order) =>
        order.id === orderToChangeStatus.id
          ? { ...order, orderStatus: selectedStatus }
          : order
      );
      setOrders(updatedOrders);
      setStatusModalOpen(false);
      setOrderToChangeStatus(null);
      setSelectedStatus("");
    }
  };

  const calculateTotalAmount = (itemsOrdered) => {
    const totalAmount = itemsOrdered.reduce((sum, item) => {
      const product = productsData.find((prod) => prod.id === item.productId);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
    return totalAmount;
  };

  const headerTitles = {
    OrderId: t("tableHeader.OrderId"),
    CustumerName: t("tableHeader.CustumerName"),
    TotalAmount: t("tableHeader.TotalAmount"),
    PaymentStatus: t("tableHeader.PaymentStatus"),
    PaymentMethod: t("tableHeader.PaymentMethod"),
    OrderType: t("tableHeader.OrderType"),
    OrderDate: t("tableHeader.OrderDate"),
    OrderStatus: t("tableHeader.OrderStatus"),
    DeliveryStatus: t("tableHeader.DeliveryStatus"),
    ShippingAddress: t("tableHeader.ShippingAddress"),
    ItemsOrdered: t("tableHeader.ItemsOrdered"),
    
    ViewItems: t('tableHeader.ViewItems'),
    ProductName: t('statistics.productName'),
    Quantity: t('tableHeader.Quantity'),
    ChangeOrderStatus: t('mix.ChangeOrderStatus'),
    Shipped: t('mix.Shipped'),
    Delivered: t('mix.Delivered'),
    InStock: t('mix.InStock'),
    Change: t('mix.Change'),
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: headerTitles.OrderId,
        size: 100,
      },
      {
        accessorKey: "userId",
        header: headerTitles.CustumerName,
        Cell: ({ cell }) => {
          const user = userData.find((user) => user.id === cell.getValue());
          return user
            ? `${user.name.firstName} ${user.name.lastName}`
            : "Unknown";
        },
        size: 150,
      },
      {
        accessorKey: "totalAmount",
        header: `${headerTitles.TotalAmount} ($)`,
        Cell: ({ row }) =>
          `$${calculateTotalAmount(row.original.itemsOrdered).toFixed(2)}`,
        size: 100,
      },
      {
        accessorKey: "paymentStatus",
        header: headerTitles.PaymentStatus,
        size: 100,
      },
      {
        accessorKey: "paymentMethod",
        header: headerTitles.PaymentMethod,
        size: 100,
      },
      {
        accessorKey: "orderType",
        header: headerTitles.OrderType,
        size: 100,
      },
      {
        accessorKey: "orderDate",
        header: headerTitles.OrderDate,
        Cell: ({ cell }) => new Date(cell.getValue()).toLocaleDateString(),
        size: 100,
      },
      {
        accessorKey: "orderStatus",
        header: headerTitles.OrderStatus,
        size: 100,
      },
      {
        accessorKey: "deliveryStatus",
        header: headerTitles.DeliveryStatus,
        size: 150,
      },
      {
        accessorKey: "shippingAddress",
        header: headerTitles.ShippingAddress,
        size: 250,
      },
      {
        accessorKey: "itemsOrdered",
        header: headerTitles.ItemsOrdered,
        Cell: ({ cell }) => (
          <button
            onClick={() => handleOpenModal(cell.getValue())}
            className="view-items-btn"
          >
            {headerTitles.ViewItems}
          </button>
        ),
        size: 200,
      },
      {
        accessorKey: "actions",
        header: "Actions",
        Cell: ({ row }) => (
          <div>
            <IconButton
              onClick={() => handlePrintInvoice(row.original)}
              title={t("mix.PrintInvoice")}
            >
              <FaPrint />
            </IconButton>
            <IconButton
              onClick={() => handleCancel(row.original)}
              title={t("mix.DeleteOrder")}
            >
              <MdCancel />
            </IconButton>
            <IconButton
              onClick={() => handleEditStatus(row.original)}
              title={t("mix.ChangeOrderStatus")}
            >
              <MdEdit />
            </IconButton>
          </div>
        ),
        size: 200,
      },
    ],
    [orders, t]
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

  const isDarkMode = theme.palette.mode === "dark";

  return (
    <div>
      <div className="table-container">
        <div className="toolbar">
          <IconButton onClick={handleStatisticsGlobal} title={t("mix.ViewStatistics")}>
            <MdBarChart />
          </IconButton>

          <div className="excel">
            <ExcelOrders orders={orders} />
          </div>
        </div>

        <ThemeProvider theme={theme}>
          <MaterialReactTable columns={columns} data={orders} />
        </ThemeProvider>
        <StatisticsModal
          visible={statisticsModalVisible}
          onClose={() => setStatisticsModalVisible(false)}
          data={orders.map((order) => ({
            name: `${t("order")} ${order.id}`,
            PurchaseCount: calculateTotalAmount(order.itemsOrdered),
          }))}
        />
        <Modal
          open={modalOpen}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Paper
            theme={theme}
            className={isDarkMode ? "paper-dark" : ""}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "40%",
              maxHeight: "60%",
              overflowY: "auto",
              padding: "1rem",
            }}
          >
            <TableContainer>
              <Table className={isDarkMode ? "table-dark" : ""}>
                <TableHead className="tableHeadViewItems">
                  <TableRow>
                    <TableCell>{headerTitles.ProductName}</TableCell>
                    <TableCell>{headerTitles.Quantity}</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="tableBodyViewItems">
                  {selectedOrderItems.map((item, index) => {
                    const product = productsData.find(
                      (prod) => prod.id === item.productId
                    );
                    const totalPrice = product
                      ? product.price * item.quantity
                      : 0;
                    return (
                      <TableRow key={index}>
                        <TableCell>
                          {product ? product.name : `Product ${item.productId}`}
                        </TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>${totalPrice.toFixed(2)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Modal>
        <DeleteConfirmationDialog
          open={deleteConfirmationOpen}
          onClose={handleDeleteCancelled}
          onConfirm={handleDeleteConfirmed}
          itemType="order"
        />
        <Modal
          open={statusModalOpen}
          onClose={() => setStatusModalOpen(false)}
          aria-labelledby="status-modal-title"
          aria-describedby="status-modal-description"
        >
          <Paper
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: isDarkMode ? "#262626" : "background.paper",
              color: isDarkMode ? "white" : "inherit",
              boxShadow: 24,
              p: 4,
            }}
          >
            <h2 id="status-modal-title">{headerTitles.ChangeOrderStatus}</h2>
            <div className="radio-options">
              <label>
                <input
                  type="radio"
                  value="Shipped"
                  checked={selectedStatus === "Shipped"}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                />
                {headerTitles.Shipped}
              </label>
              <label>
                <input
                  type="radio"
                  value="Delivering"
                  checked={selectedStatus === "Delivering"}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                />
                {headerTitles.Delivered}
              </label>
              <label>
                <input
                  type="radio"
                  value="In Stock"
                  checked={selectedStatus === "In Stock"}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                />
                {headerTitles.InStock}
              </label>
              {/* Add more status options as needed */}
            </div>
            <div className="modal-actions">
              <button onClick={handleStatusChange}>{headerTitles.Change}</button>
            </div>
          </Paper>
        </Modal>
        {/* Hidden BillComponent for printing */}
        <div style={{ display: "none" }}>
          {orderToPrint && (
            <BillComponent
              ref={componentRef}
              order={orderToPrint}
              customer={userData.find(
                (user) => user.id === orderToPrint.userId
              )}
              products={productsData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
