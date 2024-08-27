import { Outlet, useNavigation } from 'react-router-dom';
import { AppFooter, AppHeader, AppSpinner } from '@/components';

function RootLayout() {
  const navigation = useNavigation();

  const isLoading = navigation.state === 'loading';

  return (
    <div className="">
      <AppHeader />
      <main className="">{isLoading ? <AppSpinner /> : <Outlet />}</main>
      <AppFooter />
    </div>
  );
}

export default RootLayout;
