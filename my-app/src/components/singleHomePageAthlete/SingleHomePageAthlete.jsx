/**
 * Renders a single athlete component for the home page.
 * @param {Object} props - The component props.
 * @param {Object} props.athlete - The athlete object.
 * @param {boolean} props.isAdmin - Indicates if the user is an admin.
 * @returns {JSX.Element} The rendered component.
 */
import React from 'react'
import { Box, Text, Wrap, WrapItem, Avatar, Flex, Button } from '@chakra-ui/react'
import { useState } from 'react'
import { handleDeleteAthlete } from '../../utils/utils'
import { useNavigate } from 'react-router-dom'

const SingleHomePageAthlete = ({ athlete, isAdmin }) => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate()

    return (
        <Flex w='100%' direction='column' justify='center' align='center'>
            <Avatar name={athlete.firstname} src={athlete.picture} size={['xl', 'lg', '2xl', '2xl']} onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                position="relative">
                {isAdmin() && isHovered && <Flex justify='space-evenly' direction='column' position='absolute'> <Button zIndex={10} colorScheme='red' onClick={() => navigate(`/detailed-athlete-view/:${athlete.uid}`)}>View profile</Button>
                    <Button colorScheme='red' onClick={() => handleDeleteAthlete(athlete.uid)}>Delete</Button></Flex>}
                {!isAdmin() && isHovered && <Flex  w={['100%', '10%', '90%', '90%']} justify='center' direction='column' position='absolute'> <Button  size={['sm', 'sm', 'md', 'md']}  w='100%'  zIndex={10} colorScheme='red' onClick={() => navigate(`/detailed-athlete-view/:${athlete.uid}`)}>View profile</Button>
                </Flex>}
            </Avatar>
            <Flex direction='column'justify='center' align='center' w='100%'>
                <Text >{athlete.firstname}</Text>
                <Text >{ athlete.lastname}</Text>
            </Flex>


        </Flex>
    )
}

export default SingleHomePageAthlete