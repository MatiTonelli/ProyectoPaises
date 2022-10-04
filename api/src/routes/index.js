const { Router } = require('express');
const { Country, Activity, Season } = require('../db')
const { getCountries } = require('../functions/apiFunctions.js')
const { Op } = require("sequelize");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get('/countries', async (req, res, next) => {
    try {
        const { name, activityId } = req.query
        let countries;
        if(activityId && name) {
            let capitalName = name[0].toUpperCase() + name.substr(1).toLowerCase()
            let activity = await Activity.findOne({ where: { id : activityId } })
            countries = await activity.getCountries({ where: {
                [Op.or]: [{
                    name: {
                        [Op.like]: '%' + name.toLowerCase() + '%'
                    }
                }, {
                    name: {
                        [Op.like]: '%' + capitalName + '%'
                    }
                }]
            }})
            if (countries) {
                res.status(200).send(countries)
            } else {
                res.send('countries not found')
            }
        } else if(name) {
            let capitalName = name[0].toUpperCase() + name.substr(1).toLowerCase()
            countries = await Country.findAll({
                where: {
                    [Op.or]: [{
                        name: {
                            [Op.like]: '%' + name.toLowerCase() + '%'
                        }
                    }, {
                        name: {
                            [Op.like]: '%' + capitalName + '%'
                        }
                    }]
                }
            })
            if (countries) {
                res.status(200).send(countries)
            } else {
                res.send('countries not found')
            }
        } else if(activityId){
            console.log('entre bien')
            let activity = await Activity.findOne({ where: { id : activityId } })
            console.log(activity)
            countries = await activity.getCountries()
            if (countries) {
                res.status(200).send(countries)
            } else {
                res.send('countries not found')
            }
        } else {
            countries = await Country.findAll()
            if (!countries.length) {
                countries = await getCountries();
                await Country.bulkCreate(countries);
                countries = await Country.findAll();
                Season.bulkCreate([{ name: "SUMMER" }, { name: "AUTUMN" }, { name: "WINTER" }, { name: "SPRING" }])
            }
            res.status(200).send(countries)
        }

    } catch (error) {
        res.json(error)
    }
});


router.get('/countries/:id', async (req, res, next) => {
    const { id } = req.params
    try {
        let countries = await Country.findOne({ where: { id: id.toUpperCase() }, include: { model: Activity, include: Season} })
        if (countries) {
            res.status(200).send(countries)
        } else {
            res.status(200).send('country not found')
        }
    } catch (error) {
        res.json(error)
    }
});



router.get('/activities', async(req, res, next) => { 
    try {
        let activities = await Activity.findAll()
        res.send(activities)
    } catch (error) {
        res.send(error)
    }
}) 


router.post('/activities', async (req, res, next) => {
    try {
        const { name, dificulty, duration, seasons, countries } = req.body;
        const newActivity = await Activity.create({ name, dificulty, duration })

        newActivity.addSeasons(seasons)
        newActivity.addCountries(countries)
        res.status(201).send('creado')
    } catch (error) {
        res.send(error)
    }
});


module.exports = router;
