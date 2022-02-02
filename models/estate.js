const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create estate schema and model
const locationSchema = new Schema({
    type: {type: String, required: true},
    coordinates: {type: [Number], required: true}
});

const addressSchema = new Schema({
    numero: Number,
    suffixe: String,
    nom_voie: String,
    code_voie: String,
    code_postal: String,
    code_commune: String,
    nom_commune: String,
    code_departement: String,
    ancien_code_commune: String,
    ancien_nom_commune: String,
    location: {type: locationSchema, index: '2dsphere'}
});

const EstateSchema = new Schema({
    id_mutation: {type: String, required: true},
    date_mutation: {type: String, required: true},
    numero_disposition: String,
    nature_mutation: String,
    valeur_fonciere: Number,
    adresse: addressSchema,
    id_parcelle: String,
    ancien_id_parcelle: String,
    numero_volume: String,
    lot1_numero: String,
    lot1_surface_carrez: Number,
    lot2_numero: String,
    lot2_surface_carrez: Number,
    lot3_numero: String,
    lot3_surface_carrez: Number,
    lot4_numero: String,
    lot4_surface_carrez: Number,
    lot5_numero: String,
    lot5_surface_carrez: Number,
    nombre_lots: Number,
    code_type_local: String,
    type_local: String,
    surface_reelle_bati: Number,
    nombre_pieces_principales: Number,
    code_nature_culture: String,
    nature_culture: String,
    code_nature_culture_speciale: String,
    nature_culture_speciale: String,
    surface_terrain: Number
});

const Estate = mongoose.model('estate', EstateSchema);

module.exports = Estate;
