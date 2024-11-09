/**
 * Login component for user authentication.
 *
 * @component
 * @returns {JSX.Element} Login component
 */
import {
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import React from "react";

import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();
  const toast = useToast();
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
      navigate("/");
    } catch (error) {
      toast({
        title: "Invalid email or password.",
        description: "Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error(error);
    }
  };

  return (
    <Flex
      w="100%"
      marginBottom={40}
      display="flex"
      direction="column"
      justify="space-between"
      align="center"
    >
      <Flex
        w={["100%", "100%", "30%", "30%"]}
        h={["60%", "60%", "40%", "40%"]}
        marginTop={10}
        justify="center"
        align="center"
      >
        <Flex
          w={["70%", "70%", "50%", "50%"]}
          h="50%"
          justify="space-evenly"
          direction="column"
        >
       
              <Input
            placeholder="Enter email"
            value={form.email}
            onChange={updateForm("email")}
            marginBottom={5}
            bg="white"
          />
          
           
         
         
          <InputGroup size="lg">
            <Input
              w="100%"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              value={form.password}
              onChange={updateForm("password")}
              bg="white"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button w="50%" marginTop={10} onClick={handleLogin}>
            Login
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Login;
