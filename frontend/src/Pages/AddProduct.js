import React, { useState } from "react";
import Productform from "../components/Productform";
import { useDispatch, useSelector } from "react-redux";
import {
  createproductThunk,
  selectisloading,
} from "../redux/features/product/productSlice";
import Loader from "../components/Loader";
import RedirectUserHook from "../HOOKS/RedirectUserHook";
import { toast } from "react-toastify";
const initialstate = {
  name: "",
  model: "",
  quantity: "",
  price: "",
  description: "",
  INnumber: "",
  ordernumber: "",
  ICnumber: "",
};
const AddProduct = () => {
  const isloading = useSelector(selectisloading);

  RedirectUserHook("/Login");

  const dispatch = useDispatch();
  const [ProductImage, setProductImage] = useState("");
  const [ImagePreview, setImagePreview] = useState(null);
  const [product, setproduct] = useState(initialstate);
  const {
    name,
    model,
    quantity,
    price,
    description,
    INnumber,
    ordernumber,
    ICnumber,
  } = product;

  const handleinputs = (e) => {
    const { name, value } = e.target;
    setproduct({ ...product, [name]: value });
  };
  const handleImageinputs = (e) => {
    if (e.target.files[0]) {
      setProductImage(e.target.files[0]);

      setImagePreview(URL.createObjectURL(e.target.files[0]));
    } else {
      return setProductImage(null);
    }
  };
  const handleremoveimage = (e) => {
    setProductImage(null);

    setImagePreview(null);
  };

  const generateSKU = (model) => {
    const letter = model.slice(0, 3).toUpperCase();
    const number = Date.now();
    const sku = letter + "-" + number;
    return sku;
  };
  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("ordernumber", ordernumber.trim());
    formData.append("INnumber", INnumber.trim());
    formData.append("ICnumber", ICnumber.trim());
    formData.append("description", description.trim());
    formData.append("price", price.trim());
    formData.append("quantity", quantity.trim());
    formData.append("model", model.trim());
    formData.append("image", ProductImage);
    formData.append("previewimage", ImagePreview);
    formData.append("sku", generateSKU(model));
    console.log(...formData);
    if( !name||
      !model||
      !quantity||
      !price||
      !description||
      !INnumber||
      !ordernumber||
      !ICnumber){
        return toast.error("Please fill all the fields")

    }else{

    await dispatch(createproductThunk(formData));

     window.location.reload()
  }};

  return (
    <div>
      {isloading && <Loader />}
      <Productform
        product={product}
        handleremoveimage={handleremoveimage}
        ProductImage={ProductImage}
        ImagePreview={ImagePreview}
        handleinputs={handleinputs}
        handleImageinputs={handleImageinputs}
        saveProduct={saveProduct}
      />
    </div>
  );
};

export default AddProduct;
