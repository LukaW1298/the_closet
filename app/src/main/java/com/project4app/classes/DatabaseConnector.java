package com.project4app.classes;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;


//establish a connetion with the mysql database and fetch testdata 
public class DatabaseConnector {

    public static Connection connect() {
        try {
            // // Load the MySQL JDBC driver
            // Class.forName("com.mysql.cj.jdbc.Driver");
            
            // jdbc:mysql://localhost:3306/mydatabase
            String url = "jdbc:mysql://127.0.0.1:3306/theclosettest";
            String username = "root";
            String password = "";

            // Establish the database connection
            Connection connection = DriverManager.getConnection(url, username, password);

            System.out.println("Connected to the database!");

            return connection;

        } 
        catch (SQLException e) {
            System.err.println(e.toString());
            return null;
        }
    }
}

