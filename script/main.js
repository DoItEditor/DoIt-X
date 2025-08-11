function initWorkspace() {
    
    workspace = Blockly.inject('blocklyDiv', {
        toolbox: document.getElementById('toolbox'),
        media: './blockly-lib/media/',
        trashcan: false,
        scrollbars: true,
        sounds: true,
        renderer: 'zelos',
        zoom: {
            controls: true,
            wheel: true,
            startScale: 1.0,
            maxScale: 3,
            minScale: 0.3,
            scaleSpeed: 1.2
        },
        move: {
            scrollbars: true,
            drag: true,
            wheel: true
        },
        toolboxPosition: 'start'
    });
}

initWorkspace();
