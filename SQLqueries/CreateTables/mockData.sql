
DECLARE @Error int 
--EXEC p_Create_Update_Address '{ "addressId" : -1, "address": "sample address", "geometry" : {"type":"Point","coordinates":[35.70611,37.36833]} , "userId" : null}', @Error OUTPUT
--SELECT *, 'AddressError' [Address] FROM ErrorTracer WHERE ErrorID = @Error

--EXEC p_Create_Update_User '{ "userId" : "admin_uid", "firstname" : "admin name", "lastname" : "admin lastname", "phone" : "0000000000", "email" :  "admin@feedme.com"  }', @Error OUTPUT
--SELECT *, 'UserError' [User] FROM ErrorTracer WHERE ErrorID = @Error
--EXEC p_Create_Update_User '{ "userId" : "user_uid", "firstname" : "user name", "lastname" : "user lastname", "phone" : "0000000000", "email" : "user@gmail.com"  }', @Error OUTPUT
--SELECT *, 'UserError' [User2] FROM ErrorTracer WHERE ErrorID = @Error
--EXEC p_Create_Update_User '{ "userId" : "driver_uid", "firstname" : "driver name", "lastname" : "driver lastname", "phone" : "0000000000", "email" : "driver@gmail.com"  }', @Error OUTPUT
--SELECT *, 'UserError' [User3] FROM ErrorTracer WHERE ErrorID = @Error
EXEC p_Create_Update_User '{ "userId" : "chef_uid", "firstname" : "chef name", "lastname" : "chef lastname", "phone" : "0000000000", "email" : "chef@gmail.com"  }', @Error OUTPUT
SELECT *, 'UserError' [User4] FROM ErrorTracer WHERE ErrorID = @Error


EXEC p_Create_Update_Business '{ "businessId" : -1, "name": "Food Genie", "addressId" : 1,  "categoryId" : 6, "userId" : "chef_uid" }', @Error OUTPUT
SELECT *, 'BusinessError' [Business] FROM ErrorTracer WHERE ErrorID = @Error

EXEC p_Create_Update_Product '{  "productId": -1,  "name": "Bobotie",  "description": "Pronounced ba-boor-tea, the national dish of South Africa is a delicious mixture of curried meat and fruit with a creamy golden topping, not dissimilar to moussaka",  "businessId": 1,  "availabilityStatusId": 1,  "price": 45,  "minPrepareTime": 25}', @Error OUTPUT
SELECT *, 'ProductError' [Product1] FROM ErrorTracer WHERE ErrorID = @Error
EXEC p_Create_Update_Product '{  "productId": -1,  "name": "Bunny Chow",  "description": "A South African fast food dish consisting of a hollowed-out loaf of white bread filled with curry.",  "businessId": 1,  "availabilityStatusId": 1,  "price": 20,  "minPrepareTime": 25}', @Error OUTPUT
SELECT *, 'ProductError' [Product2] FROM ErrorTracer WHERE ErrorID = @Error
EXEC p_Create_Update_Product '{  "productId": -1,  "name": "Vetkoek",  "description": "A traditional South African fried dough bread. It is similar to the Caribbean Johnny cake, the Dutch oliebol, and the Mexican sopaipillas.",  "businessId": 1,  "availabilityStatusId": 1,  "price": 45,  "minPrepareTime": 45}', @Error OUTPUT
SELECT *, 'ProductError' [Product3] FROM ErrorTracer WHERE ErrorID = @Error


EXEC p_Create_Order '{ "customerId" : "user_uid","addressId": 1,"orderDateTime" : "2004-06-27T18:00:00",	"products" :[ {"productId":1,"quantity":1}, {"productId":2,"quantity":4}]}'	, @Error OUTPUT
SELECT *,'OrderError' [Order] FROM ErrorTracer WHERE ErrorID = @Error

EXEC p_Create_Order '{ "customerId" : "user_uid","addressId": 1,"orderDateTime" : "2004-06-27T18:00:00",	"products" :[ {"productId":1,"quantity":5}]}'	, @Error OUTPUT
SELECT *,'OrderError' [Order2] FROM ErrorTracer WHERE ErrorID = @Error

EXEC p_Create_Payment '{ "paymentTypeid" : 1, "amount" : 1234, "orderId" : 1}', @Error OUTPUT
SELECT *, 'PaymentError' [Payment] FROM ErrorTracer WHERE ErrorID = @Error


EXEC p_Create_Payment '{ "paymentTypeid" : 1, "amount" : 1234, "orderId" : 2}', @Error OUTPUT
SELECT *, 'PaymentError' [Payment2] FROM ErrorTracer WHERE ErrorID = @Error


EXEC p_Start_With_Order_Product '{ "productId" : 1, "orderId" : 1}', @Error OUTPUT
SELECT *, 'BusinessStartProductError' [StartProduct1]  FROM ErrorTracer WHERE ErrorID = @Error
EXEC p_Start_With_Order_Product '{ "productId" : 2, "orderId" : 1}', @Error OUTPUT
SELECT *, 'BusinessStartProductError' [StartProduct2]  FROM ErrorTracer WHERE ErrorID = @Error

EXEC p_Complete_Order_Product '{ "productId" : 1, "orderId" : 1}', @Error OUTPUT
SELECT 'BusinessCompleteProductError' FROM ErrorTracer WHERE ErrorID = @Error

EXEC p_Complete_Order_Product '{ "productId" : 2, "orderId" : 1}', @Error OUTPUT
SELECT 'BusinessCompleteProductError' FROM ErrorTracer WHERE ErrorID = @Error


EXEC p_Create_Update_Business '{ "businessId" : -1, "name": "Susans business", "addressId" : 1,  "categoryId" : 6, "userId" : "user_uid" }', @Error OUTPUT
SELECT *, 'BusinessError' [Business] FROM ErrorTracer WHERE ErrorID = @Error

UPDATE Product
	SET BusinessId = 2
WHERE productId = 2

select * from [order]


