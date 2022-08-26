import { LightningElement } from 'lwc';

export default class LightningMapExample extends LightningElement {
    mapMarkers = [
        {
            location: {
                Street: 'SBI Bank',
                City: 'Chinnamandem',
                State: 'AP',
            },

            title: 'SBI Bank In Chinnamandem',
            description:
                'A grand setting for one of the greatest collections of art, from ancient to contemporary.',
        },
    ];
    zoomLevel = 15;
    listView = 'visible';
}