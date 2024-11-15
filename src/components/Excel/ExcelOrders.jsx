import React from 'react';
import * as XLSX from 'xlsx';
import { IconButton } from '@mui/material';
import { FaFileExcel } from 'react-icons/fa';
import { userData, productsData } from "../../data"; // Ensure correct imports
import { useTranslation } from "react-i18next";

const ExcelOrders = ({ orders }) => {
  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(orders.map(order => ({
      'Order ID': order.id,
      'Customer Name': getCustomerName(order.userId),
      'Total Amount ($)': calculateTotalAmount(order.itemsOrdered),
      'Payment Status': order.paymentStatus,
      'Payment Method': order.paymentMethod,
      'Order Type': order.orderType,
      'Order Date': new Date(order.orderDate).toLocaleDateString(),
      'Order Status': order.orderStatus,
      'Delivery Status': order.deliveryStatus,
      'Shipping Address': order.shippingAddress,
      'Items Ordered': formatItemsOrdered(order.itemsOrdered),
    })));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Orders");
    XLSX.writeFile(wb, "orders.xlsx");
  };

  const { t } = useTranslation();


  const getCustomerName = (userId) => {
    const user = userData.find(user => user.id === userId);
    return user ? `${user.name.firstName} ${user.name.lastName}` : 'Unknown';
  };

  const calculateTotalAmount = (itemsOrdered) => {
    return itemsOrdered.reduce((sum, item) => {
      const product = productsData.find(prod => prod.id === item.productId);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  const formatItemsOrdered = (itemsOrdered) => {
    return itemsOrdered.map(item => {
      const product = productsData.find(prod => prod.id === item.productId);
      return `${product ? product.name : `Product ${item.productId}`} - ${item.quantity}`;
    }).join('\n');
    // Format as needed, e.g., "ProductID - Quantity"
  };

  return (
    <IconButton onClick={handleExport} title={t("mix.ExportToExcel")}>
      <FaFileExcel />
    </IconButton>
  );
};

export default ExcelOrders;
