package com.project4app.classes;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Arrays;
import java.util.Base64;

public class PasswordUtils {
    public static String hashPassword(String password) {
        try {
            // Generate a random salt
            byte[] salt = generateSalt();

            // Concatenate password and salt
            byte[] passwordWithSalt = concatenatePasswordAndSalt(password.getBytes(), salt);

            // Hash the combined value using SHA-256
            MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
            byte[] hashedPassword = messageDigest.digest(passwordWithSalt);

            // Combine salt and hashed password and encode in Base64
            byte[] saltedHashedPassword = concatenateSaltAndHashedPassword(salt, hashedPassword);
            return Base64.getEncoder().encodeToString(saltedHashedPassword);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            // Handle exception (e.g., log it or throw a custom exception)
        }
        return null;
    }

    public static boolean verifyPassword(String inputPassword, String storedPassword) {
        try {
            // Decode the stored password from Base64
            byte[] decodedStoredPassword = Base64.getDecoder().decode(storedPassword);

            // Extract salt and hashed password from the stored password
            byte[] salt = Arrays.copyOfRange(decodedStoredPassword, 0, 16);
            byte[] storedHashedPassword = Arrays.copyOfRange(decodedStoredPassword, 16, decodedStoredPassword.length);

            // Concatenate input password and salt
            byte[] inputPasswordWithSalt = concatenatePasswordAndSalt(inputPassword.getBytes(), salt);

            // Hash the combined value using SHA-256
            MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
            byte[] hashedPassword = messageDigest.digest(inputPasswordWithSalt);

            // Compare the calculated hash with the stored hash
            return Arrays.equals(storedHashedPassword, hashedPassword);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            // Handle exception (e.g., log it or throw a custom exception)
        }
        return false;
    }

    private static byte[] generateSalt() {
        byte[] salt = new byte[16];
        SecureRandom secureRandom = new SecureRandom();
        secureRandom.nextBytes(salt);
        return salt;
    }

    private static byte[] concatenatePasswordAndSalt(byte[] password, byte[] salt) {
        byte[] passwordWithSalt = new byte[password.length + salt.length];
        System.arraycopy(password, 0, passwordWithSalt, 0, password.length);
        System.arraycopy(salt, 0, passwordWithSalt, password.length, salt.length);
        return passwordWithSalt;
    }

    private static byte[] concatenateSaltAndHashedPassword(byte[] salt, byte[] hashedPassword) {
        byte[] saltedHashedPassword = new byte[salt.length + hashedPassword.length];
        System.arraycopy(salt, 0, saltedHashedPassword, 0, salt.length);
        System.arraycopy(hashedPassword, 0, saltedHashedPassword, salt.length, hashedPassword.length);
        return saltedHashedPassword;
    }
}
