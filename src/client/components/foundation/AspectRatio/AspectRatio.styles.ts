import { css } from '@emotion/css';

export const container = ({ heightRatio, widthRatio }:{widthRatio:number, heightRatio:number }) => css`
  aspect-ratio: ${widthRatio}/${heightRatio};
  position: relative;
  max-width: 1024px;
  width: 100%;
`;
