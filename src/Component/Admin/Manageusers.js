import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Admintest.css';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import ChipDelete from '@mui/joy/ChipDelete';
import DeleteForever from '@mui/icons-material/DeleteForever';
const columns = [
  { id: 'name', label: 'Name', minWidth: 170, align: 'center'},
  { id: 'lastname', label: 'Lastname', minWidth: 100 ,align: 'center'},
  {
    id: 'email',
    label: 'Email',
    minWidth: 170,
    align: 'center',
    
  },
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 170,
    align: 'center',
  },
];

function deleteUser(id) {
  Swal.fire({
    title: 'Are you sure you want to delete this user?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      axios.delete(`http://127.0.0.1:5000/user/${id}`)
        .then(response => {
          console.log(response.data);
          if (response.status === 200) {
            Swal.fire({
              title: 'User deleted successfully',
              icon: 'success',
              showCancelButton: false
            });
            // to refresh page after deleting a user
            window.location.reload();
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  });
}

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/user/').then((response) => {
      setData(response.data);
    });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ bgcolor: '#222222' }}>
      <h1 sx={{ color: 'white !important', }}>List of users</h1>
      <TableContainer sx={{ maxHeight: 490, backgroundColor: '#222222',alignItems: 'center',
              width: "57.5vw",height:"100vh"}}>
        <Table stickyHeader aria-label="sticky table" sx={{ backgroundColor: '#222222',alignItems: 'center' }}>
          <TableHead sx={{ alignItems: 'center' }} >
            <TableRow  sx={{ alignItems: 'center' }}>
              {/* the row of titles */}
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, backgroundColor: '#222222', color: 'white',alignItems: 'center' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody  sx={{ alignItems: 'center' }}>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    // css={{
                    //   backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F5F5F5',
                    // }}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth, backgroundColor: '#222222', color: 'white',alignItems: 'center' }}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : column.id === 'actions' // add a delete button to the "Actions" column
                              ? <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Chip
                                variant="outlined"
                                color="danger"
                                onClick={() => deleteUser(row._id)}
                                sx={{ alignItems: 'center' }}
                                endDecorator={
                                  <ChipDelete
                                    color="danger"
                                    variant="plain"
                                    onClick={() => alert('You clicked the delete button!')}
                                  >
                                    <DeleteForever />
                                  </ChipDelete>
                                }
                              >
                                Delete User
                              </Chip>
                            </Box>
                              : value
                          }
                        </TableCell>

                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
      style={{  backgroundColor: '#222222', color: 'white' }}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Paper>
  );
}
