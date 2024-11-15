import React, { useContext } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import ThemeContext from "../ThemeContext/ThemeContext"; 
import styles from "./ConfirmationDialog.module.css";
import { useTranslation } from "react-i18next";

const ConfirmationDialog = ({ open, onClose, onConfirm, itemType }) => {
  const { themeMode } = useContext(ThemeContext);
  const { t } = useTranslation();

  const translate = {
    Delete : t('delete'),
    Product : t('products'),
    Category : t('categories'),
    Subcategory : t('subcategories'),
    Subsubcategory : t('subsubcategories'),
    Order : t('orders'),
    DeliveryNote : t('deliveryNotes'),
    Logout : t('profileAdmin.logout'),
    Item : t('item'),
    Order: t('order'),

    ProductMsg : t('confirmationDialogMsg.ProductMsg'),
    CategoryMsg : t('confirmationDialogMsg.CategoryMsg'),
    SubcategoryMsg : t('confirmationDialogMsg.SubcategoryMsg'),
    SubsubcategoryMsg : t('confirmationDialogMsg.SubSubCategoryMsg'),
    OrderMsg : t('confirmationDialogMsg.OrderMsg'),
    DeliveryNoteMsg : t('confirmationDialogMsg.DeliveryNotesMsg'),
    LogoutMsg : t('confirmationDialogMsg.LogoutMsg'),
    ItemMsg : t('confirmationDialogMsg.ItemMsg'),
  }


  // Define dynamic title and message based on the itemType
  const getTitle = () => {
    switch (itemType) {
      case "product":
        return translate.Delete + " " + translate.Product;
      case "category":
        return translate.Delete + " " + translate.Category;
      case "subcategory":
        return translate.Delete + " " + translate.Subcategory;
      case "subsubcategory":
        return translate.Delete + " " + translate.Subsubcategory;
      case "order":
        return translate.Delete + " " + translate.Order;
      case "deliveryNote":
        return translate.Delete + " " + translate.DeliveryNote;
      case "logout":
        return translate.Logout;
      default:
        return translate.Delete + " " +translate.Item;
    }
  };

  const getMessage = () => {
    switch (itemType) {
      case "product":
        return translate.ProductMsg;
      case "category":
        return translate.CategoryMsg;
      case "subcategory":
        return translate.SubcategoryMsg;
      case "subsubcategory":
        return translate.SubsubcategoryMsg;
      case "order":
        return translate.OrderMsg;
      case "deliveryNote":
        return translate.DeliveryNoteMsg;
      case "logout":
        return translate.LogoutMsg;
      default:
        return translate.ItemMsg;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className={`${styles["popup-confirmation"]} ${
        themeMode === "dark" ? styles["dark-mode"] : styles["light-mode"]
      }`}
    >
      <div className={styles["popup-confirmation-dialog"]}>
        <DialogTitle className={styles["popup-confirmation-title"]}>
          {getTitle()}
        </DialogTitle>
        <DialogContent className={styles["popup-confirmation-message"]}>
          {getMessage()}
        </DialogContent>
        <DialogActions className={styles["popup-confirmation-actions"]}>
          <Button
            onClick={onClose}
            className={styles["popup-confirmation-button"]}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className={styles["popup-confirmation-button"]}
          >
            Confirm
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default ConfirmationDialog;
