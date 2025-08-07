document.addEventListener('DOMContentLoaded', () => {
    // particles.js 초기화
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#000000"
                },
                "shape": {
                    "type": "circle",
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                },
                "size": {
                    "value": 3,
                    "random": true,
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#000000",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 6,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "repulse"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 400,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }

    const navLinks = document.querySelectorAll('header nav a');
    const currentPage = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });

    // 메인 페이지의 스크롤 기반 활성화 로직 (index.html 에만 적용)
    if (currentPage === '' || currentPage === 'index.html') {
        const sections = document.querySelectorAll('main section');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href').substring(1) === entry.target.id) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // 숫자 카운트업 애니메이션 (index.html 에만 적용)
    if (currentPage === '' || currentPage === 'index.html') {
        const achievementItems = document.querySelectorAll('.achievement-item h4');
        const countUp = (element) => {
            const count = parseInt(element.dataset.count, 10);
            let current = 0;
            const increment = count / 100;

            const updateCount = () => {
                current += increment;
                if (current < count) {
                    element.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCount);
                } else {
                    element.innerText = count;
                }
            };
            updateCount();
        };

        const achievementObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    countUp(entry.target);
                } else {
                    entry.target.innerText = 0; // 화면 밖으로 나가면 다시 0으로 초기화
                }
            });
        }, { threshold: 0.8 });

        achievementItems.forEach(item => {
            achievementObserver.observe(item);
        });
    }

    // 타임라인 애니메이션 (index.html 에만 적용)
    if (currentPage === '' || currentPage === 'index.html') {
        const timelineItems = document.querySelectorAll('.timeline-item');
        const timelineObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    entry.target.classList.remove('visible'); // 화면 밖으로 나가면 다시 숨김
                }
            });
        }, { threshold: 0.2 });

        timelineItems.forEach(item => {
            timelineObserver.observe(item);
        });
    }

    // 채용 페이지 모달 로직 (careers.html 에만 적용)
    if (currentPage === 'careers.html') {
        const modalOverlay = document.getElementById('application-modal');
        const applyButtons = document.querySelectorAll('.apply-button');
        const closeButton = document.querySelector('.close-button');

        applyButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                modalOverlay.classList.add('modal-open');
            });
        });

        const closeModal = () => {
            modalOverlay.classList.remove('modal-open');
        }

        closeButton.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });

        const applicationForm = document.getElementById('application-form');
        applicationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('지원이 완료되었습니다!');
            closeModal();
        });
    }

    // 메인 페이지 문의 모달 로직 (index.html 에만 적용)
    if (currentPage === '' || currentPage === 'index.html') {
        const inquiryModalOverlay = document.getElementById('inquiry-modal');
        const contactUsButton = document.getElementById('contact-us-button');
        const inquiryCloseButton = inquiryModalOverlay.querySelector('.close-button');

        contactUsButton.addEventListener('click', (e) => {
            e.preventDefault();
            inquiryModalOverlay.classList.add('modal-open');
        });

        const closeInquiryModal = () => {
            inquiryModalOverlay.classList.remove('modal-open');
        }

        inquiryCloseButton.addEventListener('click', closeInquiryModal);
        inquiryModalOverlay.addEventListener('click', (e) => {
            if (e.target === inquiryModalOverlay) {
                closeInquiryModal();
            }
        });

        const inquiryForm = document.getElementById('inquiry-form');
        inquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('문의가 성공적으로 전송되었습니다!');
            closeInquiryModal();
        });
    }

    // 팀 페이지 카드 애니메이션 (teams.html 에만 적용) - 제거됨

    // 채용 페이지 카드 애니메이션 (careers.html 에만 적용)
    if (currentPage === 'careers.html') {
        const jobCards = document.querySelectorAll('.animate-job-card');
        const jobCardObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'rotateY(0deg) scale(1)';
                } else {
                    entry.target.style.opacity = 0;
                    entry.target.style.transform = 'rotateY(90deg) scale(0.8)';
                }
            });
        }, { threshold: 0.2 });

        jobCards.forEach(card => {
            jobCardObserver.observe(card);
        });
    }

    // 페이지 헤더 텍스트 애니메이션 (teams.html, careers.html 에만 적용)
    if (currentPage === 'teams.html' || currentPage === 'careers.html') {
        const pageHeaderTitle = document.querySelector('#page-header h2');
        const pageHeaderSubtitle = document.querySelector('#page-header p');

        const pageHeaderObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    pageHeaderTitle.style.animation = 'fade-in-scale 1s ease-out forwards';
                    pageHeaderSubtitle.style.animation = 'slide-in-left 1s ease-out 0.3s forwards';
                } else {
                    // 화면 밖으로 나가면 애니메이션 초기화 (다시 들어올 때 재생)
                    pageHeaderTitle.style.animation = 'none';
                    pageHeaderSubtitle.style.animation = 'none';
                    pageHeaderTitle.offsetHeight; // Reflow 강제
                    pageHeaderSubtitle.offsetHeight; // Reflow 강제
                }
            });
        }, { threshold: 0.5 });

        pageHeaderObserver.observe(document.getElementById('page-header'));
    }

    // --- 게시판 기능 추가 ---
    if (currentPage === 'board.html' || currentPage === 'write.html' || currentPage === '') {
        // 'write.html' 페이지의 폼 제출 이벤트 처리
        if (document.getElementById('post-form')) {
            document.getElementById('post-form').addEventListener('submit', savePost);
        }
        // 'board.html' 페이지의 게시글 목록 로드
        if (document.querySelector('.board-table')) {
            loadPosts();
        }
    }
});

