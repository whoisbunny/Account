import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import Icon from "@/components/ui/Icon";
import Textarea from "@/components/ui/Textarea";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Textinput from "@/components/ui/Textinput";

import {
  editTransaction,
  getTransactions,
  toggleEditModal,
} from "../../store/features/transaction/transactionSlice";
import Flatpickr from "react-flatpickr";

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

const MethodOptions = [
  {
    value: "Online",
    label: "Online",
  },
  {
    value: "Cash",
    label: "Cash",
  },
];
const EditTransaction = ({ invoiceOption, accountOption }) => {
  const { editModal, editItem } = useSelector((state) => state.transaction);
  const dispatch = useDispatch();
  const [picker, setPicker] = useState(new Date());

  const FormValidationSchema = yup
    .object({
      name: yup.string().required("Name is required"),
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

  useEffect(() => {
    reset(editItem);
  }, [editItem]);

  const onSubmit = (data) => {
    // data.type = data.type.value;
    data.partyName = data.partyName.value;
    let data2 = {
      id: editItem?._id,
      formData: data,
    };
    dispatch(editTransaction(data2));
    setTimeout(() => {
      dispatch(getTransactions());
      dispatch(toggleEditModal(false));
      reset();
    }, 300);
  };

  return (
    <Modal
      title="Edit transactions"
      activeModal={editModal}
      onClose={() => dispatch(toggleEditModal(false))}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
        <div>
          <label htmlFor="default-picker" className=" form-label">
            Invoice Date
          </label>

          <Flatpickr
            className="form-control py-2"
            value={picker}
            onChange={(date) => setPicker(date)}
            defaultValue={editItem?.date}
            id="default-picker"
          />
        </div>

        <div className={errors.partyName ? "has-error" : ""}>
          <label className="form-label" htmlFor="icon_s">
            Transaction partyName
          </label>
          <Controller
            name="partyName"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={accountOption}
                defaultValue={{
                  label: editItem?.partyName?.name,
                  value: editItem?.partyName?._id,
                }}
                styles={styles}
                className="react-select"
                classNamePrefix="select"
                id="icon_s"
              />
            )}
          />
          <div className="text-sm mt-2 mx-4">
            <span className="text-slate-500 dark:text-slate-300 inline-block mr-3">
              Previous Party Name :
            </span>
            <span className="text-slate-900 dark:text-slate-300 font-semibold">
              {editItem?.partyName?.name}
            </span>
          </div>
          {errors.partyName && (
            <div className=" mt-2  text-danger-500 block text-sm">
              {errors.partyName?.message || errors.partyName?.label.message}
            </div>
          )}
        </div>
        <div className={errors.referenceOfInvoices ? "has-error" : ""}>
          <label className="form-label" htmlFor="icon_s">
            referenceOfInvoices
          </label>
          <Controller
            name="referenceOfInvoices"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={invoiceOption}
                // defaultValue={{
                //   label: editItem?.referenceOfInvoices?.invoiceNumber,
                //   value: editItem?.referenceOfInvoices?._id,
                // }}
                styles={styles}
                className="react-select"
                classNamePrefix="select"
                id="icon_s"
              />
            )}
          />
          <div className="text-sm mt-2 mx-4">
            <span className="text-slate-500 dark:text-slate-300 inline-block mr-3">
              Previous referenceOfInvoices:
            </span>
            <span className="text-slate-900 dark:text-slate-300 font-semibold">
              {editItem?.referenceOfInvoices?.map(e => <span>{e?.invoiceNumber}</span>)}
            </span>
          </div>
          {errors.referenceOfInvoices && (
            <div className=" mt-2  text-danger-500 block text-sm">
              {errors.referenceOfInvoices?.message ||
                errors.referenceOfInvoices?.label.message}
            </div>
          )}
        </div>
        <Textinput
          name="amount"
          type="number"
          label="amount"
          placeholder=" amount"
          register={register}
          error={errors.amount}
        />
        <div className={errors.TransactionMethod ? "has-error" : ""}>
          <label className="form-label" htmlFor="icon_s">
            Transaction Method
          </label>
          <Controller
            name="TransactionMethod"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={MethodOptions}
                defaultValue={{
                  label: editItem?.TransactionMethod,
                  value: editItem?.TransactionMethod,
                }}
                styles={styles}
                className="react-select"
                classNamePrefix="select"
                id="icon_s"
              />
            )}
          />
          <div className="text-sm mt-2 mx-4">
            <span className="text-slate-500 dark:text-slate-300 inline-block mr-3">
              Previous Transaction Method:
            </span>
            <span className="text-slate-900 dark:text-slate-300 font-semibold">
              {editItem?.TransactionMethod}
            </span>
          </div>
          {errors.TransactionMethod && (
            <div className=" mt-2  text-danger-500 block text-sm">
              {errors.TransactionMethod?.message ||
                errors.TransactionMethod?.label.message}
            </div>
          )}
        </div>

        <div className="ltr:text-right rtl:text-left">
          <button className="btn btn-dark  text-center">Update</button>
        </div>
      </form>
    </Modal>
  );
};

export default EditTransaction;
