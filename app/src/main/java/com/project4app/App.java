package com.project4app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.project4app.classes.PasswordUtils;



@SpringBootApplication
public class App 
{
    public static void main( String[] args )
    {
        // Starts the REST servelet with Tomcat
        // Goes through all controllers in "controller" folder 
        SpringApplication.run(App.class, args);

        /*// Example usage
        String password = "mySecurePassword";
        String newpw = "mySecurePassword";
        
        // Hash and store the password
        String hashedPassword = PasswordUtils.hashPassword(password);
        System.out.println("Hashed Password: " + hashedPassword);

        // Verify a password
        boolean isPasswordCorrect = PasswordUtils.verifyPassword(newpw, hashedPassword);
        System.out.println("Password verification: " + isPasswordCorrect);*/
    }
}
