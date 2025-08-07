
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
});
