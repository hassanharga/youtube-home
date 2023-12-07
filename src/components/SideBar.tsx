import {
  ChevronDown,
  ChevronUp,
  Clapperboard,
  Clock,
  Film,
  Flame,
  Gamepad2,
  History,
  Home,
  Library,
  Lightbulb,
  ListVideo,
  Music2,
  Newspaper,
  PlaySquare,
  Podcast,
  Radio,
  Repeat,
  Shirt,
  ShoppingBag,
  Trophy,
} from 'lucide-react';
import { Children, ElementType, FC, ReactNode, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { playlists, subscriptions } from '../data/sidebar';
import Button, { btnStyles } from './Button';

const SideBar: FC = () => {
  return (
    <>
      <aside className="sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 lg:hidden">
        <SmallSideBarItem Icon={Home} title="Home" url="/" />
        <SmallSideBarItem Icon={Repeat} title="Shorts" url="/shorts" />
        <SmallSideBarItem Icon={Clapperboard} title="Subscriptions" url="/subscriptions" />
        <SmallSideBarItem Icon={Library} title="Library" url="/library" />
      </aside>
      <aside className="w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col gap-2 px-2">
        <LargeSideBarSection>
          <LargeSideBarItem isActive IconOrImgUrl={Home} title="Home" url="/" />
          <LargeSideBarItem IconOrImgUrl={Clapperboard} title="Subscriptions" url="/subscriptions" />
          <hr />
        </LargeSideBarSection>
        <LargeSideBarSection visibleItemCount={5}>
          <LargeSideBarItem IconOrImgUrl={Library} title="Library" url="/library" />
          <LargeSideBarItem IconOrImgUrl={History} title="History" url="/history" />
          <LargeSideBarItem IconOrImgUrl={PlaySquare} title="Your Videos" url="/your-videos" />
          <LargeSideBarItem IconOrImgUrl={Clock} title="Watch Later" url="/playList?list=WL" />
          {playlists.map((ele) => (
            <LargeSideBarItem key={ele.id} IconOrImgUrl={ListVideo} title={ele.name} url={`/playList?list=${ele.id}`} />
          ))}
        </LargeSideBarSection>
        <hr />
        <LargeSideBarSection visibleItemCount={5} title="Subscriptions">
          {subscriptions.map((sub) => (
            <LargeSideBarItem key={sub.id} IconOrImgUrl={sub.imgUrl} title={sub.channelName} url={`/@${sub.id}`} />
          ))}
        </LargeSideBarSection>
        <hr />
        <LargeSideBarSection visibleItemCount={5} title="Explore">
          <LargeSideBarItem IconOrImgUrl={Flame} title="Trending" url="/trending" />
          <LargeSideBarItem IconOrImgUrl={ShoppingBag} title="Shopping" url="/shopping" />
          <LargeSideBarItem IconOrImgUrl={Music2} title="Music" url="/music" />
          <LargeSideBarItem IconOrImgUrl={Film} title="Movies & TV" url="/movies-tv" />
          <LargeSideBarItem IconOrImgUrl={Radio} title="Live" url="/live" />
          <LargeSideBarItem IconOrImgUrl={Gamepad2} title="Gaming" url="/gaming" />
          <LargeSideBarItem IconOrImgUrl={Newspaper} title="News" url="/news" />
          <LargeSideBarItem IconOrImgUrl={Trophy} title="Sports" url="/sports" />
          <LargeSideBarItem IconOrImgUrl={Lightbulb} title="Learning" url="/learning" />
          <LargeSideBarItem IconOrImgUrl={Shirt} title="Fashion & Beauty" url="/fashion-beauty" />
          <LargeSideBarItem IconOrImgUrl={Podcast} title="Podcasts" url="/podcasts" />
        </LargeSideBarSection>
      </aside>
    </>
  );
};

export default SideBar;

type SmallSideBarItemProps = {
  Icon: ElementType;
  title: string;
  url: string;
};
function SmallSideBarItem({ Icon, title, url }: SmallSideBarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(btnStyles({ variant: 'ghost' }), 'w-full flex flex-col items-center gap-4 p-3 rounded-lg')}
    >
      <Icon className="w-6 h-6" />
      <div className="text-sm">{title}</div>
    </a>
  );
}

type LargeSideBarSection = {
  children: ReactNode;
  title?: string;
  visibleItemCount?: number;
};

function LargeSideBarSection({ children, title, visibleItemCount = Number.POSITIVE_INFINITY }: LargeSideBarSection) {
  const [isExpanded, setIsExpanded] = useState(false);
  const childrenArray = Children.toArray(children).flat();
  const showButtonExpanded = childrenArray.length > visibleItemCount;
  const visibleChildren = isExpanded ? childrenArray : childrenArray.slice(0, visibleItemCount);

  const ButtonIcon = isExpanded ? ChevronUp : ChevronDown;

  return (
    <div>
      {title && <div className="ml-4 mt-2 text-lg mb-1">{title}</div>}
      {visibleChildren}
      {showButtonExpanded && (
        <Button
          variant={'ghost'}
          className="flex items-center gap-4 p-3 rounded-lg"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <ButtonIcon className="w-6 h-6" />
          <div className="">{isExpanded ? 'Show Less' : 'Show More'}</div>
        </Button>
      )}
    </div>
  );
}

type LargeSideBarItemProps = {
  IconOrImgUrl: ElementType | string;
  title: string;
  url: string;
  isActive?: boolean;
};
function LargeSideBarItem({ IconOrImgUrl, isActive = false, title, url }: LargeSideBarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        btnStyles({ variant: 'ghost' }),
        `flex items-center gap-4 p-3 rounded-lg ${
          isActive ? 'font-bold bg-neutral-100 hover:bg-secondary' : undefined
        }`,
      )}
    >
      {typeof IconOrImgUrl === 'string' ? (
        <img src={IconOrImgUrl} alt={IconOrImgUrl} className="rounded-full w-6 h-6" />
      ) : (
        <IconOrImgUrl className="w-6 h-6" />
      )}
      <div className="whitespace-nowrap overflow-hidden text-ellipsis">{title}</div>
    </a>
  );
}
