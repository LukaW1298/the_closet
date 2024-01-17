CREATE TABLE Status (
    ID int NOT NULL AUTO_INCREMENT,
    status varchar(255),
    PRIMARY KEY (ID)
);

CREATE TABLE Washing_mode (
    ID int NOT NULL AUTO_INCREMENT,
    washing_mode varchar(255),
    PRIMARY KEY (ID)
);

CREATE TABLE Parent_Category (
    ID int NOT NULL AUTO_INCREMENT,
    type varchar(255),
    PRIMARY KEY (ID)
);

CREATE TABLE Category(
    ID int NOT NULL AUTO_INCREMENT,
    type varchar(255),
    ID_parent_category int,
    PRIMARY KEY (ID),
    FOREIGN KEY (ID_parent_category) REFERENCES Parent_Category (ID)
);

CREATE TABLE Brand(
    ID int NOT NULL AUTO_INCREMENT,
    name varchar(255),
    PRIMARY KEY (ID)
);

CREATE TABLE Material(
    ID int NOT NULL AUTO_INCREMENT,
    material varchar(255),
    PRIMARY KEY (ID)
);

CREATE TABLE User(
    ID int NOT NULL AUTO_INCREMENT,
    name varchar(255),
    email varchar(255),
    password varchar(255),
    PRIMARY KEY (ID)
);

CREATE TABLE Weather(
    ID int NOT NULL AUTO_INCREMENT,
    weather varchar(255),
    PRIMARY KEY (ID)
);

CREATE TABLE Occasion(
    ID int NOT NULL AUTO_INCREMENT,
    occasion varchar(255),
    PRIMARY KEY (ID)
);

CREATE TABLE Outfit_type(
    ID int NOT NULL AUTO_INCREMENT,
    outfit_type varchar(255),
    PRIMARY KEY (ID)
);

CREATE TABLE Outfit(
    ID int NOT NULL AUTO_INCREMENT,
    ID_user int,
    ID_outfit_type int,
    date DATE,
    ID_weather int, 
    PRIMARY KEY (ID),
    FOREIGN KEY (ID_user) REFERENCES User (ID),
    FOREIGN KEY (ID_outfit_type) REFERENCES Outfit_type (ID),
    FOREIGN KEY (ID_weather) REFERENCES Weather (ID)
);

CREATE TABLE Image(
    ID int NOT NULL AUTO_INCREMENT,
    url varchar(255),
    PRIMARY KEY (ID)
);

CREATE TABLE Color(
    ID int NOT NULL AUTO_INCREMENT,
    hex_code varchar(255),
    name varchar(255),
    PRIMARY KEY (ID)
);

CREATE TABLE Clothing (
    ID int NOT NULL AUTO_INCREMENT,
    name varchar(255),
    ID_brand int,
    ID_category int,
    ID_color int,
    price float,
    size varchar(255),
    notes varchar(255),
    ID_status int,
    ID_washing_mode int,
    ID_user int,
    ID_image int,
    PRIMARY KEY (ID),
    FOREIGN KEY (ID_brand) REFERENCES Brand (ID),
    FOREIGN KEY (ID_category) REFERENCES Category (ID),
    FOREIGN KEY (ID_status) REFERENCES Status (ID),
    FOREIGN KEY (ID_washing_mode) REFERENCES Washing_mode (ID),
    FOREIGN KEY (ID_user) REFERENCES User (ID),
    FOREIGN KEY (ID_image) REFERENCES Image (ID),
    FOREIGN KEY (ID_color) REFERENCES Color (ID)
);

CREATE TABLE Clothing_Material(
    ID int NOT NULL AUTO_INCREMENT,
    ID_clothing int,
    ID_material int,
    PRIMARY KEY (ID),
    FOREIGN KEY (ID_clothing) REFERENCES Clothing (ID),
    FOREIGN KEY (ID_material) REFERENCES Material (ID)
);

CREATE TABLE Outfit_Occasion(
    ID int NOT NULL AUTO_INCREMENT,
    ID_outfit int,
    ID_occasion int,
    PRIMARY KEY (ID),
    FOREIGN KEY (ID_outfit) REFERENCES Outfit (ID),
    FOREIGN KEY (ID_occasion) REFERENCES Occasion (ID)
);

CREATE TABLE Clothing_Outfit(
    ID int NOT NULL AUTO_INCREMENT,
    ID_clothing int,
    ID_outfit int,
    PRIMARY KEY (ID),
    FOREIGN KEY (ID_clothing) REFERENCES Clothing (ID),
    FOREIGN KEY (ID_outfit) REFERENCES Outfit (ID)
);
