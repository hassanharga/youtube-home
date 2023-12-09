import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from 'lucide-react';
import { useState, type FC } from 'react';
import Logo from '../assets/Logo.png';
import Button from '../components/Button';
import { useSideBarContext } from '../contexts/sidebar.context';

const PageHeader: FC = () => {
  const [showFullScreenSearch, setShowFullScreenSearch] = useState(false);

  return (
    <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
      {/* #region logo & menu icon */}
      <PageHeaderFirstSection hidden={showFullScreenSearch} />
      {/* #endregion */}
      {/* #region notification */}
      {/* #region search */}
      <form
        className={`gap-4 flex-grow justify-center items-center ${showFullScreenSearch ? 'flex' : 'hidden md:flex'}`}
      >
        <div className="flex flex-grow max-w-[600px]">
          {showFullScreenSearch && (
            <Button
              size="icon"
              className="flex-shrink-0"
              type="button"
              variant="ghost"
              onClick={() => setShowFullScreenSearch(false)}
            >
              <ArrowLeft />
            </Button>
          )}
          <input
            type="search"
            placeholder="Search"
            className="rounded-l-full border border-secondary-border shadow-inner shadow-secondary py-1 px-4 text-lg w-full focus:border-blue-500 outline-none"
          />
          <Button className="py-2 px-4 rounded-r-full border border-secondary-border border-l-0" type="submit">
            <Search />
          </Button>
        </div>
        <Button size="icon" className="flex-shrink-0" type="button">
          <Mic />
        </Button>
      </form>
      {/* #endregion */}
      <div className={`items-center flex-shrink-0 md:gap-2 ${showFullScreenSearch ? 'hidden' : 'flex'}`}>
        {/* show only in small screens */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setShowFullScreenSearch(true)}>
          <Search />
        </Button>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Mic />
        </Button>
        <Button variant="ghost" size="icon">
          <Upload />
        </Button>
        <Button variant="ghost" size="icon">
          <Bell />
        </Button>
        <Button variant="ghost" size="icon">
          <User />
        </Button>
      </div>
      {/* #endregion */}
    </div>
  );
};

export default PageHeader;

type PageHeaderFirstSectionProps = { hidden: boolean };

export const PageHeaderFirstSection = ({ hidden }: PageHeaderFirstSectionProps) => {
  const { toggle } = useSideBarContext();

  return (
    <div className={`flex gap-4 items-center flex-shrink-0 ${hidden ? 'hidden' : 'flex'}`}>
      <Button size="icon" variant="ghost" onClick={toggle}>
        <Menu />
      </Button>
      <a href="/">
        <img src={Logo} alt="logo" className="h-6" />
      </a>
    </div>
  );
};
