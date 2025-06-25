import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";

const useMedia = (
  queries,
  values,
  defaultValue
) => {
  const get = () =>
    values[queries.findIndex((q) => matchMedia(q).matches)] ?? defaultValue;

  const [value, setValue] = useState(get);

  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach((q) => matchMedia(q).addEventListener("change", handler));
    return () =>
      queries.forEach((q) =>
        matchMedia(q).removeEventListener("change", handler)
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queries]);

  return value;
};

const useMeasure = () => {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size];
};

const preloadImages = async (urls) => {
  await Promise.all(
    urls.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

const Masonry = ({
  items,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
}) => {
  const columns = useMedia(
    [
      "(min-width:1500px)",
      "(min-width:1000px)",
      "(min-width:600px)",
      "(min-width:400px)",
    ],
    [5, 4, 3, 2],
    1
  );

  const isMobile = useMedia(["(max-width:767px)"], [true], false);
  const [showAllOnMobile, setShowAllOnMobile] = useState(false);

  const [containerRef, { width }] = useMeasure();
  const [imagesReady, setImagesReady] = useState(false);

  const getInitialPosition = (item) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };

    let direction = animateFrom;
    if (animateFrom === "random") {
      const dirs = ["top", "bottom", "left", "right"];
      direction = dirs[
        Math.floor(Math.random() * dirs.length)
      ];
    }

    switch (direction) {
      case "top":
        return { x: item.x, y: -200 };
      case "bottom":
        return { x: item.x, y: window.innerHeight + 200 };
      case "left":
        return { x: -200, y: item.y };
      case "right":
        return { x: window.innerWidth + 200, y: item.y };
      case "center":
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2,
        };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  };

  useEffect(() => {
    preloadImages(items.map((i) => i.img)).then(() => setImagesReady(true));
  }, [items]);

  // Reset showAllOnMobile when screen size changes from mobile to desktop
  useEffect(() => {
    if (!isMobile) {
      setShowAllOnMobile(false);
    }
  }, [isMobile]);

  const displayItems = useMemo(() => {
    if (isMobile && !showAllOnMobile) {
      return items.slice(0, 3);
    }
    return items;
  }, [items, isMobile, showAllOnMobile]);

  const grid = useMemo(() => {
    if (!width) return [];
    const colHeights = new Array(columns).fill(0);
    const gap = 16;
    const totalGaps = (columns - 1) * gap;
    const columnWidth = (width - totalGaps) / columns;

    return displayItems.map((child) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (columnWidth + gap);
      const height = child.height / 2;
      const y = colHeights[col];

      colHeights[col] += height + gap;
      return { ...child, x, y, w: columnWidth, h: height };
    });
  }, [columns, displayItems, width]);

  const hasMounted = useRef(false);

  useLayoutEffect(() => {
    if (!imagesReady) return;

    // Clear any existing animations for items that are no longer displayed
    const allItems = items.map(item => `[data-key="${item.id}"]`);
    const currentItems = grid.map(item => `[data-key="${item.id}"]`);
    const removedItems = allItems.filter(selector => !currentItems.includes(selector));
    
    removedItems.forEach(selector => {
      gsap.set(selector, { clearProps: "all" });
    });

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animProps = { x: item.x, y: item.y, width: item.w, height: item.h };

      if (!hasMounted.current || (isMobile && showAllOnMobile && index >= 3)) {
        const start = getInitialPosition(item);
        gsap.fromTo(
          selector,
          {
            opacity: 0,
            x: start.x,
            y: start.y,
            width: item.w,
            height: item.h,
            ...(blurToFocus && { filter: "blur(10px)" }),
          },
          {
            opacity: 1,
            ...animProps,
            ...(blurToFocus && { filter: "blur(0px)" }),
            duration: 0.8,
            ease: "power3.out",
            delay: (isMobile && showAllOnMobile && index >= 3) ? (index - 3) * stagger : index * stagger,
          }
        );
      } else {
        gsap.to(selector, {
          ...animProps,
          duration,
          ease,
          overwrite: "auto",
        });
      }
    });

    if (!hasMounted.current) {
      hasMounted.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease, showAllOnMobile]);

  const handleMouseEnter = (id, element) => {
    if (scaleOnHover) {
      gsap.to(`[data-key="${id}"]`, {
        scale: hoverScale,
        duration: 0.3,
        ease: "power2.out"
      });
    }
    if (colorShiftOnHover) {
      const overlay = element.querySelector(".color-overlay");
      if (overlay) gsap.to(overlay, { opacity: 0.3, duration: 0.3 });
    }
  };

  const handleMouseLeave = (id, element) => {
    if (scaleOnHover) {
      gsap.to(`[data-key="${id}"]`, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
    if (colorShiftOnHover) {
      const overlay = element.querySelector(".color-overlay");
      if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.3 });
    }
  };

  const handleShowMore = () => {
    setShowAllOnMobile(true);
    
    // Smooth scroll to keep the new content in view
    setTimeout(() => {
      const container = containerRef.current;
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const scrollY = window.scrollY;
        const targetY = scrollY + containerRect.top - 100; // 100px offset from top
        
        window.scrollTo({
          top: targetY,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const containerHeight = useMemo(() => {
    if (grid.length === 0) return 0;
    return Math.max(...grid.map(item => item.y + item.h));
  }, [grid]);

  return (
    <div className="relative w-full">
      <div 
        ref={containerRef} 
        className="relative w-full"
        style={{ 
          height: containerHeight || 'auto',
          minHeight: isMobile && !showAllOnMobile ? 'auto' : containerHeight
        }}
      >
        {items.map((item) => {
          const gridItem = grid.find(g => g.id === item.id);
          if (!gridItem) return null;
          
          return (
            <div
              key={item.id}
              data-key={item.id}
              className="absolute box-content"
              style={{ willChange: "transform, width, height, opacity" }}
  
              onMouseEnter={(e) => handleMouseEnter(item.id, e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeave(item.id, e.currentTarget)}
            >
              <div
                className="relative w-full h-full bg-cover bg-center rounded-[10px] shadow-[0px_10px_50px_-10px_rgba(0,0,0,0.2)] uppercase text-[10px] leading-[10px]"
                style={{ backgroundImage: `url(${item.img})` }}
              >
                {colorShiftOnHover && (
                  <div className="color-overlay absolute inset-0 rounded-[10px] bg-gradient-to-tr from-pink-500/50 to-sky-500/50 opacity-0 pointer-events-none" />
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {isMobile && !showAllOnMobile && items.length > 3 && (
        <div className="flex justify-center mt-6 mb-4">
          <button
            onClick={handleShowMore}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
          >
            Show More ({items.length - 3} more)
          </button>
        </div>
      )}
    </div>
  );
};

export default Masonry;