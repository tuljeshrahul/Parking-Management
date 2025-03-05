const express = require('express');
const app = express();
const route = express.Router();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

var vehicles=[];
var vehicleIncrement = 1;

route.post('/enter',(req,res)=>{
    const {vehicleNo,empId} = req.body;
    const time = new Date();
    const newVehicle = {
        id: vehicleIncrement++,
        vehicleNo,
        empId,
        TimeIn : time.toLocaleTimeString(),
        TimeOut :null
    }
    vehicles.push(newVehicle);
    
    return res.status(201).json(newVehicle);
})

route.get('/all',(req,res)=>{
    console.log("chetan");
    return res.json(vehicles);
})

route.patch('/exit/:id',(req,res) => {
    const id = parseInt(req.params.id);
    console.log(id);
    const vehicle = vehicles.find(val => val.id === id);

    if(!vehicle) return res.status(404).json({"message":"Vehicle not there"});

    const time = new Date();

    vehicle.TimeOut = time.toLocaleTimeString();

    return res.status(200).json({message:"Vehicle gone out"});
})

route.delete('/remove/:id',(req,res) => {
    const id = parseInt(req.params.id);

    const vehicle = vehicles.find(val => val.id === id);

    if(!vehicle) return res.status(404).json({message:"Vehicle not found"});

    vehicles = vehicles.filter(val => val!=vehicle);

    return res.status(200).json({message:"Vehicle removed successfully"});
})

module.exports = route