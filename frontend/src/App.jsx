import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [state, setState] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [error,setError] = useState(null);

  const [empId,setEmpId] = useState('');
  const [vehicleNo,setVehicleNo] =useState('');

  useEffect(()=>{
    axios.get(`http://localhost:8080/vehicle/all`)
      .then(res => {
        setVehicles(res.data);
      }
      ).catch(err => {
        setError('Failed to load');
      });
  },[vehicles]);

  const handleSubmit = (e) => {
      e.preventDefault();

      const data ={
        empId,
        vehicleNo,
      };

      axios.post('http://localhost:8080/vehicle/enter',data)
      .then((res) => {
        console.log('Vehicle entered successfully');
        setState(false);
        setEmpId('');
        setVehicleNo('');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleExit = (id) =>{
      axios.patch(`http://localhost:8080/vehicle/exit/${id}`)
      .then((res) => console.log('Vehicle exited successfully'))
      .catch(error => console.log(error));
  };

  const handleDelete = (id) =>{
    axios.delete(`http://localhost:8080/vehicle/remove/${id}`)
    .then((res)=> console.log('vehicle deleted successfully'))
    .catch(error => console.log(error));
  }

  if(error){
    return <p>{error}</p>;
  }

  return (
    <>
      <h1>Welcome to UST Parking</h1>
      <button onClick={() => setState(true)}>New Vehicle Entry</button>
      {
        state && (
          <form onSubmit={handleSubmit}>
            <div><input type='text' value={vehicleNo} onChange={(e)=> setVehicleNo(e.target.value)} placeholder='Enter Vehicle Number'/></div>
            <div><input type='text' value={empId} onChange={(e)=> setEmpId(e.target.value)} placeholder='Enter Employee Id'/></div>
            <button type='submit'>Submit</button>
          </form>
        )
      }
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Employee Id</th>
              <th>Vehicle Number</th>
              <th>Time In</th>
              <th>Time Out</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              vehicles.map(vehicle => {
                return (
                  <tr key={vehicle.id}>
                    <td>{vehicle.empId}</td>
                    <td>{vehicle.vehicleNo}</td>
                    <td>{vehicle.TimeIn}</td>
                    <td>{vehicle.TimeOut || "Not yet out"}</td>
                    <td><button onClick={() => handleExit(vehicle.id)}
                      disabled={vehicle.TimeOut != null}>Exit</button></td>
                    <td><button onClick={()=> handleDelete(vehicle.id)}>Delete</button></td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
      <p className="read-the-docs">
        Ensure Safe Parking :)
      </p>
    </>
  )
}

export default App;