function savePost(event) {
    event.preventDefault();

    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;

    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    const newPost = {
        id: posts.length > 0 ? posts[posts.length - 1].id + 1 : 1,
        title,
        content,
        author: '사용자',
        date: new Date().toISOString().slice(0, 10),
        views: 0
    };

    posts.push(newPost);
    localStorage.setItem('posts', JSON.stringify(posts));

    window.location.href = 'board.html';
}

function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const boardTableBody = document.querySelector('.board-table tbody');

    if (boardTableBody) {
        boardTableBody.innerHTML = ''; // 기존 예시 데이터 삭제

        posts.reverse().forEach(post => {
            const row = document.createElement('tr');
            row.setAttribute('data-id', post.id); // data-id 속성 추가
            row.innerHTML = `
                <td>${post.id}</td>
                <td class="title"><a href="#">${post.title}</a></td>
                <td>${post.author}</td>
                <td>${post.date}</td>
                <td>${post.views}</td>
                <td><button class="delete-btn">삭제</button></td>
            `;
            boardTableBody.appendChild(row);
        });

        // 삭제 버튼에 이벤트 리스너 추가
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const postId = e.target.closest('tr').dataset.id;
                deletePost(parseInt(postId));
            });
        });
    }
}

function deletePost(id) {
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts = posts.filter(post => post.id !== id);
    localStorage.setItem('posts', JSON.stringify(posts));
    loadPosts(); // 게시글 목록 새로고침
}

// --- 드롭다운 메뉴 모바일 클릭 이벤트 처리 ---
document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.querySelector('.dropdown .dropbtn');
    if (dropdown) {
        dropdown.addEventListener('click', (event) => {
            // 모바일 화면에서만 클릭 이벤트 작동 (데스크톱 호버와 충돌 방지)
            if (window.innerWidth <= 768) {
                event.preventDefault(); // a 태그의 기본 동작(페이지 이동) 방지
                const dropdownContent = dropdown.nextElementSibling;
                dropdownContent.classList.toggle('show');
            }
        });
    }

    // 다른 곳을 클릭하면 드롭다운 메뉴 닫기
    window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {
            const dropdowns = document.getElementsByClassName("dropdown-content");
            for (let i = 0; i < dropdowns.length; i++) {
                const openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }
});