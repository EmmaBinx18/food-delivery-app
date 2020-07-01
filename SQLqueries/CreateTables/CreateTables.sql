IF NOT EXISTS(SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Country')
BEGIN
	CREATE TABLE Country
	(
		[countryId] INT IDENTITY(1,1),
		[name] varchar(255),
		PRIMARY KEY ([countryId])
	);

	INSERT INTO Country
	VALUES ('South Africa')
END
GO

IF NOT EXISTS(SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Province')
BEGIN
	CREATE TABLE Province
	(
		[provinceId] INT IDENTITY(1,1),
		[name] varchar(255),
		[countryId] int NOT NULL FOREIGN KEY REFERENCES [Country]([countryId]),
		PRIMARY KEY ([provinceId])
	);

	INSERT INTO Province
	VALUES ('Free State',1),
	   ('Eastern Cape',1),
	   ('North West',1),
	   ('Northern Cape', 1),
	   ('Western Cape', 1),
	   ('Gauteng',1),
	   ('Limpopo', 1),
	   ('Kwa-Zulu Natal',1),
	   ('Mpumalanga',1) 
END
GO


IF NOT EXISTS(SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'City')
BEGIN
	CREATE TABLE City
	(
		[cityId] INT IDENTITY(1,1),
		[name] varchar(255),
		[provinceId] int NOT NULL FOREIGN KEY REFERENCES [Province]([provinceId]),
		PRIMARY KEY ([cityId])
	);

	INSERT INTO City
	VALUES ('Bloemfontein', 1),
		   ('Bethlehem', 1),
		   ('Kroonstad', 1),
		   ('Welkom', 1),
		   ('Pretoria', 6),
		   ('Johannesburg', 6),
		   ('Vanderbijlpark', 6),
		   ('Krugersdorp', 6),
		   ('Roodepoort', 6),
		   ('Cape Town', 5),
		   ('Bellville', 5),
		   ('Paarl', 5),
		   ('Stellenbosch', 5),
		   ('Worcester', 5)
END
GO

IF NOT EXISTS(SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Role')
BEGIN
	CREATE TABLE [Role]
	(
		[roleId] INT IDENTITY(1,1),
		[name] varchar(55),
		PRIMARY KEY ([roleId])
	);

	INSERT INTO [Role]
	VALUES ('Admininstrator'),('Driver'),('Home_Chef')

END
GO

IF NOT EXISTS(SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Users')
BEGIN
	CREATE TABLE [Users]
	(
		[userId] VARCHAR(128),
		[firstname] varchar(55) NOT NULL,
		[lastname] varchar(100) NOT NULL,
		[email] varchar(255) NOT NULL,
		[phone] varchar(13),
		[isActive] bit default 1,
		PRIMARY KEY ([userId])
	);
END
GO

IF NOT EXISTS(SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'UserRole')
BEGIN
	CREATE TABLE [UserRole] (
	  [userId] VARCHAR(128) NOT NULL FOREIGN KEY REFERENCES [Users]([userId]) PRIMARY KEY,
	  [roleId] int NOT NULL FOREIGN KEY REFERENCES [Role]([roleId]),
	);
END
GO

IF NOT EXISTS(SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Address')
BEGIN
	CREATE TABLE [Address] (
	[addressId] INT IDENTITY(1,1),
	[streetName] varchar(255),
	[suburb] varchar(255),
	[zipCode] varchar(7),
	[streetNo] int,
	[complexName] varchar(255),
	[houseNo] int,
	[cityId] int NOT NULL FOREIGN KEY REFERENCES [City]([cityId]),
	PRIMARY KEY ([addressId]));

END
GO


IF NOT EXISTS(SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'UserAddress')
BEGIN
	CREATE TABLE [UserAddress] (
	  [userId] VARCHAR(128) NOT NULL FOREIGN KEY REFERENCES [Users]([userId]),
	  [addressId] int NOT NULL FOREIGN KEY REFERENCES [Address]([addressId])
	);
END
GO

IF NOT EXISTS(SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'OperationalStatus')
BEGIN
	CREATE TABLE [OperationalStatus] (
	[operationalStatusId] INT IDENTITY(1,1),
	[name] varchar(55),
	PRIMARY KEY ([operationalStatusId]));

	INSERT INTO OperationalStatus
	VALUES ('Pending_Approval'), ('Open'), ('Closed')

END
GO


IF NOT EXISTS(SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Category')
BEGIN
	CREATE TABLE [Category] (
	[categoryId] INT IDENTITY(1,1),
	[name] varchar(55),
	[description] VARCHAR(MAX),
	[image] VARCHAR(MAX),
	PRIMARY KEY ([categoryId]));
END
GO

IF NOT EXISTS(SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Business')
BEGIN
	CREATE TABLE [Business] (
	[BusinessId] INT IDENTITY(1,1),
	[name] varchar(55),
	[categoryId] INT NOT NULL FOREIGN KEY REFERENCES [Category]([categoryId]),
	[addressId] int NOT NULL FOREIGN KEY REFERENCES [Address]([addressId]),
	[operationalStatusId] int  NOT NULL FOREIGN KEY REFERENCES [OperationalStatus]([operationalStatusId]),
	PRIMARY KEY ([BusinessId])
	);

END
GO

IF NOT EXISTS(SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'BusinessUser')
BEGIN
	CREATE TABLE [BusinessUser] (
	[userId] VARCHAR(128) NOT NULL FOREIGN KEY REFERENCES [Users]([userId]) PRIMARY KEY,
	[businessId] int NOT NULL FOREIGN KEY REFERENCES [Business]([businessId]));

END
GO

IF NOT EXISTS(SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'OrderStatus')
BEGIN
	CREATE TABLE [OrderStatus] (
	[orderStatusId] INT IDENTITY(1,1),
	[name] varchar(255),
	PRIMARY KEY ([orderStatusId]));

	INSERT INTO OrderStatus
	VALUES ('Awaiting_payment'), ('Products_not_ready'), ('Waiting_for_driver'), ('Delivery_In_Progess'), ('Done')

END
GO


IF NOT EXISTS(SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'DeliveryStatus')
BEGIN
	CREATE TABLE [DeliveryStatus] (
	[DeliveryStatusId] INT IDENTITY(1,1),
	[name] varchar(255),
	PRIMARY KEY ([DeliveryStatusId])
	);

	INSERT INTO DeliveryStatus
	VALUES ('Picking_up_items'), ('On_its_way'), ('Delivered')

END
GO

IF NOT EXISTS(SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Delivery')
BEGIN
	CREATE TABLE [Delivery] (
	[deliveryId] INT IDENTITY(1,1),
	[startTime] datetime,
	[deliveryStatusId] int NOT NULL FOREIGN KEY REFERENCES [DeliveryStatus]([DeliveryStatusId]),
	[driverId] VARCHAR(128) NOT NULL FOREIGN KEY REFERENCES [Users]([userId]),
	[endTime] varchar(255),
	[kmTraveled] int,
	[etd] datetime,
	PRIMARY KEY ([deliveryId])
	);
END
GO

IF NOT EXISTS(SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Tracking')
BEGIN
	CREATE TABLE [Tracking] (
	[trackingId] INT IDENTITY(1,1),
	[latLong] geometry,
	[timeStamp] datetime,
	[deliveryId] int NOT NULL FOREIGN KEY REFERENCES [Delivery]([deliveryId]),
	PRIMARY KEY ([trackingId])
	);
END
GO

IF NOT EXISTS(SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Order')
BEGIN
	CREATE TABLE [Order] (
	[orderId] INT IDENTITY(1,1),
	[customerId] varchar(128) NOT NULL FOREIGN KEY REFERENCES [Users]([userId]),
	[addressId] int NOT NULL FOREIGN KEY REFERENCES [Address]([addressId]),
	[orderDateTime] DateTime,
	[orderPlacedDateTime] DateTime,
	[orderStatusId] int NOT NULL FOREIGN KEY REFERENCES [OrderStatus]([orderStatusId]),
	[deliveryId] int NULL FOREIGN KEY REFERENCES [Delivery]([deliveryId]),
	PRIMARY KEY ([orderId])
	);
END
GO


IF NOT EXISTS(SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'PaymentType')
BEGIN
	CREATE TABLE [PaymentType] (
	[paymentTypeId] INT IDENTITY(1,1),
	[name] varchar(55),
	PRIMARY KEY ([paymentTypeId])
	);

	INSERT INTO [PaymentType]
	VALUES ('Online')
END
GO


IF NOT EXISTS(SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Payment')
BEGIN
	CREATE TABLE [Payment] (
	[paymentId] INT IDENTITY(1,1),
	[paymentTypeId] int NOT NULL FOREIGN KEY REFERENCES [PaymentType]([paymentTypeId]),
	[dateTime] DateTime,
	[amount] decimal(9,2),
	[orderId] int NOT NULL FOREIGN KEY REFERENCES [Order]([orderId]),
	PRIMARY KEY ([paymentId])
	);
END
GO

IF NOT EXISTS(SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'AvailabilityStatus')
BEGIN
	CREATE TABLE [AvailabilityStatus] (
	[availabilityStatusId] INT IDENTITY(1,1),
	[name] varchar(55),
	PRIMARY KEY ([availabilityStatusId])
	);

	INSERT INTO AvailabilityStatus
	VALUES ('Available'), ('Not_Available'), ('Out_Of_Stock')
END
GO

IF NOT EXISTS(SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Product')
BEGIN
	
	CREATE TABLE [Product] (
	[productId] INT IDENTITY(1,1),
	[name] varchar(255),
	[description] varchar(255),
	[businessId] int NOT NULL FOREIGN KEY REFERENCES [Business]([businessId]),
	[availabilityStatusId] int NOT NULL FOREIGN KEY REFERENCES [AvailabilityStatus]([availabilityStatusId]),
	[price] decimal(9,2),
	[minPrepareTime] int,
	PRIMARY KEY ([productId])
	);
END
GO


IF NOT EXISTS(SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'OrderProductStatus')
BEGIN
	CREATE TABLE [OrderProductStatus] (
	[orderProductStatusId] INT IDENTITY(1,1),
	[name] varchar(55),
	PRIMARY KEY ([orderProductStatusId])
	);
	INSERT INTO OrderProductStatus
	VALUES ('Pending_Acceptance'), ('In_progress'), ('Ready') , ('Picked_up')
END
GO


IF NOT EXISTS(SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'OrderProduct')
BEGIN
	CREATE TABLE [OrderProduct] (
	[orderId] int NOT NULL FOREIGN KEY REFERENCES [Order]([orderId]),
	[productId] int NOT NULL FOREIGN KEY REFERENCES [Product]([productId]),
	[quantity] int NOT NULL,
	[orderProductStatusId] int NOT NULL FOREIGN KEY REFERENCES [OrderProductStatus]([orderProductStatusId]),
	[productPrice] decimal(9,2),
	[orderItemStarted] datetime,
	[orderItemReady] datetime,
	[estimatedPrepareTime] int
	);
END
GO


IF NOT EXISTS(SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'ErrorTracer')
BEGIN
	CREATE TABLE ErrorTracer
	(
	errorID INT PRIMARY KEY IDENTITY(1,1),
	errorNumber INT,
	errorState INT,
	errorSeverity INT,
	errorLine INT,
	errorProc VARCHAR(MAX),
	errorMsg VARCHAR(MAX),
	userName VARCHAR(MAX),
	hostName VARCHAR(MAX),
	errorDate DATETIME DEFAULT GETDATE()
	);
END
GO
