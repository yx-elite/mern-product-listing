import React, { useState } from 'react'
import { Box, Button, Container, VStack, Heading, Input, useColorModeValue, useToast } from '@chakra-ui/react'

import { useProductStore } from '../store/product';

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    image: "",
    description: "",
    price: "",
  })

  const toast = useToast();
  
  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toast({
        title: 'Error creating product.',
        description: message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Product created successfully',
        description: message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }
    setNewProduct({name: "", image: "", description: "", price: ""});
  }

  return (
    <Container maxW={'container.sm'}>
      <VStack spacing={4} mt={8}>
        <Heading as={'h1'} size={'xl'} textAlign={'center'} mt={8} mb={8}>
          Create New Product
        </Heading>

        <Box 
          w={'full'} 
          bg={useColorModeValue('white', 'gray.800')}
          p={6}
          borderRadius={'lg'}
          boxShadow={'md'}
        >
          <VStack spacing={4}>
            <Input
              placeholder={'Product Name'}
              name={'name'}
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <Input
              placeholder={'Image URL'}
              name={'image'}
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            />
            <Input
              placeholder={'Descriptions'}
              name={'description'}
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            />
            <Input
              placeholder={'Price'}
              name={'price'}
              type={'number'}
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <Button
              fontSize={'lg'}
              bgGradient={'linear(to-r, rgb(124, 133, 204), rgb(210, 133, 203), rgb(255, 230, 184))'}
              bgClip={"button"}
              color={useColorModeValue('white', 'black')}
              shadow={'md'}
              _hover={{ bgGradient: 'linear(to-r, rgb(137, 147, 225), rgb(231, 147, 224), rgb(255, 253, 202))', bgClip:"button"}}
              mt={4} p={6} w={'full'}
              onClick={handleAddProduct}
            >
              Create Product
            </Button>
          </VStack>

        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage