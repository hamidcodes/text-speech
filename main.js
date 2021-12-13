const main = document.querySelector('main');
const voicesSelect =document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn =document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
    {
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/800px-Python-logo-notext.svg.png',
        text: "PYTHON"
    },
    {
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png',
        text: "JAVASCRIPT"
    },

    {
        image: 'https://www.oxfordwebstudio.com/user/pages/06.da-li-znate/sta-je-html/sta-je-html.jpg',
        text: `HTML`
    },

    {
        image: 'https://www.oxfordwebstudio.com/user/pages/06.da-li-znate/sta-je-css/sta-je-css.png',
        text: "CSS"
    },

    {
        image: 'https://static.javatpoint.com/difference/images/procedural-programming-vs-object-oriented-programming.png',
        text: "OBJECT-ORIENTED PROGRAMMING"
    },

    {
        image: 'https://jdhitsolutions.com/blog/wp-content/uploads/2012/04/TrueFalse.png',
        text: "BOOLEAN"
    },

    {
        image: 'https://hachinet.com/upload/2020/08/framework-la-gi-tim-hieu-ve-cac-framework-20200831112124.jpeg',
        text: "Framework"
    },

    {
        image: 'https://st2.myideasoft.com/idea/ct/82/myassets/blogs/front-end-back-end-developer.jpg',
        text: "Front-end"
    },

    {
        image: 'https://res.cloudinary.com/practicaldev/image/fetch/s--ARBJW0_7--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3y9pghpnsf19nlvivn2r.jpg',
        text: "Recursion"
    },
    {
        image: 'https://laravelnews.s3.amazonaws.com/images/phplogo.jpg',
        text: "PHP"
    },
    {
        image: 'https://miro.medium.com/max/1024/1*2fpfv8Np1AGdmp2axA9rXQ.png',
        text: "JAVA"
    },
    {
        image: 'https://developer.apple.com/swift/images/swift-og.png',
        text: "SWIFT"
    },

];

data.forEach(createBox);

function createBox(item){
    const box = document.createElement('div');

    const {image, text} = item;

    box.classList.add('box');
    box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
    `;

    box.addEventListener('click', () =>{
        setTextMessage(text);
        speakText();

        box.classList.add('active');
        setTimeout(() => box.classList.remove('active'), 800)
    });

    main.appendChild(box);
}

const message = new SpeechSynthesisUtterance();

let voices = [];

function getVoices (){
    
    voices = speechSynthesis.getVoices();

    voices.forEach(voice => {

        const option = document.createElement('option');

        option.value = voice.name
        option.innerText = `${voice.name} ${voice.lang}`;

        voicesSelect.appendChild(option);
    })
}

function setTextMessage(text){
    message.text = text;
}

function speakText(){
    speechSynthesis.speak(message);
}
function setVoice (e){
    message.voice = voices.find(voice => voice.name === e.target.value);
}

speechSynthesis.addEventListener('voiceschanged', getVoices);




toggleBtn.addEventListener('click', () => document.getElementById('text-box').classList.toggle('show'));

closeBtn.addEventListener('click', () => document.getElementById('text-box').classList.remove('show'));


voicesSelect.addEventListener('change', setVoice);

readBtn.addEventListener('click', () =>{
    setTextMessage(textarea.value);
    speakText();
})

getVoices();