import styled from 'styled-components';
import { shade, lighten } from 'polished';

export const Container = styled.button`
  background: #ff9900;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #312e38;
  width: 100%;
  font-weight: 600;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#ff9900')};
  }

  &:disabled {
    background: ${lighten(0.2, '#ff9900')};
  }
`;
