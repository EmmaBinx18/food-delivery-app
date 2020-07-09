const geolib = require('geolib');

const db = require('../../database/db');
const sp = require('../../database/stored-procedures');

const ordersHelper = {
    getClosesDriver(addressId, orderId, res) {
        let coordinates;
        let drivers;

        db.executeStoredProcedure(sp.address.GET_ADDRESS, { addressId: addressId }, async (data) => {
            coordinates = data[0].coordinates;
        });

        return db.executeStoredProcedure(sp.delivery.GET_DRIVER, { userId: null }, async (data) => {
            drivers = data;
            const driverId = this.getClosestDriver(drivers, coordinates);
            return db.executeStoredProcedure(sp.orders.ASSIGN_ORDER_DRIVER, { orderId: orderId, driverId: driverId }, (response) => {
                return res.status(200).send(response);
            });
        });
    },
    getClosestDriver(drivers, coordinates) {
        const distances = [];
        drivers.forEach(driver => {
            distances.push(
                {
                    distance: geolib.getDistance(
                        { latitude: coordinates[0], longitude: coordinates[1] },
                        { latitude: driver.coordinates[0], longitude: driver.coordinates[1] }
                    ),
                    driverId: driver.userId
                }
            );
        });

        let arr = [];
        distances.forEach(obj => {
            arr.push(obj.distance);
        });
        const distance = Math.min(...arr);

        let id;
        distances.forEach(obj => {
            if (obj.distance == distance) {
                id = obj.driverId;
            }
        });

        return id;
    }
}

module.exports = ordersHelper;