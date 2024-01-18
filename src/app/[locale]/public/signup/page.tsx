import { SignUpScreen } from '@uiScreens/public/SignUp';
import { AuthProvider } from '@/src/domain/contexts/AuthProvider';

export default function LoginPage() {
  return (
    <AuthProvider>
      <SignUpScreen />
    </AuthProvider>
  );
}
