import React from 'react'
import { Button, Container, Flex, HStack, Link, Text, useColorMode } from '@chakra-ui/react'
import { FaApple } from "react-icons/fa";
import { FaRegSquarePlus } from "react-icons/fa6";
import { MdDarkMode, MdLightMode } from "react-icons/md";


const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={'1140px'} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <HStack spacing={4} alignItems={"center"}>
          <FaApple size={"30"} />
          <Text
            fontSize={{ base: "22", sm: "25" }}
            fontWeight={"bold"}
            textTransform={"uppercase"}
            textAlign={"center"}
            bgGradient={'linear(to-tr, #4158D0, #C850C0, #FFCC70)'}
            bgClip={"text"}
          >
            <Link href={"/"}>Apple Store</Link>
          </Text>  
        </HStack>

        <HStack spacing={2} alignItems={"center"}>
          <Link href={"/create"}>
            <Button variant={"ghost"}>
              <FaRegSquarePlus size={"20"} />
            </Button>
          </Link>
          <Button variant={"ghost"} onClick={toggleColorMode}>
            {colorMode === "light" ? <MdDarkMode size={"20"} /> : <MdLightMode size={"20"} />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  )
}

export default Navbar