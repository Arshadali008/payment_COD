/** @odoo-module **/
//import paymentForm from '@payment/js/payment_form'
//import { loadJS } from '@web/core/assets';
//
//paymentForm.include({
//    async _selectPaymentOption(ev) {
//        await this._super(...arguments);
//        if (ev.target.getAttribute('data-provider-code') == 'cash_on_delivery'){
//            const providerCharge = ev.target.getAttribute('data-provider-charge')
////            await this._addDeliveryCharge(providerCharge);
//        }
//    },
//    async _prepareInlineForm(providerId, providerCode, paymentOptionId, paymentMethodCode, flow) {
//        if (providerCode !== 'cash_on_delivery') {
//            return this._super(...arguments);
//        }
//        if (flow === 'token') {
//            return;
//        }
//        this._setPaymentFlow('direct');
//    },
//    async _processDirectFlow(providerCode, paymentOptionId, paymentMethodCode, processingValues) {
//        if (providerCode !== 'cash_on_delivery') {
//            return this._super(...arguments);
//        }
//        window.location = '/payment/status'
//    },
//    async _addDeliveryCharge(charge) {
////        const table = document.querySelector('table[class="table mb-0"]');
////        var targetRow = table.rows[2]; // Assuming you want to insert after the first row (index 1)
////        var newRow = table.insertRow(table.rows.length); //Insert new row at the end of the table
////        var cell1 = targetRow.insertCell(2);
////        var cell2 = targetRow.insertCell(3);
////        cell1.innerHTML = "New Row";
////        cell2.innerHTML = "New Row"
////        document.getElementById("cart_total_subtotal").innerHTML = "COD Charge";
//        return
//    }
//})

///** @odoo-module **/
//import paymentForm from '@payment/js/payment_form';
//import { loadJS } from '@web/core/assets';
//import { rpc } from '@web/core/network/rpc';
//
//paymentForm.include({
//    async _selectPaymentOption(ev) {
//        await this._super(...arguments);
//        const providerCode = ev.target.getAttribute('data-provider-code');
//        const providerCharge = ev.target.getAttribute('data-provider-charge');
//        const providerId = ev.target.getAttribute('data-provider-id');
//        const paymentMethodCode = ev.target.getAttribute('data-payment-method-code');
//        this._addDeliveryCharge(providerId, paymentMethodCode);
//    },
//
//    async _prepareInlineForm(providerId, providerCode, paymentOptionId, paymentMethodCode, flow) {
//        if (providerCode !== 'cash_on_delivery') {
//            return this._super(...arguments);
//        }
//        if (flow === 'token') {
//            return;
//        }
//        this._setPaymentFlow('direct');
//    },
//
//    async _processDirectFlow(providerCode, paymentOptionId, paymentMethodCode, processingValues) {
//        if (providerCode !== 'cash_on_delivery') {
//            return this._super(...arguments);
//        }
//        window.location = '/payment/status';
//    },
//
//    async _addDeliveryCharge(providerId, paymentMethodCode) {
//        console.log(providerId,paymentMethodCode)
//        const response = await rpc('/shop/payment/cod_charges', {
//            provider_id: providerId,
//            payment_method_code: paymentMethodCode
//        });
//        if (response && response.cod_charges > 0) {
//            const codChargeElement = document.querySelector('#cart_cod_charges');
//            const codMonetaryElement = document.querySelector('#cart_cod_monetary');
//            const totalElement = document.querySelector('#cart_total_subtotal');
//            if (codChargeElement) {
//                codChargeElement.innerText = 'COD charges';
//                codMonetaryElement.innerText = `${response.currency_symbol} ${response.cod_charges}.00`;
//            }
//            if (totalElement) {
//                totalElement.innerText = `Total: ${response.currency_symbol}${response.amount_total}`;
//            }
//        }
//        else if(response && response.cod_charges == 0){
//            const codChargeElement = document.querySelector('#cart_cod_charges')
//            if(codChargeElement){
//                codChargeElement.innerHTML = '';
//            }

