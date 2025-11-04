const AsyncHandler = requestedfunction => async(req, res, next) => {
    try {
        return await requestedfunction(req, res, next);
    } catch (error) {
        console.log(error)
        return res.send(error)
    }
}

export default AsyncHandler