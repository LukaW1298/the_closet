
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;


//establish a connetion with the mysql database and fetch testdata 
public class DatabaseConnector {

    public static Connection connect() {
        try {
            // Load the MySQL JDBC driver
            Class.forName("com.mysql.cj.jdbc.Driver");
            
            // jdbc:mysql://localhost:3306/mydatabase
            String url = "jdbc:mysql://127.0.0.1:3306/theclosettest";
            String username = "root";
            String password = "";

            // Establish the database connection
            Connection connection = DriverManager.getConnection(url, username, password);

            System.out.println("Connected to the database!");

            return connection;

        } 
        catch (ClassNotFoundException | SQLException e) {
            System.err.println(e.toString());
            return null;
        }
    }

     public static void main(String[] args) {
        // Call the connect method to establish the connection
        Connection connection = connect();

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

