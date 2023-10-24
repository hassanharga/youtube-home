import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FC, useRef, useState } from 'react';
import Button from './Button';

type Props = {
  categories: string[];
  selectedCategory: string;
  onSelect: (cat: string) => void;
};

const TRANSLATE_AMOUNT = 200;

const CategoryPills: FC<Props> = ({ categories, selectedCategory, onSelect }) => {
  const [translate, setTranslate] = useState(0);
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="overflow-x-hidden relative">
      <div
        className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]"
        style={{ transform: `translateX(-${translate}px)` }}
      >
        {categories.map((ele) => (
          <Button
            onClick={() => onSelect(ele)}
            key={ele}
            variant={selectedCategory === ele ? 'dark' : 'default'}
            className="py-1 px-3 whitespace-nowrap rounded-lg"
          >
            {ele}
          </Button>
        ))}
      </div>
      {isLeftVisible && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 h-full">
          <Button
            variant="ghost"
            size="icon"
            className="h-full w-auto aspect-square p-1.5"
            onClick={() => {
              setTranslate((translate) => {
                const newTranslate = translate - TRANSLATE_AMOUNT;
                if (newTranslate <= 0) return 0;
                return newTranslate;
              });
            }}
          >
            <ChevronLeft />
          </Button>
        </div>
      )}
      {isRightVisible && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24 h-full  flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            className="h-full w-auto aspect-square p-1.5"
            onClick={() => {
              setTranslate((translate) => {
                if (containerRef.current == null) return translate;
                const newTranslate = translate + TRANSLATE_AMOUNT;
                const edge = containerRef.current.scrollWidth;
                const width = containerRef.current.clientWidth;
                if (newTranslate + width >= edge) return edge - width;
                return newTranslate;
              });
            }}
          >
            <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  );
};

export default CategoryPills;
