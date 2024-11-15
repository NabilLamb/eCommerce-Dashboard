import React from "react";
import styles from "./PrintDeliveryNote.module.css";
import logo from "../../../public/logo.png";
import { useTranslation } from "react-i18next";

const PrintDeliveryNote = React.forwardRef(({ deliveryNoteDetails }, ref) => {
  const { t } = useTranslation();



  const companyInfo = {
    name: t('companyInfo.name'),
    address: t('companyInfo.address'),
    phone: t('companyInfo.phone'),
    email: t('companyInfo.email'),
  };

  const translate = {
    CustumerName : t('tableHeader.CustumerName'),
    CustumerNumber : t('deliverNotes.CustumerNumber'),
    ContactNumber : t('updateProfile.contactNumber'),
    Adress: t('profileAdmin.address'),
    DeliveryNotesId: t('tableHeader.DeliveryNotesId'),
    OrderId: t('tableHeader.OrderId'),
    Products: t('products'),
    ProductNumber: t('deliverNotes.ProductNumber'),
    ProductName: t('statistics.productName'),
    Quantity: t('tableHeader.Quantity'),
    Price: t('tableHeader.Price'),

  };


  const formatNumber = (number) => (number !== undefined ? number.toFixed(2) : "0.00");

  const calculatePVV = (pva) => {
    const pvaNumber = parseFloat(pva);
    return pvaNumber * 0.4;
  };

  const calculateTotalTTC = (products) => {
    return products.reduce((total, product) => {
      const pvTotal = product.quantity * calculatePVV(product.pva);
      const totalProduct = (product.quantity * product.price) + pvTotal;
      return total + totalProduct;
    }, 0);
  };

  const generateDeliveryNoteId = (index) => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${String(index).padStart(2, "0")}${day}${month}/${year}`;
  };

  return (
    <div ref={ref} className={styles.deliveryNote}>
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

      <div className={styles.detailsSection}>
        <div className={styles.userInfo}>
          <h4>{translate.CustumerName}: {deliveryNoteDetails?.userName}</h4>
          <h4>{translate.CustumerNumber}: {deliveryNoteDetails?.userId}</h4>
          <h4>{translate.ContactNumber}: {deliveryNoteDetails?.contactNumber}</h4>
          <h4>Email: {deliveryNoteDetails?.email}</h4>
          <h4>{translate.Adress} {deliveryNoteDetails?.address}, {deliveryNoteDetails?.city}, {deliveryNoteDetails?.country}</h4>
        </div>
        <div className={styles.noteInfo}>
          <h3>{translate.DeliveryNotesId}: {generateDeliveryNoteId(deliveryNoteDetails?.id)}</h3>
          <h3>{translate.OrderId}: {deliveryNoteDetails?.orderId}</h3>
          <h3>Date: {deliveryNoteDetails?.date}</h3>
        </div>
      </div>

      <hr className={styles.line} />

      <h3>{translate.Products}</h3>
      <div className={styles.tableContainer}>
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
            {deliveryNoteDetails?.products?.map((product, index) => (
              <tr key={index}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>${formatNumber(product.price)}</td>
                <td>${formatNumber(product.pva)}</td>
                <td>${formatNumber(calculatePVV(product.pva))}</td>
                <td>
                  ${formatNumber(
                    product.quantity * product.price +
                    calculatePVV(product.pva) * product.quantity
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <hr className={styles.line} />

      <div className={styles.totalttc}>
        <p><strong>Total TTC:</strong> <span className={styles.numtotalttc}>${formatNumber(calculateTotalTTC(deliveryNoteDetails?.products || []))}</span></p>
      </div>
    </div>
  );
});

export default PrintDeliveryNote;
