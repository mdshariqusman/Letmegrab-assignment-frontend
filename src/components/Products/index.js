'use client'
import React, { useEffect, useState } from "react";
import { Grid2, Box, Typography } from "@mui/material";
import styles from './style.module.css'
import Filter from "./filter";
import PaginationComp from "./pagination";
import Table from "./table";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';

const headingList = [
  { label: 'Product ID', key: 'product_id', span: 1 },
  { label: 'Product Name', key: 'product_name', span: 1 },
  { label: 'SKU', key: 'SKU', span: 1 },
  { label: 'Price', key: 'price', span: 1 },
  { label: 'Image', key: 'media_url', span: 1 },
  { label: 'Category', key: 'category', span: 1 },
  { label: 'Material', key: 'material', span: 1 },
]

export default function ChargeSessionHomePage() {
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagyData, setPagyData] = useState(null);
  const [filterData, setFilterData] = useState('');
  useEffect(() => {
    getProducts(page,filterData)
  }, [page,filterData])

  const getProducts = async (currentPage,filter) => {
    let allProductsEndpoint = `https://letmegrab-backend.onrender.com/letmegrab/all_products?page=${currentPage}`;
    if(filter) {
       allProductsEndpoint += filter;
    }
    try {
      const data = await axios.get(allProductsEndpoint);
      setTableData(data?.data?.data)
      setPagyData(data?.data?.page)
      setIsLoading(false)
    }
    catch (error) {
      console.log(error)
    }
  }
  const handlePageChange = (currentPage)=> {
    setPage(currentPage)
    setIsLoading(true);
  }
  const handleFilter = (data)=> {
    setFilterData(data)
    setIsLoading(true);
    setPage(1);
}
  return (<Grid2 container columnSpacing={1} className={styles.container}>
    <Box sx={{ width: "100%", mb: "30px" }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#164E63' }}
      >
        All Products
      </Typography>
    </Box>
    <Grid2 item size={12} sx={{ margin: "0px 0px" }}
    >
      <Filter onFilterChange={(data)=> handleFilter(data)}/>
    </Grid2>
    <Grid2 container item size={12} sx={{ margin: "30px 0px" }}
    >
      {isLoading ?
        <Box sx={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
          <CircularProgress sx={{ color: '#164E63' }} />
        </Box>
        :
        <Table
          headingList={headingList}
          tableData={tableData}
        />
      }
    </Grid2>
    {tableData && 
      <PaginationComp
      totalPages={pagyData?.totalPages}
      pageSize={10}
      onChange={(event, newPage) => handlePageChange(newPage)}
      page={page}
    />
    }
  </Grid2>)
}