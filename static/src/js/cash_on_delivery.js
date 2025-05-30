/////** @odoo-module **/
////import publicWidget from "@web/legacy/js/public/public_widget";
////import { rpc } from "@web/core/network/rpc";
////import { useState } from "@odoo/owl";
////import { mount } from '@odoo/owl';
////import CashOnDeliveryComponent from './cod_component';
////
////publicWidget.registry.CODCharges = publicWidget.Widget.extend({
////    selector: '.o_payment_form',
//// Assuming this goes in a publicWidget or main JS file
////
////mount(CashOnDeliveryComponent, {
////    target: document.querySelector("#cod_component_mount_here"),
////});
////
////    events: {
////        'change input[name="o_payment_radio"]': '_onRadioChange',
////    },
////
////    _onRadioChange() {
////        const selected = this.el.querySelector('input[name="o_payment_radio"]:checked');
////        const charges = selected?.dataset?.providerCharges;
////        const paymentMethodCode = selected?.dataset?.paymentMethodCode;
////        const providerId = selected?.dataset?.providerId;
////        console.log(selected, charges, providerId, paymentMethodCode)
////
////        if (providerId) {
////            console.log("2")
////            rpc('/shop/payment/cod_charges', { provider_id: providerId, payment_method_code: paymentMethodCode }).then((res) => {
////                // Add your DOM manipulation logic
////            });
////        }
////    }
////});
//
/////** @odoo-module **/
////
////import { Component, onMounted, useState } from '@odoo/owl';
////import { jsonRpc } from '@web/core/network/rpc';
////import { mount } from '@odoo/owl';
////import { registry } from "@web/core/registry";
////
////
////class CashOnDeliveryComponent extends Component {
////    static template = "payment_cash_on_delivery.payment_cod_charges_line";
////    setup() {
////        console.log("2")
////        this.state = useState({ codCharges: 0, totalAmount: 0, currency: "$" });
////
////        onMounted(() => {
////            console.log("4")
////            this.bindEvents();
////        });
////    }
////
////    bindEvents() {
////        const radios = document.querySelectorAll('input[name="o_payment_radio"]');
////        radios.forEach((radio) => {
////            radio.addEventListener('change', () => this.updateCharges());
////        });
////    }
////
////    updateCharges() {
////        const selected = document.querySelector('input[name="o_payment_radio"]:checked');
////        if (!selected) return;
////
////        const providerId = selected.dataset.providerId;
////        jsonRpc('/shop/payment/cod_charges', { provider_id: providerId }).then((res) => {
////            this.state.codCharges = res.cod_charges;
////            this.state.totalAmount = res.amount_total;
////            this.state.currency = res.currency_symbol;
////        });
////    }
////}
////const systrayItem = {
////    Component: CashOnDeliveryComponent,  // Register the component in the systray
////};
////registry.category("systray").add("cash_on_delivery_component", systrayItem, { sequence: 0 });
////export default CashOnDeliveryComponent;
//
///** @odoo-module **/
//import publicWidget from '@web/legacy/js/public/public_widget';
//import { rpc } from '@web/core/network/rpc';
//import { mount } from '@odoo/owl';
//import CashOnDeliveryComponent from '@payment_cash_on_delivery/js/cash_on_delivery_component';
//
//publicWidget.registry.CODCharges = publicWidget.Widget.extend({
//    selector: '.o_payment_form',
//    events: {
//        'change input[name="o_payment_radio"]': '_onRadioChange',
//    },
//
//    async _onRadioChange() {
//        const selected = this.el.querySelector('input[name="o_payment_radio"]:checked');
//        const paymentMethodCode = selected?.dataset?.paymentMethodCode;
//        const providerId = selected?.dataset?.providerId;
//        console.log(selected, providerId, paymentMethodCode);
//
//        if (providerId && paymentMethodCode === 'cash_on_delivery') {
//            const response = await rpc('/shop/payment/cod_charges', {
//                provider_id: providerId,
//                payment_method_code: paymentMethodCode
//            });
//            if (response && response.cod_charges > 0) {
//                const codChargeElement = document.querySelector('#cart_cod_charges');
//                const totalElement = document.querySelector('#cart_total_subtotal');
//                if (codChargeElement) {
//                    codChargeElement.innerText = `COD Charges: ${response.currency_symbol}${response.cod_charges}`;
//                }
//                if (totalElement) {
//                    totalElement.innerText = `Total: ${response.currency_symbol}${response.amount_total}`;
//                }
//            }
//        }
//    }
//});
//
//// Mount the Owl component
//mount(CashOnDeliveryComponent, {
//    target: document.querySelector(".cash_on_delivery_component"),
//});

//odoo.define('custom_payment_fee.display', function (require) {
//    'use strict';
//    var publicWidget = require('web.public.widget');
//    publicWidget.registry.PaymentCheckout = publicWidget.Widget.extend({
//        selector: '.oe_website_sale',
//        events: {
//            'change input[name="payment_provider"]': '_onChangePaymentProvider',
//        },
//        _onChangePaymentProvider: function (ev) {
//            var $selectedProvider = $(ev.currentTarget);
//            var providerId = $selectedProvider.val();
//            // Hide all fee displays
//            $('.payment_fee').hide();
//            // Show fee for the selected provider
//            $('.payment_fee_' + providerId).show();
//        },
//    });
//});
//
///** @odoo-module **/
//
//import { Component, useState, onMounted } from "@odoo/owl";
//import { registry } from "@web/core/registry";
//
//export class PaymentFeeDisplay extends Component {
//    static template = "payment_cash_on_delivery.PaymentFeeDisplay";
//
//    setup() {
//        this.state = useState({
//            selectedProviderId: null,
//            visible: true,
//            currency_symbol: '₹',
//            cod_charges: 50,
//            total: 0,
//        });
//        console.log("qwerty");
//        onMounted(() => {
//            this._initializePaymentProvider();
//        });
//    }
//
//
//    _initializePaymentProvider() {
//        // Find the initially selected payment provider
//        const selectedRadio = document.querySelector('input[name="o_payment_radio"]:checked');
//        if (selectedRadio) {
//            this.state.selectedProviderId = selectedRadio.value;
//        }
//
//        // Add event listener for payment provider changes
//        document.querySelectorAll('input[name="o_payment_radio"]').forEach(radio => {
//            radio.addEventListener('change', (ev) => {
//                this.state.selectedProviderId = ev.target.value;
//            });
//        });
//    }
//}
//
//registry.category("public_components").add("payment_cash_on_delivery.PaymentFeeDisplay", PaymentFeeDisplay);
