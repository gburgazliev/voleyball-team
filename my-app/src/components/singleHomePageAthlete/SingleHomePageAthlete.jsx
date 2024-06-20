import React from 'react'
import { Box, Text, Wrap, WrapItem, Avatar, Flex} from '@chakra-ui/react'

const SingleHomePageAthlete = ({athlete}) => {
    return (
        <Flex w='100%' direction='column'  justify='center' align='center'>
            <Avatar name={athlete.firstname} src={athlete.picture} size='2xl' />
            <Text color='white'>{athlete.firstname}</Text>
            <Text color='white'>{athlete.lastname}</Text>
            
        </Flex>
    )
}

export default SingleHomePageAthlete