// Import
import { loadPreferences, saveChanges } from "./save.js";

// Menu Display Options
let settingsBtn = document.getElementById('settings')
const menuContainer = document.getElementById('menuContainer');
menuContainer.style.display = "none";
let menuOpened = false;

//test
let testStorage = document.getElementById('testStorage');
chrome.storage.local.get('test', (result) => {
    testStorage.textContent = testStorage.textContent = Object.values(result)[0];
})


// Body modifications
const colorList = {
    color1 : "#000000",
    color2 : "#ccab32",
    color3 : "#36a331",
    color4 : "#8f32cc",
    color5 : "#2694d3",
    color6 : "#ffffff",
    color7 : "#a7b3db"
}


// Settings Menu
settingsBtn.addEventListener("click", () => {
    if(menuOpened){
        menuContainer.style.display="none";
        menuContainer.innerHTML = '';
        menuOpened = false;
    } else {
        menuOpened = true;
        // Crea el container
        const menuDiv = document.createElement('div');
        menuDiv.classList.add('z-3');
        menuDiv.classList.add('container');
        menuDiv.classList.add('bg-dark');
        menuDiv.classList.add('fixed-top');
        menuDiv.classList.add('mt-5');
        menuDiv.classList.add('p-3')
        menuDiv.classList.add('rounded');
        menuDiv.style.cssText += '--bs-bg-opacity: .5;';
        menuDiv.style.cssText += 'max-width: 700px;';
        // crea el titulo
        const titleMenu = document.createElement('h3');
        titleMenu.classList.add('text-light');
        titleMenu.textContent = 'Settings';
        // crea la fila
        const menuRow = document.createElement('div');
        menuRow.classList.add('row');
        // crea las columnas
        const col1 = document.createElement('div');
        col1.classList.add('col-6');
        const col2 = document.createElement('div');
        col2.classList.add('col-6');
        // elementos columna 1
        const col1Title = document.createElement('h5');
        col1Title.classList.add('text-light');
        col1Title.textContent = "N° of Links"
        const selNumLinks = document.createElement('select')
        selNumLinks.classList.add('form-select')
        selNumLinks.setAttribute('name','links');
        selNumLinks.setAttribute('id','numLinks');
        for (let i = 0;i<9;i++){
            const optVal = document.createElement('option');
            optVal.setAttribute('value',i+1);
            optVal.textContent = i+1;
            selNumLinks.appendChild(optVal);
        }
        // deberían crearse los cards después de que se guarden los cambios
        // selNumLinks.addEventListener('change', ()=> {
        //     createLinkCards(selNumLinks.value);
        // })
        col1.appendChild(col1Title);
        col1.appendChild(selNumLinks);

        // elementos columna 2
        const col2Title = document.createElement('h5');
        col2Title.classList.add('text-light');
        col2Title.textContent = "Background Color"

        //
        const colorRow = document.createElement('div');
        colorRow.classList.add('row');
        colorRow.classList.add('m-0')
        const colorArea = document.createElement('div');
        colorArea.classList.add('border');
        colorArea.classList.add('p-0');
        colorArea.classList.add('color-area');
        const picker = document.createElement('div');
        picker.setAttribute('id','colorPicker');
        picker.classList.add('bg-primary');
        picker.classList.add('rounded-circle');
        picker.classList.add('color-picker');
        colorArea.appendChild(picker);
        
        let pickerX = 0;
        let pickerY = 0;
        let isMouseDown = false;
        // Mouse picker movement
        picker.addEventListener('mousedown', (e)=> {
            isMouseDown = true;
            pickerX = picker.offsetLeft - e.clientX;
            pickerY = picker.offsetTop - e.clientY;
            e.preventDefault();
        }, true)

        document.addEventListener('mouseup', ()=> {
            isMouseDown = false;
        }, true)

        document.addEventListener('mousemove', (e)=> {
            if (isMouseDown){
                let x = e.clientX + pickerX;
                let y = e.clientY + pickerY;

                const maxX = (colorArea.clientWidth + 11) - (picker.offsetWidth - 10);
                const maxY = (colorArea.clientHeight + 11) - (picker.offsetHeight - 10);

                x = Math.max(0,Math.min(x,maxX));
                y = Math.max(0,Math.min(y,maxY));

                picker.style.left = x + 'px';
                picker.style.top = y + 'px';
            }
        }, true)
        colorArea.addEventListener('click', (e) => {
            let rect = e.target.getBoundingClientRect();
            let x = (e.clientX - rect.left);
            let y = (e.clientY - rect.top);

            picker.style.left = x + 'px';
            picker.style.top = y + 'px';
        })

        const colorRange = document.createElement('input');
        colorRange.setAttribute('type','range');
        colorRange.setAttribute('id','hue');
        colorRange.setAttribute('min','0');
        colorRange.setAttribute('max','360');
        colorRange.setAttribute('value','0');
        colorRange.classList.add('color-range');
        let hue = 0;
        colorRange.addEventListener('change', (e)=> {
            hue = e.target.value;
            bgBody.style.setProperty('--hue-value',hue);
        })
        
        // for (let i = 0;i<Object.keys(colorList).length;i++){
        //     const colorBlock = document.createElement('button');
        //     colorBlock.setAttribute('value',i);
        //     colorBlock.classList.add('col-2');
        //     colorBlock.classList.add('p-1');
        //     colorBlock.classList.add('me-1');
        //     colorBlock.classList.add('border');
        //     colorBlock.style.cssText += "width:40px; height:40px;";
        //     colorBlock.style.cssText += "background-color: "+ Object.values(colorList)[i]+";";
        //     colorRow.appendChild(colorBlock);
        //     colorBlock.addEventListener('click', ()=>{
        //         let idx = i;
        //         selectColor(idx);
        //     })
        // }
        colorRow.appendChild(colorArea);
        colorRow.appendChild(colorRange);
        //
        
        col2.appendChild(col2Title);
        col2.appendChild(colorRow);

        // boton de guardar
        const saveBtn = document.createElement('button');
        saveBtn.setAttribute('type','button');
        saveBtn.classList.add('btn');
        saveBtn.classList.add('btn-primary');
        saveBtn.classList.add('mt-2');
        saveBtn.textContent = "Save Changes"
        saveBtn.addEventListener('click', () => {
            let saveObject = {
                background : "",
                linkNum : 0,
                linksSaved : {
            
                }
            }
            saveChanges(saveObject);
        })

        // añadir elementos al contenedor
        menuRow.appendChild(col1);
        menuRow.appendChild(col2);
        menuDiv.appendChild(titleMenu);
        menuDiv.appendChild(menuRow);
        menuDiv.appendChild(saveBtn);
        
        // añadir el contenedor al div principal
        menuContainer.appendChild(menuDiv);
        menuContainer.style.display = "";
    }  
        
})

