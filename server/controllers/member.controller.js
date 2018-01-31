const Member = require('../../models/member.model.js');

const updateMemberInfo = (member, req) => {
    member.name.first = req.body.firstName;
    member.name.last = req.body.lastName;
    member.name.korean = req.body.nameKorean;

    member.birthday = req.body.birthday;
    member.address.street = req.body.address.street;
    member.address.city = req.body.address.city;
    member.address.zipCode = req.body.address.zipCode;

    member.occupation = req.body.occupation;
    member.organization = req.body.organization;
    member.phone = req.body.phone;
    member.email = req.body.email;
    member.shirtSize = req.body.shirtSize;
    member.isBaptized = req.body.isBaptized;
    member.isInfantBaptized = req.body.isInfantBaptized;

    return member;
}

exports.findAll = (req, res) => {
    Member.find(function(err, members){
        if(err) {
            res.status(500).send({ message: "Error occured while retrieving members..." });
        } else {
            res.json(members);
        }
    });
};

exports.member_create = (req, res) => {
    let member = new Member();
    member = updateMemberInfo(member, req);
    member.save((err) => {
        if (err) {
            res.send(err);
        }
    });
    res.json({ status: 200, entity: member, message: 'a new member has been created!' });
}

exports.member_find = (req, res) => {
    Member.findById(req.params.member_id, (err, member) => {
        if (err) {
            res.send(err);
        }
        res.json({ status: 200, entity: member, message: 'member information fetched!' });
    });
}

exports.member_update = (req, res) => {
    Member.findById(req.params.member_id, (err, member) => {
        if (err) {
            res.send(err);
        }
        member = updateMemberInfo(member, req);
        member.save((err) => {
            if (err) {
                res.json({ status: 503, message: err });
            }
        });
        res.json({ status: 200, entity: member, message: 'member has been updated!' });
    });
}

exports.member_delete = (req, res) => {
    Member.remove({
        _id: req.params.member_id
    }, (err, member) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Member successfully deleted' });
    });
}
