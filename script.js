// 平滑滚动导航
document.addEventListener('DOMContentLoaded', function() {
    // 导航链接点击事件
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // 考虑导航栏高度
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // CTA按钮点击事件
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                const offsetTop = aboutSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // 表单提交事件
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 显示可爱的提交成功消息
            showSuccessMessage();
            
            // 重置表单
            this.reset();
        });
    }

    // 滚动时的导航栏效果
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(255, 179, 217, 0.3)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // 滚动动画观察器
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    // 观察需要动画的元素
    const animatedElements = document.querySelectorAll('.about-card, .gallery-item');
    animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });

    // 相册项目点击事件
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // 添加点击效果
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // 可以在这里添加图片查看功能
            const placeholderText = this.querySelector('p').textContent;
            showImageModal(placeholderText);
        });
    });

    // 添加鼠标跟随效果
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // 让飘浮的心形跟随鼠标轻微移动
        const hearts = document.querySelectorAll('.heart');
        hearts.forEach((heart, index) => {
            const speed = (index + 1) * 0.02;
            const x = (mouseX - window.innerWidth / 2) * speed;
            const y = (mouseY - window.innerHeight / 2) * speed;
            
            heart.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
});

// 显示成功消息
function showSuccessMessage() {
    // 创建成功消息元素
    const successMessage = document.createElement('div');
    successMessage.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 2rem;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(255, 179, 217, 0.4);
            border: 3px solid #ffb3d9;
            text-align: center;
            z-index: 10000;
            animation: popIn 0.5s ease-out;
        ">
            <div style="font-size: 3rem; margin-bottom: 1rem;">💕</div>
            <h3 style="color: #d63384; margin-bottom: 0.5rem; font-size: 1.5rem;">消息发送成功！</h3>
            <p style="color: #8b4a6b;">谢谢你的留言，我会尽快回复的～ 🎀</p>
        </div>
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 179, 217, 0.3);
            z-index: 9999;
        "></div>
    `;
    
    // 添加弹出动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes popIn {
            from {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.8);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(successMessage);
    
    // 3秒后自动关闭
    setTimeout(() => {
        successMessage.style.animation = 'popOut 0.5s ease-in forwards';
        setTimeout(() => {
            document.body.removeChild(successMessage);
            document.head.removeChild(style);
        }, 500);
    }, 3000);
    
    // 点击背景关闭
    successMessage.addEventListener('click', function(e) {
        if (e.target === successMessage || e.target === successMessage.lastElementChild) {
            successMessage.style.animation = 'popOut 0.5s ease-in forwards';
            setTimeout(() => {
                document.body.removeChild(successMessage);
                document.head.removeChild(style);
            }, 500);
        }
    });
}

// 显示图片模态框
function showImageModal(title) {
    const modal = document.createElement('div');
    modal.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 2rem;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(255, 179, 217, 0.4);
            border: 3px solid #ffb3d9;
            text-align: center;
            z-index: 10000;
            max-width: 400px;
            animation: popIn 0.5s ease-out;
        ">
            <div style="font-size: 4rem; margin-bottom: 1rem;">📸</div>
            <h3 style="color: #d63384; margin-bottom: 1rem; font-size: 1.5rem;">${title}</h3>
            <p style="color: #8b4a6b; margin-bottom: 1.5rem;">这里将展示美美的照片～ 🌸</p>
            <button onclick="this.closest('.modal-overlay').remove()" style="
                background: linear-gradient(45deg, #ff1493, #ff69b4);
                color: white;
                border: none;
                padding: 0.8rem 1.5rem;
                border-radius: 25px;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.3s ease;
            ">关闭 💕</button>
        </div>
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 179, 217, 0.3);
            z-index: 9999;
        "></div>
    `;
    
    modal.className = 'modal-overlay';
    document.body.appendChild(modal);
    
    // 点击背景关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target === modal.lastElementChild) {
            modal.remove();
        }
    });
}

// 添加页面加载完成后的特效
window.addEventListener('load', function() {
    // 让Hello Kitty头像有一个可爱的入场动画
    const kittyAvatar = document.querySelector('.hello-kitty-avatar');
    if (kittyAvatar) {
        kittyAvatar.style.animation = 'bounceIn 1s ease-out 0.5s both';
    }
    
    // 添加bounceIn动画
    const bounceInStyle = document.createElement('style');
    bounceInStyle.textContent = `
        @keyframes bounceIn {
            0% {
                opacity: 0;
                transform: scale(0.3);
            }
            50% {
                opacity: 1;
                transform: scale(1.05);
            }
            70% {
                transform: scale(0.9);
            }
            100% {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        @keyframes popOut {
            from {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
            to {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.8);
            }
        }
    `;
    document.head.appendChild(bounceInStyle);
});

// 添加一些可爱的交互效果
document.addEventListener('click', function(e) {
    // 点击时创建小心心效果
    if (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        createClickEffect(e.clientX, e.clientY);
    }
});

function createClickEffect(x, y) {
    const effect = document.createElement('div');
    effect.innerHTML = '💕';
    effect.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: 1.5rem;
        pointer-events: none;
        z-index: 10000;
        animation: clickEffect 1s ease-out forwards;
    `;
    
    document.body.appendChild(effect);
    
    // 添加点击效果动画
    if (!document.querySelector('#click-effect-style')) {
        const clickStyle = document.createElement('style');
        clickStyle.id = 'click-effect-style';
        clickStyle.textContent = `
            @keyframes clickEffect {
                0% {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(0);
                }
                50% {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1.2);
                }
                100% {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(1) translateY(-50px);
                }
            }
        `;
        document.head.appendChild(clickStyle);
    }
    
    setTimeout(() => {
        effect.remove();
    }, 1000);
}