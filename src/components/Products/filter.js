import React, { useEffect, useState } from 'react';
import styles from './style.module.css'
import { Box, Chip } from '@mui/material';
import SelectPicker from './selectpicker';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';

const Filter = ({ onFilterChange}) => {
     const [isLoading,setIsLoading] = useState(true);
     const [categoryData,setCategoryData] = useState(null)
     const [materialData,setMaterialData] = useState(null)
     const [skuData,setSkuData] = useState(null)
     const [nameData,setNameData] = useState(null)
     const [category,setCategory] = useState(null)
     const [material,setMaterial] = useState(null)
     const [sku,setSku] = useState(null)
     const [name,setName] = useState(null)
     useEffect(()=> {
     getFilters();
     },[])
    const getFilters = async (currentPage) => {
        let allFiltersEndpoint = `https://letmegrab-backend.onrender.com/letmegrab/all_filters`
        try {
          const data = await axios.get(allFiltersEndpoint);
           let namelist = data?.data?.data?.productNames?.map((item) => {
            return {
                value: item,
                label: item
            }
        })
        let skulist = data?.data?.data?.skus?.map((item) => {
            return {
                value: item,
                label: item
            }
        })
        let categorylist = data?.data?.data?.categories?.map((item) => {
            return {
                value: item,
                label: item
            }
        })
        let materiallist = data?.data?.data?.materials?.map((item) => {
            return {
                value: item,
                label: item
            }
        })
        setNameData(namelist);
        setSkuData(skulist);
        setCategoryData(categorylist);
        setMaterialData(materiallist);
        }
        catch (error) {
          console.log(error)
        }
        finally {
          setIsLoading(false)
        }
      }
     const handleApply = () => {
        let query = '';
        if (category) {
            query += `&category_name=${category.value}`
        }
        if (material) {
            query += `&material_name=${material.value}`   
        }
        if (sku) {
            query += `&sku=${sku.value}` 
        }
        if (name) {
            query += `&product_name=${name.value}`
        }
        onFilterChange(query)
     }
     const handleReset = () => {
        setName(null);
        setSku(null);
        setCategory(null);
        setMaterial(null);
        onFilterChange('')
     }
    return (
        <>
        {isLoading ?
         <Box sx={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
                  <CircularProgress sx={{ color: '#164E63' }} />
                </Box>
                :
                <Box sx={{width:'100%'}}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                </Box>
                <Box>
                        <div className={styles.filterWrapMain}>
                            <div className={styles.filterWrap} style={{ justifyContent: "space-between", }}>
                                <div style={{ width: "50%", maxWidth: "190px" }} >
                                <SelectPicker
                                        placeholder="Categories"
                                        options={categoryData}
                                         onChange={(data) => setCategory(data)}
                                         selectedOption={category}
                                    />
                                </div>
                                <div style={{ width: "50%", maxWidth: "190px" }} >
                                <SelectPicker
                                         placeholder="Material"
                                        options={materialData}
                                        onChange={(data) => setMaterial(data)}
                                        selectedOption={material}
                                    />
                                </div>
                                <div style={{ width: "50%", maxWidth: "190px" }} >
                                <SelectPicker
                                         placeholder="Product Name"
                                         options={nameData}
                                        onChange={(data) => setName(data)}
                                        selectedOption={name}
                                    />
                                </div>
                                <div style={{ width: "50%", maxWidth: "190px" }} >
                                <SelectPicker
                                         placeholder="SKU"
                                         options={skuData}
                                        onChange={(data) => setSku(data)}
                                        selectedOption={sku}
                                    />
                                </div>
                            </div>
                            <div className={styles.filterBtnWrap} style={{ marginRight: "4px" }} >
                            <button className={styles.resetBtn} onClick={handleReset}>Reset</button>
                            <button className={styles.filterBtn} onClick={handleApply}>Filter</button>
                        </div>
                        </div>
                </Box>

            </Box>
                }
        </>
    )
}

export default Filter
