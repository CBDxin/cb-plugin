# less-plugin-chris （兼容vue 项目）

## 配置(设置项目的变量文件)

可在less 或者 js 目录文件右击或者 在 less、js 文件编辑区右击（如果右击 无效 请更新 vsocde  帮助> 检查更新）
![image](https://user-images.githubusercontent.com/23721492/217176324-cedb0dfe-b011-4c16-a623-950a5bcc370b.png)
![image](https://user-images.githubusercontent.com/23721492/217176425-5bb0f2e8-368b-4c03-bcfa-2671003ae6a1.png)

## 配置(设置项目的全局类型)

设置 > 拓展 > less-plugin-chris
![image](https://user-images.githubusercontent.com/23721492/217234363-da9d894e-1816-44ae-bf2d-7915577ecc61.png)



## 功能

## 1. less 变量 codeLens

有时候我们定义了一些全局的 less 变量，但由于种种原因，如项目成员不清楚已有这样的一堆变量或者对这些变量不熟悉，直接从交互稿上直接复制一些 css 代码等，导致定义好的变量没有被用到，这种情况我们可以通过 codeLens 在页面中给用户一些提示信息，并为用户提供点击使用变量替换原来的值的功能。

### note！   支持颜色转换(rgb rgba keyword HEX、HSL  )后的替换 

![less-codelens 00_00_00-00_00_30](https://user-images.githubusercontent.com/23721492/218014484-b8fe64cb-deee-4f9d-9c22-ae034c2b5700.gif)


### 2. less 变量补全

在键入 less 变量的值时，可根据配置的全局 less 变量文件进行 less 变量的补全。

![less变量补全 00_00_00-00_00_30](https://user-images.githubusercontent.com/23721492/218014522-4ef3b67d-bc45-461d-b99b-05c35edd7917.gif)

### 3. less 变量 hover 提示

当 hover 在 less 变量上，会进行对应的键值对提示。
![hover](https://user-images.githubusercontent.com/23721492/218014540-11263f17-89bc-49ee-a639-19e51442bb80.png)


### 4. className 自动补全

有时候，我们提前定义好一些全局或者是各个组件的样式文件，然后再到 jsx 中去填写 className。这时经常会出现一些令人十分痛苦的情况，例如忘记了定义好的 className，或者是拼写错误导致样式不生效 less-helper-chris 能够帮助我们在填写 jsx 的 className 时，根据 impor 的 less 文件和配置的全局样式文件进行补全提示。

![jsx-className自动补全](https://user-images.githubusercontent.com/23721492/218014579-912fc685-d715-4120-a770-b017bfbd91fb.gif)

### 5. 通过别名补全 className( 暂时没有用)

但有时候，全局样式文件中的一些 className 难以记住，这时我们可以通过别名识别某个 className。我们可以在全局 className 的前一行敲入 ad 来键入一个代码片段，用于填写别名和 className 的描述，然后就可以通过设置的别名来进行 className 的补全。



![别名补全 00_00_00-00_00_30](https://user-images.githubusercontent.com/23721492/218014607-4d2535fb-c26d-42c7-8562-6afb142c3807.gif)

### 6. 自动补全 less 文件的 className( 暂时没有用)

根据同级以及 vscode 中已打开的 jsx、tsx 文件，自动补全 less 文件的 className。
![less变量补全 00_00_00-00_00_30](https://user-images.githubusercontent.com/23721492/218014636-2a14eca0-7971-4817-8c32-1391f1c59432.gif)




