////////////////////////////////// MỸ XUỒI ////////////////////////////////////
///////////////////////////////DATE 31/12/2021 ////////////////////////////////
/////////////////////////////TASK MUSIC PLAYER   //////////////////////////////////

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

/* 
1. Render songs
2. Scroll top
3. Play / pause / seek
4. CD rotate
5. Next / prev
6. Random
7. Next / Repeat when ended
8. Active Song
9. Scroll active song into view
10. Play song when click
*/
const PLAYER_STORAGE_KEY = 'MYXUOI_PLAYER'
const MUSIC_LOVE = 'MYXUOI_LOVE_SONG'
const playList = $('.playlist')
const cd = $('.cd')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progess = $('#progess')
const preBtn = $('.btn-prev')
const nextBtn = $('.btn-next')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const volumnControl = $('#volumn-control')
const vietnamBtn = $('.vn-song-btn')
const usBtn = $('.us-song-btn')
const loveBtn = $('.love-song-btn')
const listAll = $$('.list-song')
const addLoveSong = $('.add-love')
const optionBtn = $$('.option')
const addToLove = $('.add-to-love')
const overlay = $('.overlay')

let randomArray = []
const app = {
    currentIndex: 0,
    currentList: 'us',
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    configLove:JSON.parse(localStorage.getItem(MUSIC_LOVE)) || {},
    songs: {
        us: [
            {
                name: 'Hymn for the weekend',
                singer: 'Coldplay',
                path: './assets/path/Hymn For The Weekend.mp3',
                image: './assets/img/Coldplay,_Hymn_for_the_Weekend,_Artwork.jpg'
            },
                {
                name: 'Lily',
                singer: 'Alan Walker',
                path: './assets/path/Lily.mp3',
                image: './assets/img/lily.jpg'
            },
                {
                name: 'Lost control',
                singer: 'Alan Walker',
                path: './assets/path/Lost Control.mp3',
                image: './assets/img/lost-control.jpg'
            },
                {
                name: 'On my way',
                singer: 'Alan Walker',
                path: './assets/path/On My Way.mp3',
                image: './assets/img/on-my-way.jpg'
            },
                {
                name: 'Play date',
                singer: 'Melanie Martinez',
                path: './assets/path/Play Date.mp3',
                image: './assets/img/play-date.jpg'
            },
            {
                name: 'The Nights',
                singer: 'Avicii',
                path: './assets/path/The Nights.mp3',
                image: './assets/img/the-night.jpg'
            },
                {
                name: 'River',
                singer: 'Charlie Puth',
                path: './assets/path/River Official Audio.mp3',
                image: './assets/img/river.jpg'
            },
                {
                name: 'Waiting for love',
                singer: 'Avicii',
                path: './assets/path/Waiting For Love.mp3',
                image: './assets/img/waiting-for-love.jpg'
            }
        ],
        vietnamese: [
            {
                name: 'Bài này chill phết',
                singer: 'Đen Vâu',
                path: './assets/path/vietnam/Bài Này Chill Phết.mp3',
                image: './assets/img/vietnam/bainaychillphet.jpg'
            },
            {
                name: 'Chỉ là không cùng nhau',
                singer: 'Tăng Phúc',
                path: './assets/path/vietnam/CHỈ LÀ KHÔNG CÙNG NHAU.mp3',
                image: './assets/img/vietnam/chi-la-khong-cung-nhau.jpg'
            },
            {
                name: 'Lối nhỏ',
                singer: 'Đen Vâu',
                path: './assets/path/vietnam/Lối Nhỏ.mp3',
                image: './assets/img/vietnam/loinho.jpg'
            },
            {
                name: 'Nơi này có anh',
                singer: 'Sơn Tùng',
                path: './assets/path/vietnam/NƠI NÀY CÓ ANH.mp3',
                image: './assets/img/vietnam/Nơi_này_có_anh.jpg'
            },
            {
                name: 'Tháng mấy em nhớ anh',
                singer: 'Hà Anh Tuấn',
                path: './assets/path/vietnam/thang_may_em_nho_anh.mp3',
                image: './assets/img/vietnam/thang-may-em-nho-an.jpg'
            },
            {
                name: 'Thanh Xuân',
                singer: 'Da LAB',
                path: './assets/path/vietnam/Thanh Xuân.mp3',
                image: './assets/img/vietnam/thanhxuan.jpg'
            },
            {
                name: 'Thiên Đàng',
                singer: 'Joli Poli - Wowy',
                path: './assets/path/vietnam/THIÊN ĐÀNG.mp3',
                image: './assets/img/vietnam/thiendang.jpg'
            },
            {
                name: 'Tất cả sẽ thay anh',
                singer: 'Tăng Phúc',
                path: './assets/path/vietnam/Tất Cả Sẽ Thay Anh.mp3',
                image: './assets/img/vietnam/tatcasethayanh.jpg'
            },
            {
                name: 'Đừng chờ anh nữa',
                singer: 'Tăng Phúc',
                path: './assets/path/vietnam/ĐỪNG CHỜ ANH NỮA.mp3',
                image: './assets/img/vietnam/dungchoanhnua.jpg'
            }
        ],
        love: []

    },
    setConfig: function(key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },
    setConfigLove: function(arrayLove) {
        this.configLove = arrayLove;
        localStorage.setItem(MUSIC_LOVE, JSON.stringify(this.configLove))
    },

    render: function() {
        const html = this.songs[this.currentList].map(function(song, index) {
            return `
                <div class="song ${index === app.currentIndex ? 'active' :''}" data-index = ${index}">
                    <div class="thumb" style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h icon-option"></i>
                    </div>
                </div>
            `     
        })
        playList.innerHTML = html.join('')
        
    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong',{
            get: function() {
                return this.songs[this.currentList][this.currentIndex]
            }
        } )
    },
    
    handleEvents:  function() {
        _this = this
        cdWidth = cd.offsetWidth;
        //xử lý cd rotated 
        const cdThumbAnimate = cdThumb.animate([
            {transform: 'rotate(360deg)'}
        ], {
            duration: 10000, //ten seconds
            iterations: Infinity
        })
        cdThumbAnimate.pause()
        //xử lý phóng to thu nhỏ cd
        document.onscroll = function() {
            const  scrollTop = document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop;
            if (newCdWidth <= 0) {
                cd.style.width = 0 + 'px';
            } else {
                cd.style.width = newCdWidth + 'px';
            }
            cd.style.opacity = newCdWidth/cdWidth
        }
        //xử lý khi click play
        playBtn.onclick = function() {
            if(_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }
        //khi bài hát được play
        audio.onplay = function() {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }
        //khi bài hát bị pause
        audio.onpause = function() {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }
        //khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function() {
            if (audio.duration) {
                const progessPercent = audio.currentTime / audio.duration * 100
                progress.value = progessPercent
            }
        }
        //xử lý khi tua bài hát
        progress.oninput = function(e) {
            const seekTime = e.target.value * audio.duration / 100
            audio.currentTime = seekTime
        }
        //khi next bài hát
        nextBtn.onclick = function() {
            if(_this.isRandom) {
                _this.randomSong()
            } if (_this.isRepeat) {
                _this.playRepeatSong()
            } 
            else {
                _this.nextSong()
            }
            _this.setConfig('currentIndex', _this.currentIndex)
            _this.render()
            _this.scrollToActiveSong()
            audio.play()
        }
        preBtn.onclick = function() {
            if(_this.isRandom) {
                _this.randomSong()
            } if (_this.isRepeat) {
                _this.playRepeatSong()
            }
            else {
                _this.previousSong()
            }
            _this.setConfig('currentIndex', _this.currentIndex)
            _this.render()
            _this.scrollToActiveSong()
            audio.play()
        }
        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', _this.isRandom)
            randomBtn.classList.toggle('active', _this.isRandom)
        }
        //xử lý lặp lại bài hát
        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat
            _this.setConfig('isRepeat', _this.isRepeat)
            repeatBtn.classList.toggle('active')
        }

        audio.onended = function() {
            if(_this.isRepeat) {
                audio.play()
            } else {
                nextBtn.click()
            }
        }
        //lắng nghe hành vi click vào playlist
        playList.onclick = function(e) {
            const allSongNode = e.target.closest('.song')
            const songNote = e.target.closest('.song:not(.active)')
            const optionNode = e.target.closest('.option')
            if(e.target.closest('.song:not(.active)') || e.target.closest('.option')) {
                if(e.target.closest('.song:not(.active)') && !e.target.closest('.option')) {
                    _this.currentIndex = parseInt(songNote.getAttribute('data-index'))   //can use element.dataset.index instead
                    _this.loadCurrentSong()
                    audio.play()
                    _this.render()
                }
                if(e.target.closest('.option')) {
                    addLoveSong.classList.add('add-love-active')
                    overlay.classList.add('add-overlay-active')
                    addToLove.onclick = function() {
                        const indexTrace = parseInt(allSongNode.getAttribute('data-index'))
                        console.log(indexTrace)
                        if(_this.currentList === 'us') {
                            newLove = _this.songs['us'][indexTrace]
                        } else {
                            newLove = _this.songs['vietnamese'][indexTrace]
                        }
                        _this.setConfigLove(newLove)
                        if(!_this.songs['love'].includes(newLove)) {
                            _this.songs['love'].push(newLove)
                            _this.setConfigLove(_this.songs['love'])
                            alert(`bạn đã thêm bài hát ${newLove.name} vào mục yêu thích`)
                        } else {
                            alert('Bài hát này đã có trong mục yêu thích')
                        }

                    }
                }
            }
        }

        overlay.onclick = function() {
            overlay.classList.remove('add-overlay-active')
            addLoveSong.classList.remove('add-love-active')
        }
        //xử lý điều chỉnh âm lượng của bài hát
        volumnControl.oninput = function(e) {
            const seekVolumn = e.target.value/ 100;
            audio.volumn = seekVolumn;
        }
        //xử lý đổi list bài hát
        vietnamBtn.onclick = function() {
            usBtn.classList.remove('active')
            loveBtn.classList.remove('active')
            vietnamBtn.classList.add('active')
            _this.currentList = 'vietnamese'
            _this.loadCurrentSong()
            _this.render()
            playBtn.click()
        } 
        usBtn.onclick = function() {
            vietnamBtn.classList.remove('active')
            loveBtn.classList.remove('active')
            usBtn.classList.add('active')
            _this.currentList = 'us'
            _this.loadCurrentSong()
            _this.render()
            audio.play()
            playBtn.click()
        } 
        loveBtn.onclick = function() {
            if(_this.songs['love'].length === 0) {
                alert('bạn chưa có bài hát yêu thích')
            } else {
            vietnamBtn.classList.remove('active')
            usBtn.classList.remove('active')
            loveBtn.classList.add('active')
            _this.currentList = 'love'
            _this.loadCurrentSong()
            _this.render()
            audio.play()
            playBtn.click()
            }
        } 
        //xử lý khi click thêm vào bài hát yêu thích
    },

    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },

    scrollToActiveSong: function() {
        setTimeout(function() {
            $('.song.active').scrollIntoView({behavior: "smooth", block: "center"})
        },150)
    },
    
    loadConfig: function() {
        if(this.config.isRandom) {
            this.isRandom = this.config.isRandom
        } else {
            this.isRandom = false
        }
        if(this.config.isRepeat) {
            this.isRepeat = this.config.isRepeat
        } else {
            this.isRepeat = false
        }
        if(this.config.currentIndex) {
            this.currentIndex = this.config.currentIndex
        } else {
            this.currentIndex = 0
        }
        if(this.configLove.length > 0)  {
            this.songs['love'] = this.songs['love'].concat(this.configLove)

        }
        console.log(this.configLove.length)
        this.render()
    },  

    previousSong: function() {
        this.currentIndex--
        if(this.currentIndex < 0) {
            this.currentIndex = this.songs[this.currentList].length
        }
        this.loadCurrentSong()
    },

    nextSong : function() {
        this.currentIndex++ 
        if(this.currentIndex >= this.songs[this.currentList].length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },

    randomSong: function() {
        let randomNum
        do {
            randomNum = Math.floor(Math.random() * this.songs[this.currentList].length)
            if(randomArray.length === this.songs[this.currentList].length ) {
                randomArray.splice(0,7)
            }
        }
        while(randomArray.includes(randomNum))
        randomArray.push(randomNum)
        console.log(randomArray)
        this.currentIndex = randomNum;
        
        this.loadCurrentSong()
    },

    playRepeatSong:function() {
        this.currentIndex = this.currentIndex
        this.loadCurrentSong()
    },

    start: function() {
        //load config vào trình duyệt
        this.loadConfig()
        //định nghĩa các thuộc tính cho object
        this.defineProperties()
        //lắng nghe và xử lý các sự kiện
        this.handleEvents()

        //tải thông tin đầu tiên vào ui khi chạy ứng dụng
        this.loadCurrentSong()
        //render playlist
        this.render()
        //load giao diện từ config
        randomBtn.classList.toggle('active',this.isRandom)
        repeatBtn.classList.toggle('active', this.isRepeat)
    }
}
app.start()
