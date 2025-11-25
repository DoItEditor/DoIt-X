const workspace = Blockly.inject('blocklyDiv', {
    toolbox: document.getElementById('toolbox'),
    // 工具箱在左边
    toolboxPosition: 'start',
    media: './blockly-lib/media/',
    trashcan: false,
    scrollbars: true,
    sounds: true,
    renderer: 'zelos',
    // 定义工作区网格
    grid: {spacing: 20,length: 3,colour: '#ccc',snap: true},
    zoom: {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 2.5,
        minScale: 0.1,
        scaleSpeed: 1.2
    },
    move: {
        scrollbars: true,
        drag: true,
        wheel: true
    },
});