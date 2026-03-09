document.addEventListener('DOMContentLoaded', function() {
    
    // =======================================================
    // 1. ALERT BAR & NAVBAR (STICKY) LOGIC
    // =======================================================
    const alertBar = document.getElementById('alertBar');
    const closeAlertBtn = document.getElementById('closeAlert');
    const navbar = document.querySelector('.navbar');
    let isAlertClosed = false;

    if (closeAlertBtn && alertBar) {
        closeAlertBtn.addEventListener('click', function() {
            alertBar.style.display = 'none'; 
            isAlertClosed = true;
            if(navbar) navbar.style.top = '0'; 
        });
    }

    window.addEventListener('scroll', function() {
        if (!navbar) return;
        if (window.scrollY > 40) {
            navbar.style.top = '0';
            navbar.style.background = 'rgba(0, 0, 0, 0.9)';
            navbar.style.padding = '15px 5%'; 
        } else {
            navbar.style.top = isAlertClosed ? '0' : '40px'; 
            navbar.style.background = 'rgba(0, 0, 0, 0.2)'; 
            navbar.style.padding = '20px 5%';
        }
    });


    // =======================================================
    // 2. SCROLL REVEAL ANIMATION
    // =======================================================
    function reveal() {
        const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight; 
            const elementTop = reveals[i].getBoundingClientRect().top; 
            const elementVisible = 100; 

            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            } else {
                reveals[i].classList.remove('active');
            }
        }
    }
    window.addEventListener('scroll', reveal);
    reveal();


    // =======================================================
    // 3. SLIDER PROFIL ALUMNI LOGIC
    // =======================================================
    const alumniTrack = document.getElementById('alumniTrack');
    const prevAlumniBtn = document.getElementById('prevAlumni');
    const nextAlumniBtn = document.getElementById('nextAlumni');

    if (alumniTrack && prevAlumniBtn && nextAlumniBtn) {
        nextAlumniBtn.addEventListener('click', function() {
            const scrollAmount = alumniTrack.clientWidth; 
            alumniTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        prevAlumniBtn.addEventListener('click', function() {
            const scrollAmount = alumniTrack.clientWidth;
            alumniTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
    }


    // =======================================================
    // 4. TABEL STAFF & PAGINATION LOGIC
    // =======================================================
    const staffTableBody = document.getElementById('staffTableBody');
    const paginationContainer = document.getElementById('paginationContainer');

    if (staffTableBody && paginationContainer) {
        const staffData = [
            { nama: "Caecilia Esti Prastiwi, S.Pd.", mapel: "Pendidikan Agama dan Budi Pekerti" },
            { nama: "Muhammad Anas, S.Pd.I", mapel: "Pendidikan Agama dan Budi Pekerti" },
            { nama: "Nurul Yaqin, S.Ag., M.Si.", mapel: "Pendidikan Agama dan Budi Pekerti" },
            { nama: "WINANTI UNTUNG SUMARYONO, S.Th.", mapel: "Pendidikan Agama dan Budi Pekerti" },
            { nama: "Yekti Nugroho, M.Pd.", mapel: "Pendidikan Agama dan Budi Pekerti" },
            { nama: "Didit Waluyono, S.Pd., M.Pd.", mapel: "Pendidikan Pancasila dan Kewarganegaraan" },
            { nama: "Dr. Trisna Widyana, S.Pd., M.Pd.", mapel: "Pendidikan Pancasila dan Kewarganegaraan" },
            { nama: "ARDA SEDYOKO, S.Pd., M.Pd.Gr", mapel: "Bahasa Indonesia" },
            { nama: "NUR RIDWAN, S.Pd", mapel: "Bahasa Indonesia" },
            { nama: "Puji Utami, S.Pd.", mapel: "Bahasa Indonesia" },
            { nama: "Siti Purnaningsih, S.S., M.Pd.", mapel: "Bahasa Indonesia" },
            { nama: "Haryani, S.Pd., M.Pd.", mapel: "Matematika" },
            { nama: "Maria Ernawati Millatana, S.Pd.", mapel: "Matematika" },
            { nama: "RIDHO YUWONO, S.Si.,M.T", mapel: "Matematika" },
            { nama: "Sunarwanta, S.Pd.", mapel: "Matematika" },
            { nama: "Erwin Syahril Mubarok, M.Pd.", mapel: "Bahasa Inggris" },
            { nama: "Slamet Marmono, S.Pd.", mapel: "Bahasa Inggris" },
            { nama: "Utami Solfah, S.Pd., M.Pd.", mapel: "Bahasa Inggris" },
            { nama: "Drs. Marmayadi", mapel: "Sejarah Indonesia" },
            { nama: "Prawhita Adi Putri, S.Pd.", mapel: "Seni Budaya" },
            { nama: "Budi Santoso, S.Pd.", mapel: "Pendidikan Jasmani & Olahraga" },
            { nama: "Rini Astuti, S.E.", mapel: "Ekonomi" }
        ];

        let currentPage = 1;
        const rowsPerPage = 10;

        function displayTable(page) {
            staffTableBody.innerHTML = "";
            const start = (page - 1) * rowsPerPage;
            const end = start + rowsPerPage;
            const paginatedItems = staffData.slice(start, end);

            paginatedItems.forEach((staff, index) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${start + index + 1}</td>
                    <td>${staff.nama}</td>
                    <td>${staff.mapel}</td>
                `;
                staffTableBody.appendChild(tr);
            });
        }

        function setupPagination() {
            paginationContainer.innerHTML = "";
            const pageCount = Math.ceil(staffData.length / rowsPerPage);

            for (let i = 1; i <= pageCount; i++) {
                const btn = document.createElement('button');
                btn.classList.add('page-btn');
                if (i === currentPage) btn.classList.add('active');
                btn.innerText = i;

                btn.addEventListener('click', function() {
                    currentPage = i;
                    displayTable(currentPage);
                    updatePaginationButtons();
                });
                paginationContainer.appendChild(btn);
            }

            if (pageCount > 1) {
                const nextBtn = document.createElement('button');
                nextBtn.classList.add('page-btn');
                nextBtn.innerText = "Next";
                
                nextBtn.addEventListener('click', function() {
                    if (currentPage < pageCount) {
                        currentPage++;
                        displayTable(currentPage);
                        updatePaginationButtons();
                    }
                });
                paginationContainer.appendChild(nextBtn);
            }
        }

        function updatePaginationButtons() {
            const buttons = paginationContainer.querySelectorAll('.page-btn');
            buttons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.innerText == currentPage) {
                    btn.classList.add('active');
                }
            });
        }

        displayTable(currentPage);
        setupPagination();
    }


    // =======================================================
    // 5. FAQ ACCORDION LOGIC
    // =======================================================
    const faqItems = document.querySelectorAll('.faq-item');

    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');

            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                });

                if (!isActive) {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + "px";
                }
            });
        });
    }


    // =======================================================
    // 6. GALERI FILTER & LIGHTBOX LOGIC
    // =======================================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galeryItems = document.querySelectorAll('.galery-item');

    if (filterBtns.length > 0 && galeryItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(button => button.classList.remove('active'));
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                galeryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.classList.remove('hide');
                        item.classList.add('show');
                    } else {
                        item.classList.add('hide');
                        item.classList.remove('show');
                    }
                });
            });
        });
    }

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeLightbox = document.getElementById('closeLightbox');

    if (lightbox && galeryItems.length > 0) {
        galeryItems.forEach(item => {
            item.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').getAttribute('src');
                const captionText = this.querySelector('h4').innerText;

                lightboxImg.setAttribute('src', imgSrc);
                lightboxCaption.innerText = captionText;
                lightbox.classList.add('active');
            });
        });

        closeLightbox.addEventListener('click', function() {
            lightbox.classList.remove('active');
        });

        lightbox.addEventListener('click', function(e) {
            if (e.target !== lightboxImg && e.target !== closeLightbox) {
                lightbox.classList.remove('active');
            }
        });
    }

    // =======================================================
    // 7. EKSKUL MODAL POP-UP LOGIC (HALAMAN EKSTRAKURIKULER)
    // =======================================================
    const ekskulCards = document.querySelectorAll('.ekskul-card');
    const ekskulModal = document.getElementById('ekskulModal');
    const closeEkskulBtn = document.getElementById('closeEkskul');

    if (ekskulCards.length > 0 && ekskulModal) {
        
        // Tangkap elemen di dalam modal
        const modalImg = document.getElementById('modalBannerImg');
        const modalTitle = document.getElementById('modalTitle');
        const modalJadwal = document.getElementById('modalJadwal');
        const modalDesc = document.getElementById('modalDesc');
        const modalIg = document.getElementById('modalIg');
        const modalEmail = document.getElementById('modalEmail');

        // Beri event click pada setiap kotak ekskul
        ekskulCards.forEach(card => {
            card.addEventListener('click', function() {
                
                // Ambil Data dari Kartu
                const imgSrc = this.querySelector('.ekskul-banner img').getAttribute('src');
                const titleText = this.querySelector('.ekskul-info h3').innerText;
                const jadwalHTML = this.querySelector('.ekskul-jadwal').innerHTML;
                const fullDescHTML = this.querySelector('.ekskul-full-desc').innerHTML;
                const igLink = this.getAttribute('data-ig');
                const emailLink = this.getAttribute('data-email');

                // Masukkan Data ke dalam Modal
                modalImg.setAttribute('src', imgSrc);
                modalTitle.innerText = titleText;
                modalJadwal.innerHTML = jadwalHTML;
                modalDesc.innerHTML = fullDescHTML;
                modalIg.setAttribute('href', igLink);
                modalEmail.setAttribute('href', emailLink);

                // Tampilkan Modal
                ekskulModal.classList.add('active');
                
                // Kunci scrolling halaman latar belakang saat modal terbuka
                document.body.style.overflow = 'hidden'; 
            });
        });

        // Tutup saat tombol X diklik
        closeEkskulBtn.addEventListener('click', function() {
            ekskulModal.classList.remove('active');
            document.body.style.overflow = 'auto'; // Kembalikan scroll
        });

        // Tutup saat klik area gelap di luar modal
        ekskulModal.addEventListener('click', function(e) {
            // Jika yang diklik adalah background gelap (bukan konten putih)
            if (e.target === ekskulModal) {
                ekskulModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

});