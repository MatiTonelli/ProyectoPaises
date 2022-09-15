const { Router } = require('express');
const { Country, Activity } = require('../db')
const { getCountries, getCountryByName, getCountryById } = require('../functions/apiFunctions.js')
const axios = require('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get('/countries', async (req, res, next) => {
    try {
        const { name } = req.query
        let countries = await Country.findAll()
        if (!countries.length) {
            countries = await getCountries();
            await Country.bulkCreate(countries);
            countries = await Country.findAll();
        }
        if (name) {
            let country = await Country.findOne({ where: { name: name } })
            if (country) {
                res.status(200).send(country)
            } else {
                res.send('country not found')
            }
        } else {
            res.status(200).send(countries)
        }
    } catch (error) {
        res.json(error)
    }
});

router.get('/countries/:id', async (req, res, next) => {
    const { id } = req.params
    try {
        let countries = await Country.findOne({ where: { id: id.toUpperCase() } })
        if (countries) {
            res.status(200).send(countries)
        } else {
            res.status(200).send('country not found')
        }
    } catch (error) {
        res.json(error)
    }
});

router.post('/activities', async (req, res, next) => {
    try {
        const { name, dificult, duracion, season } = req.body;
        console.log(req.body)
        await Activity.create({ name, dificult, duracion, season })
        res.status(201).send('creado')
    } catch (error) {
        res.send(error)
    }
});


module.exports = router;
