import { Box, Container, Flex, Textarea, Text, Heading, Image, Spacer, HStack, Divider } from "@chakra-ui/react";
import location from "../../assets/location.png";
import phone from "../../assets/phone.png";
import letter from "../../assets/letter.png";

const Footer = () => {
    return (
        <Flex  h='100%' w={['50%', '100%', '100%', '100%']} bgColor='black' textColor='white' justify='center' align='center' paddingTop={20} >

            <Box h='100%' w='70%' marginBottom={100} justify='center' align='center'>
                <Flex w='100%' h='100%' textColor='white' justify='space-between' paddingTop={10}>
                    <Text w={['50%', '20%', '20%', '20%']} fontSize={['sm', 'sm', 'lg', 'lg']}>
                        <Heading size='sm' marginBottom={5}>SB COMMUNITY</Heading>
                        SB Community is a full service sports agency, representing players and team staff.
                        As a full service sports agency, we offer our clients an array of services including contractual,
                        financial and personal consulting, thus enabling them to more fully focus on their craft.
                        We have connections with teams and players in every market around the world.
                        With a strong world-wide presence our unique business model has opened doors in every
                        major market for volleyball & awarded our clients lucrative playing contracts.
                    </Text>
                    <Divider orientation="vertical" h='700px' bg='red' borderWidth="2px"  >

</Divider>
                    <Flex direction='column'>

                        <Heading size='sm' marginBottom={5}>Boris SIMURIJA</Heading>
                        <Flex direction='column' justify='center' align='center'>
                            <Flex>
                                <Image src={location} boxSize='30px' ></Image>

                                <Text paddingLeft={2}>
                                    Owner
                                </Text>
                            </Flex>
                            <Flex >
                                <Image src={phone} boxSize='30px'></Image>
                                <Text>
                                    +1 (202) 378-0493
                                </Text>
                            </Flex>
                            <Flex >
                                <Image src={letter} boxSize='30px'></Image>
                                <Text paddingLeft={2}>
                                    office@sb-community.com
                                </Text>
                            </Flex>
                        </Flex>
         
                        <Heading size='sm' marginTop={10} marginBottom={5}>Bojan SIMURIJA</Heading>

                        <Flex direction='column' align='center'>
                            <Flex >
                                <Image src={location
                                } boxSize='30px' ></Image>
                                <Text paddingLeft={2}>
                                Licenced FIVB Agent
                                </Text>

                            </Flex>

                            <Flex  >
                                <Image src={phone
                                } boxSize='30px' ></Image>
                                <Text >
                                    +381 (63)881-2236
                                </Text>

                            </Flex>

                            <Flex >
                                <Image src={letter
                                } boxSize='30px' ></Image>
                                <Text paddingLeft={2}>
                                boris@sb-community.com
                                </Text>

                            </Flex>
                            
                        </Flex>


                        <Heading size='sm' marginBottom={5} marginTop={10}>EKATERINA FEDOROVTSEVA</Heading>
                        <Flex direction='column' justify='center' align='center'>
                            <Flex>
                                <Image src={location} boxSize='30px' ></Image>

                                <Text paddingLeft={2}>
                                General Manager of Russian department
                                </Text>
                            </Flex>
                            <Flex >
                                <Image src={phone} boxSize='30px'></Image>
                                <Text>
                                +7 (926) 530 1836
                                </Text>
                            </Flex>
                            <Flex >
                                <Image src={letter} boxSize='30px'></Image>
                                <Text paddingLeft={2}>
                                katya@sb-community.com
                                </Text>
                            </Flex>
                        </Flex>
                        <Heading size='sm' marginBottom={5} marginTop={10}>BILJANA METLAS</Heading>
                        <Flex direction='column' justify='center' align='center'>
                            <Flex>
                                <Image src={location} boxSize='30px' ></Image>

                                <Text paddingLeft={2}>
                                Organizing Director
                                </Text>
                            </Flex>
                            <Flex >
                                <Image src={phone} boxSize='30px'></Image>
                                <Text>
                                +381 (60) 4011 028
                                </Text>
                            </Flex>
                            <Flex >
                                <Image src={letter} boxSize='30px'></Image>
                                <Text paddingLeft={2}>
                                biljana@sb-community.com
                                </Text>
                            </Flex>
                        </Flex>
                        

                    </Flex>

                    <Divider orientation="vertical" height='700px' bg='red' borderWidth="2px"  >

</Divider>
                    <Flex direction='column'>

<Heading size='sm' marginBottom={5}>Boris SIMURIJA</Heading>
<Flex direction='column' justify='center' align='center'>
    <Flex>
        <Image src={location} boxSize='30px' ></Image>

        <Text paddingLeft={2}>
            Owner
        </Text>
    </Flex>
    <Flex >
        <Image src={phone} boxSize='30px'></Image>
        <Text>
            +1 (202) 378-0493
        </Text>
    </Flex>
    <Flex >
        <Image src={letter} boxSize='30px'></Image>
        <Text paddingLeft={2}>
            office@sb-community.com
        </Text>
    </Flex>
</Flex>
<Heading size='sm' marginTop={10} marginBottom={5}>Bojan SIMURIJA</Heading>

<Flex direction='column' align='center'>
    <Flex >
        <Image src={location
        } boxSize='30px' ></Image>
        <Text paddingLeft={2}>
        Licenced FIVB Agent
        </Text>

    </Flex>

    <Flex  >
        <Image src={phone
        } boxSize='30px' ></Image>
        <Text >
            +381 (63)881-2236
        </Text>

    </Flex>

    <Flex >
        <Image src={letter
        } boxSize='30px' ></Image>
        <Text paddingLeft={2}>
        boris@sb-community.com
        </Text>

    </Flex>
    
</Flex>


<Heading size='sm' marginBottom={5} marginTop={10}>EKATERINA FEDOROVTSEVA</Heading>
<Flex direction='column' justify='center' align='center'>
    <Flex>
        <Image src={location} boxSize='30px' ></Image>

        <Text paddingLeft={2}>
        General Manager of Russian department
        </Text>
    </Flex>
    <Flex >
        <Image src={phone} boxSize='30px'></Image>
        <Text>
        +7 (926) 530 1836
        </Text>
    </Flex>
    <Flex >
        <Image src={letter} boxSize='30px'></Image>
        <Text paddingLeft={2}>
        katya@sb-community.com
        </Text>
    </Flex>
</Flex>
<Heading size='sm' marginBottom={5} marginTop={10}>BILJANA METLAS</Heading>
<Flex direction='column' justify='center' align='center'>
    <Flex>
        <Image src={location} boxSize='30px' ></Image>

        <Text paddingLeft={2}>
        Organizing Director
        </Text>
    </Flex>
    <Flex >
        <Image src={phone} boxSize='30px'></Image>
        <Text>
        +381 (60) 4011 028
        </Text>
    </Flex>
    <Flex >
        <Image src={letter} boxSize='30px'></Image>
        <Text paddingLeft={2}>
        biljana@sb-community.com
        </Text>
    </Flex>
</Flex>


</Flex>
                </Flex>
            </Box>

        </Flex>
    );
}

export default Footer;