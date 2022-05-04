exports.spendPoints = function (spendablePoints) {
    // Sort points by oldest timestamps first
    myPoints.sort(function (x, y) {
        return new Date(x.timestamp) - new Date(y.timestamp);
    });

    // Initialize spent points array for spending tracking
    let spentPoints = [];

    myPoints.forEach((el) => {
        if (spendablePoints > 0) {
            // Check if spending these points will make payer go negative
            let availablePoints =
                getPointsByPayer(el.payer) - el.points;
            if (availablePoints >= 0) {
                // Check if current point object more than enough to pay off spendablePoints
                if (el.points > spendablePoints) {
                    // Add point object to spentPoints array
                    spentPoints.push({
                        payer: el.payer,
                        points: spendablePoints,
                    });
                    // Subtract spendablePoints from current point object
                    el.points -= spendablePoints;
                    spendablePoints = 0;
                } else {
                    // Add point object to spentPoints array
                    spentPoints.push({
                        payer: el.payer,
                        points: el.points,
                    });
                    // Subtract from spendablePoints
                    spendablePoints -= el.points;
                    // Update point object after spending all points
                    el.points = 0;
                }
            }
        }
    });

    let result = {};
    spentPoints.forEach((el) => {
        if (!result[el.payer]) {
            // Initialize payer points
            result[el.payer] = 0;
        }
        // Subtract points from payer
        result[el.payer] -= el.points;
    });
    return result;
};

exports.getTotalPoints = function () {
    let result = 0;
    myPoints.forEach((el) => {
        result += el.points;
    });
    return result;
};

function getPointsByPayer(payer) {
    let result = 0;
    myPoints.forEach((el) => {
        if (el.payer == payer) {
            result += el.points;
        }
    });
    return result;
}
