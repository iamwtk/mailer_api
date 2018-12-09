import http                     from 'http'
import app                      from './app'
import { server as constants }  from './config/constants'

http.createServer(app).listen(constants.PORT, (err) => {
    
    if (err) {
        console.error(err)
        return process.exit(1)
    }

    return console.log('Server is running on localhost:' + constants.PORT)
})