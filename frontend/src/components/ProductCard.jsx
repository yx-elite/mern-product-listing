import React, { useState } from 'react'
import {
  Box,
  Image,
  Text,
  Heading,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  IconButton,
  useColorModeValue,
  useToast,
  Input,
  VStack,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { FaRegEdit, FaTrash } from 'react-icons/fa'
import { useProductStore } from '../store/product';


const ProductCard = ({product}) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const { isOpen, onOpen, onClose } = useDisclosure()

  const textColor = useColorModeValue('gray.800', 'white')
  const descriptionColor = useColorModeValue('gray.600', 'gray.400')
  const bgColor = useColorModeValue('white', 'gray.800')

  const toast = useToast();
  const { deleteProduct, updateProduct } = useProductStore();

  const handleDeleteProduct = async (productId) => {
    const { success, message } = await deleteProduct(productId);
    if (!success) {
      toast({
        title: 'Error deleting product.',
        description: message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Product deleted successfully',
        description: message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }
  }

  const handleUpdateProduct = async (productId, updatedProduct) => {
    const { success, message } = await updateProduct(productId, updatedProduct);
    onClose();
    if (!success) {
      toast({
        title: 'Error updating product.',
        description: message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Product updated successfully',
        description: message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }
  }
  return (
    <Box
      w={'full'}
      borderRadius={'lg'}
      boxShadow={'lg'}
      transition={'all 0.3s'}
      overflow={'hidden'}
      bg={bgColor}
      _hover={{ transform: 'translateY(-5px)', boxShadow: 'xl' }}
    >
      <Image src={product.image} alt={product.name} h={64} w={'full'} objectFit={'cover'} />
      <Box p={4}>
        <Heading as={'h3'} size={'md'} color={textColor} noOfLines={1} mb={2}>{product.name}</Heading>
        <Text fontSize={'sm'} color={descriptionColor} noOfLines={2} mb={4} h={10}>{product.description}</Text>
        <Text as={'b'} fontSize={'md'} color={textColor} noOfLines={1} mb={2}>{`RM ${product.price}`}</Text>

        <HStack mt={4} spacing={4}>
          <IconButton icon={<FaRegEdit />} colorScheme={'blue'} aria-label={'update'} onClick={onOpen}/>
          <IconButton icon={<FaTrash />} colorScheme={'red'} aria-label={'delete'} onClick={() => handleDeleteProduct(product._id)}/>
        </HStack>
      </Box>

      {/* Modal for updating product */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder={'Product Name'}
                name={'name'}
                value={updatedProduct.name}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
              />
              <Input
                placeholder={'Image URL'}
                name={'image'}
                value={updatedProduct.image}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
              />
              <Input
                placeholder={'Descriptions'}
                name={'description'}
                value={updatedProduct.description}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })}
              />
              <Input
                placeholder={'Price'}
                name={'price'}
                type={'number'}
                value={updatedProduct.price}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
          <Button 
            fontSize={'lg'}
            bgGradient={'linear(to-r, rgb(124, 133, 204), rgb(210, 133, 203), rgb(255, 230, 184))'}
            bgClip={"button"}
            color={useColorModeValue('white', 'black')}
            shadow={'md'}
            _hover={{ bgGradient: 'linear(to-r, rgb(137, 147, 225), rgb(231, 147, 224), rgb(255, 253, 202))', bgClip:"button"}}
            onClick={() => handleUpdateProduct(product._id, updatedProduct)}
          >
            Save Changes
          </Button>
          <Button variant='ghost' onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>

      </Modal>
    </Box>
  )
}

export default ProductCard