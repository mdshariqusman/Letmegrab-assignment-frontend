import React from 'react';
import { Pagination } from '@mui/material';
import { styled } from '@mui/system';
import { Box } from '@mui/material';

// Using styled module to customize the css of MUI pagination component
const StyledPagination = styled(Pagination)`
& .MuiPaginationItem-root.MuiPaginationItem-ellipsis {
    color: #007FAD;
    background-color:transparent;
    border:none;
    font-size:26px;
  }
& .MuiPaginationItem-root.MuiPaginationItem-ellipsis:hover {
    background-color: transparent;
  }
& .MuiPaginationItem-root.Mui-selected {
    background-color: #007FAD;
    color: white;
    border:none;
  }
& .MuiPaginationItem-root.Mui-selected:hover {
    background-color: #007FAD;
    color: white;
    border:none;
  }
& .MuiPaginationItem-root {
  background-color: white;
    color: #007FAD;
    border-radius: 2px;
    border: 1px solid #dee2e6;
    margin: 0px 4px;
  }
& .MuiPaginationItem-root:hover {
    background-color: #dee2e6;
    border:none;
    border-radius: 2px;
  }
`;

export default function PaginationComp({ page, onChange,totalPages }) {
    return <Box component='div' sx={{ width: '100%', display: "flex", justifyContent: 'end',mt:'20px' }} >
        <StyledPagination
            size='small'
            variant="outlined"
            shape="rounded"
            count={totalPages} //Total number of pages
            page={page}
            onChange={onChange}
        /></Box>
}