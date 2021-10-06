'use strict';

const mongoose = require('mongoose');
const axios = require('axios');

// Database connection --------------------------------------------//
mongoose.connect(process.env.MONGO_SERVER);

// Schema --------------------------------------------//
const listSchema = new mongoose.Schema({
    name: String,
    category: String,
    email: String
});

// Model --------------------------------------------//
const listModel = mongoose.model('list', listSchema);

// localhost:3001/addlist
function addListHandler(req, res) {
    let { name, category, email } = req.body;
    console.log(name, category, email);

    listModel.create({
        name,
        category,
        email
    }).then(() => {
        listModel.find({ email }, (error, data) => {
            if (error) {
                console.log('error in getting data', error);
            } else {
                // console.log(data)
                res.send(data);
            }
        })
    })
}

// localhost:3001/getlists
function getListHandler(req, res) {
    let { email } = req.query;
    // console.log(email);

    listModel.find({ email }, (error, data) => {
        if (error) {
            console.log('error in getting data', error);
        } else {
            // console.log(data)
            res.send(data);
        }
    })
}

// localhost:3001/updatelist
function updateListHandler(req, res) {
    let { name, category, email, _id } = req.body;
    if (category === 'trash') {
        listModel.deleteOne({ _id }).then(() => {
            listModel.find({ email }, function (error, data) {
                if (error) {
                    console.log('error in getting data', error)
                } else {
                    // console.log(ownerData)
                    res.send(data)
                }
            })
        })
    } else {
        listModel.findByIdAndUpdate(_id, { name, category }, (error, updatedData) => {
            if (error) {
                console.log('error in updating')
            }
            else {
                listModel.find({ email }, function (error, data) {
                    if (error) {
                        console.log('error in getting data', error)
                    } else {
                        res.send(data)
                    }
                })
            }
        })
    }
}

module.exports = { addListHandler, updateListHandler, getListHandler };

// .then(() => {
//     bookModel.find({},(error,data) => {
//         if(error) {
//             console.log('error in getting data',error);
//         } else {
//             // console.log(data)
//             res.send(data);
//         }
//     })
// });