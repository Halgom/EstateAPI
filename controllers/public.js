// noinspection JSDeprecatedSymbols

const Estate = require("../models/estate");
const utils = require('../utils/utils');

exports.getEstates = (req, res, next) => {
    let queryParams = {};
    let query = {};
    console.log(req.query);

    // handling location query filter based on geolocation or city
    if (req.query.city) {
        queryParams['city'] = req.query.city;
        const regex = '^'+req.query.city+'$';
        query["adresse.nom_commune"] = { $regex: regex, $options: 'i' };
        if (req.query.street) {
            queryParams['street'] = req.query.street;
            const regex = req.query.street;
            query["adresse.nom_voie"] = { $regex: regex, $options: 'i' };
        }
    } else if (req.query.location) {
        let location = req.query.location.split(',');
        for (let i = 0; i < 2; i++) location[i] = parseFloat(location[i]);
        queryParams['location'] = location;
        let range = 500;
        if (req.query.range) range = parseInt(req.query.range);
        if (range < 10) range = 10;
        queryParams['range'] = range;
        query["adresse.location"] = { $nearSphere: { $geometry: { type : "Point", coordinates: [location[0], location[1]] }, $maxDistance: range } };
    } else {
        res.status(400).json({
            status: "400: Bad Request",
            error: "missing required query parameter",
            format: "city=value[&street=value] | location=lon,lat[&range=value]",
            help: "https://github.com/Halgom/estateAPI"
        });
        return;
    }

    // handling estate type query filter
    if (req.query.typeId) {
        if (req.query.typeId in ['1', '2', '3', '4', 'null']) {
            queryParams['code_type_local'] = req.query.typeId;
            queryParams['type_local'] = utils.typeId[req.query.typeId];
            query["code_type_local"] = req.query.typeId;
        }
    }

    if (req.query.mutCode) {
        if (req.query.mutCode in ['1', '2', '3', '4', '5', '6', 'null']) {
            queryParams['code_nature_mutation'] = req.query.mutCode;
            queryParams['nature_mutation'] = utils.mutCode[req.query.mutCode];
            query["code_nature_mutation"] = req.query.mutCode;
        }
    }

    if (req.query.nbRoomsMin || req.query.nbRoomsMax) {
        let roomQuery = {};
        if (req.query.nbRoomsMin) {
            roomQuery['$gte'] = req.query.nbRoomsMin;
        }
        if (req.query.nbRoomsMax) {
            roomQuery['$lte'] = req.query.nbRoomsMax;
        }
        query['nombre_pieces_principales'] = roomQuery;
    }

    if (req.query.priceMin || req.query.priceMax) {
        let priceQuery = {};
        if (req.query.priceMin) {
            priceQuery['$gte'] = req.query.priceMin;
        }
        if (req.query.priceMax) {
            priceQuery['$lte'] = req.query.priceMax;
        }
        query['valeur_fonciere'] = priceMax;
    }

    if (req.query.areaMin || req.query.areaMax) {
        let areaQuery = {};
        if (req.query.areaMin) {
            areaQuery['$gte'] = req.query.areaMin;
        }
        if (req.query.areaMax) {
            areaQuery['$lte'] = req.query.areaMax;
        }
        query['surface_reelle_bati'] = areaMax;
    }

    let limit = 1000;
    if (req.query.limit) {
        queryParams['limit'] = req.query.limit;
        limit = req.query.limit;
    }

    console.log(query);

    Estate.find(query).limit(limit).then(estates => {
        res.status(200).json({queryParams: queryParams, hits: estates.length, estates: estates});
    }).catch(error => {
        res.status(404).json(error);
    });
}
