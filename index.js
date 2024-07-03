const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

let courses = [
  { id: 1, name: "Java" },
  { id: 2, name: "JavaScript" },
  { id: 3, name: "Python" }
];

let batches = [
  { id: 1, name: "Advanced DSA", instructor: "Kshtiz Mishra" },
  { id: 2, name: "Intermediate DSA", instructor: "Dhruv Pasricha" },
  { id: 3, name: "Basic", instructor: "Akanksha Gaur" }
];

// Logger middleware function
function logger(req, res, next) {
  const method = req.method;
  const ip = req.ip;
  const hostname = req.hostname;
  const date = new Date().toISOString();

  console.log(`Method: ${method}, IP: ${ip}, Hostname: ${hostname}, Date: ${date}`);
  
  next();
}

// Use the logger middleware for all routes
app.use(logger);

app.get('/courses', (req, res) => {
  res.json(courses);
});

app.get('/batches', (req, res) => {
  res.json(batches);
});

app.post('/courses', (req, res) => {
  const newCourse = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(newCourse);
  res.status(201).json(newCourse);
});

app.put('/courses/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const newName = req.body.name;
  const course = courses.find(c => c.id === id);
  if (course) {
    course.name = newName;
    res.status(200).json({ message: `Course with ID ${id} updated successfully` });
  } else {
    res.status(404).json({ message: `Course with ID ${id} not found` });
  }
});

app.delete('/courses/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const courseIndex = courses.findIndex(c => c.id === id);
  if (courseIndex !== -1) {
    courses.splice(courseIndex, 1);
    res.status(200).json({ message: `Course with ID ${id} deleted successfully` });
  } else {
    res.status(404).json({ message: `Course with ID ${id} not found` });
  }
});

app.listen(3008, () => {
  console.log("Server started on port 3008");
});
