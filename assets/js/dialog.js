export class Dialog {
    dialog;
    box;
    overlay;
    closer;

    open() {
        this.box.style.display = 'block';
        setTimeout (() => {
            this.overlay.classList.add('active');
        }, 300);
    }

    close() {
        this.overlay.classList.remove('active');
        setTimeout(() => {
            this.box.style.display = 'none';
        }, 1000);
        return false;
    }

    constructor() {
        this.box = document.createElement('div');
        this.box.className = 'dialog-box';
        this.box.innerHTML =
            '<div class="overlay">' +
               '<div class="dialog">' +
                 '<a class="closer" href="javascript:void(0)">&times;</a>' +
                '<div class="alert_message">asdasd ads <div class="castle"></div>asdasd</div>' +
               '</div>' +
            '</div>';

        this.overlay = this.box.querySelector('.overlay')
        this.dialog = this.box.querySelector('.dialog')
        this.closer = this.box.querySelector('.closer')

        document.body.appendChild(this.box)

        this.closer.addEventListener('click',  () => {
            this.close()
        });
        this.overlay.addEventListener('click',  () => {
           this.close()
        });

        this.dialog.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    }
}

