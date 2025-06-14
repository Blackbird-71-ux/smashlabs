'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function ConditionalNavbar() {
  const pathname = usePathname();
  
  // Hide navbar on these pages
  const hideNavbarPages = ['/book', '/contact'];
  
  if (hideNavbarPages.includes(pathname)) {
    return null;
  }
  
  return <Navbar />;
} 