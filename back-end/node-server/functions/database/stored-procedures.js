const CREATE_UPDATE_ADDRESS = 'p_Create_Update_Address';
const GET_ADDRESS = 'p_Get_Address';
const GET_USER_ADDRESS = 'p_Get_User_Address';
const DELINK_USER_ADDRESS = 'p_Delink_User_Address';

const GET_BUSINESS = 'p_Get_Business';
const GET_BUSINESS_USER = 'p_Get_Business_User';
const CREATE_UPDATE_BUSINESS = 'p_Create_Update_Business';
const GET_BUSINESS_CATEGORY = 'p_Get_Business_Category';
const GET_OPERATIONAL_STATUS = 'p_Get_Operational_Status';

const GET_CATEGORY = 'p_Get_Category';
const CREATE_UPDATE_CATEGORY = 'p_Create_Update_Category';

const ADD_TO_DRIVER_ROLE = 'p_Add_To_Driver_Role';
const GET_DRIVER = 'p_Get_Driver';
const GET_DRIVER_ORDER = 'p_Get_Driver_Order';
const COMPLETE_ORDER_DELIVERY = 'p_Complete_Order_Delivery';
const PICK_UP_ORDER = 'p_Pick_Up_Order_Product';

const GET_USER = 'p_Get_User';
const CREATE_UPDATE_USER = 'p_Create_Update_User';
const DEACTIVATE_USER = 'p_Deactivate_User';

const GET_PRODUCTS_BUSINESS = 'p_Get_Products_Business';
const CREATE_UPDATE_PRODUCT = 'p_Create_Update_Product';
const GET_PRODUCTS_CATEGORY = 'p_Get_Products_Category';
const UPDATE_PRODUCT_STATUS = 'p_Update_Product_Status';

const CREATE_ORDER = 'p_Create_Order';
const GET_DELIVERY_READY_ORDERS = 'p_Get_Delivery_Ready_Orders';
const GET_ACTIVE_ORDER_PRODUCTS = 'p_Get_Active_Order_Products';
const COMPLETE_ORDER_PRODUCT = 'p_Complete_Order_Product';
const ASSIGN_ORDER_DRIVER = 'p_Assign_Order_Driver';
const GET_PREVIOUS_USER_ORDERS = 'p_Get_Previous_User_Orders';
const GET_ACTIVE_ORDER_READY_PRODUCTS = 'p_Get_Active_Order_Ready_Products';
const CREATE_PAYMENT = 'p_Create_Payment';
const TRACK_ORDER = 'p_Track_Order';

module.exports = {
    address: {
        GET_ADDRESS,
        GET_USER_ADDRESS,
        CREATE_UPDATE_ADDRESS,
        DELINK_USER_ADDRESS
    },
    business: {
        GET_BUSINESS,
        GET_BUSINESS_USER,
        CREATE_UPDATE_BUSINESS,
        GET_BUSINESS_CATEGORY,
        GET_OPERATIONAL_STATUS
    },
    category: {
        GET_CATEGORY,
        CREATE_UPDATE_CATEGORY
    },
    delivery: {
        ADD_TO_DRIVER_ROLE,
        GET_DRIVER_ORDER,
        GET_DRIVER,
        COMPLETE_ORDER_DELIVERY,
        PICK_UP_ORDER
    },
    orders: {
        GET_DELIVERY_READY_ORDERS,
        GET_ACTIVE_ORDER_PRODUCTS,
        GET_PREVIOUS_USER_ORDERS,
        GET_ACTIVE_ORDER_READY_PRODUCTS,
        CREATE_ORDER,
        CREATE_PAYMENT,
        TRACK_ORDER,
        COMPLETE_ORDER_PRODUCT,
        ASSIGN_ORDER_DRIVER
    },
    products: {
        GET_PRODUCTS_CATEGORY,
        GET_PRODUCTS_BUSINESS,
        CREATE_UPDATE_PRODUCT,
        UPDATE_PRODUCT_STATUS
    },
    user: {
        GET_USER,
        CREATE_UPDATE_USER,
        DEACTIVATE_USER
    }
}