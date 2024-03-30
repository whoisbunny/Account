import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import Icon from "@/components/ui/Icon";
import Textarea from "@/components/ui/Textarea";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { editAccount, getAccounts, toggleEditModal } from "../../store/features/account/accountSlice";
import Textinput from "@/components/ui/Textinput";

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

const options = [
  {
    value: "Creditor",
    label: "Creditor",
  },

  {
    value: "Debtor",
    label: "Debtor",
  },
  {
    value: "Bank",
    label: "Bank",
  },
  {
    value: "General",
    label: "General",
  },
];
const EditAccount = () => {
  const { editModal, editItem } = useSelector((state) => state.account);
  const dispatch = useDispatch();

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
        data.type = data.type.value;

    let data2 = {
      id: editItem?._id,
      formData: data,
    };
    dispatch(editAccount(data2));
    setTimeout(() => {
      dispatch(getAccounts());
      dispatch(toggleEditModal(false));
      reset();
    }, 300);
  };

  return (
    <Modal
      title="Edit Account"
      activeModal={editModal}
      onClose={() => dispatch(toggleEditModal(false))}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
        <Textinput
          name="name"
          label="Account Holder Name"
          placeholder=" Name"
          register={register}
          error={errors.name}
        />

        <Textinput
          type="number"
          name="phoneNumber"
          label="Phone Number"
          placeholder="Phone Number"
          register={register}
          error={errors.phoneNumber}
        />
        <Textinput
          type="text"
          name="gst"
          label="GST Number"
          placeholder="GST Number"
          register={register}
          error={errors.gst}
        />
        <Textarea
          name={"address"}
          label="Address"
          placeholder="Address"
          register={register}
          error={errors.address}
        />
        <div className={errors.type ? "has-error" : ""}>
          <label className="form-label" htmlFor="icon_s">
            Account Type
          </label>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={options}
                defaultValue={{
                  label: editItem?.type,
                  value: editItem?.type,
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
              Previous Type:
            </span>
            <span className="text-slate-900 dark:text-slate-300 font-semibold">
              {editItem?.type}
            </span>
          </div>
          {errors.type && (
            <div className=" mt-2  text-danger-500 block text-sm">
              {errors.type?.message || errors.type?.label.message}
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

export default EditAccount;
