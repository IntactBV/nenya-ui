import { LogInScreen } from '@uiScreens/public/LogIn';
import { AuthProvider } from '@/src/domain/contexts/AuthProvider';

export default function LoginPage() {
  return (
    <AuthProvider>
      <LogInScreen />
    </AuthProvider>
  );
}
