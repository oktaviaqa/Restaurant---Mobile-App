async function Error(err, req, res, next) {
    let status = 500
    let message = 'Internal server error'

    if (err.name === 'not found') {
        status = 404
        message = 'Not found'
    }

    console.log(err);
    res.status(status).json({message})
}

module.exports = Error