/**
 * Imports
 */
import React from 'react';

// Required components
import Heading from '../../common/typography/Heading';

/**
 * Component
 */
class InfoPage extends React.Component {

    //*** Page Title and Snippets ***//

    static pageTitleAndSnippets = function (context, params, query) {
        return {
            title: 'Informações'
        }
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./InfoPage.scss');
    }

    //*** Template ***//

    render() {
        return (
            <div className="info-page">
                <div className="info-page__title">
                    <Heading size="large">
                        Informações
                    </Heading>
                </div>
                <div className="info-page__content">
                    <div className="info-page__block">
                        <Heading size="medium">
                            Apoio ao Cliente
                        </Heading>
                        <div className="info-page__support">
                            <p>
                                Para qualquer problema relativo com a loja online, p.f. contactar através de <a href="mailto:vendas@nicistore.com">vendas@nicistore.com</a><br />
                                Obrigado
                            </p>
                        </div>
                    </div>
                    <div className="info-page__block">
                        <Heading size="medium">
                            Portes de Envio
                        </Heading>
                        <div className="info-page__shipping">
                            <p>
                                Portes de Envio
                            </p>
                            <p>
                                Válido para Portugal Continental, Açores e Madeira:
                                <ul>
                                    <li>3,40€ para encomendas com valor até 19.90€</li>
                                    <li>Grátis para encomendas com valor superior a 19.90€</li>
                                </ul>
                            </p>
                            <p>
                                Todos estes preços já incluem IVA à taxa legal em vigor.
                            </p>
                        </div>
                    </div>
                    <div className="info-page__block">
                        <Heading size="medium">
                            Termos e Condições
                        </Heading>
                        <div className="info-page__terms-and-conditions">
                            <p>
                                Termos e Condições Gerais de Venda<br />
                                Caro(a) Cliente,
                            </p>
                            <p>
                                Seja bem-vindo(a) à loja NICI Store!<br />
                                Os Termos e Condições Gerais de Venda que se seguem regulamentam a oferta e a venda de produtos no nosso sítio web (“nicistore.com”)<br />
                                Os produtos adquiridos nos sítios web NICI são vendidos directamente por NICI Portugal, Representações S.A. (de ora em diante designado por NICI PT).<br />
                                Informações sobre a nossa Empresa: NICI PT é uma marca comercial com sede social em Portugal: NICI Portugal – Representações S.A. Zona Industrial de Prime NIF: 502055502<br />
                                Recordamos também que os utilizadores têm o direito de solicitar e receber apoio da NICI sobre encomendas e entregas ou como fazer compras on-line no prazo de 72 horas úteis a partir do momento em que o pedido é recebido (salvo motivos de força maior).
                            </p>
                            <p>
                                Todos os pedidos devem ser feitos através da página web destinada para o efeito, sendo possível em caso de dúvida contactar o centro de apoio ao cliente através de emails para o endereço criado para o efeito, seja através do nº de apoio existente. Quanto mais informações nos proporcionar melhor e mais rapidamente poderemos dar-lhe apoio e mais eficiente será o nosso serviço. Informações adicionais sobre as suas encomendas e estado da entrega, serão disponibilizadas ao utilizador, assim que alguma alteração do estado da encomenda exista. Todas as comunicações serão enviadas para o seu endereço electrónico (e-mail) registado no acto da encomenda. As informações legais relativas a compras on-line e entregas estão disponíveis na respectiva secção de “Termos e Condições Gerais de Venda” e “Política de Privacidade” na nossa página web.
                            </p>
                            <p>
                                <strong>1. A nossa política comercial</strong><br />
                                1.1 Os produtos NICI presentes no nosso catálogo on-line e os serviços comerciais previstos estão disponíveis exclusivamente para os seus utilizadores finais, ou seja os “Consumidores”. Os nossos produtos e respectivos preços são válidos se desde que estejam disponíveis nos nossos armazéns.<br />
                                1.2 "Consumidor" significa, nos termos do artigo 18º do Código do Consumo, qualquer pessoa física que actue com fins fora da sua actividade económica, comercial ou profissional. Se não for um Consumidor, solicitamos-lhe que não compre nenhum produto na nossa Loja Online.<br />
                                1.3 A NICI PT reserva-se o direito de não processar encomendas recebidas de utilizadores que não sejam “Consumidores” e qualquer outra encomenda que não cumpra a política comercial da NICI Portugal.<br />
                                1.4 Os presentes Termos e Condições Gerais de Venda regulam exclusivamente a oferta, transmissão e aceitação de encomendas de compra relativas a produtos existentes na loja online da NICI PT entre os utilizadores da NICI PT e a empresa NICI PT.<br />
                                1.5 Os Termos e Condições Gerais de Venda não regulam o fornecimento de serviços ou a venda de produtos por parte de terceiros que estejam em NICI Portugal através de ligações, banners ou outras ligações de hipertexto. Antes de enviar encomendas e adquirir produtos e serviços a estes terceiros, recomendamos aos nossos utilizadores que verifiquem os termos e condições destes, uma vez que a NICI Portugal não pode, em circunstância alguma, ser responsabilizada pelo fornecimento de serviços prestados por terceiros ou pela execução de transacções de comércio electrónico entre utilizadores de NICI Portugal e terceiros.
                            </p>
                            <p>
                                <strong>2. Como celebrar um contrato com NICI PT</strong><br />
                                2.1 Para solicitar uma encomenda relativa à aquisição de um ou vários produtos em NICI PT, deverá escolher os mesmos na loja online e preencher o formulário de encomenda que é electronicamente enviado para a plataforma alugada para o efeito, seguindo as instruções relevantes ao adicionar um produto ao cesto, ficando a sua compra registada.<br />
                                2.2 O formulário da encomenda contém uma secção com estes Termos e Condições Gerais de Venda, e contém também informação sobre as principais características de cada produto encomendado e o respectivo preço unitário (incluindo todas as taxas e direitos aplicáveis), o tipo de pagamento que pode utilizar para fazer a compra, termos de expedição para os produtos adquiridos, custos de expedição e entrega, e referências aos termos e condições para devolução de artigos adquiridos on-line.<br />
                                2.3 Considera-se que uma encomenda foi efectuada quando NICI PT tenha recebido o seu formulário de encomenda por via electrónica e a informação tenha sido verificada e dada como correcta.<br />
                                2.4 Antes de submeter o seu formulário de encomenda para compra de produtos, é-lhe pedido que leia atentamente os Termos e Condições Gerais de Venda, guarde ou solicite uma cópia do mesmo para seu uso pessoal.<br />
                                2.5 O formulário de encomenda é arquivado na nossa base de dados pelo prazo necessário para processar a sua encomenda, nos termos da lei. Pode aceder ao seu formulário de encomenda no seu email, o qual é enviado imediatamente após o pagamento através de Paypal ou após finalizar a encomenda quando é selecionado o modo de pagamento “Transferência Bancária ou Contra-Reembolso. Além disso, a cópia das provas informáticas relativas à conclusão do contrato será conservada pelo tempo previsto pelas normas de direito civil e fiscais aplicáveis.<br />
                                2.6 As encomendas submetidas a NICI PT têm de ser preenchidas em Português, Inglês ou Espanhol, de acordo com o país para onde será enviada a encomenda.<br />
                                2.7 Depois do seu formulário de encomenda ter sido registado, NICI PT processará a sua encomenda logo que possível.<br />
                                2.9 NICI PT pode não processar pedidos de compra se não houver garantias suficientes de solvabilidade, se as encomendas estiverem incompletas ou incorrectas, ou se os produtos já não estiverem disponíveis. Nas situações acima referidas, informaremos por e-mail que o contrato não foi executado e que NICI PT não efectuou a sua encomenda especificando os motivos. Para além das informações fornecidas, NICI PT não se encontra nas condições de dar-vos indicações mais detalhadas em relação à disponibilidade do (s) produto (s); portanto uma vez examinada a sua encomenda, NICI PT informar-lhe-á através de email ou telefonicamente se alguns dos produtos encomendados por si não estiverem disponíveis. Ressalvadas as disposições das Condições Gerais de Venda, considera-se que a encomenda em questão tem por objecto prestações de venda divisíveis, autónomas e relativas a mais do que uma unidade económica, tantas quantos são os produtos encomendados, tal como foi expressamente concordado entre o Cliente e NICI PT com o envio da encomenda e a aceitação da mesma. Consequentemente, no caso em que a execução da encomenda por parte de NICI PT seja limitada a alguns dos produtos encomendados devido à indisponibilidade de alguns desses ou por outras razões legítimas, independentes da vontade de NICI PT, com o envio da encomenda em questão, o Comprador declara o seu interesse e presta o seu consentimento à execução parcial da compra, limitada aos produtos restantes, que portanto não poderá ser recusada por parte do Comprador, nem poderá consentir ao Comprador a rescisão da referida encomenda. No caso NICI PT não se encontre nas condições de aceitar integralmente a encomenda efectuada pelo Cliente, dando origem à aceitação parcial da mesma relativamente aos produtos disponíveis, o eventual exercício do direito de arrependimento previsto pelo art. n° 8 das Condições Gerais de Venda não dará origem a nenhuma despesa de transporte a cargo do próprio Cliente.<br />
                                2.10 A submissão de um formulário de encomenda a NICI PT significa a aceitação incondicional e compromisso de observar as disposições dos presentes Termos e Condições Gerais de Venda no contrato que celebra com NICI PT. Caso não concorde com algumas das disposições dos presentes Termos e Condições Gerais de Venda, não submeta o seu formulário de encomenda para aquisição de produtos em NICI PT e contacte-nos.<br />
                                2.11 Ao submeter um formulário de encomenda, está a aceitar e concordar com os presentes Termos e Condições Gerais de Venda bem como com outras condições igualmente contidas em NICI PT através de ligações, incluindo os Termos e Condições Gerais de Venda e Política de Privacidade<br />
                                2.12 Uma vez submetido um formulário de encomenda, NICI PT envia-lhe, por e-mail cópia do recibo electrónico da ordem de compra, contendo um resumo da informação relacionada com o formulário de encomenda (Principais características dos produtos, informação detalhada sobre o preço, condições de pagamento e o custo do pedido de expedição para o cliente, endereço onde apresentar eventuais reclamações e serviços de assistência pós-venda).<br />
                                2.13 Ao submeter um formulário de encomenda à NICI PT, está a aceitar receber a factura/talão emitidos para efeitos fiscais em formato Físico conjuntamente com a encomenda efectuada.
                            </p>
                            <p>
                                <strong>3. Garantias e Indicação do Preço do Produto</strong><br />
                                3.1 Os produtos para venda em NICI PT são de qualidade superior, de acordo com os standards europeus, depois de passados pelos testes de qualidade. Estes testes são supervisionados pela NICI GMBH.<br />
                                3.2 As principais características dos produtos são apresentadas na NICI PT na página web de cada produto. Os produtos oferecidos para venda na NICI PT podem não corresponder exactamente ao real em termos de imagem e cores devido ao browser da Internet ou ao monitor usados. As imagens apresentadas têm um efeito meramente indicativo. As características técnicas de um produto, as homologações e declarações de segurança de um produto de marca NICI PT e de qualquer outro produto vendido através do sítio são indicadas na etiqueta ou na embalagem ou nas instruções de utilização do produto e podem estar referidas na totalidade ou em parte no próprio sítio junto da ilustração do Produto. Todos os produtos de marca NICI PT respeitam os standards e estão homologados conforme quanto previsto pelas normas da Comunidade Europeia.<br />
                                3.3 O preço dos produtos é expresso em euros incluindo IVA, bem como todas as taxas e impostos aplicáveis sendo aplicadas as despesas de transporte quando a encomenda efetuada não se encontrar isenta das mesmas. Os preços estão sujeitos a alterações. Verifique o preço final de venda e respetivas despesas de transporte antes de enviar o formulário de encomenda.<br />
                                3.4 As encomendas efetuadas a partir do sítio de um país diferente daquele para o qual pretende enviar o produto, ou para endereços para os quais a NICI PT não permite expedir, são automaticamente canceladas.<br />
                                3.5 Todos os produtos são entregues com uma etiqueta de identificação. Não retire a etiqueta ou o selo dos artigos adquiridos caso pretenda devolvê-los. Não somos de modo algum responsáveis por informações ou dados errados nem por eventuais inexactidões técnicas ou de qualquer outra natureza fornecidas por terceiros à NICI PT.<br />
                                3.6 Caso decida exercer o seu direito de devolução dos produtos adquiridos, NICI PT tem o direito de não aceitar produtos que sejam devolvidos sem a correspondente etiqueta ou caso estes tenham sofrido alterações ao estado original ou ainda caso estes se apresentem danificados (por ex. sem etiqueta ou estragados)<br />
                                3.8 A garantia, prestada no período de duração associado, aplica-se ao produto que apresente um defeito de conformidade, desde que o produto tenha sido utilizado correctamente, no respeito do uso a que se destina e de quanto previsto na documentação técnica ou instruções de utilização anexas. A garantia é prestada unicamente ao cliente que seja Consumidor. Em caso de defeito de conformidade providenciaremos, com despesas a nosso cargo, ao restabelecimento da conformidade do produto mediante reparação/substituição ou à redução do preço, salvo eventual rescisão do contrato, se necessário. A assistência durante o período de garantia é prestada mediante a exibição do Factura de Compra. Reservamo-nos a faculdade de substituir o produto (à nossa discrição mesmo por um produto de características equivalentes) ou rescindir o contrato de venda com a devolução do valor total pago e de eventuais despesas ulteriores, no caso em que, por qualquer motivo, não seja possível restabelecer ou substituir um produto no período de garantia. Não nos responsabilizamos por eventuais atrasos na substituição. Nos casos em que esteja prevista a devolução do produto para poder usufruir da garantia, o produto deverá ser restituído na embalagem original, com todas as partes que o compõem (incluindo a embalagem e eventual documentação e acessórios fornecidos: manuais, invólucros, etc.). Garantimos o respeito das normas de qualidade relativas aos nossos produtos exclusivamente até ao momento da entrega. Está excluída qualquer responsabilidade da nossa parte derivante do uso impróprio dos produtos após a entrega.
                            </p>
                            <p>
                                <strong>4. Pagamentos</strong><br />
                                4.1 O pagamento do preço dos produtos e respectivos custos de expedição tem de ser feito usando um dos procedimentos indicados no formulário de encomenda on-line.<br />
                                4.2 No caso de pagamento por Transferência Bancária, o cliente final deverá efecutar a mesma para a conta designada no processo de encomenda no prazo de 24 horas após a finalização da mesma, enviando o comprovativo para o endereço <a href="mailto:vendas@nicistore.com">vendas@nicistore.com</a>, indicando o nº da encomenda correspondente. No caso de pagamento por contra-reembolso o cliente final deve indicar o máximo de dados essenciais para a entrega da encomenda e respectiva cobrança, bem como o Número de Identificação Fiscal (NIF) e um contacto telefónico para confirmação de entrega ou providenciar este ao transportador, sendo que neste caso o cliente final concorda ao aceitar estes termos, em que o seu contacto possa ser cedido apenas com a finalidade de entrega da mesma. No caso de pagamento por Paypal, todos os dados (como por ex., número do cartão e data de validade) são geridos diretamente no sítio de pagamentos on-line da PayPal (Europe) S.à r.l. et Cie, S.C.A. que presta os serviços remotos de pagamento eletrónico, sem que terceiros tenham qualquer tipo de acesso aos mesmos. Tais dados não serão usados diretamente por NICI PT. NICI PT efetuará todo o processo de gestão dos pagamentos sempre através do mesmo gestor de pagamentos: seja relativo a compras ou a emissão de reembolsos em caso de devoluções, no cumprimento do exercício do seu direito de devolução ou nos casos assinalados como possíveis fraudes pela autoridade de segurança pública. O preço relativo aos produtos adquiridos e respectivos custos de expedição, como indicado no formulário de encomenda, serão debitados no seu cartão de débito/crédito após efetuado o pagamento dos mesmos no sítio do provedor. Todos os dados os dados relativamente aos termos de utilização da Paypal podem ser encontrados <a href="https://cms.paypal.com/ie/cgi-bin/?cmd=_render-content&content_ID=ua/UserAgreement_full&locale.x=en_US" target="_blank">nesta ligação</a>, sendo a NICI PT alheia a qualquer problema com pagamentos ou utilização deste meio.<br />
                                4.4 Se, por qualquer razão, existir alguma problema no pagamento da encomenda ou a ausência da efetividade do mesmo, a NICI PT reserva-se no direito de cancelar a mesma, sendo esta informação enviada posteriormente por e-mail.
                            </p>
                            <p>
                                <strong>5. Vouchers Eletrónicos de Descontos na loja online da NICI PT</strong><br />
                                5.1 Os Vouchers fornecidos pela loja online da NICI PT, são códigos electrónicos, também denominados códigos de desconto NICI PT, que lhe permitem aproveitar um desconto na compra de artigos ou categorias específicas na loja online da NICI PT.<br />
                                5.2 A caixa para inserção do código de desconto NICI PT é visualizada no canto inferior esquerdo no ecrã de resumo do carrinho de compras, tendo o consumidor que submeter o mesmo através do botão enviar. O desconto será calculado automaticamente, sendo da responsabilidade do consumidor verificar se este desconto se encontra refletido no preço final da encomenda.<br />
                            </p>
                            <p>
                                <strong>[Resolução alternativa de conflitos]</strong>
                            </p>
                            <p>
                                Em caso de litígio de consumo no online, o consumidor pode recorrer a um sistema de resolução de litígios em “linha” (RLL), a Plataforma ODR ("online dispute resolution"), com competência para resolução de litígios relativos às obrigações contratuais resultantes de contratos de venda ou de serviços online.
                            </p>
                            <p>
                                O consumidor passa assim a ter um portal único onde pode registar as suas reclamações e acompanhar a sua evolução. “A plataforma garante todos os passos para resolução dos litígios, desde a introdução pelo consumidor, passando pela interligação com as entidades de RAL, e terminando na informação às partes envolvidas”
                            </p>
                            <p>
                                Aceda aqui à Plataforma Eletrónica de Resolução Alternativa de Litígios nos contratos de venda ou de serviços online.
                            </p>
                            <p>
                                Para Queixas e Reclamações – <a href="mailto:vendas@nicistore.com">vendas@nicistore.com</a><br />
                                Mais informações em Portal do Consumidor - <a href="http://www.consumidor.pt" target="_blank">http://www.consumidor.pt</a>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Exports
 */
export default InfoPage;
