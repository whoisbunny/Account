import React, { useEffect, useState } from "react";
import Select from "react-select";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Fileinput from "../../components/ui/Fileinput";
import {
  addInvoice,
  getInvoice,
  toggleAddModal,
} from "../../store/features/invoice/invoiceSlice";
import { getAccounts } from "../../store/features/account/accountSlice";

const styles = {
  multiValue: (base, state) => {
    return state.data.isFixed ? { ...base, opacity: "0.5" } : base;
  },
  multiValueLabel: (base, state) => {
    return state.data.isFixed
      ? { ...base, color: "#626262", paddingRight: 6 }
      : base;
  },
  multiValueRemove: (base, state) => {
    return state.data.isFixed ? { ...base, display: "none" } : base;
  },
  option: (provided, state) => ({
    ...provided,
    fontSize: "14px",
  }),
};

const AddInvoice = () => {
  const { openInvoiceModal } = useSelector((state) => state.invoice);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAccounts());
  }, []);
  const { accounts } = useSelector((state) => state.account);
  let options = [];
  accounts.forEach((element) => {
    options.push({ value: element?._id, label: element.name });
  });

  const FormValidationSchema = yup
    .object({
      // name: yup.string().required("Title is required"),
    })
    .required();

  const {
    register,
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(FormValidationSchema),
    mode: "all",
  });

  const onSubmit = (data) => {
    var {
      partyName,
      invoiceDate,
      invoiceNumber,
      productName,
      quantity,
      price,
      discount,
      gst,
      total,
    } = data;

    data.partyName = data.partyName.value;
    data.grossTotal;

    if (
      quantity === undefined ||
      quantity === null ||
      (quantity === 0 && price === 0) ||
      price === null ||
      price === undefined
    ) {
      data.grossTotal = 0;
    } else {
      data.grossTotal = price * quantity;
    }

    dispatch(addInvoice(data));
    setTimeout(() => {
      dispatch(getInvoice());
      reset();
      dispatch(toggleAddModal(false));
    }, 300);
  };

  return (
    <div>
      <Modal
        title="Add Invoice"
        labelclassName="btn-outline-dark"
        activeModal={openInvoiceModal}
        onClose={() => dispatch(toggleAddModal(false))}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          <div className={errors.partyName ? "has-error" : ""}>
            <label className="form-label" htmlFor="icon_s">
              Name
            </label>
            <Controller
              name="partyName"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={options}
                  styles={styles}
                  className="react-select"
                  classNamePrefix="select"
                  id="icon_s"
                />
              )}
            />
            {errors.partyName && (
              <div className=" mt-2  text-danger-500 block text-sm">
                {errors.partyName?.message || errors.partyName?.label.message}
              </div>
            )}
          </div>

          <Textinput
            name="invoiceDate"
            label="invoiceDate"
            placeholder="Invoice Date"
            register={register}
            error={errors.invoiceDate}
            type="date"
          />

          <Textinput
            type="text"
            name="invoiceNumber"
            label="Invoice Number"
            placeholder="Invoice Number"
            register={register}
            error={errors.invoiceNumber}
          />
          <Textinput
            type="text"
            name="productName"
            label="Product Name"
            placeholder="Product Name"
            register={register}
            error={errors.productName}
          />
          <Textinput
            type="number"
            name="quantity"
            label="Product Quantity"
            placeholder="Product Quantity"
            register={register}
            error={errors.quantity}
          />
          <Textinput
            type="number"
            name="price"
            label="Product price"
            placeholder="Product price"
            register={register}
            error={errors.price}
          />
          <Textinput
            type="number"
            name="discount"
            label="Total discount"
            placeholder="Total discount"
            register={register}
            error={errors.discount}
          />
          <Textinput
            type="number"
            name="gst"
            label="Total GST Amount"
            placeholder="GST Amount"
            register={register}
            error={errors.gst}
          />
          <Textinput
            type="number"
            name="total"
            label="Total after all texes"
            placeholder="Total"
            register={register}
            error={errors.total}
          />

          <div className="ltr:text-right rtl:text-left">
            <button className="btn btn-dark  text-center">Add</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddInvoice;
