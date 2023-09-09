

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

var isPlaying = false;            
const playBtn = $('.btn-toggle-play');
const btnPlay = $('.ti-control-play');
const cdLarger = $('.CdLarger')
const audio = $('#audio')
const playingSong = $('#playingSong')
const music_form = $('.music-form')
const progress = $('#progress')
const btnNext = $('.ti-control-skip-forward')
const btnPrev = $('.ti-control-skip-backward')
const bodys = $$('.body')
const playlists = $('.playlists')
const randomBtn = $('.ti-control-shuffle')
const repeatBtn = $('.ti-loop')
const likeBtn = $('.ti-heart')
const playlistBtn = $('.ti-menu-alt')
const modalPlaylists = $('.modalPlaylists')
const playlist_form = $('.playlist-form')
const closeBtn = $('.ti-close')


const music = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    isLike: false,
    playlists: [
            {   
                title: 'Bật Tình Yêu Lên',
                singer: 'Hòa Minzy - Tăng Duy Tân',
                path: './assets/musics/BatTinhYeuLen.mp3',
                image: './assets/img/cdSong.jpg', 
            },
            {   
                title: 'Hãy Trao Cho Anh',
                singer: 'Sơn Tùng M-TP',
                path: './assets/musics/HayTraoChoAnh.mp3',
                image: './assets/img/cdSong1.jpg', 
            },
            {   
                title: 'Nàng Thơ',
                singer: 'Hoàng Dũng',
                path: './assets/musics/NangTho.mp3',
                image: './assets/img/cdSong2.jpg', 
            },
            {   
                title: 'Waining For You',
                singer: 'Mono',
                path: './assets/musics/waitingForYou.mp3',
                image: './assets/img/cdSong3.jpg', 
            },
            {   
                title: 'Xóa Tên Anh Đi',
                singer: 'Jack97',
                path: './assets/musics/XoaTenAnhDi-JackJ97.mp3',
                image: './assets/img/cdSong.jpg', 
            },
            {   
                title: 'Chân Ái',
                singer: 'OrangeKhoi',
                path: './assets/musics/ChanAi-OrangeKhoi.mp3',
                image: './assets/img/cdSong1.jpg', 
            },
            {   
                title: 'Em Đồng Ý',
                singer: 'Đức Phúc',
                path: './assets/musics/EmDongYIDo-DucPhuc.mp3',
                image: './assets/img/cdSong2.jpg', 
            },
            {   
                title: 'Hoa Cỏ Lau (Remix)',
                singer: 'Phong Max',
                path: './assets/musics/HoaCoLauRemix-PhongMax.mp3',
                image: './assets/img/cdSong3.jpg', 
            },
            {   
                title: 'Sao Trời Làm Gió (Remix)',
                singer: 'Nal',
                path: './assets/musics/SaoTroiLamGioRemix-NalCTMedia.mp3',
                image: './assets/img/cdSong.jpg', 
            },
            {   
                title: 'See Tình',
                singer: 'Hoàng Thùy Linh',
                path: './assets/musics/SeeTinhCucakRemix-HoangThuyLinh.mp3',
                image: './assets/img/cdSong1.jpg', 
            },{   
                title: 'Bật Tình Yêu Lên',
                singer: 'Hòa Minzy - Tăng Duy Tân',
                path: './assets/musics/BatTinhYeuLen.mp3',
                image: './assets/img/cdSong.jpg', 
            },
            {   
                title: 'Hãy Trao Cho Anh',
                singer: 'Sơn Tùng M-TP',
                path: './assets/musics/HayTraoChoAnh.mp3',
                image: './assets/img/cdSong1.jpg', 
            },
            {   
                title: 'Nàng Thơ',
                singer: 'Hoàng Dũng',
                path: './assets/musics/NangTho.mp3',
                image: './assets/img/cdSong2.jpg', 
            },
            {   
                title: 'Waining For You',
                singer: 'Mono',
                path: './assets/musics/waitingForYou.mp3',
                image: './assets/img/cdSong3.jpg', 
            },
            {   
                title: 'Xóa Tên Anh Đi',
                singer: 'Jack97',
                path: './assets/musics/XoaTenAnhDi-JackJ97.mp3',
                image: './assets/img/cdSong.jpg', 
            },
            {   
                title: 'Chân Ái',
                singer: 'OrangeKhoi',
                path: './assets/musics/ChanAi-OrangeKhoi.mp3',
                image: './assets/img/cdSong1.jpg', 
            },
        ],

        render: function(){
            const _this = this;
            const $ = document.querySelector.bind(document);
            const $$ = document.querySelectorAll.bind(document);

            var htmls = this.playlists.map(function(song, index){
                return `
                    <div class="song ${index === music.currentIndex ? 'active' : ''}" data-index = "${index}">
                        <div class="thumb">
                            <img class="cdSong" src="${song.image}">
                        </div>
                        <div class="body">
                            <h3 class="title">${song.title}</h3>
                            <p class="author">${song.singer}</p>
                        </div>
                        <div class="option">
                            <i class="ti-more-alt"></i>
                        </div>
                    </div>`
            })
            var playlists = $('.playlists')
            playlists.innerHTML = htmls.join('');
        },

        defineProperties: function(){
            Object.defineProperty(this, 'currentSong', {
                get: function(){
                    return this.playlists[this.currentIndex]
                }
            })
        },

        handleEvents: function(){
            const _this = this;

            //Xử lí quay / dừng CD larger
            const cdLargerAnimate = cdLarger.animate([
                { 'transform': 'rotate(360deg)'}],
                {
                    duration: 7000,
                    iterations: Infinity
                }
            )
            cdLargerAnimate.pause();

            //Play - Pause the audio
            playBtn.onclick = function(){
                if(_this.isPlaying){
                    audio.pause();
                } else{ 
                    audio.play();
                }
            }

            //Pause the audio khi press cdLarger
            cdLarger.addEventListener("click", function(){
                if(_this.isPlaying){
                    audio.pause();
                } else{ 
                    audio.play();
                }
            });

            //Onplay audio
            audio.onplay = function(){
                _this.isPlaying = true;
                music_form.classList.add('playing'); 
                cdLargerAnimate.play();
            }
            //Onpause audio
            audio.onpause = function(){
                _this.isPlaying = false;
                music_form.classList.remove('playing');
                cdLargerAnimate.pause(); 
            }

            //Progress thay đổi theo tiến độ bài hát thay đổi
            audio.ontimeupdate = function(){ //khi thời gian audio thay đổi
                if(audio.duration){ //audio.duration - trả về tổng thời gian của audio
                    //tính ra % hiện tại của audio
                    const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                    //audio.currentTime - thời gian hiện tại của audio
                    //gán % hiện tại của audio cho value progress
                    progress.value = progressPercent;
                }
            }

            //Audio thay đổi khi tua progress
            progress.onchange = function(e){
                const seekTime = audio.duration / 100 * e.target.value //lấy value progress hiện tại
                audio.currentTime = seekTime; //update lại thời gian hiện tại cho audio
            }

            //Next Song
            btnNext.addEventListener("click", function(){
                if(_this.isRandom){
                    _this.playRandomSong();
                }else{
                    _this.nextSong();
                }
                audio.play();
                _this.render();
                _this.scrollToActiveSong();
            })

            //Previous Song
            btnPrev.addEventListener("click", function(){
                if(_this.isRandom){
                    _this.playRandomSong();
                }else{
                    _this.prevSong();
                }
                audio.play();
                _this.render();
                _this.scrollToActiveSong();
            })

            //Click repaetBtn
            repeatBtn.onclick = function(){
                _this.isRepeat = !_this.isRepeat;
                repeatBtn.classList.toggle('active', _this.isRepeat);      
            }
            
            //Click randomBtn
            randomBtn.onclick = function(){
                _this.isRandom = !_this.isRandom;
                randomBtn.classList.toggle('active', _this.isRandom);      
            }

            //Click Like
            likeBtn.onclick = function(){
                _this.isLike = !_this.isLike;
                likeBtn.classList.toggle('active', _this.isLike);      
            }

            //Khi phát hết audio hiện tại
            audio.onended = function() {
                if(_this.isRepeat){
                    audio.play();
                }else{
                    btnNext.click();
                }
            };

            //Click vào playlists
            playlists.onclick = function(e) {
                const songNode = e.target.closest('.song:not(.active)');
                if( songNode || e.target.closest('.option')){
                    //Click vào song
                    if(songNode){
                        _this.currentIndex = Number(songNode.dataset.index);
                        _this.loadCurrentSong();
                        _this.render();
                        audio.play();
                    }
                    
                    //Click vào option
                    if(e.target.closest('.option')){
                        //Xử lí logically
                    }
                }
            };

            //Click vào menu list
            playlistBtn.onclick = function(){
                playlist_form.style.transform = 'translateX(0)';
            }

            //Close Modal Playlists
            closeBtn.onclick = function(){                
                playlist_form.style.transform = 'translateX(100%)';
            }

        },

        loadCurrentSong: function(){
            playingSong.textContent = this.currentSong.title;
            audio.src = this.currentSong.path;
            cdLarger.src = this.currentSong.image;
        },

        nextSong: function(){
            this.currentIndex++;
            if(this.currentIndex >= this.playlists.length){
                this.currentIndex = 0;
            }
            this.loadCurrentSong();
        },

        prevSong: function(){
            this.currentIndex--;
            if(this.currentIndex <= 0){
                this.currentIndex = this.playlists.length - 1;
            }
            this.loadCurrentSong();
        },

        playRandomSong: function(){
            let newIndex;
            do{
                newIndex = Math.floor(Math.random() * this.playlists.length);
            } while( newIndex === this.currentIndex )
            this.currentIndex = newIndex;
            this.loadCurrentSong();
        },

        //Kéo view audio đang phát vào tầm nhìn
        scrollToActiveSong: function(){
            setTimeout(function(){
                $('.song.active').scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                });
            },200)
        },
   
        start: function(){
            this.defineProperties()
            this.handleEvents()   
            this.loadCurrentSong()
            this.render()
        }
    }

    music.start();
    