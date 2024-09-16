import { Outlet, useNavigation } from 'react-router-dom';
import { AppFooter, AppHeader, AppSpinner } from '@/components';

function RootLayout() {
  const navigation = useNavigation();

  const isLoading = navigation.state === 'loading';

  return (
    <>
      <AppHeader />
      {isLoading ? <AppSpinner /> : <Outlet />}
      <AppFooter />
    </>
  );
}

export default RootLayout;
