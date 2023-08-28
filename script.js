var text = document.getElementsByClassName("text");
var button = document.getElementsByClassName("playAgain");
var inputField = document.getElementsByClassName("input-field");
var active = document.getElementsByClassName("active");
var timerText = document.getElementsByClassName("timer");
var time60 = document.getElementsByClassName("sec60");
var time30 = document.getElementsByClassName("sec30");
var time15 = document.getElementsByClassName("sec15");

var mistakeTag = document.getElementsByClassName("mistakes");
var accTag = document.getElementsByClassName("accuracy");
var wpmTag = document.getElementsByClassName("wordPer");
var rawTag = document.getElementsByClassName("rawWPM");


let mistakeNumber = 0;

let timer,
maxTime = 60,
timeLeft = maxTime,
typeCheck = false;
characterIndex = 0;

const timeMode1 = () => {
    maxTime = 60;
    timeLeft = maxTime;
    timerText[0].style.color = "white";
    timerText[0].innerHTML = maxTime;

    time60[0].style.color = "rgb(255, 255, 255)";
    time30[0].style.color = "rgb(117, 117, 117)";
    time15[0].style.color = "rgb(117, 117, 117)";
    reset();
}
const timeMode2 = () => {
    maxTime = 30;
    timeLeft = maxTime;
    timerText[0].style.color = "white";
    timerText[0].innerHTML = maxTime;

    time30[0].style.color = "rgb(255, 255, 255)";
    time60[0].style.color = "rgb(117, 117, 117)";
    time15[0].style.color = "rgb(117, 117, 117)";


    reset();
}
const timeMode3 = () => {
    maxTime = 15;
    timeLeft = maxTime;
    timerText[0].innerHTML = maxTime;

    time15[0].style.color = "rgb(255, 255, 255)";
    time60[0].style.color = "rgb(117, 117, 117)";
    time30[0].style.color = "rgb(117, 117, 117)";

    reset();
}

const mouseMovement = (event, element) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const buttonOffsetX = ((mouseX - (7 * window.innerWidth/8)) / (7 * window.innerWidth/8)) * 65;
    const buttonOffsetY = ((mouseY - (window.innerHeight/5)) / (window.innerHeight/5)) * 15;

    element.style.setProperty("--rotateX", -1 * buttonOffsetY + "deg"); 
    element.style.setProperty("--rotateY", buttonOffsetX + "deg"); 
}

document.addEventListener("mousemove", (e) => {
    mouseMovement(e, button[0]);
})

