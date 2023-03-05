import type { FC, ReactNode } from 'react';
import { useRef, } from 'react';

import * as styles from './AspectRatio.styles';

type Props = {
  widthRatio: number;
  heightRatio: number;
  children: ReactNode;
};

export const AspectRatio: FC<Props> = ({ children, heightRatio, widthRatio }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className={styles.container({ heightRatio, widthRatio })}>
      {children}
    </div>
  );
};
