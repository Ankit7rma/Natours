const express = require('express');
const fs = require('fs');
const app = express();

// MiddleWare
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getTour = (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1;
  const tour = tours.find((ele) => ele.id === id);
  //   if (id > tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'Success',
    data: {
      tour,
    },
  });
};

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'Success',
    results: tours.length,
    data: { tours },
  });
};
const createTour = (req, res) => {
  //   console.log(req.body);
  const tourId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: tourId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );

  //   res.send('Post request finished');
};
const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'Success',
    data: {
      tour: 'Updated tour here...',
    },
  });
};
const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(204).json({
    status: 'Success',
    data: null,
  });
};

app.get('/api/v1/tours', getAllTours);
app.get('/api/v1/tours/:id', getTour);
app.post('/api/v1/tours', createTour);
app.patch('/api/v1/tours/:id', updateTour);
app.delete('/api/v1/tours/:id', deleteTour);

const port = 3000;
app.listen(3000, () => console.log(`Hello from server ${port}`));