const selectColor = (idx) => {
    bgBody.style.setProperty("--main-bg",Object.values(colorList)[idx]);
}

const createLinkCards = (num, links) => {
    const linkGrid = document.getElementById('linkGrid');
    let linkList = []
    try{
        linkList = Object.values(links);
    } catch(err){
        console.log('No Links Found')
    }
    
    linkGrid.innerHTML = "";
    for (let i = 0; i<num; i++){
        // crear cards
        const linkCard = document.createElement('div');
        linkCard.classList.add('link-card');
        let cardID = i+1;  
        linkCard.setAttribute('id', cardID); // le da el atributo id con el numero del card eg: 1
        
        // crear button
        const addBtn = document.createElement('button');
        addBtn.setAttribute('type','button');
        addBtn.classList.add('link-btn');
        addBtn.innerHTML = '<i class="bi bi-plus-lg"></i>'
        addBtn.addEventListener('click', () => {
            // añadir lógica segun funcion
            console.log('button pressed');
        })
        

        // crear anchor
        const cardLink = document.createElement('a');
        cardLink.setAttribute('href', linkList[i]);

        // crear img
        const cardImg = document.createElement('img');
        cardImg.classList.add('link-img');
        cardImg.setAttribute('src','default.png');

        // append
        cardLink.appendChild(cardImg);
        linkCard.appendChild(addBtn)
        linkCard.appendChild(cardLink);
        linkGrid.appendChild(linkCard);
    }
}

const editLink = (id) => {
    // Esta función lee una lista pareada con el id del card y el link al que redirige
    // 
}

// Mouse Movement
const drag = (element)=> {
    let mousePos = {
        x : 0,
        y : 0
    }
    let isMousedClicked = false;
    element.addEventListener('mousemove', (event) => {
        mousePos.x = event.clientX;
        mousePos.y = event.clientY;
    })
}


//Load Settings

let settings = loadPreferences();
let stngsList = Object.values(settings);
let bgBody = document.documentElement;
bgBody.style.setProperty("--main-bg",stngsList[0]);
createLinkCards(stngsList[1], stngsList[2]);