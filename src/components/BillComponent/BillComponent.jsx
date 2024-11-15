import React from "react";
import styles from "./BillComponent.module.css";
import logo from "../../../public/logo.png";
import { useTranslation } from "react-i18next";

const BillComponent = React.forwardRef(({ order, customer, products }, ref) => {
  const { t } = useTranslation();

  const formatNumber = (number) => (number !== undefined ? number.toFixed(2) : "0.00");

  const calculatePVV = (pva) => {
    const pvaNumber = parseFloat(pva);
    return pvaNumber * 0.4;
  };

  const calculateTotalTTC = (itemsOrdered) => {
    return itemsOrdered.reduce((total, item) => {
      const product = products.find((prod) => prod.id === item.productId);
      if (product) {
        const pvTotal = item.quantity * calculatePVV(product.pva);
        const totalProduct = (item.quantity * product.price) + pvTotal;
        return total + totalProduct;
      }
      return total;
    }, 0);
  };

  const companyInfo = {
    name: t('companyInfo.name'),
    address: t('companyInfo.address'),
    phone: t('companyInfo.phone'),
    email: t('companyInfo.email'),
  };

  const translate = {
    // CustumerName : t('tableHeader.CustumerName'),
    // CustumerNumber : t('deliverNotes.CustumerNumber'),
    // ContactNumber : t('updateProfile.contactNumber'),
    // Adress: t('profileAdmin.address'),
    // DeliveryNotesId: t('tableHeader.DeliveryNotesId'),
    

    InvoiceTo : t('billComponent.InvoiceTO'),
    OrderId: t('tableHeader.OrderId'),
    EstimatedDeliveryDate: t('billComponent.EstimatedDeliveryDate'),
    OrderInformations: t('billComponent.OrderInformations'),
    PaymentStatus: t('billComponent.PaymentStatus'),
    PaymentMethod: t('billComponent.PaymentMethod'),
    OrderType: t('billComponent.OrderType'),
    OrderStatus: t('billComponent.OrderStatus'),
    DeliveryStatus: t('billComponent.DeliveryStatus'),
    ShippingAddress: t('billComponent.ShippingAddress'),
    Products: t('products'),
    ProductNumber: t('deliverNotes.ProductNumber'),
    ProductName: t('statistics.productName'),
    Quantity: t('tableHeader.Quantity'),
    Price: t('tableHeader.Price'),

  };

  return (
    <div ref={ref} className={styles.invoice}>
      <div className={styles.header}>
        <img src={logo} alt="Company Logo" className={styles.logo} />
        <div className={styles.companyInfo}>
          <h2>{companyInfo.name}</h2>
          <p>{companyInfo.address}</p>
          <p>{companyInfo.phone}</p>
          <p>{companyInfo.email}</p>
        </div>
      </div>

      <hr className={styles.line} />

      <div className={styles.customerOrderInfo}>
        <div className={styles.customerInfo}>
          <h3>{translate.InvoiceTo}:</h3>
          <p>{`${customer.name.firstName} ${customer.name.lastName}`}</p>
          <p>{customer.address}</p>
          <p>{customer.city}, {customer.country}</p>
          <p>{customer.email}</p>
        </div>
        <div className={styles.orderInfo}>
          <p><strong>{translate.OrderId}:</strong> {order.id}</p>
          <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
          <p><strong>{translate.EstimatedDeliveryDate}:</strong> {new Date(order.estimatedDeliveryDate).toLocaleDateString()}</p>
        </div>
      </div>

      <hr className={styles.line} />

      <h3>{translate.OrderInformations}</h3>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{translate.PaymentStatus}</th>
              <th>{translate.PaymentMethod}</th>
              <th>{translate.OrderType}</th>
              <th>{translate.OrderStatus}</th>
              <th>{translate.DeliveryStatus}</th>
              <th>{translate.ShippingAddress}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{order.paymentStatus}</td>
              <td>{order.paymentMethod}</td>
              <td>{order.orderType}</td>
              <td>{order.orderStatus}</td>
              <td>{order.deliveryStatus}</td>
              <td>{order.shippingAddress}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <hr className={styles.line} />

      <div className={styles.tableContainer}>
        <h3>{translate.Products}</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{translate.ProductNumber}</th>
              <th>{translate.ProductName}</th>
              <th>{translate.Quantity}</th>
              <th>{translate.Price}</th>
              <th>PVA</th>
              <th>PVV</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {order.itemsOrdered.map((item) => {
              const product = products.find((prod) => prod.id === item.productId);
              if (product) {
                return (
                  <tr key={item.productId}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{item.quantity}</td>
                    <td>${formatNumber(product.price)}</td>
                    <td>${formatNumber(product.pva)}</td>
                    <td>${formatNumber(calculatePVV(product.pva))}</td>
                    <td>
                      ${formatNumber(
                        item.quantity * product.price +
                        calculatePVV(product.pva) * item.quantity
                      )}
                    </td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>
      </div>

      <hr className={styles.line} />

      <div className={styles.totalttc}>
        <p><strong>Total TTC:</strong><span className={styles.numtotalttc}>  ${formatNumber(calculateTotalTTC(order.itemsOrdered))}</span></p>
      </div>
    </div>
  );
});

export default BillComponent;
