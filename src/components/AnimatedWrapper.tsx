'use client';

import { motion } from 'framer-motion';

export default function AnimatedWrapper({ children, ...props }: any) {
  return <motion.div {...props}>{children}</motion.div>;
} 