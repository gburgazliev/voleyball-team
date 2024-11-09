/**
 * Login component for user authentication.
 *
 * @component
 * @returns {JSX.Element} Login component
 */
import {
  Flex,
  Input,
  //   InputGroup,
  // InputRightElement,
  Button,
  Box,
} from "@chakra-ui/react";

import React from "react";

import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Toaster, toaster } from "../ui/toaster";
import { Card, Stack } from "@chakra-ui/react";
import { InputGroup } from "../ui/input-group";

const Login = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();

  const { login } = useAuth();
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });

  /**
   * Updates the form state with the new value of the specified property.
   *
   * @param {string} prop - The name of the property to update.
   * @returns {Function} - The event handler function.
   */
  const updateForm = (prop) => (e) => {
    setForm({
      ...form,
      [prop]: e.target.value,
    });
  };

  /**
   * Handles the login functionality.
   * @returns {Promise<void>} A promise that resolves when the login is successful.
   */
  const handleLogin = async () => {
    try {
      await login(form.email, form.password);
      toaster.create({
        title: "Invalid email or password.",
        description: "Please try again.",
        type: "success",
        duration: 3000,
      });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      toaster.create({
        title: "Invalid email or password.",
        description: "Please try again.",
        type: "error",
        duration: 3000,
      });
      console.error(error);
    }
  };

  return (
    <Box pt={[10, 10, 5 , 0]}>

    
      <Toaster />
      <Card.Root w={['300px', '300px' , '400px', '400px']}>
        <Card.Header >
          <Card.Title >Sign in</Card.Title>
          <Card.Description size='lg'>Fill in the form below to sign in</Card.Description>
        </Card.Header>
        <Card.Body >
          <Stack gap={4} w='full'>
            <Input
              placeholder="Enter email"
              value={form.email}
              onChange={updateForm("email")}
            />
            <InputGroup
              
              endElement={
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              }
            >
              <Input
                type={show ? "text" : "password"}
                placeholder="Enter password"
                value={form.password}
                onChange={updateForm("password")}
              />
            </InputGroup>
          </Stack>
        </Card.Body>
        <Card.Footer justifyContent="flex-end">
          <Button w="50%" marginTop={10} onClick={handleLogin}>
            Login
          </Button>
        </Card.Footer>
      </Card.Root>
    </Box>
  );
};

export default Login;
