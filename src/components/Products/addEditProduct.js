import React, { useState,useEffect } from "react";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from "next/router";
const AddEditProduct = ({type}) => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        productName: "",
        price: "",
        sku: "",
        url: "",
        category: "",
        material: "",
    });
    const {id,sku }= router.query;
    const [responseMessage, setResponseMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    useEffect(()=> {
      if(type && sku){
            const getItem = async ()=>{
            let allProductsEndpoint = `https://letmegrab-backend.onrender.com/letmegrab/all_products?sku=${sku}`;
            try {
              const data = await axios.get(allProductsEndpoint);
              setFormData({
                productName: data?.data?.data?.[0]?.product_name,
                price: data?.data?.data?.[0]?.price,
                sku: data?.data?.data?.[0]?.SKU,
                url: data?.data?.data?.[0]?.media_url,
                category: data?.data?.data?.[0]?.category,
                material: data?.data?.data?.[0]?.material,
            })
            }
            catch (error) {
              console.log(error)
            }
          }
          getItem();
        }
    },[router.isReady])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true)
        setResponseMessage('')
        addUpdateData();
    };
    const addUpdateData = async ()=> {
    if(type && id) {
        if( !formData.productName || !formData.price || !formData.sku || !formData.url || !formData.category || !formData.material){
            setIsLoading(false);
                return setResponseMessage('Please fill all the fields')
            }
        let updateProductEndpoint = `https://letmegrab-backend.onrender.com/letmegrab/update/${id}`;
        try {
          const response = await axios.put(updateProductEndpoint,{
            product_name: formData.productName,
            price: formData.price,
            sku: formData.sku,
            url: formData.url,
            category_name: formData.category,
            material: formData.material,
        });
        console.log(response);
        if (response.data.success) {
            setResponseMessage("Product Updated successfully!");
        } else {
            setResponseMessage(response.message || "Something went wrong.");
        }
        }
        catch (error) {
            setResponseMessage(error?.response?.data?.message || "Something went wrong.");
          console.log(error)
        }finally{
            setIsLoading(false);
          }
    }
    else {
        if( !formData.productName || !formData.price || !formData.sku || !formData.url || !formData.category || !formData.material){
            setIsLoading(false);
                return setResponseMessage('Please fill all the fields')
            }
        let addProductEndpoint = `https://letmegrab-backend.onrender.com/letmegrab/add_product`;
        try {
          const response = await axios.post(addProductEndpoint,{
            product_name: formData.productName,
            price: formData.price,
            sku: formData.sku,
            url: formData.url,
            category_name: formData.category,
            material: formData.material,
        });
        console.log(response);
        if (response.data.success) {
            setResponseMessage("Product added successfully!");
        } else {
            setResponseMessage(response.message || "Something went wrong.");
        }
        }
        catch (error) {
            setResponseMessage(error?.response?.data?.message || "Something went wrong.");
          console.log(error)
        }finally{
            setIsLoading(false);
          }
      }
    }
    return (
        <div>
            <h2 style={{marginBottom:'15px'}}>{type ? 'Edit' : 'Add'} Product</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Product Name:</label>
                    <input
                        type="text"
                        name="productName"
                        value={formData.productName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>SKU:</label>
                    <input
                        type="text"
                        name="sku"
                        value={formData.sku}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>URL:</label>
                    <input
                        type="text"
                        name="url"
                        value={formData.url}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Category:</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Material:</label>
                    <input
                        type="text"
                        name="material"
                        value={formData.material}
                        onChange={handleChange}
                    />
                </div>
                 {isLoading ?
                 <CircularProgress/>
                 :
                 <button style={{marginBottom:'10px'}} type="submit">Submit</button>
                 }   
            </form>

                <div >
                    <h3>{responseMessage}</h3>
                </div>
        </div>
    );
};

export default AddEditProduct;
