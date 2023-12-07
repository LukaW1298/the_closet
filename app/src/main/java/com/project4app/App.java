package com.project4app;

import com.project4app.classes.*;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

// import com.fasterxml.jackson.annotation.JsonCreator;
// import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Hello world!
 *
 */

public class App 
{
    public static void main( String[] args )
    {
        // Call the connect method to establish the connection
        Connection connection = DatabaseConnector.connect();

        if (connection != null) {
            try {
                // Create a statement object
                Statement statement = connection.createStatement();

                // Execute a sample query (replace with your own query)
                String query = "SELECT * FROM brand";
                ResultSet resultSet = statement.executeQuery(query);

                // Process the results
                while (resultSet.next()) {
                    // Retrieve data from the result set
                    int brandID = resultSet.getInt("ID");
                    String brandName = resultSet.getString("name");

                    // Do something with the retrieved data
                    System.out.println("id: " + brandID + ", name: " + brandName);
                }

                // Close the result set and statement
                resultSet.close();
                statement.close();

            } 
            catch (SQLException e) {
                e.printStackTrace();

            } 
            finally {
                // Don't forget to close the connection when you're done
                try {
                    connection.close();
                    System.out.println("Connection closed.");
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
