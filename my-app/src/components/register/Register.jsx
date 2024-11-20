/**
 * Represents the Register component.
 * This component is responsible for handling user registration.
 * @returns {JSX.Element} The Register component.
 */
import { Box, Button, Input } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import {
  fetchUserByEmail,
  fetchUserByUsername,
  usersListener,
} from "../../utils/utils";
import { useAuth } from "../../context/AuthContext";
import { database } from "../../../firebase/firebase-config";
import { update, ref } from "firebase/database";
import { Toaster, toaster } from "../ui/toaster";
import { Card, Stack } from "@chakra-ui/react";
import { InputGroup } from "../ui/input-group";
import { Field } from "../ui/field";
const Register = () => {
  // const toast = useToast();
  const { register, login } = useAuth();
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
  });

  /**
   * Updates the form state with the provided property value.
   * @param {string} prop - The property to update in the form state.
   * @returns {Function} - The event handler function.
   */
  const updateForm = (prop) => (e) => {
    setForm({
      ...form,
      [prop]: e.target.value,
    });
  };

  /**
   * Checks if a password is valid.
   * @param {string} password - The password to be checked.
   * @returns {boolean} - Returns true if the password is valid, false otherwise.
   */
  const isValidPassword = (password) => {
    if (password.length < 8) {
      toaster.create({
        title: "Invalid Password.",
        description: "Password can't be less than 8 symbols.",
        status: "error",
        duration: 3000,
      });
      return false;
    }
    return true;
  };

  /**
   * Checks if the given email is valid.
   *
   * @param {string} email - The email to be validated.
   * @returns {boolean} - Returns true if the email is valid, false otherwise.
   */
  const isValidEmail = async (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toaster.create({
        title: "Invalid email.",
        description: "This email doesn't exist.",
        type: "error",
        duration: 3000,
      });
      return false;
    }
    const isUniqueEmail = await fetchUserByEmail(email);

    if (isUniqueEmail) {
      toaster.create({
        title: "This email already exists.",
        description: "User has already registered with the same email.",
        type: "error",
        duration: 3000,
      });
      return false;
    }
    return true;
  };

  /**
   * Checks if a username is valid.
   * @param {string} username - The username to be validated.
   * @returns {boolean} - Returns true if the username is valid, false otherwise.
   */
  const isValidUsername = (username) => {
    if ((username && username.length < 3) || username.length > 20) {
      toaster.create({
        title: "Invalid username.",
        description: "Username must be between 3 and 20 symbols.",
        type: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    return true;
  };

  /**
   * Checks if a username is unique among a list of users.
   * @param {Object} users - The list of users.
   * @param {string} username - The username to check.
   * @returns {boolean} - Returns true if the username is unique, false otherwise.
   */
  const isUniqueUsername = async (username) => {
    let isUniqueUsername = await fetchUserByUsername(username);
    if (isUniqueUsername) {
      toaster.create({
        title: "Invalid username.",
        description: "This username is already taken.",
        type: "error",
        duration: 3000,
      });
      return false;
    }

    return true;
  };

  /**
   * Handles the registration process.
   * @returns {Promise<void>} A promise that resolves when the registration process is completed.
   */
  const handleRegister = async () => {
    try {
      if (
        isValidEmail(form.email) &&
        isValidPassword(form.password) &&
        isUniqueUsername(form.username) &&
        isValidUsername(form.username)
      ) {
        const credentials = await register(form.email, form.password);
        const user = {
          email: form.email,
          username: form.username,
          uid: credentials.user.uid,
        };

        try {
          const usersRef = ref(database, "users");
          await update(usersRef, { [form.username]: user });
          console.log("Database updated successfully");
        } catch (error) {
          console.error("Failed to update database:", error);
        }

        toaster.create({
          title: "Success.",
          description: "You have successfully registered.",
          type: "success",
          duration: 3000,
        });
        await login(form.email, form.password);
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);

        setForm({
          email: "",
          username: "",
          password: "",
        });
      }
    } catch (error) {
      toaster.create({
        title: "Error.",
        description: error.message,
        type: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box pt={[10, 10, 0, 0]}>
      <Toaster />
      <Card.Root w={["300px", "300px", "400px", "500px"]}>
        <Card.Header>
          <Card.Title color="white">Sign in</Card.Title>
          <Card.Description size="lg" color="white">
            Fill in the form below to sign in
          </Card.Description>
        </Card.Header>
        <Card.Body>
          <Stack gap={4} w="full">
            <Field label="Username" required>
              <Input
                placeholder="Enter username"
                value={form.username}
                onChange={updateForm("username")}
              />
            </Field>
            <Field label="Email" required>
              <Input
                placeholder="Enter email"
                value={form.email}
                onChange={updateForm("email")}
              />
            </Field>
            <Field label="Password" required>
              <Input
                type="password"
                w="100%"
                placeholder="Enter password"
                value={form.password}
                onChange={updateForm("password")}
              />
            </Field>
          </Stack>
        </Card.Body>
        <Card.Footer justifyContent="flex-end">
          <Button w="50%" marginTop={10} onClick={handleRegister}>
            Register
          </Button>
        </Card.Footer>
      </Card.Root>
    </Box>
  );
};

export default Register;