var wordList = [
    "the", "of","to","and","a","in","is","it","you","that","he","was","for","on","are","with","as","I","his","they","be","at","one","have","this","from","or",
    "had","by","not","word","but","what","some","we","can","out","other","were","all","there","when","up","use","your","how","said","an","each","she","which","do",
    "their","time","if","will","way","about","many","then","them","write","would","like","so","these","her","long","make","thing","see","him","two","has","look","more",
    "day","could","go","come","did","number","sound","no","most","people","my","over","know","water","than","call","first","who","may","down","side","been","now","find",
    "any","new","work","part","take","get","place","made","live","where","after","back","little","only","round","man","year","came","show","every","good","me","give","our",
    "under","name","very","through","just","form","sentence","great","think","say","help","low","line","differ","turn","cause","much","mean","before","move","right","boy",
    "old","too","same","tell","does","set","three","want","air","well","also","play","small","end","put","home","read","hand","port","large","spell","add","even","land","here",
    "must","big","high","such","follow","act","why","ask","men","change","went","light","kind","off","need","house","picture","try","us","again","animal","point","mother",
    "world","near","build","self","earth","father","head","stand","own","page","should","country","found","answer","school","grow","study","still","learn","plant","cover",
    "food","sun","four","between","state","keep","eye","never","last","let","thought","city","tree","cross","farm","hard","start","might","story","saw","far","sea","draw",
    "left","late","run","while","press","close","night","real","life","few","north","open","seem","together","next","white","children","begin","got","walk","example",
    "ease","paper","group","always","music","those","both","mark","often","letter","until","mile","river","car","feet","care","second","book","carry","took","science","eat",
    "room","friend","began","idea","fish","mountain","stop","once","base","hear","horse","cut","sure","watch","color","face","wood","main","enough","plain","girl","usual",
    "young","ready","above","ever","red","list","though","feel","talk","bird","soon","body","dog","family","direct","pose","leave","song","measure","door","product","black",
    "short","numeral","class","wind","question","happen","complete","ship","area","half","rock","order","fire","south","problem","piece","told","knew","pass","since","top",
    "whole","king","space","heard","best","hour","better","true","during","hundred","five","remember","step","early","hold","west","ground","interest","reach","fast","verb",
    "sing","listen","six","table","travel","less","morning","ten","simple","several","vowel","toward","war","lay","against","pattern","slow","center","love","person","money",
    "serve","appear","road","map","rain","rule","govern","pull","cold","notice","voice","unit","power","town","fine","certain","fly","fall","lead","cry","dark","machine",
    "note","wait","plan","figure","star","box","noun","field","rest","correct","able","pound","done","beauty","drive","stood","contain","front","teach","week","final","gave",
    "green","oh","quick","develop","ocean","warm","free","minute","strong","special","mind","behind","clear","tail","produce","fact","street","inch","multiply","nothing",
    "course","stay","wheel","full","force","blue","object","decide","surface","deep","moon","island","foot","system","busy","test","record","boat","common","gold","possible",
    "plane","stead","dry","wonder","laugh","thousand","ago","ran","check","game","shape","equate","hot","miss","brought","heat","snow","tire","bring","yes","distant","fill",
    "east","paint","language","among","grand","ball","yet","wave","drop","heart","am","present","heavy","dance","engine","position","arm","wide","sail","material","size",
    "vary","settle","speak","weight","general","ice","matter","circle","pair","include","divide","syllable","felt","perhaps","pick","sudden","count","square","reason",
    "length","represent","art","subject","region","energy","hunt","probable","bed","brother","egg","ride","cell","believe","fraction","forest","sit","race","window",
    "store","summer","train","sleep","prove","lone","leg","exercise","wall","catch","mount","wish","sky","board","joy","winter","sat","written","wild","instrument",
    "kept","glass","grass","cow","job","edge","sign","visit","past","soft","fun","bright","gas","weather","month","million","bear","finish","happy","hope","flower",
    "clothe","strange","gone","jump","baby","eight","village","meet","root","buy","raise","solve","metal","whether","push","seven","paragraph","third","shall","held",
    "hair","describe","cook","floor","either","result","burn","hill","safe","cat","century","consider","type","law","bit","coast","copy","phrase","silent","tall","sand",
    "soil","roll","temperature","finger","industry","value","fight","lie","beat","excite","natural","view","sense","ear","else","quite","broke","case","middle","kill","son",
    "lake","moment","scale","loud","spring","observe","child","straight","consonant","nation","dictionary","milk","speed","method","organ","pay","age","section","dress",
    "cloud","surprise","quiet","stone","tiny","climb","cool","design","poor","lot","experiment","bottom","key","iron","single","stick","flat","twenty","skin","smile","crease",
    "hole","trade","melody","trip","office","receive","row","mouth","exact","symbol","die","least","trouble","shout","except","wrote","seed","tone","join","suggest","clean",
    "break","lady","yard","rise","bad","blow","oil","blood","touch","grew","cent","mix","team","wire","cost","lost","brown","wear","garden","equal","sent","choose","fell",
    "fit","flow","fair","bank","collect","save","control","decimal","gentle","woman","captain","practice","separate","difficult","doctor","please","protect","noon","whose",
    "locate","ring","character","insect","caught","period","indicate","radio","spoke","atom","human","history","effect","electric","expect","crop","modern","element","hit",
    "student","corner","party","supply","bone","rail","imagine","provide","agree","thus","capital","chair","danger","fruit","rich","thick","soldier","process","operate",
    "guess","necessary","sharp","wing","create","neighbor","wash","bat","rather","crowd","corn","compare","poem","string","bell","depend","meat","rub","tube","famous","dollar",
    "stream","fear","sight","thin","triangle","planet","hurry","chief","colony","clock","mine","tie","enter","major","fresh","search","send","yellow","gun","allow","print",
    "dead","spot","desert","suit","current","lift","rose","continue","block","chart","hat","sell","success","company","subtract","event","particular","deal","swim","term",
    "opposite","wife","shoe","shoulder","spread","arrange","camp","invent","cotton","born","determine","quart","nine","truck","noise","level","chance","gather","shop",
    "stretch","throw","shine","property","column","molecule","select","wrong","gray","repeat","require","broad","prepare","salt","nose","plural","anger","claim","continent",
    "oxygen","sugar","death","pretty","skill","women","season","solution","magnet","silver","thank","branch","match","suffix","especially","fig","afraid","huge","sister",
    "steel","discuss","forward","similar","guide","experience","score","apple","bought","led","pitch","coat","mass","card","band","rope","slip","win","dream","evening",
    "condition","feed","tool","total","basic","smell","valley","nor","double","seat","arrive","master","track","parent","shore","division","sheet","substance","favor",
    "connect","post","spend","chord","fat","glad","original","share","station","dad","bread","charge","proper","bar","offer","segment","slave","duck","instant","market",
    "degree","populate","chick","dear","enemy","reply","drink","occur","support","speech","nature","range","steam","motion","path","liquid","log","meant","quotient","teeth",
    "shell","neck",

]

