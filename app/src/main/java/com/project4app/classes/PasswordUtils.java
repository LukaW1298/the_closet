package com.project4app.classes;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Arrays;
import java.util.Base64;

public class PasswordUtils {
    private static final int SALT_LENGTH = 16;
    private static final int ITERATIONS = 1000;

    public static String hashPassword(String password) {
        try {
            byte[] salt = generateSalt();

            byte[] passwordWithSalt = concatenatePasswordAndSalt(password.getBytes(), salt);

            byte[] hashedPassword = hashWithSHA256(passwordWithSalt);

            byte[] saltedHashedPassword = concatenateSaltAndHashedPassword(salt, hashedPassword);
            
            return Base64.getEncoder().encodeToString(saltedHashedPassword);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static boolean verifyPassword(String inputPassword, String storedPassword) {
        try {
            byte[] decodedStoredPassword = Base64.getDecoder().decode(storedPassword);

            byte[] salt = Arrays.copyOfRange(decodedStoredPassword, 0, SALT_LENGTH);
            byte[] storedHashedPassword = Arrays.copyOfRange(decodedStoredPassword, SALT_LENGTH, decodedStoredPassword.length);

            byte[] inputPasswordWithSalt = concatenatePasswordAndSalt(inputPassword.getBytes(), salt);

            byte[] hashedPassword = hashWithSHA256(inputPasswordWithSalt);
            System.out.println(hashedPassword);

            return Arrays.equals(storedHashedPassword, hashedPassword);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return false;
    }

    private static byte[] generateSalt() {
        byte[] salt = new byte[SALT_LENGTH];
        SecureRandom secureRandom = new SecureRandom();
        secureRandom.nextBytes(salt);
        return salt;
    }

    private static byte[] concatenatePasswordAndSalt(byte[] password, byte[] salt) {
        byte[] passwordWithSalt = new byte[password.length + SALT_LENGTH];
        System.arraycopy(password, 0, passwordWithSalt, 0, password.length);
        System.arraycopy(salt, 0, passwordWithSalt, password.length, SALT_LENGTH);
        return passwordWithSalt;
    }

    private static byte[] concatenateSaltAndHashedPassword(byte[] salt, byte[] hashedPassword) {
        byte[] saltedHashedPassword = new byte[SALT_LENGTH + hashedPassword.length];
        System.arraycopy(salt, 0, saltedHashedPassword, 0, SALT_LENGTH);
        System.arraycopy(hashedPassword, 0, saltedHashedPassword, SALT_LENGTH, hashedPassword.length);
        return saltedHashedPassword;
    }

    private static byte[] hashWithSHA256(byte[] input) throws NoSuchAlgorithmException {
        MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
        for(int i = 0; i < ITERATIONS; i++) {
            input = messageDigest.digest(input);
        }
        return input;
    }
}
