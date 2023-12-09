import { useState } from 'react';
import './App.css';
import CategoryPills from './components/CategoryPills';
import VideoGridItem from './components/VideoGridItem';
import { SideBarProvider } from './contexts/sidebar.context';
import { categories, videos } from './data/home';
import PageHeader from './layouts/PageHeader';
import SideBar from './layouts/SideBar';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  return (
    <SideBarProvider>
      <div className="max-h-screen flex flex-col">
        <PageHeader />
        {/* region */}
        <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
          <SideBar />
          <div className="overflow-x-hidden px-8 pb-4">
            <div className="content">
              {/* category section */}
              <div className="category sticky top-0 bg-white z-10  pb-4">
                <CategoryPills
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelect={setSelectedCategory}
                />
              </div>
              {/* videos */}
              <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
                {videos.map((video) => (
                  <VideoGridItem key={video.id} {...video} />
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* endregion */}
      </div>
    </SideBarProvider>
  );
}

export default App;
