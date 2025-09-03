// useOptimistic 是一个 React Hook，它可以帮助你更乐观地更新用户界面。
// 用户发送网络请求如：点赞，评论。这个过程可能会出现卡顿，会影响用户体验，怎么解决呢？

// 就是点赞，评论的时候，我们先在本地做一个乐观的更新（拿到如果成功的数据），然后再发送网络请求:
// 先显示出来，让网络请求还在路上偷摸的慢慢走，提高用户体验

// const [optimisticState, addOptimistic]= useOptimistic(state,updateFn);
// 参数
// 接收两个参数，
// state：第一个是初始状态，
// updateFn：一个函数，接受当前 state 和传递给 addOptimistic函数的参数的乐观值，并返回结果乐观状态。
// 它必须是一个纯函数。updateFn 接受两个参数:currentstate（原来的数据）和optimisticValue。（新的数据）
// 返回值将是 currentstate 和 optimisticValue 的合并值。

// 返回值
// optimisticState：返回一个状态，这个状态是经过乐观更新后的状态
// addOptimistic: 返回一个函数，这个函数可以添加乐观更新

import React, { memo, useState, useOptimistic, startTransition } from "react";

const App = memo(() => {
  const [tasks, setTasks] = useState([]);
  // 如果请求失败，就回滚到原来的状态，如果请求成功，就更新状态
  // tasks:初始状态
  // currentTaks：原来的数据：如：原有的评论数据
  // newTask：新的数据：如：新的评论数据，传递给addOptimistic的参数
  const [optimisticState, addOptimistic] = useOptimistic(
    tasks,
    (currentTask, newTask) => {
      // 返回新值：合并后的数据
      return [...currentTask, newTask]; //大白话：假设请求成功，这就是最新数据
    }
  );

  const addTask = (task) => {
    try {
      startTransition(async () => {
        // 添加任务，先在本地做一个乐观更新，然后再发送网络请求
        addOptimistic(task);
        // 调接口
        await fakeApi(task);
        setTasks((current) => [...current, task]);
      });
    } catch (erroe) {
      console.log(erroe);
    }
  };

  return (
    <div>
      <h1>待办事项列表</h1>
      {/* 每次更新的都是乐观值，没有使用真实的值，因为乐观值快，不需要等网络请求完成 */}
      <ul>
        {optimisticState.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
      <button onClick={() => addTask("新任务")}>添加任务</button>
    </div>
  );
});

const fakeApi = (task) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.8) {
        resolve(`任务${task}成功添加`);
      } else {
        // reject(`任务添加失败`);
        console.log("任务添加失败");
        reject("任务添加失败");
      }
    }, 1000);
  });
};

export default App;
