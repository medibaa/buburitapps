import { useEffect, useState } from "react";
import Link from "next/link";

import { getProduct } from "../../api/storeAPI";
import { getRandomInt } from "../../helpers/number";

import {
  Container,
  Hero,
  Text,
  Title,
  ProductWrapper,
  ProductTitle,
  ProductList,
  ProductBox,
  ProductButton,
  ProductImage,
  ProductImageWrapper,
  ProductDetailTitle,
  ProductDetail,
  ProductDetailPrice,
  ProductDetailDesc,
  ProductDetailCategory,
  HeroImage,
  SubTitle,
  HeroRow,
  Wrapper,
  ProductCol,
} from "./styled";

const LandingPage = () => {
  const [listProduct, setListProduct] = useState([]);

  const getListProduct = async () => {
    const [resultFirstPage,  ] = //resultSecondPage, resultThirdPage
      await Promise.all([
        getProduct({ page: 1 }),
        getProduct({ page: 2 }),
        getProduct({ page: 3 }),
        getProduct({ page: 4 }),
      ]);

    const { result: firstPageProduct } = resultFirstPage || [];
    const { result: secondPageProduct } = resultFirstPage || [];
    const { result: thirdPageProduct } = resultFirstPage || [];

    const productData =
      [...firstPageProduct , ...secondPageProduct, ...thirdPageProduct,] || []; //

    const getFirstItem = getRandomInt(0, productData.length - 8);
    const sliceProduct = productData.slice(getFirstItem, getFirstItem + 8);
    setListProduct(sliceProduct);
  };

  useEffect(() => {
    getListProduct();
  }, []);

  return (
    <>
      <Container src="./assets/hero-new.webp" color="#fff" zIndex="1">
        <Wrapper>
          <Hero>
            <HeroRow>
              <HeroImage src="./assets/hero-1-new.png" />
            </HeroRow>
            <HeroRow>
              <Text>
                <Title>Kami Menjual Jangkrik secara daring </Title>
                <SubTitle>
                  Blunet adalah toko jangkrik online yang dapat memberikan pengalaman
                  terbaik untuk pembeli 
                </SubTitle>
                <Link href="/store" passHref>
                  <ProductButton>Explore produk</ProductButton>
                </Link>
              </Text>
            </HeroRow>
          </Hero>
        </Wrapper>
      </Container>
      <Container color="#ecf1f9" zIndex="0">
        <Wrapper mt="100px">
          <ProductTitle>Product</ProductTitle>
          <ProductWrapper>
            <ProductList>
              {listProduct.map((product, index) => {
                return (
                  <ProductCol key={index}>
                    <Link href={`/store/${product.id}`} passHref>
                      <ProductBox>
                        <ProductImageWrapper>
                          <ProductImage src={product.image} />
                        </ProductImageWrapper>
                        <ProductDetail>
                          <ProductDetailCategory>
                            {product.category}
                          </ProductDetailCategory>
                          <ProductDetailTitle>
                            {product.title}
                          </ProductDetailTitle>
                          <ProductDetailPrice>
                          Rp {product.price}
                          </ProductDetailPrice>
                          <ProductDetailDesc>
                            {product.description}
                          </ProductDetailDesc>
                        </ProductDetail>
                      </ProductBox>
                    </Link>
                  </ProductCol>
                );
              })}
            </ProductList>
            <Link href="/store" passHref>
              <ProductButton>Lihat seluruh produk</ProductButton>
            </Link>
          </ProductWrapper>
        </Wrapper>
      </Container>
    </>
  );
};

export default LandingPage;
