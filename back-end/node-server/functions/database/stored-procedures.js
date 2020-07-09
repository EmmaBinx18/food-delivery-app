const CREATE_UPDATE_ADDRESS = 'p_Create_Update_Address';
const GET_ADDRESS = 'p_Get_Address';
const DELINK_USER_ADDRESS = 'p_Delink_User_Address';

const GET_USER = 'p_Get_User';
const CREATE_UPDATE_USER = 'p_Create_Update_User';
const DEACTIVATE_USER = 'p_Deactivate_User';
const GET_USER_ADDRESS = 'p_Get_User_Address';
const GET_PREVIOUS_USER_ORDERS = 'p_Get_Previous_User_Orders';

const ADD_TO_ROLE = 'p_Add_To_Role';
const GET_USER_ROLE = 'p_Get_User_Role';

const CREATE_UPDATE_CATEGORY = 'p_Create_Update_Category';
const GET_CATEGORY = 'p_Get_Category';

const CREATE_UPDATE_BUSINESS = 'p_Create_Update_Business';
const GET_BUSINESS_CATEGORY = 'p_Get_Business_Category';
const GET_BUSINESS = 'p_Get_Business';
const ADD_TO_BUSINESS = 'p_Add_To_Business';
const GET_OPERATIONAL_STATUS = 'p_Get_Operational_Status';
const GET_PRODUCTS_BUSINESS = 'p_Get_Products_Business';
const GET_BUSINESS_USER = 'p_Get_Business_User';
const GET_ACTIVE_ORDER_READY_PRODUCTS = 'p_Get_Active_Order_Ready_Products';

const CREATE_UPDATE_PRODUCT = 'p_Create_Update_Product';
const GET_PRODUCTS_CATEGORY = 'p_Get_Products_Category';
const UPDATE_PRODUCT_STATUS = 'p_Update_Product_Status';

const CREATE_ORDER = 'p_Create_Order';
const GET_DELIVERY_READY_ORDERS = 'p_Get_Delivery_Ready_Orders';
const GET_ACTIVE_ORDER_PRODUCTS = 'p_Get_Active_Order_Products';
const COMPLETE_ORDER_PRODUCT = 'p_Complete_Order_Product';
const ASSIGN_ORDER_DRIVER = 'p_Assign_Order_Driver';
const GET_DRIVER_ORDER = 'p_Get_Driver_Order';
const CREATE_PAYMENT = 'p_Create_Payment';
const TRACK_ORDER = 'p_Track_Order';

const ADD_TO_DRIVER_ROLE = 'p_Add_To_Driver_Role';
const GET_DRIVER = 'p_Get_Driver';

const APPROVE_BUSINESS = 'p_Approve_Business'
const REMOVE_USER_FROM_ROLE = 'p_Remove_User_Role'
const GET_USER_ROLES = 'p_Get_Roles'
const ADD_TO_BUSINESS_ROLE = 'p_Add_To_Business_Role'
const CLOSE_BUSINESS = 'p_Close_Business'

module.exports = {
    CREATE_UPDATE_ADDRESS,
    CREATE_UPDATE_BUSINESS,
    CREATE_UPDATE_CATEGORY,
    CREATE_UPDATE_USER,
    DEACTIVATE_USER,
    GET_BUSINESS,
    GET_BUSINESS_CATEGORY,
    GET_USER,
    GET_CATEGORY,
    ADD_TO_BUSINESS,
    ADD_TO_ROLE,
    GET_DELIVERY_READY_ORDERS,
    GET_ACTIVE_ORDER_PRODUCTS,
    CREATE_ORDER,
    COMPLETE_ORDER_PRODUCT,
    ASSIGN_ORDER_DRIVER,
    GET_PRODUCTS_CATEGORY,
    CREATE_UPDATE_PRODUCT,
    ADD_TO_DRIVER_ROLE,
    GET_OPERATIONAL_STATUS,
    GET_ADDRESS,
    GET_PRODUCTS_BUSINESS,
    GET_BUSINESS_USER,
    GET_ACTIVE_ORDER_READY_PRODUCTS,
    GET_USER_ROLE,
    GET_USER_ADDRESS,
    GET_DRIVER,
    DELINK_USER_ADDRESS,
    GET_PREVIOUS_USER_ORDERS,
    GET_DRIVER_ORDER,
    UPDATE_PRODUCT_STATUS,
    CREATE_PAYMENT,
    TRACK_ORDER,
    APPROVE_BUSINESS,
    REMOVE_USER_FROM_ROLE,
    GET_USER_ROLES,
    ADD_TO_BUSINESS_ROLE,
    CLOSE_BUSINESS
}