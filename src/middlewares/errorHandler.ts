import { Error } from "../types";

const errorHandler: Error = (err, _req, res, _next) => {
    console.error(err);
    res.status(500).send(err.message);
};

export default errorHandler