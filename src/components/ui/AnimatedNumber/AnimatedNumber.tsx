'use client';

import { animate, useMotionValue, useTransform, motion } from 'framer-motion';
import { FC, useEffect } from 'react';

const AnimatedNumber: FC<{ animateToNumber: number }> = ({
  animateToNumber,
}) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const animation = animate(count, animateToNumber, { duration: 1 });

    return animation.stop;

    //eslint-disable-next-line
  }, []);

  return <motion.div>{rounded}</motion.div>;
};

export default AnimatedNumber;