//            const totalElement = document.querySelector('#cart_total_subtotal');
//            if (codChargeElement) {
//                codChargeElement.innerText = `COD Charges: ${response.currency_symbol}${response.cod_charges}`;
//            }
//            if (totalElement) {
//                totalElement.innerText = `Total: ${response.currency_symbol}${response.amount_total}`;
//            }
//        }
//    }
//});
///** @odoo-module **/
//import paymentForm from '@payment/js/payment_form';
//import { rpc } from '@web/core/network/rpc';
//import { mount } from '@odoo/owl';
//import CashOnDeliveryComponent from '@payment_cash_on_delivery/js/cash_on_delivery_component';
//
//let codComponentInstance = null;
//
//// Mount the component once
//document.addEventListener('DOMContentLoaded', async () => {
//    const target = document.querySelector('#cod_component_mount_here');
//    console.log('Mount target:', target);  // DEBUG
//    if (target) {
//        codComponentInstance = await mount(CashOnDeliveryComponent, {
//            target,
//        });
//        console.log('Mounted COD component');
//    } else {
//        console.warn('Mount target not found');
//    }
//});
//
//paymentForm.include({
//    async _selectPaymentOption(ev) {
//        await this._super(...arguments);
//        const providerCode = ev.target.getAttribute('data-provider-code');
//        const providerId = ev.target.getAttribute('data-provider-id');
//        const paymentMethodCode = ev.target.getAttribute('data-payment-method-code');
//        this._addDeliveryCharge(providerId, paymentMethodCode);
//    },
//
//    async _prepareInlineForm(providerId, providerCode, paymentOptionId, paymentMethodCode, flow) {
//        if (providerCode !== 'cash_on_delivery') {
//            return this._super(...arguments);
//        }
//        if (flow === 'token') {
//            return;
//        }
//        this._setPaymentFlow('direct');
//    },
//
//    async _processDirectFlow(providerCode, paymentOptionId, paymentMethodCode, processingValues) {
//        if (providerCode !== 'cash_on_delivery') {
//            return this._super(...arguments);
//        }
//        window.location = '/payment/status';
//    },
//
//    async _addDeliveryCharge(providerId, paymentMethodCode) {
//        const response = await rpc('/shop/payment/cod_charges', {
//            provider_id: providerId,
//            payment_method_code: paymentMethodCode,
//        });
//
//        if (response && codComponentInstance) {
//            codComponentInstance.updateCharges(response);
//        }
//    },
//});
//
import paymentForm from '@payment/js/payment_form';
import { loadJS } from '@web/core/assets';
import { rpc } from '@web/core/network/rpc';

paymentForm.include({
    async _selectPaymentOption(ev) {
        await this._super(...arguments);
        const providerCode = ev.target.getAttribute('data-provider-code');
        const providerCharge = ev.target.getAttribute('data-provider-charge');
        const providerId = ev.target.getAttribute('data-provider-id');
        const paymentMethodCode = ev.target.getAttribute('data-payment-method-code');
        this._addDeliveryCharge(providerId, paymentMethodCode);
    },

    async _prepareInlineForm(providerId, providerCode, paymentOptionId, paymentMethodCode, flow) {
        if (providerCode !== 'cash_on_delivery') {
            return this._super(...arguments);
        }
        if (flow === 'token') {
            return;
        }
        this._setPaymentFlow('direct');
    },

    async _processDirectFlow(providerCode, paymentOptionId, paymentMethodCode, processingValues) {
        if (providerCode !== 'cash_on_delivery') {
            return this._super(...arguments);
        }
        window.location = '/payment/status';
    },

    async _addDeliveryCharge(providerId, paymentMethodCode) {
        const response = await rpc('/shop/payment/cod_charges', {
            provider_id: providerId,
            payment_method_code: paymentMethodCode
        });
        const codChargeRow = document.querySelector('.cod-charges-row');
        const codChargeElement = document.querySelector('#cart_cod_charges');
        const codMonetaryElement = document.querySelector('#cart_cod_monetary');
        const totalElement = document.querySelector(`#${'order_total'} .${'text-end'}`);
        if (response && response.cod_charges > 0) {
            if (codChargeElement) {
                codChargeRow.style = '';
                codChargeElement.innerText = 'COD charges';
                codMonetaryElement.innerText = `${response.currency_symbol} ${response.cod_charges}.00`;
                totalElement.innerHTML = `<strong>${response.currency_symbol} ${response.amount_total}.00</strong>`;
                this.paymentContext.amount = response.amount_total
                console.log(this.paymentContext)

            }
        }
        else if(response && response.cod_charges == 0){
            if(codChargeElement){
                codChargeElement.innerHTML = '';
                codMonetaryElement.innerHTML = '';
                totalElement.innerHTML = `<strong>${response.currency_symbol} ${response.amount_total}.00</strong>`;
                this.paymentContext.amount = response.amount_total
                console.log(this.paymentContext)
            }
        }
    }
});
