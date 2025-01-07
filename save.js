// Saved Preferences
// Aquí se deben almacenar todos los cambios realizados en el menú para su persistencia
// index.html tiene acceso a este script como prioridad y permitirá la renderización de la lista de links,
// la imagen del background y cualquier otro elemento que vaya a cambiar en el DOM del index

// FORMA DE ALMACENAMIENTO
// las preferencias son almacenadas en un objeto en chrome.storage descrito como powHomeStngs
// esta clave almacena el objeto que contiene las demas claves

export const saveChanges = (configObj) => {
    // Guarda todos los cambios realizados a chrome.storage los cuales serán traidos por el script save.js
    // los identificadores de cada guardado deben ser los mismos siempre
    // puede que se si implementan templates o themes haya que también modificar el acceso a los archivos CSS
    // por lo que será necesario un modo de montarlos.
    chrome.storage.local.set(configObj, () => {
    console.log("Data saved");
    });
}

export const loadPreferences = () => {
    let powHomeStngs = {
        background : "#a7b3db",
        linkNum : 3,
        savedLinks : {
            card1: "#",
            card2: "#",
            card3: "#"
        }
    }
    chrome.storage.local.get('powHomeStngs', (result) => {
        let obj = Object.values(result)[0];
        try{
            let objList = Object.values(obj);
            powHomeStngs.background = objList[0];
            powHomeStngs.linkNum = objList[1];
            powHomeStngs.savedLinks = objList[2];
        } catch(err) {
            console.log('Saved Data Not Found: ',err.message)
        }
        
    })

    return powHomeStngs
}