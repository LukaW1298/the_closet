package com.project4app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class App 
{
    public static void main( String[] args )
    {
        // Starts the REST servelet with Tomcat
        // Goes through all controllers in "controller" folder 
        SpringApplication.run(App.class, args);
    }
}
