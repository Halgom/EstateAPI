// noinspection JSDeprecatedSymbols

const Estate = require("../models/estate");

exports.testWorking = (req, res, next) => {
    res.status(200).json({message: "ok"});
}

exports.getEstates = (req, res, next) => {
    let query = {};

    if (req.query.location) {
        req.query.location.replace("%2C", ","); // reformat url encoding for ','
        let location = req.query.location.split(',');
        for (let i = 0; i < 2; i++) location[i] = parseFloat(location[i]);
        let range = 500;
        if (req.query.range) range = parseInt(req.query.range);
        if (range < 10) range = 10;
        query["adresse.location"] = { $nearSphere: { $geometry: { type : "Point", coordinates: [location[0], location[1]] }, $maxDistance: range } };
    } else {
        res.status(400).json({
            status: "400: Bad Request",
            error: "missing required query parameter",
            format: "location=lat,lng[&range=value]",
            help: "https://github.com/Halgom/estateAPI"
        });
        return;
    }

    if (req.query.type_bien) {
        console.log(req.query.type_bien);
        let type_bien = req.query.type_bien.split(',');
        console.log(type_bien);
        typeBienQuery = [];
        if (type_bien[0] === '1') typeBienQuery.push({code_type_local: '1'});
        if (type_bien[1] === '1') typeBienQuery.push({code_type_local: '2'});
        if (type_bien[2] === '1') typeBienQuery.push({code_type_local: '4'});
        if (type_bien[3] === '1') typeBienQuery.push({code_nature_mutation: '6'});
        query['$or'] = typeBienQuery;
    }

    if (req.query.nombre_pieces_principales_min || req.query.nombre_pieces_principales_max) {
        let nombre_pieces_principales = {};
        if (req.query.nombre_pieces_principales_min) {
            nombre_pieces_principales['$gte'] = req.query.nombre_pieces_principales_min;
        }
        if (req.query.nombre_pieces_principales_max) {
            nombre_pieces_principales['$lte'] = req.query.nombre_pieces_principales_max;
        }
        query['nombre_pieces_principales'] = nombre_pieces_principales;
    }

    if (req.query.valeur_fonciere_min || req.query.valeur_fonciere_max) {
        let valeur_fonciere = {};
        if (req.query.valeur_fonciere_min) {
            valeur_fonciere['$gte'] = req.query.valeur_fonciere_min;
        }
        if (req.query.valeur_fonciere_max) {
            valeur_fonciere['$lte'] = req.query.valeur_fonciere_max;
        }
        query['valeur_fonciere'] = valeur_fonciere;
    }

    if (req.query.surface_reelle_bati_min || req.query.surface_reelle_bati_max) {
        let surface_reelle_bati = {};
        if (req.query.surface_reelle_bati_min) {
            surface_reelle_bati['$gte'] = req.query.surface_reelle_bati_min;
        }
        if (req.query.surface_reelle_bati_max) {
            surface_reelle_bati['$lte'] = req.query.surface_reelle_bati_max;
        }
        query['surface_reelle_bati'] = surface_reelle_bati;
    }

    if (req.query.surface_terrain_min || req.query.surface_terrain_max) {
        let surface_terrain = {};
        if (req.query.surface_terrain_min) {
            surface_terrain['$gte'] = req.query.surface_terrain_min;
        }
        if (req.query.surface_terrain_max) {
            surface_terrain['$lte'] = req.query.surface_terrain_max;
        }
        query['surface_terrain'] = surface_terrain;
    }

    let limit = 1000;
    if (req.query.limit) {
        limit = req.query.limit;
    }

    console.log(query);

    Estate.find(query).limit(limit).then(estates => {
        res.status(200).json({hits: estates.length, estates: estates});
    }).catch(error => {
        res.status(404).json(error);
    });
}
