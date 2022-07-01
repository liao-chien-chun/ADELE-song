// DEFAULT CODE ////////////////////////
const BASE_URL = 'https://lyric-api-403c0.firebaseio.com/'
const songList = document.querySelector('#song-list')
const lyricsPanel = document.querySelector('#lyrics-panel')
const album = {
  artist: 'Adele',
  album: '25',
  tracks: [
    'Hello',
    'Send My Love (To Your New Lover)',
    'I Miss You',
    'When We Were Young',
    'Remedy',
    'Water Under the Bridge',
    'River Lea',
    'Love in the Dark',
    'Million Years Ago',
    'All I Ask',
    'Sweetest Devotion'
  ]
}

// WRITE YOUR CODE ////////////////////////

//先建立空字串等等放標籤
let navHtml = ''

//把album物件內容track選出來後用forEach迭代出來
//建立li標籤，裡面包a標籤
album.tracks.forEach(song => {
  navHtml += `
    <li>
      <a class="nav-link" href="#" role="tab">${song}</a>
    </li>
  `
})
//把內容加到歌詞表裡面
songList.innerHTML = navHtml

//綁定監聽器
songList.addEventListener('click', event => {
  let target = event.target

  //先選出active這個節點（之後會創造）
  const activeItem = document.querySelector('#song-list .active')
  if (activeItem) { //如果有這個就刪除
    activeItem.classList.remove('active')
  }

  //matches("")可以用css選擇器
  if (target.matches('.nav-link')) {
    //如果選到的標籤有class= nav-link
    //就用toggle開啟active
    target.classList.toggle('active')

    //把歌詞名稱存到變數
    const song = target.innerText

    //點擊向axios發出請求
    axios.get(`${BASE_URL}Adele/${song}.json`)
      .then(response => {
        //把歌詞存到變數
        const lyrics = response.data.lyrics
        
        //加到歌詞區塊
        lyricsPanel.innerHTML = `
          <h3>${song}</h3>
          <pre>${lyrics}</pre>
        `
      })
      .catch(error => console.log(error))
  }
})