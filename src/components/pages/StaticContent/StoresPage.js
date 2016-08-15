/**
 * Imports
 */
import React from 'react';

// Required components
import Heading from '../../common/typography/Heading';

/**
 * Component
 */
class StoresPage extends React.Component {

    //*** Page Title and Snippets ***//

    static pageTitleAndSnippets = function (context, params, query) {
        return {
            title: 'As Nossas Lojas'
        }
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./StoresPage.scss');
    }

    //*** Template ***//

    render() {
        return (
            <div className="stores-page">
                <div className="stores-page__title">
                    <Heading size="large">
                        As Nossas Lojas
                    </Heading>
                </div>
                <div className="stores-page__content">
                    <div className="stores-page__block">
                        <Heading size="medium">
                            Arrábida Shopping
                        </Heading>
                        <p>
                            Piso 0, Loja 0.45<br />
                            Praceta de Henrique Moreira 244<br />
                            4400-346 Vila Nova de Gaia<br />
                            <a href="https://www.google.pt/maps/place/Arrabida+Shopping/@41.1412417,-8.6388583,17z/data=!3m1!4b1!4m2!3m1!1s0xd246514bd568699:0x58e4800a92a23109?hl=en" target="_blank">Google Maps</a>
                        </p>
                        <p className="stores-page__schedule">
                            <strong>Horário:</strong><br />
                            Domingo a Quinta-feira: das 10h às 23h<br />
                            Sexta-feira, Sábado e Vésperas de Feriado: das 10h às 24h<br />
                        </p>
                        <p className="stores-page__contacts">
                            <strong>Contactos:</strong><br />
                            22 370 59 44
                        </p>
                    </div>
                    <div className="stores-page__block">
                        <Heading size="medium">
                            Mar Shopping
                        </Heading>
                        <p>
                            Piso 0, Loja 0.29<br />
                            Avenida Dr. Óscar Lopes<br />
                            4450 Matosinhos<br />
                            <a href="https://www.google.pt/maps/place/Mar+Shopping/@41.2095087,-8.6905111,17z/data=!3m1!4b1!4m2!3m1!1s0xd2468c40ef91547:0x821342a3ccfd6e48?hl=en" target="_blank">Google Maps</a>
                        </p>
                        <p className="stores-page__schedule">
                            <strong>Horário:</strong><br />
                            Segunda-feira a Domingo: das 10h às 24h<br />
                        </p>
                        <p className="stores-page__contacts">
                            <strong>Contactos:</strong><br />
                            22 996 46 71
                        </p>
                    </div>
                    <div className="stores-page__block">
                        <Heading size="medium">
                            Loja Foz
                        </Heading>
                        <p>
                            Avenida do Brasil, Nº 316<br />
                            4150-152 Porto<br />
                            <a href="https://www.google.pt/maps/place/Av.+do+Brasil+316,+4150-152+Porto/@41.1551647,-8.6822162,17z/data=!3m1!4b1!4m2!3m1!1s0xd246f756d676089:0xf2eaca8bb52ca47c?hl=en" target="_blank">Google Maps</a>
                        </p>
                        <p className="stores-page__schedule">
                            <strong>Horário:</strong><br />
                            Segunda a Domingo: 10h às 19:30h<br />
                        </p>
                        <p className="stores-page__contacts">
                            <strong>Contactos:</strong><br />
                            22 618 50 44
                        </p>
                    </div>
                    <div className="stores-page__block">
                        <Heading size="medium">
                            Loja Outlet
                        </Heading>
                        <p>
                            Rua do Murado, 1199 Lj<br />
                            4535-202 Mozelos, Santa Maria da Feira<br />
                            <a href="https://www.google.pt/maps/place/R.+do+Murado+1199,+Mozelos/@40.9883296,-8.5717399,17z/data=!3m1!4b1!4m2!3m1!1s0xd247f330948540f:0x248f7142ecfef479?hl=en" target="_blank">Google Maps</a>
                        </p>
                        <p className="stores-page__schedule">
                            <strong>Horário:</strong><br />
                            Terça-feira a Sábado: das 10h às 13h e das 14h às 19h<br />
                        </p>
                        <p className="stores-page__contacts">
                            <strong>Contactos:</strong><br />
                            22 745 23 82
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Exports
 */
export default StoresPage;
