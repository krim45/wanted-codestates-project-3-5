import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { getProducts, getRegions } from '../../axios/axios';
import Skeleton from './Skeleton';
import PageNation from './PageNation';
import { useSelector } from 'react-redux';
import theme from '../../styles/theme';

const Results = () => {
  const { productsData, regionsData } = useSelector(state => ({
    productsData: state.data.productsData,
    regionsData: state.data.regionsData,
  }));
  console.log(productsData);
  const [_data, setData] = useState([]); // 상품목록
  const [page, setPage] = useState(1); // 5개의 페이지 버튼
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [isLoaded, setIsLoaded] = useState(false);

  const getDataFromJson = async () => {
    const data = await getProducts().then(data => {
      setTimeout(() => {
        setData(data);
        setIsLoaded(true);
      }, 1000);
    });
    // const data = await getRegions().then(data => {
    //   setTimeout(() => {
    //     setData(data);
    //     setIsLoaded(true);
    //   }, 1000);
    // });
  };
  console.log(currentPage);
  const totalPage = Math.ceil(_data.length / 15);
  useEffect(() => {
    getDataFromJson();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {/* to do : flex box or grid div 추가 */}
      <ItemContainer>
        {isLoaded ? (
          _data
            .slice(0 + 15 * (currentPage - 1) + 1, 15 * currentPage + 1)
            .map((el, index) => {
              return (
                <Item key={index} onClick={() => window.open(el.image_url)}>
                  <ItemImg src={el.image_url} />
                  <ItemName>{el.name}</ItemName>
                  <ItemPrice>{el.price}₩</ItemPrice>
                </Item>
              );
            })
        ) : (
          <Skeleton />
        )}
      </ItemContainer>
      <PageNation
        totalPage={totalPage}
        page={page}
        setPage={setPage}
        setCurrentPage={setCurrentPage}
      />
    </ThemeProvider>
  );
};

console.log(theme.device.tablet);

const ItemContainer = styled.div`
  max-width: 1280px;
  min-width: 420px;
  margin-right: auto;
  margin-left: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  grid-gap: 5px;
`;

const Item = styled.div`
  width: 230px;
  height: 400px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ItemImg = styled.img`
  width: 200px;
  height: 300px;
  margin-top: 20px;
`;
const ItemName = styled.div`
  margin: 10px;
`;
const ItemPrice = styled.div`
  color: blue;
  font-weight: bold;
  margin: 20px;
  text-align: right;
`;

export default Results;
