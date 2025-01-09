"use client"
import React, { useState, useEffect } from "react";
import { Grid2, TableBody, Box } from "@mui/material";
import { TableContainer, Table, TableCell, TableHead, TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';
import {Button} from "@mui/material";
import axios from "axios";

export default function CustomTable({ headingList, tableData,setDeletionMessage }) {
   const handleDelete = async (id) => {
    let deleteProductsEndpoint = `https://letmegrab-backend.onrender.com/letmegrab/delete/${id}`;
    try {
      const data = await axios.delete(deleteProductsEndpoint);
      setDeletionMessage(`Product with id: ${id} deleted successfully`);
    }
    catch (error) {
      console.log(error)
    }
  }
    return (<Grid2 item size={12}>
        <Paper elevation={2} md={12} sx={{ borderRadius: '10px', overflow: 'hidden' }}>
            <TableContainer component={'paper'} >
                <Table>
                    <TableHead>
                        <TableRow>
                            {headingList.map((item) => {
                                return (
                                    <TableCell sx={{ backgroundColor: "#B5D3E0" }}>
                                        {item.label}
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData?.map((item) => {
                            return <TableRow>
                                <TableCell>
                                    {item?.product_id}
                                </TableCell>
                                <TableCell >
                                    {item?.product_name}
                                </TableCell>
                                <TableCell >
                                    {item?.SKU}
                                </TableCell>
                                <TableCell >
                                    {item?.price}
                                </TableCell>
                                <TableCell >
                                    <img src={item?.media_url} alt="Product Image"/>
                                    {item?.media_url}
                                </TableCell>
                                <TableCell >
                                    {item?.category}
                                </TableCell>
                                <TableCell >
                                    {item?.material}
                                </TableCell>
                                <TableCell >
                                   <Button href={`/edit?id=${item?.product_id}&sku=${item?.SKU}`}>Edit</Button>
                                   <Button onClick={()=> handleDelete(item?.product_id)}>Delete Product</Button>
                                </TableCell>
                            </TableRow>
                        })}
                        {tableData.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={12} sx={{textAlign:'center'}}>
                                        No records found
                                    </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    </Grid2>

    )
}