import { useEffect, useState } from 'react';
import { CenteredLayout } from '~/components';

// TODO how can we optimize, prevent re-rendering ExpensiveComponent
// by changing component structure ?

//throttle function
const throttle = (fn: Function, wait: number) => {
  let inThrottle: boolean, lastFn: ReturnType<typeof setTimeout>, lastTime: number;
  return function (this: any) {
    const context = this,
      args = arguments;
    if (!inThrottle) {
      fn.apply(context, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(() => {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args);
          lastTime = Date.now();
        }
      }, Math.max(wait - (Date.now() - lastTime), 0));
    }
  };
};

export const Optimize2 = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const t0 = performance.now();  

  useEffect(() => {
    const handleScroll = () => {
      setScrollTop(window.scrollY);
    };

    //added throttling, refreshing handleScroll twice per second
    window.addEventListener('scroll', throttle(handleScroll, 500), { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const t1 = performance.now();

  return (
    <div className="h-[1000vh] bg-gradient-to-tr from-gray-100 to-gray-200 bg-repeat bg-[length:100%_8px]">
      <CenteredLayout className="gap-4 fixed top-0 left-1/2 -translate-x-1/2">
        <div className="text-3xl">See the code</div>
        <div>{scrollTop} px</div>
        {t1-t0 < 100 ? <div>Now we're rocking!</div> : <div>Ohh.. so expensive</div>}
      </CenteredLayout>
    </div>
  );
};
