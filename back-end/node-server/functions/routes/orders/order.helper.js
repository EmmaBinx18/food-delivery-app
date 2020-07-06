const geolib = require('geolib');
const getDistance = require('geolib/es/getDistance');

const db = require('../../database/db');
const sp = require('../../database/stored-procedures');

const orderHelper = {
    getClosesDriver(customerId){
        db.executeStoredProcedure(sp.GET_USER, {userId:customerId}, (data) => {
            const customerAddress = this.getAddress(data.addressId);
            const coordinates = customerAddress[0].geometry.coordinates;
            const drivers = this.getAllDrivers();
            return this.getClosesDriver(drivers, coordinates);
        });
    },
    getAddress(addressId){
        db.executeStoredProcedure(sp.GET_ADDRESS, {addressId:addressId}, (data) => {
            return JSON.parse(data);
        });
    },
    assignDriver(orderId, driverId){
        try{
            db.executeStoredProcedure(sp.ASSIGN_ORDER_DRIVER, {orderId, driverId}, (data) => {
                return JSON.parse(data);
            });
        }
        catch(error){
            throw(error);
        }
    },
    getClosestDriver(drivers, coordinates){
        const distances = [];
        drivers.forEach(driver => {
            const coords = this.getAddress(driver.addressId)[0].geometry.coordinates;
            distances.push(
                {
                    distance: getDistance(
                        { latitude: coordinates[0], longitude: coordinates[1] },
                        { latitude: coords[0], longitude: coords[1] }
                    ),
                    driverId: driver.userId
                }
            );
        });

        const obj = Math.min(...distances);
        return obj.driverId;
    },
    getAllDrivers(){
        db.executeStoredProcedure(sp.GET_ADDRESS, {addressId:data.addressId}, (data) => {
            return JSON.parse(data);
        });
    }
}

module.exports = orderHelper;