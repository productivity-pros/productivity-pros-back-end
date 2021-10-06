'use strict';

const mongoose = require('mongoose');
const axios = require('axios');

// Database connection --------------------------------------------//
mongoose.connect(process.env.MONGO_SERVER);

// Schema --------------------------------------------//
const noteSchema = new mongoose.Schema({
    text: String,
    email: String,
    date: String
});

// Model --------------------------------------------//
const noteModel = mongoose.model('note', noteSchema);

// localhost:3001/addnote
function addNoteHandler(req, res) {
    let { text, email, date } = req.body;
    console.log(text, email, date);

    noteModel.create({
        text,
        email,
        date
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

// localhost:3001/getnotes
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
    let { text, email, _id, date } = req.body;
    console.log(text, email, _id, date);
    noteModel.findByIdAndUpdate(_id, { text, date }, (error, updatedData) => {
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

function deleteNoteHandler(req, res) {
    let { noteID, email } = req.query;

    noteModel.deleteOne({ _id: noteID }).then(() => {
        noteModel.find({ email }, function (error, data) {
            if (error) {
                console.log('error in getting data', error)
            } else {
                // console.log(ownerData)
                res.send(data)
            }
        })
    })

}

module.exports = { addNoteHandler, updateNoteHandler, getNoteHandler, deleteNoteHandler };

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