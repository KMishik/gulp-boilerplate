import {Dialog} from './dialog'
document.querySelector('.showdialog').addEventListener('click', () => {
    let dialog = new Dialog();
    dialog.open();
})