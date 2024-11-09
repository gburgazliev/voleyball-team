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
          direction="column"
          w="100%"
          justifyContent="center"
          alignItems="center"
          pb={5}
        >
          <Heading>Vicho Kolev</Heading>
          <Flex
            w="100%"
            fontSize="clamp(8px, 2.5vw, 1rem)"
            alignItems="center"
            justifyContent="center"
           gap={2}
            
          >
            <Image
              w="20px "
              height="20px"
              borderRadius="full"
              src={phone}
              alt="location"
            />
            <Text> +359 88 6676470</Text>

            <Image
              w="20px "
              height="20px"
              borderRadius="full"
              src={location}
              alt="location"
            />
            <Text>Owner - Sofia, Bulgaria</Text>

            <Image
              w="20px "
              height="20px"
              borderRadius="full"
              src={letter}
              alt="letter"
            />
            <Text>heaven07@abv.bg</Text>
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
