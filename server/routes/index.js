const Controller = require('../controllers')

const router = require('express').Router()
const authentication = require('../middlewares/authentication')

router.post("/login", Controller.login)
router.use(authentication)
router.get("/jobs", Controller.showJobList)
router.get("/jobs/:id", Controller.showJob)


module.exports = router