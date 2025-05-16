// AUTEUR : Pierre Florin SNCF Gares et Connexions
// OBJECTIF : Script de personnalisation de l'interface Lizmap pour desktop
// MAJ : 13/05/2025

jQuery(document).ready(function ($) {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
    console.log('Mode mobile détecté :', isMobile);

    if (isMobile) {
        // Pour l’instant, aucun traitement spécifique mobile
        console.log("Interface mobile détectée — aucun style supprimé.");
        return;
    }

    // Ajustement de la carte
    const mapEl = document.querySelector("#map");
    if (mapEl) {
        mapEl.style.height = $(document).height() + 'px';
    }

    lizMap.events.on({
        'uicreated': function () {
            try {
                const selectors = [
                    "#mapmenu > div > ul > li.edition.nav-dock",
                    "#mapmenu > div > ul > li.selectiontool.nav-minidock",
                    "#mapmenu > div > ul > li.attributeLayers.nav-bottomdock",
                    "#mapmenu > div > ul > li.popupcontent.nav-right-dock"
                ];

                selectors.forEach(sel => {
                    const el = document.querySelector(sel);
                    if (el) el.style.display = 'none';
                });

                const filterBtn = document.querySelector("#mapmenu > div > ul > li.filter.nav-dock");
                if (filterBtn) filterBtn.style.display = '';

                if (mapEl) mapEl.style.height = $(document).height() + 'px';

                const logo = document.querySelector("#logo");
                if (logo) logo.style.display = 'none';

                const title = document.querySelector("#title");
                if (title) title.style.display = 'none';

                const header = document.querySelector("#header");
                if (header) {
                    header.style.background = 'transparent';
                    header.style.width = '530px';
                    header.style.height = '0px';
                    header.style.left = 'calc(100% - 530px)';
                }

                lizMap.updateContentSize();

                // Activer le déplacement du mini-dock
                const content = document.querySelector("#content");
                if (content) {
                    const clientHaut = content.clientHeight - 150;
                    const clientLarge = content.clientWidth - 150;

                    $("#mini-dock").draggable({
                        containment: [-50, -50, clientLarge, clientHaut],
                        drag: function () {
                            const miniDock = document.querySelector("#mini-dock");
                            if (miniDock) {
                                miniDock.style.height = null;
                                miniDock.style.width = null;
                            }
                        }
                    });
                }

            } catch (error) {
                console.error("Erreur dans uicreated:", error);
            }
        },

        'minidockclosed': function () {
            const miniDock = document.querySelector("#mini-dock");
            if (miniDock) miniDock.style.inset = null;
        },

        'dockopened': function (e) {
            if (e.id === 'switcher') {
                try {
                    const switcherActions = document.querySelector("#switcher-layers-actions");
                    if (switcherActions) switcherActions.style.display = 'none';

                    const dockClose = document.querySelector("#dock-close");
                    if (dockClose) {
                        dockClose.style.top = '8px';
                        dockClose.style.right = '10px';
                    }

                    const menuContent = document.querySelector("#switcher-layers-container > div.menu-content");
                    if (menuContent) {
                        menuContent.style.backgroundColor = '#F0F0F0';
                        menuContent.style.borderRadius = '0px 0px 10px 10px';
                        menuContent.style.border = 'solid 1px';
                        menuContent.style.borderTop = 'none';
                    }

                    const dock = document.querySelector("#dock");
                    if (dock) dock.setAttribute('style', 'background-color:transparent !important');

                    const dockTabs = document.querySelector("#dock-tabs");
                    if (dockTabs) {
                        dockTabs.style.borderRadius = '10px 10px 0px 0px';
                        dockTabs.style.backgroundColor = '#A1006B';
                        dockTabs.style.border = 'solid 1px';
                        dockTabs.style.borderBottom = 'none';
                    }

                } catch (error) {
                    console.error("Erreur dans dockopened:", error);
                }
            }
        },

        'dockclosed': function (e) {
            if (e.id === 'switcher') {
                try {
                    const switcherActions = document.querySelector("#switcher-layers-actions");
                    if (switcherActions) switcherActions.style.display = null;

                    const dockClose = document.querySelector("#dock-close");
                    if (dockClose) {
                        dockClose.style.top = null;
                        dockClose.style.right = null;
                    }

                    const menuContent = document.querySelector("#switcher-layers-container > div.menu-content");
                    if (menuContent) {
                        menuContent.style.backgroundColor = null;
                        menuContent.style.borderRadius = null;
                        menuContent.style.border = null;
                    }

                    const dock = document.querySelector("#dock");
                    if (dock) dock.style.backgroundColor = null;

                    const dockTabs = document.querySelector("#dock-tabs");
                    if (dockTabs) {
                        dockTabs.style.borderRadius = null;
                        dockTabs.style.backgroundColor = null;
                        dockTabs.style.border = null;
                        dockTabs.style.borderBottom = null;
                    }

                } catch (error) {
                    console.error("Erreur dans dockclosed:", error);
                }
            }
        }
    });
});

// Fonction d'ouverture du menu Asti avec fermeture auto
var closeMenu = '';

function openMenuAsti() {
    const menu = document.querySelector("#mapmenu > div:nth-child(3)");
    const label = document.querySelector("#mapmenu > div:nth-child(2)");
    const button = document.querySelector("#buttonMenuAsti");

    if (menu) menu.style.width = '260px';
    if (label) label.style.width = '0';
    if (button) button.classList.add('openMenuAsti');

    clearTimeout(closeMenu);
    closeMenu = setTimeout(closeMenuAsti, 10000);
}

function closeMenuAsti() {
    const menu = document.querySelector("#mapmenu > div:nth-child(3)");
    const label = document.querySelector("#mapmenu > div:nth-child(2)");
    const button = document.querySelector("#buttonMenuAsti");

    if (menu) menu.style.width = null;
    if (label) label.style.width = null;
    if (button) button.classList.remove('openMenuAsti');
}
