'use strict';

const mongoose = require('mongoose');
const axios = require('axios');

// Database connection --------------------------------------------//
mongoose.connect('mongodb://localhost:27017/testDB');

// Schema --------------------------------------------//
const noteSchema = new mongoose.Schema({
    name: String,
    category: String,
    email: String
});

// Model --------------------------------------------//
const noteModel = mongoose.model('note', noteSchema);

// localhost:3001/addnote
function addNoteHandler(req, res) {
    let { name, category, email } = req.body;
    console.log(name, category, email);

    noteModel.create({
        name,
        category,
        email
    }).then(() => {
        noteModel.find({ email }, (error, data) => {
            if (error) {
                console.log('error in getting data', error);
            } else {
                // console.log(data)
                res.send(data);
            }
        })
    })
}

// localhost:3001/getnote
function getNoteHandler(req, res) {
    let { email } = req.query;
    // console.log(email);

    noteModel.find({ email }, (error, data) => {
        if (error) {
            console.log('error in getting data', error);
        } else {
            // console.log(data)
            res.send(data);
        }
    })
}

// localhost:3001/updatenote
function updateNoteHandler(req, res) {
    let { name, category, email, _id } = req.body;
    if (category === 'trash') {
        noteModel.deleteOne({ _id }).then(() => {
            noteModel.find({ email }, function (error, data) {
                if (error) {
                    console.log('error in getting data', error)
                } else {
                    // console.log(ownerData)
                    res.send(data)
                }
            })
        })
    } else {
        noteModel.findByIdAndUpdate(_id, { name, category }, (error, updatedData) => {
            if (error) {
                console.log('error in updating')
            }
            else {
                noteModel.find({ email }, function (error, data) {
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

module.exports = { addNoteHandler, updateNoteHandler, getNoteHandler };

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