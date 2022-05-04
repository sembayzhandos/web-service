const { body, validationResult } = require("express-validator");
var pointService = require("./service");

exports.validate = (method) => {
    switch (method) {
        case "addPoints": {
            return [
                body("payer", "payer is required").exists(),
                body("payer", "payer must be a string").isString(),
                body("points", "points is required").exists(),
                body("points", "points must be an integer").isInt(),
                body("timestamp", "timestamp is required ").exists(),
                body("timestamp", "timestamp must be a date").isISO8601(),
            ];
        }
        case "spendPoints": {
            return [
                body("points", "points is required").exists(),
                body("points", "points must be an integer").isInt(),
            ];
        }
    }
};

exports.getPoints = function (request, response) {
    let result = {};
    myPoints.forEach((el) => {
        if (!result[el.payer]) {
            // Initialize payer points
            result[el.payer] = 0;
        }
        // Add points to payer
        result[el.payer] += el.points;
    });
    response.json(result);
};

exports.addPoints = function (request, response) {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        response.status(422).json({ errors: errors.array() });
        return;
    }

    // Convert request back to integer
    request.body.points = parseInt(request.body.points);
    myPoints.push(request.body);
    response.json(myPoints);
};

exports.spendPoints = function (request, response) {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        response.status(422).json({ errors: errors.array() });
        return;
    }

    // Convert request back to integer
    let spendablePoints = parseInt(request.body.points);

    // Check balance before spending
    if (pointService.getTotalPoints() < spendablePoints) {
        response.status(402).json({ message: "Not enough points" });
        return;
    }

    let result = pointService.spendPoints(spendablePoints);
    response.json(result);
};
