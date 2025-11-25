// 移除内联样式定义，改为使用外部CSS文件

// 自定义alert函数 - 符合Blockly.dialog接口
function customAlert(message, callback) {
  // 创建覆盖层
  const overlay = document.createElement('div');
  overlay.className = 'custom-dialog-overlay';

  // 创建对话框
  const dialog = document.createElement('div');
  dialog.className = 'custom-dialog';

  // 创建消息
  const messageElement = document.createElement('div');
  messageElement.className = 'custom-dialog-message';
  messageElement.textContent = message;

  // 创建按钮容器
  const buttons = document.createElement('div');
  buttons.className = 'custom-dialog-buttons';

  // 创建确定按钮
  const okButton = document.createElement('button');
  okButton.className = 'custom-dialog-button custom-dialog-button-ok';
  okButton.textContent = Blockly.Msg['DIALOG_OK'] || '确定';
  okButton.addEventListener('click', () => {
    overlay.classList.remove('active');
    setTimeout(() => {
      document.body.removeChild(overlay);
      if (callback) callback();
    }, 300);
  });

  // 组装对话框
  buttons.appendChild(okButton);
  dialog.appendChild(messageElement);
  dialog.appendChild(buttons);
  overlay.appendChild(dialog);
  document.body.appendChild(overlay);

  // 触发动画
  setTimeout(() => {
    overlay.classList.add('active');
  }, 10);
}

// 自定义confirm函数 - 符合Blockly.dialog接口
function customConfirm(message, callback) {
  // 创建覆盖层
  const overlay = document.createElement('div');
  overlay.className = 'custom-dialog-overlay';

  // 创建对话框
  const dialog = document.createElement('div');
  dialog.className = 'custom-dialog';

  // 创建消息
  const messageElement = document.createElement('div');
  messageElement.className = 'custom-dialog-message';
  messageElement.textContent = message;

  // 创建按钮容器
  const buttons = document.createElement('div');
  buttons.className = 'custom-dialog-buttons';

  // 创建取消按钮
  const cancelButton = document.createElement('button');
  cancelButton.className = 'custom-dialog-button custom-dialog-button-cancel';
  cancelButton.textContent = Blockly.Msg['DIALOG_CANCEL'] || '取消';
  cancelButton.addEventListener('click', () => {
    overlay.classList.remove('active');
    setTimeout(() => {
      document.body.removeChild(overlay);
      callback(false);
    }, 300);
  });

  // 创建确定按钮
  const okButton = document.createElement('button');
  okButton.className = 'custom-dialog-button custom-dialog-button-ok';
  okButton.textContent = Blockly.Msg['DIALOG_OK'] || '确定';
  okButton.addEventListener('click', () => {
    overlay.classList.remove('active');
    setTimeout(() => {
      document.body.removeChild(overlay);
      callback(true);
    }, 300);
  });

  // 组装对话框
  buttons.appendChild(cancelButton);
  buttons.appendChild(okButton);
  dialog.appendChild(messageElement);
  dialog.appendChild(buttons);
  overlay.appendChild(dialog);
  document.body.appendChild(overlay);

  // 触发动画
  setTimeout(() => {
    overlay.classList.add('active');
  }, 10);
}

// 自定义prompt函数 - 符合Blockly.dialog接口
function customPrompt(message, defaultValue, callback) {
  // 创建覆盖层
  const overlay = document.createElement('div');
  overlay.className = 'custom-dialog-overlay';

  // 创建对话框
  const dialog = document.createElement('div');
  dialog.className = 'custom-dialog';

  // 创建消息
  const messageElement = document.createElement('div');
  messageElement.className = 'custom-dialog-message';
  messageElement.textContent = message;

  // 创建输入框
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'custom-dialog-input';
  input.value = defaultValue || '';

  // 创建按钮容器
  const buttons = document.createElement('div');
  buttons.className = 'custom-dialog-buttons';

  // 创建取消按钮
  const cancelButton = document.createElement('button');
  cancelButton.className = 'custom-dialog-button custom-dialog-button-cancel';
  cancelButton.textContent = Blockly.Msg['DIALOG_CANCEL'] || '取消';
  cancelButton.addEventListener('click', () => {
    overlay.classList.remove('active');
    setTimeout(() => {
      document.body.removeChild(overlay);
      callback(null);
    }, 300);
  });

  // 创建确定按钮
  const okButton = document.createElement('button');
  okButton.className = 'custom-dialog-button custom-dialog-button-ok';
  okButton.textContent = Blockly.Msg['DIALOG_OK'] || '确定';
  okButton.addEventListener('click', () => {
    overlay.classList.remove('active');
    setTimeout(() => {
      document.body.removeChild(overlay);
      callback(input.value);
    }, 300);
  });

  // 组装对话框
  buttons.appendChild(cancelButton);
  buttons.appendChild(okButton);
  dialog.appendChild(messageElement);
  dialog.appendChild(input);
  dialog.appendChild(buttons);
  overlay.appendChild(dialog);
  document.body.appendChild(overlay);

  // 触发动画
  setTimeout(() => {
    overlay.classList.add('active');
  }, 10);

  // 自动聚焦输入框
  input.focus();
}

// 初始化函数：注册自定义对话框到Blockly
function initCustomDialogs() {
  if (window.Blockly && window.Blockly.dialog) {
    Blockly.dialog.setAlert(customAlert);
    Blockly.dialog.setConfirm(customConfirm);
    Blockly.dialog.setPrompt(customPrompt);
    console.log('Custom dialogs registered with Blockly');
  } else {
    console.warn('Blockly or Blockly.dialog not found, custom dialogs not registered');
  }
}

// 提供恢复原生对话框的方法
function restoreNativeDialogs() {
  if (window.Blockly && window.Blockly.dialog) {
    Blockly.dialog.setAlert(); // 不传参数会恢复默认实现
    Blockly.dialog.setConfirm();
    Blockly.dialog.setPrompt();
    console.log('Blockly dialogs restored to native implementation');
  }
}

// 当DOM加载完成后初始化自定义对话框
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCustomDialogs);
} else {
  initCustomDialogs();
}

// 暴露恢复方法到全局
window.restoreNativeDialogs = restoreNativeDialogs;