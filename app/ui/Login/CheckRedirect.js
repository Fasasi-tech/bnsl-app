// hooks/useRedirect.js
'use client'
import { useRouter } from 'next/navigation';

const CheckRedirect = () => {
  const router = useRouter();
  const redirectToLogin = () => {
    router.push('/login');
  };

  return { redirectToLogin };
};

export default CheckRedirect;