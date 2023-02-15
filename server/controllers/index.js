const { verifyHash, generateToken } = require('../helpers')
const axios = require('axios')
const { User } = require('../models')

class Controller {
    static async login(req, res, next) {
        try {
            const { username, password } = req.body
            const user = await User.findOne({ where: { username } })
            console.log('user>>', username);
            if (!user) throw { name: 'data not found', message: 'error invalid username or password' }
            const validPassword = verifyHash(password, user.password)
            if (!validPassword) throw { name: 'data not found', message: 'error invalid username or password' }

            const payload = {
                id: user.id
            }

            const access_token = generateToken(payload)

            res.status(200).json({
                access_token
            })
        } catch (error) {
            next(error)
        }
    }

    static async showJobList(req, res, next) {
        try {
            let { page, description, location, full_time } = req.query


            //amount of data shown in each page
            const dataAmount = 7

            //making case-insensitive seafrch
            description = (description || "").toLocaleLowerCase()
            location = (location || "").toLocaleLowerCase()


            let { data } = await axios({
                method: 'get',
                url: `http://dev3.dansmultipro.co.id/api/recruitment/positions.json`
            })


            data = data.filter(el => {
                let { title, company, how_to_apply, type } = el

                //making case-insensitive description
                const combined = `${title} ${company} ${el.description} ${how_to_apply}`.toLocaleLowerCase()
                let loc = el.location.toLowerCase()

                if (full_time == 'true') {
                    if (full_time == 'true') {
                        return combined.includes(description) && loc.includes(location) && type == 'Full Time'
                    }
                }
                return combined.includes(description) && loc.includes(location)
            })

            function timeAgo(date) {
                const seconds = Math.floor((new Date() - new Date(date)) / 1000);
                const intervals = {
                    year: 31536000,
                    month: 2592000,
                    week: 604800,
                    day: 86400,
                    hour: 3600,
                    minute: 60,
                    second: 1
                };

                for (const interval in intervals) {
                    const count = Math.floor(seconds / intervals[interval]);
                    if (count > 0) {
                        if (count === 1) {
                            return `${count} ${interval} ago`;
                        } else {
                            return `${count} ${interval}s ago`;
                        }
                    }
                }
                return "just now";
            }

            data = data.map(el => {
                const { title, company, type, location, created_at,id } = el
                const dateRange = timeAgo(created_at)
                return {id, title, company, type, location, dateRange }
            }
            )


            if (page) {
                 data = data.slice((page - 1) * dataAmount, (page) * dataAmount)
            }
            
            console.log(data, '<<<CHECK');


            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async showJob(req, res, next) {
        try {
            const { id } = req.params

            let { data } = await axios({
                method: 'get',
                url: `http://dev3.dansmultipro.co.id/api/recruitment/positions/${id}`
            })


            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller