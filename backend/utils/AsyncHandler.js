const AsyncHandler = requestedfunction => async (req, res, next) => {
    try {
        return await requestedfunction(req, res, next);
    } catch (error) {
        // Log a concise error message to avoid flooding the console with stacks
        console.error(error && error.message ? error.message : error);
        const message = error && error.message ? error.message : "Internal Server Error";
        return res.status(500).json({ error: message });
    }
};

export default AsyncHandler;