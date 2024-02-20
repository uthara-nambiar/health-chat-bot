import { ClerkProvider, useSession } from '@clerk/clerk-react'; // Or your routing library's navigation function
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
function AuthRedirect({ children }) {
  const navigate = useNavigate();
  const session = useSession(); // Get user session

  useEffect(() => {
    if (session.status === 'authenticated') {
      if (session.isNewRegistration) {
        navigate('/onboarding'); // Redirect to onboarding if newly registered
      } else {
        navigate('/home'); // Redirect to home otherwise
      }
    }
  }, [session, navigate]);

  return children;
}

export default AuthRedirect