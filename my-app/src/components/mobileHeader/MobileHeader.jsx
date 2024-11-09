/**
 * MobileHeader component for the volleyball site.
 * @component
 * @example
 * return (
 *   <MobileHeader />
 * )
 */
import {
  Heading,
  // Drawer,
  // DrawerBody,
  // DrawerFooter,
  // DrawerHeader,
  // DrawerOverlay,
  // DrawerContent,
  // DrawerCloseButton,
  // Popover,
  // PopoverContent,
  // PopoverBody,
  // PopoverArrow,
  // PopoverCloseButton,
  Image,
  Flex,
} from "@chakra-ui/react";
import { Button, Stack, useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";
import instagram from "../../assets/instagram.png";
import facebook from "../../assets/facebook.png";
import youtube from "../../assets/youtube.png";

import "./mobileHeader.css";

const MobileHeader = () => {
  const navigate = useNavigate();
  const { userData, logout } = useAuth();
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [theme, setTheme] = useState(false);

  useEffect(() => {
    const themeSwitch = document?.getElementById("mobile-theme-switch");
    const body = document.querySelector("body");
    const moon = document.getElementById("moon");
    const sun = document.getElementById("sun");
    const lightmode = localStorage.getItem("lightmode");
    if (lightmode === "true") {
      body.classList.add("light-mode");
      try {
        moon.style.display = "block";
        sun.style.display = "none";
      } catch (error) {}
    }

    themeSwitch?.addEventListener("click", () => {
      if (lightmode !== "true") {
        body.classList.add("light-mode");
        localStorage.setItem("lightmode", "true");
        try {
          moon.style.display = "block";
          sun.style.display = "none";
        } catch (error) {}
      } else {
        body.classList.remove("light-mode");
        localStorage.removeItem("lightmode");
        try {
          sun.style.display = "block";
          moon.style.display = "none";
        } catch (error) {}
      }
    });
    setTheme(false);
  }, [theme]);

  return ( <>
  
   { // <header id="mobile-header">
    //   <Heading className="slideFromTop">Heaven 07</Heading>
    //   <div>
    //     <div id="mobile-theme-switch" onClick={() => setTheme(true)}>
    //       <svg
    //         id="moon"
    //         className="rotate"
    //         xmlns="http://www.w3.org/2000/svg"
    //         height="40px"
    //         viewBox="0 -960 960 960"
    //         width="40px"
    //         fill="#1E124A"
    //       >
    //         <path d="M582-80q-86.08 0-162.7-32.17-76.63-32.16-134.51-87.27-57.88-55.1-91.34-128.92Q160-402.17 160-485.08q0-83.92 33.5-157.75 33.5-73.84 91.33-129Q342.67-827 419.3-859.17q76.62-32.16 162.7-32.16 49.33 0 93.67 11.33Q720-868.67 760-848.67q-90.33 60.34-145.83 154.5-55.5 94.17-55.5 208.5 0 114.34 55.5 208.84T760-122.67q-40 20-84.33 31.34Q631.33-80 582-80Zm0-66.67h24.61q11.72 0 20.06-1.33-63-71.33-98.84-157.17Q492-391 492-485.33q0-94.34 35.83-180.17 35.84-85.83 98.84-157.83-8.34-1.34-20.06-1.34H582q-146.33 0-250.83 99.14-104.5 99.15-104.5 240.17 0 141.03 104.5 239.86 104.5 98.83 250.83 98.83ZM492-486Z" />
    //       </svg>
    //       <svg
    //         id="sun"
    //         className="rotateLeft"
    //         xmlns="http://www.w3.org/2000/svg"
    //         height="40px"
    //         viewBox="0 -960 960 960"
    //         width="40px"
    //         fill="#FFFF55"
    //       >
    //         <path d="M446.67-766.67V-920h66.66v153.33h-66.66ZM706-659.33l-46.33-46.34 108-109.66 46.66 47.66L706-659.33Zm60.67 212.66v-66.66H920v66.66H766.67ZM446.67-40v-153.33h66.66V-40h-66.66ZM253.33-660.67l-108-107 47-46.66L300.67-706l-47.34 45.33ZM768-145.33l-108.33-109L705-299.67l110 106-47 48.34ZM40-446.67v-66.66h153.33v66.66H40Zm153 301.34-47.33-47L253-299.67l24.33 22.34L301.67-254 193-145.33ZM480-240q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm0-66.67q72 0 122.67-50.66Q653.33-408 653.33-480t-50.66-122.67Q552-653.33 480-653.33t-122.67 50.66Q306.67-552 306.67-480t50.66 122.67Q408-306.67 480-306.67ZM480-480Z" />
    //       </svg>
    //     </div>
    //   </div>
    //   <div id="mobile-header-social-media-container">
    //     <a
    //       href="https://www.instagram.com/heaven07.volleyball.agency?igsh=MXhzM2p5NWFwMnBp"
    //       target="_blank"
    //     >
    //       <Image src={instagram} boxSize="30px"></Image>
    //     </a>
    //     <a
    //       href="https://www.facebook.com/profile.php?id=61564570175373"
    //       target="_blank"
    //     >
    //       <Image src={facebook} boxSize="30px"></Image>
    //     </a>
    //     <a href="https://www.youtube.com" target="_blank">
    //       <Image src={youtube} boxSize="30px"></Image>
    //     </a>
    //   </div>
    //   <Button className="fadeIn" colorScheme="blue" onClick={onOpen}>
    //     MENU
    //   </Button>
    //   <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
    //     <DrawerOverlay />
    //     <DrawerContent bg="gray.800">
    //       <DrawerHeader borderBottomWidth="1px" id="drawer-header">
    //         Menu
    //       </DrawerHeader>
    //       <DrawerCloseButton
    //         id="drawer-close-button"
    //         _hover={{ color: "blue.200", cursor: "pointer" }}
    //       />
    //       <DrawerBody class="mobile-drawer">
    //         <Stack>
    //           <Button
    //             bg={location.pathname === "/" ? "blue.200" : "gray.400"}
    //             _hover={{ color: "blue.200", cursor: "pointer" }}
    //             onClick={() => {
    //               navigate("/");
    //               onClose();
    //             }}
    //           >
    //             Home
    //           </Button>
    //           <Button
    //             bg={location.pathname === "/coaches" ? "blue.200" : "gray.400"}
    //             _hover={{ color: "blue.200", cursor: "pointer" }}
    //             onClick={() => {
    //               navigate("/coaches");
    //               onClose();
    //             }}
    //           >
    //             Coaches
    //           </Button>
    //           <Button
    //             bg={location.pathname === "/about-us" ? "blue.200" : "gray.400"}
    //             _hover={{ color: "blue.200", cursor: "pointer" }}
    //             onClick={() => {
    //               navigate("/about-us");
    //               onClose();
    //             }}
    //           >
    //             About us
    //           </Button>
    //           <Button
    //             bg={location.pathname === "/contact" ? "blue.200" : "gray.400"}
    //             _hover={{ color: "blue.200", cursor: "pointer" }}
    //             onClick={() => {
    //               navigate("/contact");
    //               onClose();
    //             }}
    //           >
    //             Contact us
    //           </Button>
    //           <Popover>
    //             {() => (
    //               <>
    //                 <PopoverContent>
    //                   <PopoverArrow />
    //                   <PopoverCloseButton />

    //                   <PopoverBody bg="gray.400">
    //                     {" "}
    //                     <Flex justify="space-evenly">
    //                       <a
    //                         className="mobile-header-image"
    //                         href="https://www.instagram.com"
    //                         target="_blank"
    //                         rel="noopener noreferrer"
    //                       >
    //                         <image
    //                           className="mobile-header-image"
    //                           src={instagram}
    //                         ></image>
    //                       </a>
    //                       <image
    //                         className="mobile-header-image"
    //                         src={youtube}
    //                       ></image>{" "}
    //                     </Flex>
    //                   </PopoverBody>
    //                 </PopoverContent>{" "}
    //               </>
    //             )}
    //           </Popover>
    //         </Stack>
    //       </DrawerBody>
    //       <DrawerFooter id="drawer-footer" borderTopWidth="1px">
    //         {userData ? (
    //           <div id="mobile-header-log-in-info">
    //             <p>Welcome, {userData?.username}!</p>
    //             <Button
    //               _hover={{ color: "blue.200", cursor: "pointer" }}
    //               onClick={() => {
    //                 navigate("/");
    //                 logout();
    //                 onClose();
    //               }}
    //               bg="gray.400"
    //             >
    //               Sign Out
    //             </Button>{" "}
    //           </div>
    //         ) : (
    //           <>
    //             {" "}
    //             <Button
    //               _hover={{ color: "blue.200", cursor: "pointer" }}
    //               bg={
    //                 location.pathname === "/auth/login" ? "orange" : "gray.400"
    //               }
    //               m={2}
    //               onClick={() => {
    //                 navigate("/auth", { state: { isSignUp: true } });
    //                 onClose();
    //               }}
    //             >
    //               Sign In
    //             </Button>
    //             <Button
    //               _hover={{ color: "blue.200", cursor: "pointer" }}
    //               bg={
    //                 location.pathname === "/auth/register"
    //                   ? "orange"
    //                   : "gray.400"
    //               }
    //               onClick={() => {
    //                 navigate("/auth", {state: {isSignUp: false}});
    //                 onClose();

    //               }}
    //             >
    //               Sign Up
    //             </Button>
    //           </>
    //         )}
    //       </DrawerFooter>
    //     </DrawerContent>
    //   </Drawer>
    // </header>
    }
</>
  );
};

export default MobileHeader;
