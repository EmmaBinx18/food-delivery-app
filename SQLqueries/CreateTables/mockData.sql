
DECLARE @Error int 
EXEC p_Create_Update_Address '{ "addressId" : -1, "streetName" : "Street12", "suburb" : "Suburb1", "zipCode" : "1234", "streetNo" : 1,"complexName" : "Complex1", "houseNo"  : 1, "cityId" : 1 }', @Error OUTPUT
SELECT *, 'AddressError' [Address] FROM ErrorTracer WHERE ErrorID = @Error

EXEC p_Create_Update_User '{ "userId" : "admin_uid", "firstname" : "admin name", "lastname" : "admin lastname", "phone" : "0000000000", "email" :  "admin@feedme.com"  }', @Error OUTPUT
SELECT *, 'UserError' [User] FROM ErrorTracer WHERE ErrorID = @Error
EXEC p_Create_Update_User '{ "userId" : "user_uid", "firstname" : "user name", "lastname" : "user lastname", "phone" : "0000000000", "email" : "user@gmail.com"  }', @Error OUTPUT
SELECT *, 'UserError' [User2] FROM ErrorTracer WHERE ErrorID = @Error
EXEC p_Create_Update_User '{ "userId" : "driver_uid", "firstname" : "driver name", "lastname" : "driver lastname", "phone" : "0000000000", "email" : "driver@gmail.com"  }', @Error OUTPUT
SELECT *, 'UserError' [User3] FROM ErrorTracer WHERE ErrorID = @Error
EXEC p_Create_Update_User '{ "userId" : "chef_uid", "firstname" : "chef name", "lastname" : "chef lastname", "phone" : "0000000000", "email" : "chef@gmail.com"  }', @Error OUTPUT
SELECT *, 'UserError' [User4] FROM ErrorTracer WHERE ErrorID = @Error


EXEC p_Create_Update_Business '{ "businessId" : -1, "name": "My Business", "addressId" : 1,  "categoryId" : 1, "userId" : "chef_uid" }', @Error OUTPUT
SELECT *, 'BusinessError' [Business] FROM ErrorTracer WHERE ErrorID = @Error

EXEC p_Create_Update_Product '{  "productId": -1,  "name": "product1 name",  "description": "product1 description",  "businessId": 1,  "availabilityStatusId": 1,  "price": 25,  "minPrepareTime": 15}', @Error OUTPUT
SELECT *, 'ProductError' [Product1] FROM ErrorTracer WHERE ErrorID = @Error
EXEC p_Create_Update_Product '{  "productId": -1,  "name": "product2 name",  "description": "product2 description",  "businessId": 1,  "availabilityStatusId": 1,  "price": 50,  "minPrepareTime": 25}', @Error OUTPUT
SELECT *, 'ProductError' [Product2] FROM ErrorTracer WHERE ErrorID = @Error
EXEC p_Create_Update_Product '{  "productId": -1,  "name": "product3 name",  "description": "product3 description",  "businessId": 1,  "availabilityStatusId": 1,  "price": 25,  "minPrepareTime": 15}', @Error OUTPUT
SELECT *, 'ProductError' [Product3] FROM ErrorTracer WHERE ErrorID = @Error