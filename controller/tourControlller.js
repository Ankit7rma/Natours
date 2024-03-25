/* eslint-disable no-unused-vars */
/* eslint-disable prefer-object-spread */
const fs = require('fs');

const Tour = require('../models/tourModel');

// For testing we read file and executed on that hardcoded data
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
// );

// Middleware param to check the id
// exports.checkId = (req, res, next, val) => {
//   console.log(`Tour id is ${val}`);
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }
// };

// Middleware to check for name and price
// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Missing Name or Price',
//     });
//   }
//   next();
// };

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    // status: 'Success',
    // results: tours.length,
    // data: { tours },
  });
};

exports.getTour = (req, res) => {
  // console.log(req.params);
  // const id = req.params.id * 1;
  // const tour = tours.find((ele) => ele.id === id);
  // res.status(200).json({
  //   status: 'Success',
  //   data: {
  //     tour,
  //   },
  // });
};

exports.createTour = async (req, res) => {
  console.log(req.body);

  // How we save using making another document then saving that document
  // const newTour = new Tour();
  // newTour.save()
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }

  // How we saved our newtour in creating the existing hardcoded file data
  // const tourId = tours[tours.length - 1].id + 1;
  // const newTour = Object.assign({ id: tourId }, req.body);
  // tours.push(newTour);
  // fs.writeFile(
  //   `${__dirname}/dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   (err) => {
  // res.status(201).json({
  //   status: 'success',
  //   data: {
  //     tour: newTour,
  //   },
  // });
  //   },
  // );
  // res.send('Post request finished');
};
exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'Success',
    data: {
      tour: 'Updated tour here...',
    },
  });
};
exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'Success',
    data: null,
  });
};
