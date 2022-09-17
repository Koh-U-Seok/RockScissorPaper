let computerRsp;
let userRsp;
let rspImage = ["rspScissor.jpg", "rspRock.jpg", "rspPaper.jpg"];
let rspImageIndex = 0;
let coin = 1000;
let children = [...document.getElementById("rspOdds").children];
// 초기 지급 1000코인
let rspImageChangeInterval;

// 문서에서 태그 이름이 div인 노드를 찾아보자.

console.log("게임을 시작한다!");

//게임 시작 레버 작동
function leverActuation() {
  document.getElementById("box1").style.backgroundColor = "pink";
  document.getElementById("box2").style.backgroundColor = "pink";
  document.getElementById("box3").style.backgroundColor = "greenyellow";
  document.getElementById("box4").style.backgroundColor = "skyblue";
  console.log("leverActuation 실행 중");
  rspImageChange(500);
  document.getElementById("lever").onclick = () => {
    console.log("lever 클릭 입력 감지.");
    rspImageChange(250);
    console.log("rspImageChange() 호출");
    console.log("clearInterval");
    coinRich();
    //100원 이상 소지하고 있는가?
  };
}
function rspImageChange(num) {
  clearInterval(rspImageChangeInterval);
  rspImageChangeInterval = setInterval(() => {
    document
      .getElementById("rspMainImage")
      .setAttribute("src", rspImage[rspImageIndex]);
    rspImageIndex >= 2 ? (rspImageIndex = 0) : rspImageIndex++;
  }, num);
}

// 100원 이상 소지 여부 판별
function coinRich() {
  console.log("coinRich() 실행");
  document.getElementById("lever").onclick = null;
  // 코인을 이미 투입했으니 다시 투입 못하게 막기
  if (coin >= 100) {
    console.log(`${coin}개의 코인을 갖고 있다`);
    // 100보다 많으니 게임 플레이 가능
    coin -= 100;
    document.getElementById("rspCoin").innerText = coin;
    console.log(`100원을 투입해 ${coin}개 코인이 되었습니다`);
    // 100원 투입
    userSelect();
    // 가위바위보를 선택할 차례.
  } else {
    console.log(`갖고 있는 코인이 ${coin}개 밖에 없어서 게임을 못해`);
    alert("우리 카지노에서 나가");
    return;
    // 끝내기
  }
}

// 유저의 가위바위보를 감지. 감지 즉시
function userSelect() {
  console.log("userSelect() 실행 중");
  let cS;
  document.getElementById("rspScissor").onclick = () => {
    document.getElementById("rspScissor").style.backgroundColor = "red";
    console.log("가위를 골랐다");
    rspImageChangeAccelAndDecel(0);

    // 가위바위보 승부하러 가기
  };
  document.getElementById("rspRock").onclick = () => {
    document.getElementById("rspRock").style.backgroundColor = "red";
    console.log("바위를 골랐다");
    rspImageChangeAccelAndDecel(1);
  };
  document.getElementById("rspPaper").onclick = () => {
    document.getElementById("rspPaper").style.backgroundColor = "red";
    console.log("보를 골랐다");
    rspImageChangeAccelAndDecel(2);
  };
}
function rspSeal() {
  document.getElementById("rspScissor").onclick = null;
  document.getElementById("rspRock").onclick = null;
  document.getElementById("rspPaper").onclick = null;
  console.log("패를 골랐으니 더 이상 다른 패를 선택할 수 없다");
  return;
}
function computerSelect() {
  computerRsp = parseInt(Math.random() * 3) + 1;
  console.log(`컴퓨터가 고른 것 : ${computerRsp} (1:가위  2:바위  3:보)`);
  return computerRsp;
}

//rsp 이미지 순간적으로 가속했다가 감속하다가 정지
function rspImageChangeAccelAndDecel(num) {
  setTimeout(() => {
    rspImageChange(100);
    console.log("rspImageChange(100);");
    setTimeout(() => {
      rspImageChange(200);
      console.log("rspImageChange(200);");
      setTimeout(() => {
        rspImageChange(400);
        console.log("rspImageChange(400);");
        setTimeout(() => {
          rspImageChange(800);
          console.log("rspImageChange(800);");
          setTimeout(() => {
            clearInterval(rspImageChangeInterval);
            document
              .getElementById("rspMainImage")
              .setAttribute("src", rspImage[num]);
            rspSeal();
            cS = computerSelect();
            rspBattle(num + 1, cS);
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);
  console.log("rspImageChangeAccelAndDecel() 종료");
}

//컴퓨터 가위바위보 패 선택

function coinDraw() {
  console.log("coinDraw() 실행 중");
  console.log("기존 코인 : " + coin);
  coin += 100;
  console.log("갱신된 코인 : " + coin);
  return;
}

function coinWin() {
  console.log("coinWin() 실행 중");
  let coinBonus;
  let coinRandom;
  let i = 0;
  let coinLoop = setInterval(() => {
    if (i < 30) {
      coinRandom = parseInt(Math.random() * 16);
      document
        .getElementById(`rspOdds${coinRandom}`)
        .classList.add("rspOddsEffect");
      setTimeout(() => {
        document
          .getElementById(`rspOdds${coinRandom}`)
          .classList.remove("rspOddsEffect");
      }, 100);
      coinBonus = parseInt(children[coinRandom].innerText);
      i++;
    } else {
      clearInterval(coinLoop);
    }
  }, 200);
  setTimeout(() => {
    console.log(`랜덤으로 나온 배율 : ${coinBonus}`);
    console.log("기존 코인 : " + coin);
    coin += 100 * coinBonus;
    console.log("갱신된 코인 : " + coin);
  }, 6100);
  return;
}

function rspBattle(uS, cS) {
  console.log("rspBattle() 실행 중");
  console.log(`uS : ${uS}, cS : ${cS} `);
  if (uS == cS) {
    console.log("비겼다");
    document.getElementById("box4").style.backgroundColor = "blue";
    setTimeout(() => {
      document.getElementById("box4").style.backgroundColor = "skyblue";
      coinDraw();
      rspEnd(1000);
    }, 2000);
  }
  if (uS == cS + 1 || uS == cS - 2) {
    console.log("이겼다");
    document.getElementById("box1").style.backgroundColor = "magenta";
    document.getElementById("box2").style.backgroundColor = "magenta";
    setTimeout(() => {
      document.getElementById("box1").style.backgroundColor = "pink";
      document.getElementById("box2").style.backgroundColor = "pink";
      coinWin();
      rspEnd(6500);
    }, 2000);
  }
  if (uS + 1 == cS || uS - 2 == cS) {
    console.log("졌다");
    document.getElementById("box3").style.backgroundColor = "green";
    setTimeout(() => {
      document.getElementById("box3").style.backgroundColor = "greenyellow";
      rspEnd(1000);
    }, 2000);
  }

  // 한 차례의 게임을 마친 뒤 leverActuation()으로 돌아간다
}
function rspEnd(num) {
  setTimeout(() => {
    document.getElementById("rspCoin").innerText = coin;
    document.getElementById("rspScissor").style.backgroundColor = "#880000";
    document.getElementById("rspRock").style.backgroundColor = "#880000";
    document.getElementById("rspPaper").style.backgroundColor = "#880000";
    console.log("승부 종료 후 leverActuation()으로 회귀");
    leverActuation();
  }, num);
}
//최초의 게임 시작
leverActuation();
