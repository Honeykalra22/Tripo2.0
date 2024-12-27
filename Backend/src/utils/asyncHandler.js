const asyncHandler = (response) => {
    return (req, res, next) =>
        Promise.resolve(response(req, res, next))
            .catch((err) => next(err))
}
export { asyncHandler }