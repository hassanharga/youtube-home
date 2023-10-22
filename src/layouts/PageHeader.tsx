import { Menu } from 'lucide-react';
import type { FC } from 'react';
import Logo from '../assets/Logo.png';
import Button from '../components/button';

const PageHeader: FC = () => {
  return (
    <div className="flex gap-10 lg:gap-20 justify-between">
      {/* #region logo & menu icon */}
      <div className="flex gap-4 items-center flex-shrink-0">
        <Button size="icon" variant="ghost">
          <Menu />
        </Button>
        <a href="/">
          <img src={Logo} alt="logo" className="h-6" />
        </a>
      </div>
      {/* #endregion */}
    </div>
  );
};

export default PageHeader;
