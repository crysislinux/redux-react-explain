```js
{
  entities: {
    nodes: {  // 包含pipes和steps，具体的类型由node内部的type决定
      'uuid-1': {},
      'uuid-2': {},  
    }
  },
  line: ['uuid-2', 'uuid-1'],
  cursor: {
    nodeId: 'uuid-1',
    progress: 0.2,
  },
  step: 20,
  settings: {
    running: true, // 动画是否已经开始播放
    pause: false, // 是否暂停
    zoom: 1, // 缩放因数
    singleStep: false, // 是否单步播放
    expandLevel: 1, // 展开的层次
  }
}
```
