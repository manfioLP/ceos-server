'use strict'

const connectToDatabase = require('../../db');
const { Patient }= require('../../models');

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Patient.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), { new: true })
        .then(patient => callback(null, {
          statusCode: 200,
          body: JSON.stringify(patient)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the patient.'
        }));
    });
};
