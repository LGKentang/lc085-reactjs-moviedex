import React from 'react';
import styled from 'styled-components'

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  background-color: transparent;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: ${({active}) => active ? 'black' : '#555'};
  cursor: pointer;
  font-weight: ${({active}) => active ? 'bold' : 'normal'};
  padding: 5px 10px;
  transition: background-color 0.3s ease;
  margin-right: 5px;
  margin-bottom: 30px;
  margin-top: 20px;

  &:hover {
    background-color: #ddd;
  }
`;

const PaginationDots = styled.span`
  margin: 0 5px;
`;

const Pagination = ({ currentPage, pageSize, totalItems, onPageClick }) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleClick = (page) => {
    onPageClick(page);
  };

  const showFirstPages = currentPage > 3;
  const showLastPages = totalPages - currentPage > 2;

  let pagesToShow = [];
  if (showFirstPages) {
    pagesToShow.push(1, '...');
  }
  for (let i = currentPage - 1; i <= currentPage + 1; i++) {
    if (i >= 1 && i <= totalPages) {
      pagesToShow.push(i);
    }
  }
  if (showLastPages) {
    pagesToShow.push('...', totalPages);
  }

  return (
    <PaginationContainer>
      <PaginationButton
        disabled={currentPage === 1}
        onClick={() => handleClick(1)}
      >
        {'<<'}
      </PaginationButton>

      <PaginationButton
        disabled={currentPage === 1}
        onClick={() => handleClick(currentPage - 1)}
      >
        {'<'}
      </PaginationButton>

      {pagesToShow.map((page, index) => {
        if (page === '...') {
          return <PaginationDots key={index}>{page}</PaginationDots>;
        }
        return (
          <PaginationButton
            key={index}
            active={page === currentPage}
            onClick={() => handleClick(page)}
          >
            {page}
          </PaginationButton>
        );
      })}

      <PaginationButton
        disabled={currentPage === totalPages}
        onClick={() => handleClick(currentPage + 1)}
      >
        {'>'}
      </PaginationButton>

      <PaginationButton
        disabled={currentPage === totalPages}
        onClick={() => handleClick(totalPages)}
      >
        {'>>'}
      </PaginationButton>
    </PaginationContainer>
  );
};

export default Pagination;
