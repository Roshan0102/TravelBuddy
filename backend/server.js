const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');


const app = express();
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect('mongodb+srv://roshanjustinjr2002:Roshan2012@cluster0.fvgsh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Database connection failed:', err));

// User schema

const signupSchema = new mongoose.Schema({
    usernameOrEmail: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const modelsignup = mongoose.model('signup', signupSchema);

app.post('/signuptb', async (req, res) => {
    const { usernameOrEmail, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser  = await modelsignup.findOne({ usernameOrEmail });
        if (existingUser ) {
            return res.status(400).send({ message: 'User  already exists. Try logging in.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser  = new modelsignup({ usernameOrEmail, password: hashedPassword });
        await newUser.save();
        res.status(201).send({ message: 'Signup successful' });
    } catch (error) {
        res.status(400).send({ message: 'Signup failed', error: error.message });
    }
});

app.post('/logintb', async (req, res) => {
    const { usernameOrEmail, password } = req.body;

    try {
        const user = await modelsignup.findOne({ usernameOrEmail });
        if (!user) return res.status(404).send({ message: 'User not found' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).send({ message: 'Invalid password' });

        res.status(200).send({ message: 'Login successful', userId: user._id });
    } catch (error) {
        res.status(500).send({ message: 'Login failed', error: error.message });
    }
});


const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    leaving: { type: String, required: true },
    going: { type: String, required: true },
    date: { type: String, required: true },
    time: {type: String, required: true },
    amount: { type: Number, required: true },
    passengers:{ type: Number, required: true }
});

const model = mongoose.model('ride', userSchema);
let todos = [];

app.post('/ride', async(req,res) =>{
    const{username,leaving, going,date,time,passengers,amount} = req.body;
    const formattedDate = new Date(date).toISOString().slice(0, 10);
    try{
        const newTodo = new model({username,leaving, going, date: formattedDate,time,passengers,amount});
        const todos = await newTodo.save();
        res.send(todos)
    }catch(error){
        res.status(400).send({message:"Invalid request"})
        console.log(error)
    }
})


app.get('/searchride', async (req, res) => {
    const { leaving, going, date } = req.query; // Extract query parameters

    try {
        // Build the query filter dynamically
        const filter = {};

        if (leaving) {
        filter.leaving = new RegExp(`^${leaving}$`, 'i'); // Add condition for 'leaving' if provided
        }

        if (going) {
        filter.going = new RegExp(`^${going}$`, 'i'); // Add condition for 'going' if provided
        }

        if (date) {
        filter.date = date; // Convert date string to Date object
        }

        // Fetch rides matching the conditions and return all fields
        console.log('Filter:', filter);
        const rides = await model.find(filter)
        console.log('Rides:', rides);

        // If no rides match the filter, return a message
        if (rides.length === 0) {
        return res.status(404).json({ message: 'No rides found for the given criteria' });
        }

        res.status(200).json(rides); // Return the matching rides
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error fetching rides' });
    }
    });

    app.get('/viewrides', async (req, res) => {
        const { username } = req.query; // Extract query parameters
    
        try {
            // Build the query filter dynamically
            const filter = {};
    
            if (username) {
            filter.username = new RegExp(`^${username}$`, 'i');; // Add condition for 'leaving' if provided
            }
    
            // Fetch rides matching the conditions and return all fields
            console.log('Filter:', filter);
            const vrides = await model.find(filter)
            // console.log('Rides:', rides);
    
            // If no rides match the filter, return a message
            if (vrides.length === 0) {
            return res.status(404).json({ message: 'No rides found for the given criteria' });
            }
    
            res.status(200).json(vrides); // Return the matching rides
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error fetching rides' });
        }
        });

app.delete('/deleteride/:id', async(req,res)=>{
    try{ 
        const id = req.params.id;
        console.log('Deleting ride with id:', id);
        const result = await model.findByIdAndDelete(id);
        if (!result) {
        return res.status(404).send({ message: "Ride not found" });
        }
        res.status(204).end();
        }
    catch(error){
        console.log(error);
        res.status(500).send({message: "Error deleting ride"});
    }
    })
      






const requestSchema = new mongoose.Schema({
    username: {type: String, required: true},
    leaving: { type: String, required: true },
    going: { type: String, required: true },
    date: { type: String, required: true },
    time: {type: String, required: true },
    amount: { type: Number, required: true },
    passengers:{ type: Number, required: true },
    requeststatus:{type: String, required: true},
    requestname:{type: String, required: true}
});


const requestModel = mongoose.model('request', requestSchema);
let requesttodos = [];
// Handle Send Request
app.post('/sendrequest', async (req, res) => {
  const {username,leaving,going,date,time,passengers,amount,requeststatus,requestname} = req.body;

  try {
    if (
        !username ||
        !leaving ||
        !going ||
        !date ||
        !time ||
        !passengers ||
        !amount ||
        !requeststatus ||
        !requestname
      ) {
        return res.status(400).send({ message: 'All fields are required' });
      }
    const newRequest = new requestModel({username,leaving,going,date,time,passengers,amount,requeststatus,requestname});
    const savedRequest = await newRequest.save();
    res.status(201).send(savedRequest);
  } catch (error) {
    console.error('Error while saving the request:', error);
    res.status(500).send({ message: 'Server error while processing request' });
  }
});


app.get('/requestreturn', async (req, res) => {
    const { id } = req.query; // Extract the ride ID from the query parameters
    try {
        if (!id) {
            return res.status(400).send({ message: 'Ride ID is required' });
        }
        // const objectId = new mongoose.Types.ObjectId(id);
        // Fetch the request by ride ID
        const request = await requestModel.findOne({ _id: id });
        if (!request) {
            return res.status(404).send({ message: 'Request not found' });
        }
        res.status(200).send(request); // Return the request details including status
    } catch (error) {
        console.error('Error fetching request:', error);
        res.status(500).send({ message: 'Error fetching request' });
    }
});

app.get('/searchrequeststatus', async (req, res) => {
    const { username,leaving, going, date,time,amount,passengers, requestname } = req.query;
     // Extract query parameters
     console.log(req.query.username)

    try {
        // Build the query filter dynamically
        const filter = {};

        if (username) {
            filter.username = new RegExp(`^${username}$`, 'i'); // Add condition for 'leaving' if provided
        }

        if (leaving) {
        filter.leaving = new RegExp(`^${leaving}$`, 'i'); // Add condition for 'leaving' if provided
        }

        if (going) {
        filter.going = new RegExp(`^${going}$`, 'i'); // Add condition for 'going' if provided
        }

        if (date) {
        filter.date = date; // Convert date string to Date object
        }

        if (time) {
            filter.time = new RegExp(`^${time}$`, 'i'); // Add condition for 'leaving' if provided
        }

        if (amount) {
            filter.amount = parseFloat(amount); // Add condition for 'leaving' if provided
        }

        if (passengers) {
            filter.passengers = parseInt(passengers, 10); // Add condition for 'leaving' if provided
        }

        if (requestname) {
            filter.requestname = new RegExp(`^${requestname}$`, 'i'); // Add condition for 'leaving' if provided
        }

        // Fetch rides matching the conditions and return all fields
        console.log('Filter:', filter);
        const requeststatusreturn = await requestModel.find(filter)
        console.log('requeststatusreturn:', requeststatusreturn);

        // If no rides match the filter, return a message
        // if (requeststatusreturn.length === 0) {
        // return res.status(404).json({ message: 'No request status found' });
        // }

        res.status(200).json(requeststatusreturn); // Return the matching rides
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error fetching request status' });
    }
    });

    app.get('/requestrides', async (req, res) => {
        const { username } = req.query; // Extract query parameters
    
        try {
            // Build the query filter dynamically
            const filter = {};
    
            if (username) {
            filter.username = new RegExp(`^${username}$`, 'i');; // Add condition for 'leaving' if provided
            }
    
            // Fetch rides matching the conditions and return all fields
            console.log('Filter:', filter);
            const rrides = await requestModel.find(filter)
            // console.log('Rides:', rides);
    
            // If no rides match the filter, return a message
            if (rrides.length === 0) {
            return res.status(404).json({ message: 'No rides found for the given criteria' });
            }
    
            res.status(200).json(rrides); // Return the matching rides
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error fetching rides' });
        }
        });

        app.put('/acceptride/:id', async (req, res) => {
            try {
              const { requeststatus } = req.body; // Ensure this matches frontend
              const id = req.params.id;
          
              console.log('Accepting ride with id:', id);
              console.log('Request status:', requeststatus);
          
              const result = await requestModel.findByIdAndUpdate(
                id,
                { requeststatus }, // Ensure this matches your DB schema
                { new: true }
              );
          
              if (!result) {
                return res.status(404).json({ message: "Id not found" });
              }
          
              res.status(200).json(result);
            } catch (error) {
              console.error(error);
              res.status(500).json({ message: "Error accepting ride" });
            }
          });
          

const port = 5000;                                                                                                                                                                                                              

app.listen(port, ()=>{
    console.log("Server Connected to the port" + port)
})