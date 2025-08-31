// 使用第三方库（faker）生成随机数据信息
// 1.安装：npm install --save-dev @faker-js/faker
import { faker } from "@faker-js/faker";

// 从可迭代对象中创建一个数组
const namesArray = Array.from(
  Array(10000)
    .fill(-1)
    .map((item) => {
      return faker.person.fullName();
    })
);
console.log(namesArray);

export default namesArray;
