# zv-checkbox
基于van-checkbox的复选框组件，兼容所有van-checkbox的属性，能够指定选择状态和未选中状态的值。摆脱传统的只能是选中为true；未选中为flase的限制。

## Props

参数 | 说明 |类型 | 默认值
- | - | -| -|
v-model(value) | 是否为选中状态 | string,boolean | false
checkedValue | 指定选择状态的值 | string,boolean | true
unCheckedValue | 指定未选择状态的值 | string,boolean | false