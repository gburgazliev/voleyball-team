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
            <Avatar name={athlete.firstname} src={athlete.picture} size='2xl' onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                position="relative">
                {isAdmin() && isHovered && <Flex justify='space-evenly' direction='column' position='absolute'> <Button zIndex={10} colorScheme='red' onClick={() => navigate(`/detailed-athlete-view/:${athlete.uid}`)}>View profile</Button>
                    <Button colorScheme='red' onClick={() => handleDeleteAthlete(athlete.uid)}>Delete</Button></Flex>}
                {!isAdmin() && isHovered && <Flex justify='space-evenly' direction='column' position='absolute'> <Button zIndex={10} colorScheme='red' onClick={() => navigate(`/detailed-athlete-view/:${athlete.uid}`)}>View profile</Button>
                </Flex>}
            </Avatar>
            <Flex justify='space-evenly' w='100%'>
                <Text color='white'>{athlete.firstname}</Text>
                <Text color='white'>{athlete.lastname}</Text>
            </Flex>


        </Flex>
    )
}

export default SingleHomePageAthlete