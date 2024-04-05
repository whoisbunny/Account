import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import Icon from "@/components/ui/Icon";
import Textarea from "@/components/ui/Textarea";
import Textinput from "@/components/ui/Textinput";

import Flatpickr from "react-flatpickr";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import FormGroup from "@/components/ui/FormGroup";
import { toggleEditModal } from "../../store/features/invoice/invoiceSlice";
import { Label } from "recharts";
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

const EditInvoice = () => {
  const { editModal, editItem } = useSelector((state) => state.invoice);
  const dispatch = useDispatch();

  const [picker, setPicker] = useState(new Date());

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
      name: yup.string().required("Title is required"),
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
    // const {
    //   name,
    //   description,
    //   category,
    //   quantity,
    //   price,
    //   thumbnailImage,
    //   galleryImages,
    // } = data;
    // const formData = new FormData();
    // formData.append("name", name);
    // formData.append("description", description);
    // formData.append("category", category?.value);
    // formData.append("price", price);
    // formData.append("quantity", quantity);
    // formData.append("thumbnailImage", images ? images : thumbnailImage);
    // selectedFiles2
    //   ? selectedFiles2.forEach((file) => {
    //       formData.append("galleryImages", file);
    //     })
    //   : formData.append("galleryImages", JSON.stringify(galleryImages));
    // let data2 = {
    //   id: editItem?._id,
    //   formData: formData,
    // };
    // dispatch(editProducts(data2));
    // setTimeout(() => {
    //   dispatch(resetImageState());
    //   dispatch(getProducts());
    //   dispatch(toggleEditModal(false));
    //   reset();
    // }, 300);
  };

  return (
    <Modal
      title="Edit Invoice"
      activeModal={editModal}
      onClose={() => dispatch(toggleEditModal(false))}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
        <div className={errors.partyName ? "has-error w-3/4 " : "w-3/4"}>
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
                defaultInputValue={{
                  value: editItem.partyName._id,

                  label: editItem.partyName.name,
                }}
              />
            )}
          />
          {errors.partyName && (
            <div className=" mt-2  text-danger-500 block text-sm">
              {errors.partyName?.message || errors.partyName?.label.message}
            </div>
          )}
        </div>
        <div>
          <label htmlFor="default-picker" className=" form-label">
            Invoice Date
          </label>

          <Flatpickr
            className="form-control py-2"
            value={picker}
            onChange={(date) => setPicker(date)}
            defaultValue={editItem.invoiceDate}
            id="default-picker"
          />
        </div>

        <Textinput
          type="text"
          name="invoiceNumber"
          label="Invoice Number"
          placeholder="Invoice Number"
          register={register}
          error={errors.invoiceNumber}
          defaultValue={editItem.invoiceNumber}
        />
        <Textinput
          type="text"
          name="productName"
          label="Product Name"
          placeholder="Product Name"
          register={register}
          error={errors.productName}
          defaultValue={editItem.productName}
        />
        <Textinput
          type="number"
          name="quantity"
          label="Product Quantity"
          placeholder="Product Quantity"
          register={register}
          error={errors.quantity}
          defaultValue={editItem.quantity}
        />
        <Textinput
          type="number"
          name="price"
          label="Product price"
          placeholder="Product price"
          register={register}
          error={errors.price}
          defaultValue={editItem.price}
        />
        <Textinput
          type="number"
          name="discount"
          label="Total discount"
          placeholder="Total discount"
          register={register}
          error={errors.discount}
          defaultValue={editItem.discount}
        />
        <Textinput
          type="number"
          name="gst"
          label="Total GST Amount"
          placeholder="GST Amount"
          register={register}
          error={errors.gst}
          defaultValue={editItem.gst}
        />
        <Textinput
          type="number"
          name="total"
          label="Total after all texes"
          placeholder="Total"
          register={register}
          error={errors.total}
          defaultValue={editItem.total}
        />

        <div className="ltr:text-right rtl:text-left">
          <button className="btn btn-dark  text-center">Update</button>
        </div>
      </form>
    </Modal>
  );
};

export default EditInvoice;
