import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import ChipDelete from '@mui/joy/ChipDelete';
import DeleteForever from '@mui/icons-material/DeleteForever';
import { bgcolor } from '@mui/system';
import Swal from 'sweetalert2';
// function deleteUser(id) {
//   // Swal.fire({
//   //   title: "User deleted successfully",
//   //   icon: "success",
//   //   showCancelButton: false
//   // });
//     axios.delete(`http://127.0.0.1:5000/user/${id}`)
//       .then(response => {
//         // Update UI to reflect deleted user
//         console.log(response.data);
//          if (response.status === 200)
//           Swal.fire({
//              title: "User deleted successfully",
//              icon: "success",
//              showCancelButton: false
//            });
//         //to refresh page after deleting a user
//         window.location.reload();
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }
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

function Allusers() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/user/')
      .then(response => setData(response.data));
  }, []);
  return (
    <div >
      {data.map(item => (
        <div key={item._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'black'  }}>
        <h3>{item.name}   {item.lastname}</h3>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Chip
            variant="outlined"
            color="danger"
            onClick={() => deleteUser(item._id)}
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
      </div>
      ))}
    </div>
  );
}
export default Allusers;