const reset = () => {
    clearInterval(timer);
    timeLeft = maxTime;
    timerText[0].innerHTML = timeLeft;
    timerText[0].style.textShadow = '0 0 15px rgb(0, 217, 255)';
    mistakeNumber = 0;
    typeCheck = false;

    mistakeTag[0].innerHTML = "0";
    accTag[0].innerHTML = "0";
    wpmTag[0].innerHTML = "0";
    rawTag[0].innerHTML = "0";

    time60[0].onclick = timeMode1;
    time30[0].onclick = timeMode2;
    time15[0].onclick = timeMode3;

    timerText[0].style.color = "white";
    text[0].disabled = true;
    button[0].disabled = true;
    inputField[0].disabled = true;
    characterIndex = 0;
    active[0].style.left = null;
    active[0].style.top = null;
    inputField[0].value = "";

    let paragraph = []
    for (let i = 0; i < 200; i++) {
        paragraph.push(wordList[Math.floor(Math.random() * wordList.length)])
    };

    var paragraphJoined = paragraph.join(" ");
    let spanJoined = "";

    paragraphJoined.split('').forEach(span => {
        spanJoined += '<span>' + span + '</span>';})

    active[0].animate(
        [
        {opacity: "1"},
            
        {opacity: "0"}
        ],
        {duration: 400})

    text[0].animate(
        [
        {opacity: "1",
        transform: "translateY(0)"},
          
        {opacity: "0",
        transform: "translateY(-1000px)"},
        ],
        {duration: 500})
    
    setTimeout(function() {
    text[0].innerHTML = spanJoined;
    text[0].animate(
        [
        {opacity: "0",
        transform: "translateY(-1000px)"},
          
        {opacity: "1",
        transform: "translateY(0px)"},
        ],
        {duration: 500}
    );
    active[0].animate(
        [
        {opacity: "0"},
            
        {opacity: "1"}
        ],
        {duration: 700});
    }, 400);

    setTimeout(function() {button[0].disabled = false;
    inputField[0].disabled = false;
}, 1000)

    document.addEventListener("keydown", () => inputField[0].focus());
    text[0].addEventListener("click", () => inputField[0].focus());
}

const timerFunction = () => {
    if (timeLeft > 0) {
        time60[0].onclick = null;
        time30[0].onclick = null;
        time15[0].onclick = null;

        timeLeft--;

        timerText[0].innerHTML = timeLeft;

        let wpm = Math.round((((characterIndex - mistakeNumber) / 5) / (maxTime - timeLeft)) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        wpmTag[0].innerHTML = wpm; 

        rawTag[0].innerHTML = Math.round((((characterIndex) / 5) / (maxTime - timeLeft)) * 60);

        if (timeLeft <= 5) {
            timerText[0].style.color = 'red';
            timerText[0].style.textShadow = '0 0 5px red';
        }
    }
    else {

        inputField[0].disabled = true;

        time60[0].onclick = timeMode1;
        time30[0].onclick = timeMode2;
        time15[0].onclick = timeMode3;

        clearInterval(timer);
    }
}



const typingFunction = () => {
    let xT;
    let yT;

    const charactersList = text[0].querySelectorAll("span");
    let typedCharacter = inputField[0].value.split("")[characterIndex];

    if (!typeCheck) {
    timer = setInterval(timerFunction, 1000);
    typeCheck = true;
    }

    if (typedCharacter == null) {
        characterIndex--;
        if (charactersList[characterIndex].classList.contains("incorrect")) {
            mistakeNumber--;
        }
        
        charactersList[characterIndex].classList.remove("correct", "incorrect");

        xT = charactersList[characterIndex].offsetLeft;
        yT = charactersList[characterIndex].offsetTop;

    }
    else {
        xT = charactersList[characterIndex + 1].offsetLeft;
        yT = charactersList[characterIndex + 1].offsetTop;

        if (charactersList[characterIndex].innerHTML === typedCharacter) {
            charactersList[characterIndex].classList.add("correct");
        }
        else {
            charactersList[characterIndex].classList.add("incorrect");
            mistakeNumber++;
        }
        characterIndex++;

        mistakeTag[0].innerHTML = mistakeNumber;
        accTag[0].innerHTML = Math.round(((characterIndex - mistakeNumber) / characterIndex) * 100) + '%';

    }

    active[0].style.left = xT + 'px';
    active[0].style.top = yT + 'px';

}

reset();
inputField[0].addEventListener("input", typingFunction);

