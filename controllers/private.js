const Estate = require('../models/estate');

exports.createEstate = (req, res, next) => {
    const estate = JSON.parse(req.body.estate);
    console.log(estate);
    res.end();
}

exports.modifyEstate = (req, res, next) => {
    res.send({type:"PUT"});
}

exports.deleteEstate = (req, res, next) => {
    res.send({type:"DELETE"});
}