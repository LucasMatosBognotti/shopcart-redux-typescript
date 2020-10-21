import styled from 'styled-components';

export const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  list-style: none;

  li {
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    padding: 20px;
    background: #FFF;

    img {
      max-width: 250px;
      align-self: center;
    }

    > strong {
      font-size: 16px;
      line-height: 20px;
      margin-top: 5px;
      color: #333;
    }

    > span {
      font-size: 21px;
      font-weight: bold;
      margin: 5px 0 20px;
    }

    button {
      display: flex;
      align-items: center;
      transition: background 0.2s;

      border: 0;
      border-radius: 4px;
      margin-top: auto;
      overflow: hidden;
      color: #FFF;
      background: #7159C1;
      
      &:hover {
        background: #7136C9;
      }

      div {
        display: flex;
        align-items: center;
        padding: 12px;
        background: rgba(0, 0, 0, 0.1);
      
        svg {
          margin-right: 5px;
        }
      }

      span {
        flex: 1;
        text-align: center;
        font-weight: bold;
      }
    }
  }
`;
