// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 获取按钮元素
    const fileButton = document.getElementById('fileButton');
    const editButton = document.getElementById('editButton');

    // 存储所有菜单的数组
    const allMenus = [];

    // 创建文件菜单 - 添加id属性
    const fileMenu = createMenu([
        { id: 'new-file', text: '新建' },
        { id: 'save-code', text: '保存代码文件' },
        { id: 'save-xml', text: '保存为XML' },
        { id: 'open-xml', text: '从电脑中打开XML' },
        { separator: true },
        { id: 'save-folder', text: '保存为文件夹' },
        { id: 'open-folder', text: '从电脑中打开文件夹' }
    ]);
    allMenus.push(fileMenu);

    // 创建编辑菜单 - 添加id属性
    const editMenu = createMenu([
        { id: 'theme-toggle', text: '日夜间模式' },
        { separator: true },
        { id: 'preferences', text: '首选项' }
    ]);
    allMenus.push(editMenu);

    // 为按钮添加点击事件
    attachMenuToButton(fileButton, fileMenu, allMenus);
    attachMenuToButton(editButton, editMenu, allMenus);

    // 点击页面其他地方关闭菜单
    document.addEventListener('click', function(event) {
        // 检查点击是否发生在任何按钮或菜单外部
        const isClickOutsideButtonsAndMenus = !fileButton.contains(event.target) && 
                                             !editButton.contains(event.target) &&
                                             !fileMenu.contains(event.target) && 
                                             !editMenu.contains(event.target);

        if (isClickOutsideButtonsAndMenus) {
            // 关闭所有菜单
            allMenus.forEach(menu => {
                menu.style.display = 'none';
            });
        }
    });
});

// 创建菜单函数 - 修改为使用id
function createMenu(menuItems) {
    const menu = document.createElement('div');
    menu.className = 'dropdown-menu'; // 添加动画类
    menu.style.position = 'absolute';
    menu.style.backgroundColor = 'white';
    menu.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    menu.style.borderRadius = '0 0 4px 4px';
    menu.style.padding = '4px 0';
    menu.style.zIndex = '1000';
    menu.style.minWidth = '120px';
    menu.style.display = 'none'; // 初始隐藏菜单

    menuItems.forEach(item => {
        if (item.separator) {
            const separator = document.createElement('div');
            separator.style.height = '1px';
            separator.style.backgroundColor = '#e0e0e0';
            separator.style.margin = '4px 0';
            menu.appendChild(separator);
        } else {
            const menuItem = document.createElement('div');
            menuItem.className = 'dropdown-menu-item';
            menuItem.textContent = item.text;
            // 存储id到data属性
            menuItem.dataset.id = item.id;
            menuItem.style.height = '24px';
            menuItem.style.lineHeight = '24px';
            menuItem.style.padding = '0 16px';
            menuItem.style.cursor = 'pointer';
            menuItem.style.whiteSpace = 'nowrap';

            // 添加悬停效果
            menuItem.addEventListener('mouseover', function() {
                this.style.backgroundColor = '#f0f0f0';
            });
            menuItem.addEventListener('mouseout', function() {
                this.style.backgroundColor = 'transparent';
            });

            // 添加点击事件处理 - 使用id
            menuItem.addEventListener('click', function(event) {
                event.stopPropagation();
                // 使用id来触发事件
                const menuId = this.dataset.id;
                console.log('点击了菜单项, id:', menuId);
                handleMenuItemClick(menuId);
                // 点击后关闭菜单
                menu.style.display = 'none';
            });

            menu.appendChild(menuItem);
        }
    });

    document.body.appendChild(menu);
    return menu;
}

// 将菜单附加到按钮函数
function attachMenuToButton(button, menu, allMenus) {
    button.addEventListener('click', function(event) {
        event.stopPropagation();

        // 关闭所有其他菜单
        allMenus.forEach(m => {
            if (m !== menu) {
                m.style.display = 'none';
            }
        });

        // 计算菜单位置
        const rect = button.getBoundingClientRect();
        menu.style.top = (rect.bottom + window.scrollY) + 'px';
        menu.style.left = (rect.left + window.scrollX) + 'px';

        // 切换菜单显示状态
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });
}

// 添加菜单项点击处理函数 - 接收id参数
function handleMenuItemClick(menuId) {
    switch(menuId) {
        case 'new-file':
            // 实现新建功能
            console.log('执行新建操作');
            break;
        case 'save-code':
            // 实现保存代码文件功能
            console.log('执行保存代码文件操作');
            break;
        case 'save-xml':
            // 实现保存为XML功能
            console.log('执行保存为XML操作');
            break;
        case 'open-xml':
            // 实现从电脑中打开XML功能
            console.log('执行从电脑中打开XML操作');
            break;
        case 'save-folder':
            // 实现保存为文件夹功能
            console.log('执行保存为文件夹操作');
            break;
        case 'open-folder':
            // 实现从电脑中打开文件夹功能
            console.log('执行从电脑中打开文件夹操作');
            break;
        case 'theme-toggle':
            // 实现日夜间模式切换功能
            console.log('切换日夜间模式');
            break;
        case 'preferences':
            // 实现首选项功能
            console.log('打开首选项设置');
            break;
        default:
            console.log('未知菜单项id:', menuId);
    }
}