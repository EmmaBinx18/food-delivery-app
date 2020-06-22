const { userController } = require('./user/user.controller');
const { businessControler } = require('./business/business.controller');
const { homeChefController } = require('./home-chef/home-chef.controller');
const { orderController } = require('./orders/order.controller');

module.exports = {
    userController,
    businessControler,
    homeChefController,
    orderController
}