const changeColor = (hue, sat, light) => {
    let bgBody = document.documentElement.style;
    bgBody.setProperty(`--main-bg`,`hsl(${hue},${sat}%,${light}%)`);
    bgBody.setProperty('--hue-value',`${hue}`);
    bgBody.setProperty('--saturation-value',`${sat}%`);
    bgBody.setProperty('--light-value',`${light}%`);
}

export const createColorPicker = () => {
    // row (debe ser dado como retorno);
    const colorRow = document.createElement('div');
    colorRow.classList.add('row');
    colorRow.classList.add('m-0')
    // area
    const colorArea = document.createElement('div');
    colorArea.classList.add('border');
    colorArea.classList.add('p-0');
    colorArea.classList.add('color-area');
    // picker
    const picker = document.createElement('div');
    picker.setAttribute('id','colorPicker');
    picker.classList.add('bg-primary');
    picker.classList.add('rounded-circle');
    picker.classList.add('color-picker');
    colorArea.appendChild(picker);
    //range
    const colorRange = document.createElement('input');
    colorRange.setAttribute('type','range');
    colorRange.setAttribute('id','hue');
    colorRange.setAttribute('min','0');
    colorRange.setAttribute('max','360');
    colorRange.setAttribute('value','0');
    colorRange.classList.add('color-range');

    // Append
    colorRow.appendChild(colorArea);
    colorRow.appendChild(colorRange);

    // por defecto los valores deben ser 0, 100, 50
    let hue = 0;
    let sat = 100;
    let light = 50;


    colorRange.addEventListener('change', (e)=> {
        hue = e.target.value;
        changeColor(hue,sat,light);
    })

    let pickerX = 0;
    let pickerY = 0;
    let isMouseDown = false;

    picker.addEventListener('mousedown', (e)=> {
        isMouseDown = true;
        console.log('picker offset: '+picker.offsetLeft+','+picker.offsetTop);
        pickerX = picker.offsetLeft - e.clientX;
        pickerY = picker.offsetTop - e.clientY;
        e.preventDefault();
    }, true)

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
            sat = ((x / 300)*100)
            light = (50 + (100 - sat)/2) - y/300 * 100
            //light = (100-((y /300) * 100))/2
            

            changeColor(hue, sat, light);
        }
    }, true)

    colorArea.addEventListener('click', (e) => {
        let rect = e.target.getBoundingClientRect();
        let x = (e.clientX - rect.left);
        let y = (e.clientY - rect.top);

        picker.style.left = x + 'px';
        picker.style.top = y + 'px';

        sat = ((x / 300)*100);
        light = (50 + (100 - sat)/2) - y/300 * 100
        //light = (100-((y /300) * 100))/2
        changeColor(hue,sat,light);
    })

    console.log('hsl: '+hue+','+sat+','+light);
    return colorRow;
}