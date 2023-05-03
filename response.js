// format response untuk semua

const response = (statusCode, data, message, res) => {
    res.send(statusCode, [
        {
            payload : data,
            message : message,
            metadata: {
                prev: "",
                next: "",
                current: "",
            }
        }
    ])
}

module.exports = response