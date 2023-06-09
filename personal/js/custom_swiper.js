const slide = document.querySelector(".slide");
let slideWidth = slide.clientWidth/3;

const slideItems = document.querySelectorAll(".slide_item");

const maxSlide = slideItems.length;

let currSlide = 1;

let show = document.querySelector(".show");

function showPreview() {
  show.innerHTML="";
  console.log(currSlide);
  let linkText;
  if(currSlide===7){
    linkText=`<a href="http://ahdzlaksen.cafe24.com/teamplay/index.html">`;
  }else if(currSlide===9){
    linkText=`<a href="http://ahdzlaksen.cafe24.com/portfolio/0${currSlide-1}/index.html">`;
  }else{
    linkText=`<a href="http://ahdzlaksen.cafe24.com/portfolio/0${currSlide-1}/index.html">`;
  }
  show.innerHTML=`${linkText}<h3>GO TO THIS PORTFOLIO</h3>
    <img src="./personal/images/portfolio0${currSlide-1}.jpg" alt="미리보기">
    </a>`;
};
function defaultPreview() {
  show.innerHTML=`<h3>INSERT PREVIEW</h3>`;
};

inArrow();
function inArrow() {
  if(currSlide < maxSlide-1){
    document.querySelector(".slide_in>h3").setAttribute("style", "opacity:1");
  } else {
    document.querySelector(".slide_in>h3").setAttribute("style", "opacity:0");
  }
};

function outArrow() {
  if(currSlide > 1){
    document.querySelector(".slide_out>h3").setAttribute("style", "opacity:1");
  } else {
    document.querySelector(".slide_out>h3").setAttribute("style", "opacity:0");
  }
};

function nextMove() {
  currSlide++;
  if (currSlide < maxSlide) {
      const offset = slideWidth * (currSlide-1);
      slideItems.forEach((i) => {
        i.setAttribute("style", `left: ${-offset}px`);
      });
  } else {
    currSlide--;
  }
  showPreview();
  inArrow();
  outArrow();
};
function prevMove() {
  currSlide--;
  if (currSlide > 1) {
    const offset = slideWidth * (currSlide-1);
    slideItems.forEach((i) => {
      i.setAttribute("style", `left: ${-offset}px`);
      showPreview();
    });
  } else if(currSlide > 0) {
    const offset = slideWidth * (currSlide-1);
    slideItems.forEach((i) => {
      i.setAttribute("style", `left: ${-offset}px`);
      defaultPreview();
    });
  } else {
    currSlide++;
  }
  inArrow();
  outArrow();
};

let startPoint = 0;
let endPoint = 0;

// 브라우저 화면이 조정될 때 마다 slideWidth를 변경하기 위해
window.addEventListener("resize", () => {
  slideWidth = slide.clientWidth/3;
});

// PC 드래그 시 스크립트
slide.addEventListener("mousedown", (e) => {
  startPoint = e.pageX;
});

slide.addEventListener("mouseup", (e) => {
  endPoint = e.pageX;
  if (startPoint < endPoint) {
    prevMove();
  } else if (startPoint > endPoint) {
    nextMove();
  }
});

// 모바일 터치 이벤트 (스와이프)
slide.addEventListener("touchstart", (e) => {
  startPoint = e.touches[0].pageX;
});
slide.addEventListener("touchend", (e) => {
  endPoint = e.changedTouches[0].pageX;
  if (startPoint < endPoint) {
    prevMove();
  } else if (startPoint > endPoint) {
    nextMove();
  }
});

// // 버튼 사용 시 스크립트
// const prevBtn = document.querySelector(".slide_prev_button");
// const nextBtn = document.querySelector(".slide_next_button");
// nextBtn.addEventListener("click", () => {
//   nextMove();
// });
// prevBtn.addEventListener("click", () => {
//   prevMove();
// });

new fullScroll({
  mainElement: 'wrap',
  displayDots: true,
  dotsPosition: 'right',
  animateTime: 0.7,
  animateFuction: 'ease'
});