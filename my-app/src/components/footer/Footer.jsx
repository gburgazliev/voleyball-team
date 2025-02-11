/**
 * Footer component for the website.
 * Displays information about SB Community sports agency and staff contacts.
 *
 * @component
 * @example
 * return (
 *   <Footer />
 * )
 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandshake,
  faUsers,
  faPhone,
  faMailBulk,
  faLocation,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Flag from "react-world-flags";
import { Separator } from "@chakra-ui/react";
import location from "../../assets/location.png";
import phone from "../../assets/phone.png";
import letter from "../../assets/letter.png";

import { Image, Flex, Heading, Text, Box } from "@chakra-ui/react";
import "./footer.css";

const Footer = () => {
  return (
    <>
      <footer className="mobile-footer">
        <h6 className="heading">
          Heaven-07 was founded by a team of former professional volleyball
          activists , coaches, and industry experts who share a deep love for
          the game. Our diverse backgrounds and extensive experience in the
          world of volleyball give us a unique perspective and the ability to
          provide comprehensive support to our clients. Whether you are an
          athlete looking to take your career to the next level, a coach seeking
          innovative training methods, or an organization aiming to enhance your
          volleyball programs, Heaven-07 is here to help you succeed. Join us in
          our mission to elevate the game of volleyball and create a brighter
          future for the sport we love. Contact us today to learn more about how
          we can support you on your volleyball journey. Welcome to Heaven-07,
          where the sky is the limit!
        </h6>
        <div className="divider">
          <Separator />
        </div>

        <Flex
          direction={["column", "column", "row", "row"]}
          w="100%"
          gap={[0, 0, 5, 5]}
          justifyContent="space-evenly"
          alignItems="center"
          pb={5}
        >
          <Flex
            direction="column"
            justifyContent="center"
            alignItems="center"
            p={2}
          >
            <Heading>Vicho Kolev</Heading>
            <Flex
              direction={["row", "row", "column", "column"]}
              alignItems="center"
              justifyContent="center"
              gap={2}
            >
              <Text
                display="flex"
                gap={2}
                textAlign="center"
                justifyContent="center"
                alignItems="center"
                fontSize="clamp(12px, 3vw, 1rem)"
              >
                <FontAwesomeIcon icon={faPhone} />
                +359 88 6676470
              </Text>

              <Text
                display="flex"
                gap={2}
                textAlign="center"
                justifyContent="center"
                alignItems="center"
                fontSize="clamp(12px, 3vw, 1rem)"
              >
                {" "}
                <FontAwesomeIcon size="sm" icon={faLocation} />
                Owner - Sofia, Bulgaria
              </Text>

              <Text
                display="flex"
                gap={2}
                textAlign="center"
                justifyContent="center"
                alignItems="center"
                fontSize="clamp(12px, 3vw, 1rem)"
              >
                <FontAwesomeIcon icon={faMailBulk} />
                heaven07@abv.bg
              </Text>
            </Flex>
          </Flex>

          <Flex justifyContent="center">
            <Flex direction="column" gap={2}>
              <Flex justifyContent="center" align="center">
                <Flag code="UA" style={{ width: "64px", height: "20px" }} />
                <Heading mt={3} textAlign="center">
                  Official partner for Ukraine{" "}
                </Heading>
                <Flag code="UA" style={{ width: "64px", height: "20px" }} />
              </Flex>

              <Flex
                justifyContent="center"
                direction={["row", "row", "column", "column"]}
                gap={2}
              >
                <Text textAlign="center" fontSize="clamp(12px, 3vw, 1rem)">
                  <FontAwesomeIcon icon={faUser} /> Oleksandr Statsenko
                </Text>
                <Text textAlign="center" fontSize="clamp(12px, 3vw, 1rem)">
                  <FontAwesomeIcon icon={faPhone} /> +380 (50) 607 18 49
                </Text>
              </Flex>
            </Flex>
          </Flex>

          <Flex direction="column" gap={2}>
            <Flex justifyContent="center" align="center" mt={3}>
              {" "}
              <Flag code="US" style={{ width: "64px", height: "20px" }} />
              <Heading textAlign="center"> Consultant for USA </Heading>
              <Flag code="US" style={{ width: "64px", height: "20px" }} />
            </Flex>
            <Flex
              justifyContent="center"
              direction={["row", "row", "column", "column"]}
              gap={2}
            >
              <Text textAlign="center" fontSize="clamp(12px, 3vw, 1rem)">
                <FontAwesomeIcon icon={faUser} /> Radoslav Popov
              </Text>
            </Flex>
          </Flex>
          <Flex direction="column" gap={2}>
            <Flex justifyContent="center" align="center" mt={3}>
              {" "}
              <Flag code="TUR" style={{ width: "64px", height: "20px" }} />
              <Heading textAlign="center">Consultant for Turkey </Heading>
              <Flag code="TUR" style={{ width: "64px", height: "20px" }} />
            </Flex>
            <Flex
              justifyContent="center"
              direction={["row", "row", "column", "column"]}
              gap={2}
            >
              <Text textAlign="center" fontSize="clamp(12px, 3vw, 1rem)">
                <FontAwesomeIcon icon={faUser} /> Imkan Colakoglu
              </Text>
              <Text textAlign="center" fontSize="clamp(12px, 3vw, 1rem)">
                <FontAwesomeIcon icon={faPhone} /> +90 530 353 03 17
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Text fontSize="sm" pb={2} color="gray.500" fontFamily="fantasy">
          © {new Date().getFullYear()} Heaven07. All rights reserved.
        </Text>
      </footer>
    </>
  );
};

export default Footer;
