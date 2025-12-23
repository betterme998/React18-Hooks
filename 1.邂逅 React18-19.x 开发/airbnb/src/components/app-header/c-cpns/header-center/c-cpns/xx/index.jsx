import { Popover, Button } from "antd";
import { useState, useRef, useEffect } from "react";

const ControlledPopover = () => {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // 检查点击是否在触发元素或Popover内容内部
      const isClickInsidePopover = popoverRef.current?.contains(event.target);
      const isClickOnTrigger = triggerRef.current?.contains(event.target);

      // 如果点击不在触发元素也不在Popover内部，则关闭Popover
      if (!isClickOnTrigger && !isClickInsidePopover) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleTriggerClick = () => {
    // 点击触发元素时只打开，不关闭
    if (!open) {
      setOpen(true);
    }
  };

  return (
    <div>
      <Popover
        open={open}
        onOpenChange={(visible) => {
          // 阻止点击触发元素时的自动关闭
          if (visible) {
            setOpen(true);
          }
        }}
        trigger="click"
        content={
          <div ref={popoverRef}>
            气泡内容
            <div>点击外部区域关闭</div>
          </div>
        }
      ></Popover>
      <Button ref={triggerRef} onClick={handleTriggerClick}>
        点击我打开气泡
      </Button>
    </div>
  );
};
export default ControlledPopover;
