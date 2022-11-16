import Control from './common/control';

export class Header extends Control {

    constructor(parentNode) {
        super(parentNode, 'header', 'header');

        const gameBtn = new Control(this.node, 'button', '', 'Start Game');
        gameBtn.node.onclick = () => this.onGameStart();

        // const artistsBtn = new Control(this.node, 'button', '', 'artists');
        // artistsBtn.node.onclick = () => this.onGameSelect('artists');

        // const settingsBtn = new Control(this.node, 'button', '', 'settings');
        // settingsBtn.node.onclick = () => this.onSettings();
    }
}

export default Header;