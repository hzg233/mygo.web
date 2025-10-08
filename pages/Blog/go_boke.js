/*
 * @Author: obss 915478517@qq.com
 * @Date: 2025-05-25 17:16:00
 * @LastEditors: obss 915478517@qq.com
 * @LastEditTime: 2025-05-25 17:31:18
 * @FilePath: \MyGoAveMujica\static\js\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

function changeFeed(content) {
    const feed = document.querySelector('.showView');
    const feed_p = document.querySelector('.showView');
    if (content === 'Search') {
        // 定义共享的用户名和头像
        const sharedUserInfo = `
            <div class="post-header">
                <img src="../../assert/images/base/512px-MyGO_icon.svg.png" alt="User Profile">
                <h3>User Name</h3>
            </div>
        `;

        // 定义每个块容器的独特内容
        const posts = [
            { postImage: '../../assert/images/base/3.png', text: '#一生に一度のパフォーマンスを祝いましょう' },
            { postImage: '../../assert/images/base/4.png', text: '#友達のおかげで、私は一生懸命働きました' }
            // { postImage: 'https://via.placeholder.com/300x200', text: 'This is User3\'s post.' }
        ];

        // 动态生成内容
        feed.innerHTML = posts.map(post => `
            <div class="post-container">
                ${sharedUserInfo}
                <img src="${post.postImage}" alt="Post Image" class="post-image">
                <p class="post-text">${post.text}</p>
            </div>
        `).join('');
    }else if (content === 'People') {
        // 定义多个 p_container 的内容
        const peopleData = [
            { id: 1, title: "", content: "“真的是一个认真的孩子呢,非常可爱！”" },
            { id: 2, title: "", content: "“很厉害的！”" },
            { id: 3, title: "", content: "“真的很像猫的孩子,自由自在的~”" },
            { id: 4, title: "", content: "“非常细心温柔的朋友！”" },
            { id: 5, title: "", content: "“啊,我会努力的,幸苦了~”" },
            // 可以继续添加更多数据
        ];

        // 动态生成多个 p_container
        feed.innerHTML = peopleData.map(person => `
            <div class="p_container" id="p_container_${person.id}">
                <h3 class="p_title" id="p_title_${person.id}">${person.title}</h3>
                <div class="p_content" id="p_content_${person.id}">
                    <h3 class="p_h" id="p_h_${person.id}">${person.content}</h3>
                </div>
            </div>
        `).join('');

        // 为每个 p_container 添加点击事件
        peopleData.forEach(person => {
            const title = document.querySelector(`#p_title_${person.id}`);
            const p_content = document.querySelector(`#p_content_${person.id}`);

            title.addEventListener('click', function() {
                if (p_content.offsetHeight === 0) {
                    p_content.style.height = p_content.scrollHeight + 'px';
                } else {
                    p_content.style.height = 0;
                }
            });
        });

    } 
    else {
        feed.innerHTML = `<h2>${content}</h2><p>Content for ${content} will appear here.</p>`;
    }
    
}