const Member = require('../models/member.model.js');

exports.findAll = (req, res) => {

    Member.find(function(err, members){
        if(err) {
            res.status(500).send({message: "Error occured while retrieving members..."});
        } else {
            res.json(members);
        }
    });
};