// 自定义对话框样式
const dialogStyles = `
  .custom-dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  .custom-dialog {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    padding: 20px;
    width: 300px;
    max-width: 90%;
  }
  .custom-dialog-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .custom-dialog-message {
    margin-bottom: 20px;
  }
  .custom-dialog-input {
    width: 100%;
    padding: 8px;
    margin-bottom: 20px;
    box-sizing: border-box;
  }
  .custom-dialog-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
  .custom-dialog-button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .custom-dialog-button-ok {
    background-color: #4CAF50;
    color: white;
  }
  .custom-dialog-button-cancel {
    background-color: #f44336;
    color: white;
  }
`;

// 添加样式到页面
const styleElement = document.createElement('style');
styleElement.textContent = dialogStyles;
document.head.appendChild(styleElement);

// 自定义alert函数 - 符合Blockly.dialog接口
function customAlert(message, callback) {
  // 创建覆盖层
  const overlay = document.createElement('div');
  overlay.className = 'custom-dialog-overlay';

  // 创建对话框
  const dialog = document.createElement('div');
  dialog.className = 'custom-dialog';

  // 创建标题
  const title = document.createElement('div');
  title.className = 'custom-dialog-title';
  title.textContent = Blockly.Msg.ALERT_TITLE || '提示';

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
  okButton.textContent = Blockly.Msg.OK || '确定';
  okButton.addEventListener('click', () => {
    document.body.removeChild(overlay);
    if (callback) callback();
  });

  // 组装对话框
  buttons.appendChild(okButton);
  dialog.appendChild(title);
  dialog.appendChild(messageElement);
  dialog.appendChild(buttons);
  overlay.appendChild(dialog);
  document.body.appendChild(overlay);
}

// 自定义confirm函数 - 符合Blockly.dialog接口
function customConfirm(message, callback) {
  // 创建覆盖层
  const overlay = document.createElement('div');
  overlay.className = 'custom-dialog-overlay';

  // 创建对话框
  const dialog = document.createElement('div');
  dialog.className = 'custom-dialog';

  // 创建标题
  const title = document.createElement('div');
  title.className = 'custom-dialog-title';
  title.textContent = Blockly.Msg.CONFIRM_TITLE || '确认';

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
  cancelButton.textContent = Blockly.Msg.CANCEL || '取消';
  cancelButton.addEventListener('click', () => {
    document.body.removeChild(overlay);
    callback(false);
  });

  // 创建确定按钮
  const okButton = document.createElement('button');
  okButton.className = 'custom-dialog-button custom-dialog-button-ok';
  okButton.textContent = Blockly.Msg.OK || '确定';
  okButton.addEventListener('click', () => {
    document.body.removeChild(overlay);
    callback(true);
  });

  // 组装对话框
  buttons.appendChild(cancelButton);
  buttons.appendChild(okButton);
  dialog.appendChild(title);
  dialog.appendChild(messageElement);
  dialog.appendChild(buttons);
  overlay.appendChild(dialog);
  document.body.appendChild(overlay);
}

// 自定义prompt函数 - 符合Blockly.dialog接口
function customPrompt(message, defaultValue, callback) {
  // 创建覆盖层
  const overlay = document.createElement('div');
  overlay.className = 'custom-dialog-overlay';

  // 创建对话框
  const dialog = document.createElement('div');
  dialog.className = 'custom-dialog';

  // 创建标题
  const title = document.createElement('div');
  title.className = 'custom-dialog-title';
  title.textContent = Blockly.Msg.PROMPT_TITLE || '输入';

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
  cancelButton.textContent = Blockly.Msg.CANCEL || '取消';
  cancelButton.addEventListener('click', () => {
    document.body.removeChild(overlay);
    callback(null);
  });

  // 创建确定按钮
  const okButton = document.createElement('button');
  okButton.className = 'custom-dialog-button custom-dialog-button-ok';
  okButton.textContent = Blockly.Msg.OK || '确定';
  okButton.addEventListener('click', () => {
    document.body.removeChild(overlay);
    callback(input.value);
  });

  // 组装对话框
  buttons.appendChild(cancelButton);
  buttons.appendChild(okButton);
  dialog.appendChild(title);
  dialog.appendChild(messageElement);
  dialog.appendChild(input);
  dialog.appendChild(buttons);
  overlay.appendChild(dialog);
  document.body.appendChild(overlay);

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