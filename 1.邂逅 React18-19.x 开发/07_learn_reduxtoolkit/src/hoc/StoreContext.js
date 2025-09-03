// 在connect中，要使用到store，但是如果我们把工具上传到npm上后，其他人在使用我们写的connect时，
// 就不方便直接引入store了，那怎么办？
// 使用react的createContext方法，创建一个上下文，然后在<App/>根组件上把state传入即可
// 这样用户就可以直接传入store了，就不需要在connect中引入store了
// react-redux也是这个逻辑

// 注意，我们使用context传入store时，context会传入constructor(props, context)的第二个参数中，
// 这是store就是context

import { createContext } from "react";

export const StoreContext = createContext();
