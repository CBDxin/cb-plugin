# cb-plugin

## 功能

### 1. className 自动补全

有时候，我们提前定义好一些全局或者是各个组件的样式文件，然后再到 jsx 中去填写 className。这时经常会出现一些令人十分痛苦的情况，例如忘记了定义好的 className，或者是拼写错误导致样式不生效 css-helper-plugin 能够帮助我们在填写 jsx 的 className 时，根据 impor 的 less 文件和配置的全局样式文件进行补全提示。
![className 自动补全.gif](https://github.com/CBDxin/img/blob/master/img/jsx-className%E8%87%AA%E5%8A%A8%E8%A1%A5%E5%85%A8.gif?raw=true)

### 2. 通过别名补全 className

但有时候，全局样式文件中的一些 className 难以记住，这时我们可以通过别名识别某个 className。我们可以在全局 className 的前一行敲入 ad 来键入一个代码片段，用于填写别名和 className 的描述，然后就可以通过设置的别名来进行 className 的补全。
![img](https://github.com/CBDxin/img/blob/master/img/%E5%88%AB%E5%90%8D%E8%A1%A5%E5%85%A8%2000_00_00-00_00_30.gif?raw=true)

### 3. less 变量 codeLens

有时候我们定义了一些全局的 less 变量，但由于种种原因，如项目成员不清楚已有这样的一堆变量或者对这些变量不熟悉，直接从交互稿上直接复制一些 css 代码等，导致定义好的变量没有被用到，这种情况我们可以通过 codeLens 在页面中给用户一些提示信息，并为用户提供点击使用变量替换原来的值的功能。
![img](https://github.com/CBDxin/img/blob/master/img/less-codelens%2000_00_00-00_00_30.gif?raw=true)

### 4. less 变量补全

在键入 less 变量的值时，可根据配置的全局 less 变量文件进行 less 变量的补全。
![img](https://github.com/CBDxin/img/blob/master/img/less%E5%8F%98%E9%87%8F%E8%A1%A5%E5%85%A8%2000_00_00-00_00_30.gif?raw=true)

### 5. less 变量 hover 提示

当 hover 在 less 变量上，会进行对应的键值对提示。
![img](https://github.com/CBDxin/img/blob/master/img/hover.png?raw=true)

### 6. 自动补全 less 文件的 className

根据同级以及 vscode 中已打开的 jsx、tsx 文件，自动补全 less 文件的 className。
![img](https://github.com/CBDxin/img/blob/master/img/css-className%E8%A1%A5%E5%85%A8%2000_00_00-00_00_30.gif?raw=true)

## 配置

可在设置 -> 扩展 -> css-helper-plugin 中设置全局样式文件路径和 less 变量文件路径
![img](https://github.com/CBDxin/img/blob/master/img/%E9%85%8D%E7%BD%AE.png?raw=true)
