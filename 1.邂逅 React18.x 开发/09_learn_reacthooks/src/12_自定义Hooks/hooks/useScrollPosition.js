import { useEffect, useState } from "react";

function useScrollPosition() {
  const [scrollX, setscrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    function handleScroll() {
      setscrollX(window.scrollX);
      setScrollY(window.scrollY);
    }
    // 保证多次渲染时，不会反复添加监听事件
    window.addEventListener("scroll", handleScroll);

    return () => {
      // 取消监听
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return [scrollX, scrollY];
}

export default useScrollPosition;
