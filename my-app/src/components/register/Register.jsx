/**
 * Represents the Register component.
 * This component is responsible for handling user registration.
 * @returns {JSX.Element} The Register component.
 */
import { Flex, Button, Input, useToast } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { usersListener } from "../../utils/utils";
import { useAuth } from "../../context/AuthContext";
import { database } from "../../../firebase/firebase-config";
import { update, ref, get } from "firebase/database";

const Register = () => {
  const toast = useToast();
  const { register, login } = useAuth();
  const [users, setUsers] = useState(null);
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
      toast({
        title: "Invalid Password.",
        description: "Password can't be less than 8 symbols.",
        status: "error",
        duration: 3000,
        isClosable: true,
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
  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast({
        title: "Invalid email.",
        description: "This email doesn't exist.",
        status: "error",
        duration: 3000,
        isClosable: true,
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
      toast({
        title: "Invalid username.",
        description: "Username must be between 3 and 20 symbols.",
        status: "error",
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
  const isUniqueUsername = (users, username) => {
    if (users) {
      const usernames = Object.keys(users);
      if (usernames.includes(username)) {
        toast({
          title: "Invalid username.",
          description: "This username is already taken.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return false;
      }
    }
    return true;
  };

  /**
   * Handles the registration process.
   * @returns {Promise<void>} A promise that resolves when the registration process is completed.
   */
  const handleRegister = async () => {
    try {
      const usersRef = ref(database, 'users');

      if (
        isValidEmail(form.email) &&
        isValidPassword(form.password) &&
        isUniqueUsername(users, form.username) &&
        isValidUsername(form.username)
      ) {
        const credentials = await register(form.email, form.password);
        const user = {
          email: form.email,
          username: form.username,
          uid: credentials.user.uid,
        };

        try {
          await update(usersRef, { [form?.username]: user });
          console.log("Database updated successfully");
        } catch (error) {
          console.error("Failed to update database:", error);
        }

        toast({
          title: "Success.",
          description: "You have successfully registered.",
          status: "success",
          duration: 3000,
          isClosable: true,
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
      toast({
        title: "Error.",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };



   useEffect(() => {
    const unsubscribe = usersListener(setUsers);

    return () => unsubscribe();
   }, [])




  return (
    <Flex
      w="100%"
      marginTop={10}
      display="flex"
      direction="column"
      justify="center"
      align="center"
    >
      <Flex
        w={["200px", "220px", "220px", "300px"]}
        h={["60%", "60%", "40%", "40%"]}
        marginBottom="10%"
        justify="center"
        align="center"
        direction="column"
      >
        <Flex
          w='100%'
          h="60%"
          direction="column"
          justify="space-evenly"
        >
          <Input
            placeholder="Email"
            value={form.email}
            marginBottom={5}
            onChange={updateForm("email")}
            bg="gray.300"
          />
          <Input
            placeholder="Username"
            marginBottom={5}
            value={form.username}
            onChange={updateForm("username")}
            bg="gray.300"
          />
          <Input
            placeholder="Password"
            value={form.password}
            onChange={updateForm("password")}
            bg="gray.300"
          />
        </Flex>
        <Button marginTop={10} onClick={handleRegister}>
          Register
        </Button>
      </Flex>
    </Flex>
  );
};

export default Register;
