import { useState } from 'react';
import './App.css';
import CategoryPills from './components/CategoryPills';
import { categories } from './data/home';
import PageHeader from './layouts/PageHeader';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  return (
    <div className="max-h-screen flex flex-col">
      <PageHeader />
      {/* region */}
      <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
        <div className="sidebar">Side bar</div>
        <div className="overflow-x-hidden px-8 pb-4">
          <div className="content">
            <div className="category sticky top-0 bg-white z-10  pb-4">
              <CategoryPills
                categories={categories}
                selectedCategory={selectedCategory}
                onSelect={setSelectedCategory}
              />
            </div>
          </div>
        </div>
      </div>
      {/* endregion */}
    </div>
  );
}

export default App;
