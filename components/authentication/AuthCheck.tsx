import { useSession } from 'next-auth/react';
import { useRouter } from "next/router";
import { useEffect } from 'react';

const AuthCheck = (props:any) => {
    const { data: session, status } = useSession();
    const loading = status === 'loading';
    const router = useRouter();
    
    useEffect(()=>{
      if (!session){
        router.replace('/signin') 
      } 
    },[session])

    // When rendering client side don't display anything until loading is complete
    if (typeof window !== 'undefined' && loading) return null

    if (session) {
      return props.children
    }
    
}

export default AuthCheck