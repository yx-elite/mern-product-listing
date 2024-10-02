import React, { useEffect } from 'react'
import { Container, SimpleGrid, VStack, Link, Text } from '@chakra-ui/react'

import ProductCard from '../components/ProductCard'
import { useProductStore } from '../store/product';

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log(products);

  return (
    <Container maxW={'container.lg'} py={12}>
      <VStack spacing={2}>
        <Text fontSize={'2xl'} textAlign={'center'} mb={10}>
          Discover the latest {' '}
          <Text as={'b'} bgGradient={'linear(to-tr, #4158D0, #C850C0, #FFCC70)'} bgClip={"text"}>
            Apple Products
          </Text>
          , exclusively available in this summer release.
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w={'full'}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {products.length === 0 && (  
          <>
            <Text fontSize={'lg'} textAlign={'center'} color={'gray.500'} fontStyle={'italic'}>
              No products added yet. Stay tuned!
            </Text>
            <Link href={"/create"}>
              <Text fontSize={'lg'} textAlign={'center'} color={'blue.500'} fontStyle={'italic'}>
                Create a new product to get started.
              </Text>
            </Link>
          </>        
        )}

      </VStack>
    </Container>
  )
}

export default HomePage