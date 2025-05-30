/** @odoo-module **/
import { Component, useState } from '@odoo/owl';

export default class CashOnDeliveryComponent extends Component {
    setup() {
        console.log("d")
        this.state = useState({
            cod_charges: 0,
            currency_symbol: '',
            total: 0,
            visible: false,
        });
    }

    updateCharges({ cod_charges, currency_symbol, amount_total }) {
        this.state.cod_charges = cod_charges;
        this.state.currency_symbol = currency_symbol;
        this.state.total = amount_total;
        this.state.visible = true;
    }

    static template = 'payment_cash_on_delivery.cash_on_delivery_component';
}
