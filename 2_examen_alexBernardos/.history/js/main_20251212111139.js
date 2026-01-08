// js/main.js

import { fetchingAllData } from "./dataManager.js";

function init(){
    // iniciamos la app
    console.log('%c Iniciando...', "color:green;");

    fetchingAllData();    

}


document.addEventListener('DOMContentLoaded', init);